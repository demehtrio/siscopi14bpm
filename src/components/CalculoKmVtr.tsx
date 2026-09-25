import React, { useState, useMemo, useEffect } from 'react';
import { 
  Gauge, 
  Calendar, 
  Search, 
  Truck, 
  Car, 
  Bike, 
  ArrowRight, 
  RotateCcw, 
  FileText, 
  Copy, 
  Check, 
  TrendingUp, 
  AlertCircle, 
  ChevronLeft, 
  User, 
  Clock, 
  ArrowUpRight, 
  CheckCircle2, 
  Wrench, 
  Activity, 
  Sparkles,
  Award,
  Filter,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format, subDays, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Vehicle, RecordEntry } from '../types';
import { ASSETS } from '../assets/logos';

interface CalculoKmVtrProps {
  vehicles: Vehicle[];
  history: RecordEntry[];
  onBackToFleet: () => void;
  initialSelectedVehicleId?: string | null;
  omeOrigem?: string;
  addNotification?: (msg: string, type: 'success' | 'error' | 'info') => void;
  isLocalMode?: boolean;
  db?: any;
}

export interface VehicleKmSummary {
  vehicle: Vehicle;
  initialMileage: number;
  finalMileage: number;
  kmRodado: number;
  tripsCount: number;
  recordsCount: number;
  records: RecordEntry[];
}

export default function CalculoKmVtr({
  vehicles,
  history,
  onBackToFleet,
  initialSelectedVehicleId,
  omeOrigem = "14º BPM",
  addNotification,
  isLocalMode = false,
  db
}: CalculoKmVtrProps) {
  // Mode: 'geral' (all vehicles) or 'individual' (single vehicle)
  const [mode, setMode] = useState<'geral' | 'individual'>(
    initialSelectedVehicleId ? 'individual' : 'geral'
  );

  // Selected vehicle for individual mode
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    initialSelectedVehicleId || (vehicles.length > 0 ? vehicles[0].id : '')
  );

  // Date range
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const startMonthStr = format(startOfMonth(new Date()), 'yyyy-MM-dd');
  
  const [startDate, setStartDate] = useState<string>(startMonthStr);
  const [endDate, setEndDate] = useState<string>(todayStr);
  const [presetPeriod, setPresetPeriod] = useState<string>('mes_atual');

  // Additional records fetched from Firestore
  const [allRecords, setAllRecords] = useState<RecordEntry[]>(history || []);
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);

  // Search & filter for general table
  const [searchGeneral, setSearchGeneral] = useState<string>('');
  const [filterActivity, setFilterActivity] = useState<'all' | 'moved' | 'zero'>('all');
  const [sortBy, setSortBy] = useState<'km_desc' | 'km_asc' | 'prefix' | 'trips'>('km_desc');

  // Search for individual vehicle select
  const [vehicleSearch, setVehicleSearch] = useState<string>('');

  // Update selected vehicle if prop changes
  useEffect(() => {
    if (initialSelectedVehicleId) {
      setSelectedVehicleId(initialSelectedVehicleId);
      setMode('individual');
    }
  }, [initialSelectedVehicleId]);

  // Keep allRecords in sync with history prop initially
  useEffect(() => {
    if (history && history.length > 0) {
      setAllRecords(prev => {
        // Merge without duplicates by id
        const map = new Map<string, RecordEntry>();
        prev.forEach(r => { if (r.id) map.set(r.id, r); });
        history.forEach(r => { if (r.id) map.set(r.id, r); });
        return Array.from(map.values());
      });
    }
  }, [history]);

  // Fetch full records from Firestore checklists collection for accuracy
  const fetchRecordsFromDb = async () => {
    setLoading(true);
    try {
      if (!isLocalMode && db) {
        const q = query(
          collection(db, 'checklists'),
          orderBy('timestamp', 'desc'),
          limit(1500)
        );
        const snap = await getDocs(q);
        const list: RecordEntry[] = [];
        snap.forEach(docSnap => {
          list.push({ id: docSnap.id, ...docSnap.data() } as RecordEntry);
        });
        if (list.length > 0) {
          setAllRecords(list);
          if (addNotification) {
            addNotification(`Carregados ${list.length} registros para cálculo de quilometragem.`, 'success');
          }
        }
      } else {
        // Check local storage
        const localHist = localStorage.getItem('siscopi_cadastro_history');
        if (localHist) {
          try {
            const parsed = JSON.parse(localHist);
            if (Array.isArray(parsed)) {
              setAllRecords(parsed);
            }
          } catch (e) {
            console.error("Erro ao ler localStorage siscopi_cadastro_history:", e);
          }
        }
      }
    } catch (err: any) {
      console.warn("Aviso ao buscar registros de checklist:", err);
      // Fallback is whatever is in allRecords/history
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchRecordsFromDb();
  }, [isLocalMode, db]);

  // Helper to handle period presets
  const handleApplyPreset = (preset: string) => {
    setPresetPeriod(preset);
    const today = new Date();
    if (preset === 'hoje') {
      const d = format(today, 'yyyy-MM-dd');
      setStartDate(d);
      setEndDate(d);
    } else if (preset === 'ontem') {
      const y = format(subDays(today, 1), 'yyyy-MM-dd');
      setStartDate(y);
      setEndDate(y);
    } else if (preset === '7dias') {
      setStartDate(format(subDays(today, 6), 'yyyy-MM-dd'));
      setEndDate(format(today, 'yyyy-MM-dd'));
    } else if (preset === '15dias') {
      setStartDate(format(subDays(today, 14), 'yyyy-MM-dd'));
      setEndDate(format(today, 'yyyy-MM-dd'));
    } else if (preset === 'mes_atual') {
      setStartDate(format(startOfMonth(today), 'yyyy-MM-dd'));
      setEndDate(format(today, 'yyyy-MM-dd'));
    } else if (preset === 'mes_anterior') {
      const lastMonth = subDays(startOfMonth(today), 1);
      setStartDate(format(startOfMonth(lastMonth), 'yyyy-MM-dd'));
      setEndDate(format(endOfMonth(lastMonth), 'yyyy-MM-dd'));
    }
  };

  // Filter records within selected date range
  const filteredRecords = useMemo(() => {
    const start = new Date(startDate + 'T00:00:00');
    const end = new Date(endDate + 'T23:59:59');

    return allRecords.filter(r => {
      let rDate: Date | null = null;
      if (r.timestamp?.toDate) {
        rDate = r.timestamp.toDate();
      } else if (r.timestamp instanceof Date) {
        rDate = r.timestamp;
      } else if (r.timestamp) {
        rDate = new Date(r.timestamp);
      } else if ((r as any).data) {
        rDate = new Date((r as any).data + 'T12:00:00');
      }

      if (!rDate || isNaN(rDate.getTime())) return false;
      return rDate >= start && rDate <= end;
    });
  }, [allRecords, startDate, endDate]);

  // Calculate stats for all vehicles in the period
  const fleetSummaries = useMemo<VehicleKmSummary[]>(() => {
    return vehicles.map(vehicle => {
      // Find matching records for this vehicle
      const vRecords = filteredRecords.filter(r => {
        const matchesId = r.vehicleId === vehicle.id;
        const matchesPlate = r.identification?.plate && vehicle.plate && 
          r.identification.plate.trim().toUpperCase() === vehicle.plate.trim().toUpperCase();
        const matchesPrefix = r.identification?.prefix && vehicle.prefix &&
          r.identification.prefix.trim().toUpperCase() === vehicle.prefix.trim().toUpperCase();
        return matchesId || matchesPlate || matchesPrefix;
      });

      // Sort chronological (oldest to newest)
      vRecords.sort((a, b) => {
        const tA = a.timestamp?.toDate ? a.timestamp.toDate().getTime() : new Date(a.timestamp || (a as any).data || 0).getTime();
        const tB = b.timestamp?.toDate ? b.timestamp.toDate().getTime() : new Date(b.timestamp || (b as any).data || 0).getTime();
        return tA - tB;
      });

      // Extract valid numbers for currentMileage
      const validMileages = vRecords
        .map(r => Number(r.mileage?.currentMileage))
        .filter(m => !isNaN(m) && m > 0);

      let initialMileage = vehicle.lastMileage || 0;
      let finalMileage = vehicle.lastMileage || 0;
      let kmRodado = 0;

      if (validMileages.length > 0) {
        initialMileage = validMileages[0];
        finalMileage = validMileages[validMileages.length - 1];

        if (validMileages.length >= 2) {
          // Calculate delta across records
          kmRodado = Math.max(0, finalMileage - initialMileage);

          // In case there were multiple distinct trip cycles or non-monotonic segments,
          // also accumulate positive steps
          let stepSum = 0;
          for (let i = 1; i < validMileages.length; i++) {
            const diff = validMileages[i] - validMileages[i - 1];
            if (diff > 0) stepSum += diff;
          }
          if (stepSum > kmRodado) {
            kmRodado = stepSum;
          }
        } else {
          // Only 1 record in period: check if there was a record before the period
          const priorRecords = allRecords
            .filter(r => {
              const matchesId = r.vehicleId === vehicle.id || 
                (r.identification?.plate && vehicle.plate && r.identification.plate.toUpperCase() === vehicle.plate.toUpperCase());
              if (!matchesId) return false;
              const rDate = r.timestamp?.toDate ? r.timestamp.toDate() : new Date(r.timestamp || 0);
              return rDate < new Date(startDate + 'T00:00:00');
            })
            .sort((a, b) => {
              const tA = a.timestamp?.toDate ? a.timestamp.toDate().getTime() : new Date(a.timestamp || 0).getTime();
              const tB = b.timestamp?.toDate ? b.timestamp.toDate().getTime() : new Date(b.timestamp || 0).getTime();
              return tB - tA; // latest first
            });

          if (priorRecords.length > 0) {
            const priorMileage = Number(priorRecords[0].mileage?.currentMileage);
            if (!isNaN(priorMileage) && validMileages[0] >= priorMileage) {
              initialMileage = priorMileage;
              kmRodado = validMileages[0] - priorMileage;
            }
          }
        }
      }

      const tripsCount = vRecords.filter(r => r.type === 'check-out' || r.type === 'check-in').length;

      return {
        vehicle,
        initialMileage,
        finalMileage,
        kmRodado,
        tripsCount,
        recordsCount: vRecords.length,
        records: vRecords
      };
    });
  }, [vehicles, filteredRecords, allRecords, startDate]);

  // Aggregate fleet stats
  const fleetTotals = useMemo(() => {
    const totalKm = fleetSummaries.reduce((acc, curr) => acc + curr.kmRodado, 0);
    const totalTrips = fleetSummaries.reduce((acc, curr) => acc + curr.tripsCount, 0);
    const activeVehicles = fleetSummaries.filter(s => s.kmRodado > 0 || s.recordsCount > 0);
    const zeroVehicles = fleetSummaries.filter(s => s.kmRodado === 0 && s.recordsCount === 0);
    const avgKmPerActive = activeVehicles.length > 0 ? Math.round(totalKm / activeVehicles.length) : 0;
    
    // Top vehicle by km
    const sortedByKm = [...fleetSummaries].sort((a, b) => b.kmRodado - a.kmRodado);
    const topVehicle = sortedByKm.length > 0 && sortedByKm[0].kmRodado > 0 ? sortedByKm[0] : null;

    // Top vehicle by trips
    const sortedByTrips = [...fleetSummaries].sort((a, b) => b.tripsCount - a.tripsCount);
    const topTripsVehicle = sortedByTrips.length > 0 && sortedByTrips[0].tripsCount > 0 ? sortedByTrips[0] : null;

    return {
      totalKm,
      totalTrips,
      activeCount: activeVehicles.length,
      zeroCount: zeroVehicles.length,
      avgKmPerActive,
      topVehicle,
      topTripsVehicle
    };
  }, [fleetSummaries]);

  // Filtered & sorted general table
  const displayedFleet = useMemo(() => {
    return fleetSummaries
      .filter(item => {
        // Search term
        const search = searchGeneral.toLowerCase();
        const matchSearch = 
          (item.vehicle.prefix || '').toLowerCase().includes(search) ||
          (item.vehicle.plate || '').toLowerCase().includes(search) ||
          (item.vehicle.model || '').toLowerCase().includes(search);

        // Activity filter
        let matchActivity = true;
        if (filterActivity === 'moved') {
          matchActivity = item.kmRodado > 0 || item.recordsCount > 0;
        } else if (filterActivity === 'zero') {
          matchActivity = item.kmRodado === 0 && item.recordsCount === 0;
        }

        return matchSearch && matchActivity;
      })
      .sort((a, b) => {
        if (sortBy === 'km_desc') return b.kmRodado - a.kmRodado;
        if (sortBy === 'km_asc') return a.kmRodado - b.kmRodado;
        if (sortBy === 'trips') return b.tripsCount - a.tripsCount;
        if (sortBy === 'prefix') return (a.vehicle.prefix || '').localeCompare(b.vehicle.prefix || '');
        return 0;
      });
  }, [fleetSummaries, searchGeneral, filterActivity, sortBy]);

  // Current individual vehicle summary
  const currentIndividualSummary = useMemo(() => {
    if (!selectedVehicleId) return null;
    return fleetSummaries.find(s => s.vehicle.id === selectedVehicleId) || null;
  }, [fleetSummaries, selectedVehicleId]);

  // Filtered vehicle options for dropdown search
  const filteredVehicleOptions = useMemo(() => {
    if (!vehicleSearch) return vehicles;
    const s = vehicleSearch.toLowerCase();
    return vehicles.filter(v => 
      (v.prefix || '').toLowerCase().includes(s) ||
      (v.plate || '').toLowerCase().includes(s) ||
      (v.model || '').toLowerCase().includes(s)
    );
  }, [vehicles, vehicleSearch]);

  // Copy Summary text for WhatsApp
  const handleCopySummary = () => {
    const formattedStart = format(new Date(startDate + 'T00:00:00'), 'dd/MM/yyyy');
    const formattedEnd = format(new Date(endDate + 'T00:00:00'), 'dd/MM/yyyy');

    let text = `🚔 *${omeOrigem} - CONTROLE DE QUILOMETRAGEM (PMPE)* 🚔\n`;
    text += `📅 *Período:* ${formattedStart} até ${formattedEnd}\n`;

    if (mode === 'individual' && currentIndividualSummary) {
      const v = currentIndividualSummary.vehicle;
      text += `\n🚗 *VIATURA:* ${v.prefix} (${v.plate})\n`;
      text += `📋 *Modelo:* ${v.model}\n`;
      text += `🏁 *Odômetro Inicial:* ${currentIndividualSummary.initialMileage.toLocaleString('pt-BR')} km\n`;
      text += `🏁 *Odômetro Final:* ${currentIndividualSummary.finalMileage.toLocaleString('pt-BR')} km\n`;
      text += `⚡ *KM RODADO NO PERÍODO:* ${currentIndividualSummary.kmRodado.toLocaleString('pt-BR')} km\n`;
      text += `🔄 *Total de Movimentações:* ${currentIndividualSummary.recordsCount} registros (${currentIndividualSummary.tripsCount} turnos)\n`;
      
      if (currentIndividualSummary.records.length > 0) {
        text += `\n*Detalhamento de Saídas e Regressos:*\n`;
        currentIndividualSummary.records.forEach((r, idx) => {
          const rDate = r.timestamp?.toDate ? r.timestamp.toDate() : new Date(r.timestamp || 0);
          const dataHora = format(rDate, 'dd/MM HH:mm');
          const tipo = r.type === 'check-out' ? 'Partida' : (r.type === 'check-in' ? 'Regresso' : 'Manutenção');
          const condutor = r.drivers?.driverName ? ` - Cmt/Cond: ${r.drivers.driverName}` : '';
          text += `${idx + 1}. [${dataHora}] ${tipo}: ${r.mileage?.currentMileage || '---'} km${condutor}\n`;
        });
      }
    } else {
      text += `📊 *MODO GERAL - TODA A FROTA*\n`;
      text += `🚘 *Viaturas Monitoradas:* ${vehicles.length}\n`;
      text += `🟢 *Viaturas que Rodaram:* ${fleetTotals.activeCount}\n`;
      text += `⚡ *TOTAL GERAL DA FROTA:* ${fleetTotals.totalKm.toLocaleString('pt-BR')} km rodados\n`;
      text += `🔄 *Total de Missões/Turnos:* ${fleetTotals.totalTrips}\n`;
      text += `📈 *Média por Viatura Ativa:* ${fleetTotals.avgKmPerActive.toLocaleString('pt-BR')} km\n`;

      if (fleetTotals.topVehicle) {
        text += `🏆 *Maior Rodagem:* ${fleetTotals.topVehicle.vehicle.prefix} (${fleetTotals.topVehicle.vehicle.plate}) com ${fleetTotals.topVehicle.kmRodado.toLocaleString('pt-BR')} km\n`;
      }

      text += `\n*Resumo das Viaturas:*\n`;
      displayedFleet.slice(0, 15).forEach((item, idx) => {
        text += `${idx + 1}. ${item.vehicle.prefix} (${item.vehicle.plate}): *${item.kmRodado.toLocaleString('pt-BR')} km* (${item.tripsCount} saídas)\n`;
      });
      if (displayedFleet.length > 15) {
        text += `... e mais ${displayedFleet.length - 15} viaturas no sistema.\n`;
      }
    }

    text += `\n_Relatório gerado via SisCOpI - Cadastro VTR_`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    if (addNotification) {
      addNotification("Resumo de quilometragem copiado para a área de transferência!", "success");
    }
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  // Generate Professional PDF Report
  const handleGeneratePdf = () => {
    setIsExportingPdf(true);
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Top Navy Header Bar
      const APP_BLUE_DARK: [number, number, number] = [30, 58, 138]; // Deep Navy
      doc.setFillColor(APP_BLUE_DARK[0], APP_BLUE_DARK[1], APP_BLUE_DARK[2]);
      doc.rect(0, 0, pageWidth, 42, 'F');

      // Accent Gold Stripe
      doc.setFillColor(217, 119, 6);
      doc.rect(0, 42, pageWidth, 2.5, 'F');

      // Logos
      try {
        if (ASSETS.LOGO_PMPE) {
          doc.addImage(ASSETS.LOGO_PMPE, 'PNG', 12, 6, 28, 28);
        }
        if (ASSETS.LOGO_14BPM) {
          doc.addImage(ASSETS.LOGO_14BPM, 'PNG', pageWidth - 40, 6, 28, 28);
        }
      } catch (imgErr) {
        console.warn("Logos não puderam ser carregados no PDF:", imgErr);
      }

      // Title & Subtitle
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.text('POLÍCIA MILITAR DE PERNAMBUCO', pageWidth / 2, 14, { align: 'center' });

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`DIRETORIA DE PLANEJAMENTO OPERACIONAL • ${omeOrigem}`, pageWidth / 2, 21, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(253, 224, 71); // Gold yellow
      doc.text('RELATÓRIO DE QUILOMETRAGEM - CADASTRO VTR', pageWidth / 2, 30, { align: 'center' });

      const formattedStart = format(new Date(startDate + 'T00:00:00'), 'dd/MM/yyyy');
      const formattedEnd = format(new Date(endDate + 'T00:00:00'), 'dd/MM/yyyy');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Período de Apuração: ${formattedStart} a ${formattedEnd} • Emissão: ${format(new Date(), 'dd/MM/yyyy HH:mm')}`, pageWidth / 2, 37, { align: 'center' });

      let startY = 52;

      if (mode === 'individual' && currentIndividualSummary) {
        // INDIVIDUAL VEHICLE REPORT
        const v = currentIndividualSummary.vehicle;

        // Vehicle Info Banner Box
        doc.setFillColor(241, 245, 249);
        doc.roundedRect(12, startY, pageWidth - 24, 28, 3, 3, 'F');
        doc.setDrawColor(203, 213, 225);
        doc.roundedRect(12, startY, pageWidth - 24, 28, 3, 3, 'S');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(30, 41, 59);
        doc.text(`Viatura: ${v.prefix} • Placa: ${v.plate}`, 18, startY + 8);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(71, 85, 105);
        doc.text(`Modelo: ${v.model} | Categoria: ${v.category === 'moto' ? 'Motocicleta' : 'Automóvel'} | Status Atual: ${v.status === 'available' ? 'Disponível' : (v.status === 'in_use' ? 'Em Uso' : 'Manutenção')}`, 18, startY + 15);

        // KPI mini boxes inside banner
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(30, 58, 138);
        doc.text(`Odômetro Inicial: ${currentIndividualSummary.initialMileage.toLocaleString('pt-BR')} km`, 18, startY + 23);
        doc.text(`Odômetro Final: ${currentIndividualSummary.finalMileage.toLocaleString('pt-BR')} km`, 90, startY + 23);

        doc.setTextColor(16, 185, 129); // Emerald
        doc.text(`KM TOTAL RODADO: ${currentIndividualSummary.kmRodado.toLocaleString('pt-BR')} KM`, 160, startY + 23);

        startY += 36;

        // Movements Table
        const tableBody = currentIndividualSummary.records.map((r, idx) => {
          const rDate = r.timestamp?.toDate ? r.timestamp.toDate() : new Date(r.timestamp || 0);
          const dataHora = format(rDate, 'dd/MM/yyyy HH:mm');
          const tipo = r.type === 'check-out' ? 'PARTIDA (Saída)' : 
                       (r.type === 'check-in' ? 'REGRESSO (Devolução)' : 'MANUTENÇÃO');
          const condutor = r.drivers?.driverName || '---';
          const prefixoOp = r.identification?.operationalPrefix || r.drivers?.serviceType || '---';
          const odometro = `${Number(r.mileage?.currentMileage || 0).toLocaleString('pt-BR')} km`;
          const obs = r.mileage?.notes || (r as any).checklist?.descricaoAlteracoes || '---';

          return [
            (idx + 1).toString(),
            dataHora,
            tipo,
            condutor,
            prefixoOp,
            odometro,
            obs.slice(0, 35)
          ];
        });

        if (typeof (doc as any).autoTable === 'function') {
          (doc as any).autoTable({
            startY: startY,
            head: [['#', 'Data/Hora', 'Operação', 'Condutor', 'Prefixo Op.', 'Odômetro', 'Observações']],
            body: tableBody.length > 0 ? tableBody : [['-', '-', 'Nenhuma movimentação registrada no período', '-', '-', '-', '-']],
            theme: 'striped',
            headStyles: { fillColor: APP_BLUE_DARK, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8 },
            styles: { fontSize: 7.5, cellPadding: 2.5 },
            alternateRowStyles: { fillColor: [248, 250, 252] },
            margin: { left: 12, right: 12 }
          });
        }
      } else {
        // GENERAL FLEET REPORT
        // Summary KPIs Box
        doc.setFillColor(241, 245, 249);
        doc.roundedRect(12, startY, pageWidth - 24, 22, 3, 3, 'F');
        doc.setDrawColor(203, 213, 225);
        doc.roundedRect(12, startY, pageWidth - 24, 22, 3, 3, 'S');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(30, 41, 59);
        doc.text(`Viaturas Monitoradas: ${vehicles.length}`, 18, startY + 8);
        doc.text(`Viaturas com Rodagem: ${fleetTotals.activeCount}`, 75, startY + 8);
        doc.text(`Total de Missões/Turnos: ${fleetTotals.totalTrips}`, 145, startY + 8);

        doc.setFontSize(10);
        doc.setTextColor(16, 185, 129); // Emerald
        doc.text(`QUILOMETRAGEM TOTAL DA FROTA: ${fleetTotals.totalKm.toLocaleString('pt-BR')} KM`, 18, startY + 16);

        doc.setTextColor(71, 85, 105);
        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'normal');
        doc.text(`Média por Viatura Ativa: ${fleetTotals.avgKmPerActive.toLocaleString('pt-BR')} km`, 145, startY + 16);

        startY += 28;

        const tableBody = displayedFleet.map((item, idx) => {
          const v = item.vehicle;
          const statusLabel = v.status === 'available' ? 'Livre' : (v.status === 'in_use' ? 'Em Uso' : 'Baixa');
          return [
            (idx + 1).toString(),
            v.prefix,
            v.plate,
            v.model,
            v.category === 'moto' ? 'Moto' : 'Carro',
            statusLabel,
            `${item.initialMileage.toLocaleString('pt-BR')} km`,
            `${item.finalMileage.toLocaleString('pt-BR')} km`,
            `${item.kmRodado.toLocaleString('pt-BR')} km`,
            item.tripsCount.toString()
          ];
        });

        if (typeof (doc as any).autoTable === 'function') {
          (doc as any).autoTable({
            startY: startY,
            head: [['#', 'Prefixo', 'Placa', 'Modelo', 'Cat.', 'Status', 'KM Inicial', 'KM Final', 'KM Rodado', 'Saídas']],
            body: tableBody,
            theme: 'striped',
            headStyles: { fillColor: APP_BLUE_DARK, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8 },
            styles: { fontSize: 7.5, cellPadding: 2.2 },
            alternateRowStyles: { fillColor: [248, 250, 252] },
            columnStyles: {
              8: { fontStyle: 'bold', textColor: [16, 185, 129] }
            },
            margin: { left: 12, right: 12 }
          });
        }
      }

      // Footers with page numbering
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(148, 163, 184);
        doc.text(`SisCOpI • Controle de Frota PMPE • ${omeOrigem}`, 12, pageHeight - 8);
        doc.text(`Página ${i} de ${totalPages}`, pageWidth - 12, pageHeight - 8, { align: 'right' });
      }

      // Save PDF
      const fileName = `Relatorio_KM_VTR_${mode === 'individual' ? selectedVehicleId : 'Geral'}_${startDate}_a_${endDate}.pdf`;
      doc.save(fileName);

      if (addNotification) {
        addNotification("Relatório de KM em PDF gerado e baixado com sucesso!", "success");
      }
    } catch (err: any) {
      console.error("Erro ao gerar PDF de KM:", err);
      if (addNotification) {
        addNotification("Erro ao gerar o relatório em PDF.", "error");
      }
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div>
          <button 
            onClick={onBackToFleet}
            className="inline-flex items-center gap-2 text-xs font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest mb-2 transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} />
            Voltar para Frota
          </button>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
              <Gauge size={22} />
            </div>
            <span>Cálculo de Quilometragem</span>
            <span className="text-blue-600/30 font-light">|</span>
            <span className="text-slate-400 text-lg font-bold">KM Rodado</span>
          </h2>
          <p className="text-slate-500 font-medium text-sm mt-0.5">
            Apuração precisa de deslocamento por viatura individual ou relatório geral de toda a frota no período.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={fetchRecordsFromDb}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all text-xs active:scale-95 disabled:opacity-50 cursor-pointer"
            title="Recarregar registros do banco de dados"
          >
            <RotateCcw size={15} className={loading ? "animate-spin text-blue-600" : ""} />
            <span>Atualizar Dados</span>
          </button>
          
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all text-xs active:scale-95 cursor-pointer"
            title="Copiar resumo formatado para o WhatsApp"
          >
            {copiedSummary ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
            <span>{copiedSummary ? "Copiado!" : "Copiar Resumo"}</span>
          </button>

          <button
            onClick={handleGeneratePdf}
            disabled={isExportingPdf}
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all text-xs shadow-md shadow-blue-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
            title="Exportar Relatório Oficial em PDF"
          >
            <Download size={15} />
            <span>Exportar PDF</span>
          </button>
        </div>
      </div>

      {/* Main Filter Panel: Mode, Vehicle Selection & Period */}
      <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
        {/* Step 1: Mode Switcher */}
        <div>
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-3">
            1. Escopo do Cálculo
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
            <button
              onClick={() => setMode('geral')}
              className={`flex items-center gap-3 p-4 rounded-2xl font-bold transition-all border text-left cursor-pointer ${
                mode === 'geral'
                  ? 'bg-blue-600 text-white border-transparent shadow-lg shadow-blue-500/20'
                  : 'bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              <div className={`p-2.5 rounded-xl ${mode === 'geral' ? 'bg-white/20 text-white' : 'bg-white text-blue-600 border border-slate-200'}`}>
                <Truck size={20} />
              </div>
              <div>
                <p className="text-sm font-black leading-tight">Geral (Toda a Frota)</p>
                <p className={`text-xs mt-0.5 ${mode === 'geral' ? 'text-blue-100' : 'text-slate-400'}`}>
                  Consolidado de todas as {vehicles.length} viaturas
                </p>
              </div>
            </button>

            <button
              onClick={() => setMode('individual')}
              className={`flex items-center gap-3 p-4 rounded-2xl font-bold transition-all border text-left cursor-pointer ${
                mode === 'individual'
                  ? 'bg-blue-600 text-white border-transparent shadow-lg shadow-blue-500/20'
                  : 'bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              <div className={`p-2.5 rounded-xl ${mode === 'individual' ? 'bg-white/20 text-white' : 'bg-white text-blue-600 border border-slate-200'}`}>
                <Gauge size={20} />
              </div>
              <div>
                <p className="text-sm font-black leading-tight">Individual (Viatura Específica)</p>
                <p className={`text-xs mt-0.5 ${mode === 'individual' ? 'text-blue-100' : 'text-slate-400'}`}>
                  Apuração detalhada de uma única VTR
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Step 2: Individual Vehicle Selector (Visible if mode === 'individual') */}
        <AnimatePresence>
          {mode === 'individual' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-2 border-t border-slate-100 space-y-3"
            >
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">
                2. Selecione a Viatura
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                {/* Searchable Select */}
                <div className="relative">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      placeholder="Filtrar viaturas por placa, prefixo ou modelo..."
                      value={vehicleSearch}
                      onChange={(e) => setVehicleSearch(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-sm text-slate-800"
                    />
                  </div>

                  {/* Dropdown list of matching vehicles */}
                  <div className="mt-2 max-h-52 overflow-y-auto custom-scrollbar border border-slate-200 rounded-2xl bg-white shadow-lg p-1.5 space-y-1">
                    {filteredVehicleOptions.map(v => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => {
                          setSelectedVehicleId(v.id);
                          setVehicleSearch('');
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${
                          selectedVehicleId === v.id
                            ? 'bg-blue-50 text-blue-900 border border-blue-200 font-black'
                            : 'hover:bg-slate-50 text-slate-700 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600">
                            {v.category === 'moto' ? <Bike size={16} /> : <Car size={16} />}
                          </div>
                          <div>
                            <span className="font-mono font-bold text-blue-600 mr-2">{v.plate}</span>
                            <span className="font-bold text-slate-800">{v.prefix}</span>
                            <span className="text-xs text-slate-400 ml-2 hidden sm:inline">({v.model})</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            {v.lastMileage ? `${v.lastMileage.toLocaleString('pt-BR')} km` : '0 km'}
                          </span>
                          {selectedVehicleId === v.id && (
                            <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                          )}
                        </div>
                      </button>
                    ))}
                    {filteredVehicleOptions.length === 0 && (
                      <p className="text-center py-4 text-xs font-bold text-slate-400">
                        Nenhuma viatura localizada.
                      </p>
                    )}
                  </div>
                </div>

                {/* Selected Vehicle Badge Display */}
                {currentIndividualSummary && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 p-4 rounded-2xl border border-blue-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
                        {currentIndividualSummary.vehicle.category === 'moto' ? <Bike size={24} /> : <Car size={24} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-blue-200/60 text-blue-800 text-[10px] font-black uppercase tracking-wider">
                            {currentIndividualSummary.vehicle.prefix}
                          </span>
                          <span className="text-xs font-bold text-slate-500">
                            {currentIndividualSummary.vehicle.model}
                          </span>
                        </div>
                        <p className="text-xl font-mono font-black text-blue-700 tracking-tight mt-0.5">
                          {currentIndividualSummary.vehicle.plate}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                        Odômetro Atual
                      </span>
                      <span className="text-base font-black text-slate-800">
                        {currentIndividualSummary.vehicle.lastMileage?.toLocaleString('pt-BR') || 0} km
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Date Range & Quick Presets */}
        <div className="pt-2 border-t border-slate-100 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">
              {mode === 'individual' ? '3.' : '2.'} Período de Apuração
            </label>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'hoje', label: 'Hoje' },
                { id: 'ontem', label: 'Ontem' },
                { id: '7dias', label: 'Últimos 7 dias' },
                { id: '15dias', label: 'Últimos 15 dias' },
                { id: 'mes_atual', label: 'Este Mês' },
                { id: 'mes_anterior', label: 'Mês Anterior' },
              ].map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleApplyPreset(p.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    presetPeriod === p.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            <div className="space-y-1">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">
                Data Inicial (De):
              </span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setPresetPeriod('custom');
                }}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-800 text-sm"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">
                Data Final (Até):
              </span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setPresetPeriod('custom');
                }}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-800 text-sm"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-2 flex items-center gap-3 pt-4 sm:pt-6">
              <div className="flex-1 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 flex items-center gap-2">
                <Calendar size={18} className="text-blue-600 shrink-0" />
                <span className="text-xs font-bold text-slate-600">
                  Período: <strong className="text-slate-900">{format(new Date(startDate + 'T00:00:00'), 'dd/MM/yyyy')}</strong> até <strong className="text-slate-900">{format(new Date(endDate + 'T00:00:00'), 'dd/MM/yyyy')}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RESULTS DISPLAY: Individual vs Geral */}
      {mode === 'individual' && currentIndividualSummary && (
        <div className="space-y-6">
          {/* Highlight KPIs for Individual Vehicle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total KM Driven */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-[2.5rem] shadow-xl shadow-blue-500/10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">
                  Quilometragem Percorrida
                </span>
                <h3 className="text-3xl sm:text-4xl font-black tracking-tight mt-2 flex items-baseline gap-2">
                  <span>{currentIndividualSummary.kmRodado.toLocaleString('pt-BR')}</span>
                  <span className="text-lg font-bold text-blue-200">km</span>
                </h3>
              </div>
              <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-blue-100">
                <span>No período apurado</span>
                <TrendingUp size={16} />
              </div>
            </div>

            {/* Initial Odometer in period */}
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Odômetro Inicial
                </span>
                <h4 className="text-2xl font-black text-slate-800 tracking-tight mt-2 flex items-baseline gap-1">
                  <span>{currentIndividualSummary.initialMileage.toLocaleString('pt-BR')}</span>
                  <span className="text-xs font-bold text-slate-400">km</span>
                </h4>
              </div>
              <p className="text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
                Primeiro registro no período
              </p>
            </div>

            {/* Final Odometer in period */}
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Odômetro Final
                </span>
                <h4 className="text-2xl font-black text-slate-800 tracking-tight mt-2 flex items-baseline gap-1">
                  <span>{currentIndividualSummary.finalMileage.toLocaleString('pt-BR')}</span>
                  <span className="text-xs font-bold text-slate-400">km</span>
                </h4>
              </div>
              <p className="text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
                Último registro no período
              </p>
            </div>

            {/* Movements / Trips count */}
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Saídas e Retornos
                </span>
                <h4 className="text-2xl font-black text-slate-800 tracking-tight mt-2 flex items-baseline gap-1">
                  <span>{currentIndividualSummary.tripsCount}</span>
                  <span className="text-xs font-bold text-slate-400">turnos</span>
                </h4>
              </div>
              <p className="text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
                {currentIndividualSummary.recordsCount} registros de cautela
              </p>
            </div>
          </div>

          {/* Movements Timeline Table for Individual Vehicle */}
          <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Activity size={20} className="text-blue-600" />
                  <span>Histórico de Deslocamentos da Viatura no Período</span>
                </h3>
                <p className="text-slate-500 text-xs font-medium">
                  Relação cronológica de todas as partidas, regressos e manutenções registradas.
                </p>
              </div>

              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                {currentIndividualSummary.records.length} movimentação(ões)
              </span>
            </div>

            {currentIndividualSummary.records.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-black tracking-wider">
                      <th className="py-3 px-3">Data / Hora</th>
                      <th className="py-3 px-3">Operação</th>
                      <th className="py-3 px-3">Condutor / Motorista</th>
                      <th className="py-3 px-3">Prefixo Operacional</th>
                      <th className="py-3 px-3 text-right">Odômetro</th>
                      <th className="py-3 px-3 text-right">Deslocamento</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {currentIndividualSummary.records.map((record, index) => {
                      const rDate = record.timestamp?.toDate ? record.timestamp.toDate() : new Date(record.timestamp || 0);
                      const isCheckOut = record.type === 'check-out';
                      const isCheckIn = record.type === 'check-in';
                      const currentKm = Number(record.mileage?.currentMileage || 0);

                      // Calculate trip distance if check-in has a prior record
                      let deltaKmText = '---';
                      if (index > 0) {
                        const prevKm = Number(currentIndividualSummary.records[index - 1].mileage?.currentMileage || 0);
                        if (currentKm > prevKm) {
                          deltaKmText = `+${(currentKm - prevKm).toLocaleString('pt-BR')} km`;
                        }
                      }

                      return (
                        <tr key={record.id || index} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-3 font-mono text-xs font-bold text-slate-700 whitespace-nowrap">
                            {format(rDate, 'dd/MM/yyyy HH:mm')}
                          </td>
                          <td className="py-3.5 px-3">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              isCheckOut
                                ? 'bg-emerald-100 text-emerald-800'
                                : isCheckIn
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {isCheckOut ? 'Partida' : isCheckIn ? 'Regresso' : 'Manutenção'}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 font-bold text-slate-800">
                            {record.drivers?.driverName || '---'}
                          </td>
                          <td className="py-3.5 px-3 text-xs font-bold text-slate-600">
                            {record.identification?.operationalPrefix || record.drivers?.serviceType || '---'}
                          </td>
                          <td className="py-3.5 px-3 text-right font-mono font-bold text-slate-800">
                            {currentKm ? `${currentKm.toLocaleString('pt-BR')} km` : '---'}
                          </td>
                          <td className="py-3.5 px-3 text-right font-mono font-black text-emerald-600">
                            {deltaKmText}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <AlertCircle size={36} className="text-slate-300 mx-auto mb-2" />
                <h4 className="text-base font-bold text-slate-800">Nenhum registro para esta viatura no período</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Altere as datas inicial e final para localizar saídas anteriores desta viatura.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RESULTS DISPLAY: Mode Geral (All Vehicles Table & KPIs) */}
      {mode === 'geral' && (
        <div className="space-y-6">
          {/* Aggregate Fleet KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Total Fleet KM */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-[2.5rem] shadow-xl shadow-blue-500/10 flex flex-col justify-between relative overflow-hidden col-span-2 md:col-span-1">
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">
                  Total Geral da Frota
                </span>
                <h3 className="text-3xl font-black tracking-tight mt-2 flex items-baseline gap-2">
                  <span>{fleetTotals.totalKm.toLocaleString('pt-BR')}</span>
                  <span className="text-base font-bold text-blue-200">km</span>
                </h3>
              </div>
              <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-blue-100">
                <span>Soma de todas as VTRs</span>
                <TrendingUp size={16} />
              </div>
            </div>

            {/* Active Vehicles with mileage */}
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Viaturas em Empenho
                </span>
                <h4 className="text-2xl font-black text-slate-800 tracking-tight mt-2 flex items-baseline gap-1">
                  <span>{fleetTotals.activeCount}</span>
                  <span className="text-xs font-bold text-slate-400">/ {vehicles.length} VTRs</span>
                </h4>
              </div>
              <p className="text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
                {fleetTotals.zeroCount} viatura(s) sem rodagem
              </p>
            </div>

            {/* Total Missions / Turnos */}
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Missões Realizadas
                </span>
                <h4 className="text-2xl font-black text-slate-800 tracking-tight mt-2 flex items-baseline gap-1">
                  <span>{fleetTotals.totalTrips}</span>
                  <span className="text-xs font-bold text-slate-400">turnos</span>
                </h4>
              </div>
              <p className="text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
                Partidas e devoluções no período
              </p>
            </div>

            {/* Average KM per active vehicle */}
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Média por VTR Ativa
                </span>
                <h4 className="text-2xl font-black text-slate-800 tracking-tight mt-2 flex items-baseline gap-1">
                  <span>{fleetTotals.avgKmPerActive.toLocaleString('pt-BR')}</span>
                  <span className="text-xs font-bold text-slate-400">km/vtr</span>
                </h4>
              </div>
              <p className="text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
                Média entre as VTRs que rodaram
              </p>
            </div>
          </div>

          {/* Highlights Row (Top Vehicle) */}
          {fleetTotals.topVehicle && (
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent p-5 rounded-3xl border border-amber-200/60 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-md shadow-amber-500/20">
                  <Award size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-amber-900 uppercase tracking-widest">
                    Viatura com Maior Rodagem no Período
                  </span>
                  <p className="text-sm font-black text-slate-900">
                    {fleetTotals.topVehicle.vehicle.prefix} • <span className="font-mono">{fleetTotals.topVehicle.vehicle.plate}</span> ({fleetTotals.topVehicle.vehicle.model})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Total Rodado:</span>
                  <span className="text-xl font-black text-amber-700 font-mono">
                    {fleetTotals.topVehicle.kmRodado.toLocaleString('pt-BR')} km
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedVehicleId(fleetTotals.topVehicle!.vehicle.id);
                    setMode('individual');
                  }}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
                >
                  Ver Detalhes
                </button>
              </div>
            </div>
          )}

          {/* General Fleet Table & Filters */}
          <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Truck size={20} className="text-blue-600" />
                  <span>Quilometragem por Viatura (Consolidado)</span>
                </h3>
                <p className="text-slate-500 text-xs font-medium">
                  Relação de odômetro inicial, odômetro final e total rodado de cada viatura.
                </p>
              </div>

              {/* Filters toolbar */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Buscar placa ou prefixo..."
                    value={searchGeneral}
                    onChange={(e) => setSearchGeneral(e.target.value)}
                    className="pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 w-44 sm:w-56"
                  />
                </div>

                {/* Filter Activity */}
                <select
                  value={filterActivity}
                  onChange={(e) => setFilterActivity(e.target.value as any)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
                >
                  <option value="all">Todas as VTRs ({fleetSummaries.length})</option>
                  <option value="moved">Apenas com Rodagem ({fleetTotals.activeCount})</option>
                  <option value="zero">Sem Movimento ({fleetTotals.zeroCount})</option>
                </select>

                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
                >
                  <option value="km_desc">Maior KM</option>
                  <option value="km_asc">Menor KM</option>
                  <option value="trips">Mais Saídas</option>
                  <option value="prefix">Prefixo</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-black tracking-wider">
                    <th className="py-3 px-3">Viatura</th>
                    <th className="py-3 px-3">Placa</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Odômetro Inicial</th>
                    <th className="py-3 px-3 text-right">Odômetro Final</th>
                    <th className="py-3 px-3 text-right">KM Rodado no Período</th>
                    <th className="py-3 px-3 text-center">Saídas</th>
                    <th className="py-3 px-3 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {displayedFleet.map((item) => {
                    const v = item.vehicle;
                    const maxKm = fleetTotals.topVehicle ? fleetTotals.topVehicle.kmRodado : 1;
                    const percentOfTop = maxKm > 0 ? Math.min(100, Math.round((item.kmRodado / maxKm) * 100)) : 0;

                    return (
                      <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2">
                            <span className="p-1 rounded bg-slate-100 text-slate-600">
                              {v.category === 'moto' ? <Bike size={14} /> : <Car size={14} />}
                            </span>
                            <span className="font-bold text-slate-800">{v.prefix}</span>
                            <span className="text-xs text-slate-400 hidden lg:inline truncate max-w-[120px]">
                              {v.model}
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3 font-mono font-bold text-blue-600 whitespace-nowrap">
                          {v.plate}
                        </td>

                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                            v.status === 'available'
                              ? 'bg-emerald-100 text-emerald-800'
                              : v.status === 'in_use'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {v.status === 'available' ? 'Livre' : v.status === 'in_use' ? 'Em Uso' : 'Baixada'}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 text-right font-mono text-xs text-slate-600 whitespace-nowrap">
                          {item.initialMileage ? `${item.initialMileage.toLocaleString('pt-BR')} km` : '---'}
                        </td>

                        <td className="py-3.5 px-3 text-right font-mono text-xs text-slate-600 whitespace-nowrap">
                          {item.finalMileage ? `${item.finalMileage.toLocaleString('pt-BR')} km` : '---'}
                        </td>

                        <td className="py-3.5 px-3 text-right whitespace-nowrap">
                          <div className="flex flex-col items-end gap-1">
                            <span className={`font-mono font-black text-sm ${item.kmRodado > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                              {item.kmRodado > 0 ? `+${item.kmRodado.toLocaleString('pt-BR')} km` : '0 km'}
                            </span>
                            {item.kmRodado > 0 && (
                              <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div 
                                  className="bg-emerald-500 h-full rounded-full" 
                                  style={{ width: `${percentOfTop}%` }} 
                                />
                              </div>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-3 text-center font-bold text-slate-700 whitespace-nowrap">
                          {item.tripsCount}
                        </td>

                        <td className="py-3.5 px-3 text-center whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedVehicleId(v.id);
                              setMode('individual');
                            }}
                            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-xs transition-all cursor-pointer inline-flex items-center gap-1 active:scale-95"
                            title="Ver detalhes de movimentação desta viatura"
                          >
                            <span>Detalhes</span>
                            <ArrowRight size={13} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {displayedFleet.length === 0 && (
              <div className="py-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <AlertCircle size={36} className="text-slate-300 mx-auto mb-2" />
                <h4 className="text-base font-bold text-slate-800">Nenhuma viatura corresponde aos filtros</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Ajuste a busca ou o período selecionado.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
