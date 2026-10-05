import React, { useState, useMemo } from 'react';
import { 
  Ribbon, 
  Heart, 
  HeartPulse, 
  Stethoscope, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Search, 
  X, 
  ExternalLink, 
  Phone, 
  Info, 
  AlertCircle, 
  Activity, 
  CheckCircle2, 
  UserCheck, 
  Hospital, 
  Award, 
  HelpCircle,
  Share2
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { ASSETS } from '../assets/logos';

// --- Iconic Pink Awareness Ribbon SVG Component ---
export const PinkRibbonSVG = ({ className = "w-6 h-6", glow = false }: { className?: string; glow?: boolean }) => (
  <svg 
    viewBox="0 0 100 120" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${glow ? 'drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 'drop-shadow-sm'}`}
  >
    <defs>
      <linearGradient id="pinkRibbonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="50%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#db2777" />
      </linearGradient>
      <linearGradient id="pinkRibbonGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fb7185" />
        <stop offset="60%" stopColor="#f43f5e" />
        <stop offset="100%" stopColor="#be185d" />
      </linearGradient>
      <linearGradient id="pinkRibbonLoop" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fda4af" />
        <stop offset="40%" stopColor="#f43f5e" />
        <stop offset="100%" stopColor="#e11d48" />
      </linearGradient>
    </defs>
    {/* Left Ribbon Leg */}
    <path 
      d="M32 60 L14 112 C13 115 16 117 19 116 L40 100 L50 78 Z" 
      fill="url(#pinkRibbonGrad1)" 
      opacity="0.95"
    />
    {/* Right Ribbon Leg (Overlaps left) */}
    <path 
      d="M68 60 L86 112 C87 115 84 117 81 116 L60 100 L50 78 Z" 
      fill="url(#pinkRibbonGrad2)" 
    />
    {/* Top Awareness Loop with smooth bezier curves */}
    <path 
      d="M50 8 C33 8 20 22 22 45 C23 60 35 72 50 88 C65 72 77 60 78 45 C80 22 67 8 50 8 Z" 
      fill="url(#pinkRibbonLoop)" 
    />
    {/* Inner Cutout Hole for Ribbon */}
    <path 
      d="M50 24 C41 24 35 32 36 43 C37 51 44 60 50 70 C56 60 63 51 64 43 C65 32 59 24 50 24 Z" 
      fill="#0f172a" 
      className="fill-slate-900"
    />
    {/* Highlight shine */}
    <path 
      d="M48 12 C37 13 28 24 30 38 C30.5 42 33 46 36 50" 
      stroke="#ffffff" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      opacity="0.5"
    />
  </svg>
);

// --- Outubro Rosa Emblem / Badge ---
export const OutubroRosaEmblem = ({ size = 26, className = "" }: { size?: number; className?: string }) => (
  <div 
    style={{ width: size, height: size }} 
    className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-rose-500 to-pink-700 text-white shadow-md shadow-pink-500/25 shrink-0 ${className}`}
  >
    <Ribbon size={Math.round(size * 0.65)} className="text-white drop-shadow-sm" />
  </div>
);

// --- Top Alert Bar ---
export const OutubroRosaTopBar = ({ onOpenModal }: { onOpenModal: (tab?: string) => void }) => {
  return (
    <div className="bg-gradient-to-r from-slate-950 via-rose-950 to-slate-950 text-white shadow-lg border-b border-rose-500/30 px-3 py-2 flex items-center justify-between sticky top-0 z-[160] transition-all">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="bg-rose-950/90 p-1 rounded-xl border border-rose-400/50 shadow-inner flex items-center justify-center shrink-0">
            <OutubroRosaEmblem size={20} />
          </div>
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span className="font-black text-white uppercase tracking-wider text-[10px] sm:text-xs bg-gradient-to-r from-pink-600 to-rose-600 px-2.5 py-0.5 rounded-full border border-pink-400/40 shadow-sm shrink-0 flex items-center gap-1">
              <Ribbon size={11} className="text-pink-100" />
              OUTUBRO ROSA
            </span>
            <span className="font-bold text-pink-100 text-xs sm:text-sm truncate">
              Prevenção e Diagnóstico Precoce do Câncer de Mama e de Colo do Útero • PMPE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onOpenModal('autoexame')}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 rounded-lg font-bold text-xs transition-all border border-pink-500/40 cursor-pointer"
            title="Aprenda o passo a passo do autoexame e sinais de alerta"
          >
            <HeartPulse size={12} className="text-pink-300" />
            <span>Autoexame & Sinais</span>
          </button>
          <button
            onClick={() => onOpenModal('mamografia')}
            className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-lg font-black text-xs transition-all shadow-md shadow-pink-500/20 active:scale-95 border border-pink-400/50 cursor-pointer"
            title="Orientações sobre Mamografia e Exame Preventivo Papanicolau"
          >
            <Stethoscope size={13} className="text-white" />
            <span className="hidden sm:inline">Mamografia & Preventivo</span>
            <span className="sm:hidden">Exames</span>
          </button>
          <button
            onClick={() => onOpenModal('geral')}
            className="flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-pink-100 rounded-lg font-bold text-xs transition-all border border-pink-400/30 cursor-pointer"
          >
            <Sparkles size={13} className="text-pink-300" />
            <span className="hidden md:inline">Guia Completo</span>
            <span className="md:hidden">Guia</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Featured Dashboard Banner ---
export const OutubroRosaBanner = ({ onOpenModal }: { onOpenModal: (tab?: string) => void }) => {
  return (
    <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-950 via-rose-950/95 to-pink-950 text-white rounded-[2.5rem] border border-rose-500/40 shadow-2xl overflow-hidden relative mb-8 group">
      {/* Decorative background watermark */}
      <div className="absolute -right-8 -bottom-12 opacity-10 pointer-events-none group-hover:scale-105 group-hover:rotate-3 transition-transform duration-700">
        <PinkRibbonSVG className="w-96 h-96" />
      </div>
      <div className="absolute top-0 right-0 p-24 bg-pink-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 p-20 bg-rose-600/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-rose-600 to-pink-700 rounded-2xl flex items-center justify-center border border-pink-300/40 shadow-xl shadow-pink-600/20 shrink-0 p-2.5 group-hover:scale-105 transition-transform">
            <PinkRibbonSVG className="w-full h-full" glow={true} />
          </div>
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black bg-gradient-to-r from-pink-500 to-rose-600 text-white border border-pink-300/40 px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Ribbon size={11} className="text-white" />
                CAMPANHA OUTUBRO ROSA
              </span>
              <span className="text-[10px] font-bold text-pink-200/90 uppercase tracking-widest flex items-center gap-1">
                <span>DIRETORIA DE ASSISTÊNCIA SOCIAL E SAÚDE (DAS / CMH • PMPE)</span>
              </span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              <span>Cuidar de Si É um Ato de Coragem e Amor</span>
            </h3>
            
            <p className="text-pink-100/90 text-xs sm:text-sm font-medium leading-relaxed">
              O <strong>Outubro Rosa</strong> é um movimento global dedicado à conscientização, prevenção e diagnóstico precoce do <strong>câncer de mama</strong> e do <strong>câncer do colo do útero</strong>. Quando descoberto no início, as chances de cura chegam a <strong>95%</strong>.
            </p>

            {/* Quick badges */}
            <div className="pt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold text-pink-200/90">
              <span className="flex items-center gap-1 text-pink-300">
                <Ribbon size={12} className="text-pink-400" /> Laço Rosa da Conscientização
              </span>
              <span aria-hidden="true" className="text-pink-400/60">·</span>
              <span className="flex items-center gap-1 text-rose-200">
                <Stethoscope size={12} className="text-rose-300" /> Mamografia Anual
              </span>
              <span aria-hidden="true" className="text-pink-400/60">·</span>
              <span className="flex items-center gap-1 text-amber-200">
                <HeartPulse size={12} className="text-amber-300" /> Preventivo Papanicolau
              </span>
              <span aria-hidden="true" className="text-pink-400/60">·</span>
              <span className="flex items-center gap-1 text-emerald-200">
                <Hospital size={12} className="text-emerald-300" /> Atendimento SISMEPE / CMH
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 w-full lg:w-auto shrink-0 relative z-10">
          <button 
            onClick={() => onOpenModal('geral')}
            className="px-5 py-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-700 text-white font-black rounded-xl shadow-lg shadow-pink-500/25 transition-all text-center flex items-center justify-center gap-2 active:scale-95 text-sm border border-pink-300/40 cursor-pointer"
            title="Abrir o Guia Completo do Outubro Rosa"
          >
            <Sparkles size={16} className="text-white" />
            <span>Guia Outubro Rosa</span>
          </button>
          
          <button 
            onClick={() => onOpenModal('autoexame')}
            className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-pink-100 font-bold rounded-xl border border-pink-400/30 transition-all text-center flex items-center justify-center gap-2 active:scale-95 text-sm cursor-pointer"
          >
            <HeartPulse size={16} className="text-pink-300" />
            <span>Autoexame & Sinais</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Full Educational & Informational Modal ---
export const OutubroRosaModal = ({ 
  isOpen, 
  onClose, 
  initialTab = 'geral' 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  initialTab?: string; 
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Sync initial tab when opening
  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // WhatsApp Message Sharer
  const handleCopyMessage = () => {
    const text = `🌸 *CAMPANHA OUTUBRO ROSA - POLÍCIA MILITAR DE PERNAMBUCO* 🌸\n` +
      `🎀 *Um toque de cuidado, uma vida inteira de proteção.*\n\n` +
      `O mês de outubro é dedicado à prevenção e ao diagnóstico precoce do *Câncer de Mama* e do *Câncer do Colo do Útero*.\n\n` +
      `📌 *PRINCIPAIS ORIENTAÇÕES:*\n` +
      `1️⃣ *Mamografia:* Exame fundamental para mulheres a partir dos 40/50 anos (ou antes, se houver histórico familiar). Detecta nódulos antes mesmo de serem palpáveis!\n` +
      `2️⃣ *Autoexame das Mamas:* Conheça seu corpo e observe alterações como nódulos, secreção pelo mamilo, retrações ou alterações na pele.\n` +
      `3️⃣ *Exame Preventivo (Papanicolau):* Indicado para mulheres de 25 a 64 anos para rastreio precoce do câncer do colo uterino.\n` +
      `4️⃣ *Diagnóstico Precoce:* Aumenta as chances de cura para até *95%*!\n\n` +
      `🏥 *ATENDIMENTO À POLICIAL FEMININA E DEPENDENTES:*\n` +
      `• SISMEPE / Centro Médico Hospitalar da PMPE (CMH Derby)\n` +
      `• Diretoria de Assistência Social da PMPE (DAS)\n` +
      `• Rede de Saúde Pública (SUS) e Disque Saúde 136\n\n` +
      `💖 *Compartilhe esta mensagem com suas colegas de farda, familiares e amigas! A prevenção salva vidas.*`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // PDF Exporter
  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Header Banner (Rose / Slate)
      doc.setFillColor(159, 18, 57); // Deep Rose 900
      doc.rect(0, 0, pageWidth, 42, 'F');

      // Accent Ribbon Stripe
      doc.setFillColor(244, 63, 94); // Pink 500
      doc.rect(0, 42, pageWidth, 2.5, 'F');

      // Logos
      try {
        if (ASSETS.LOGO_PMPE) {
          doc.addImage(ASSETS.LOGO_PMPE, 'PNG', 12, 6, 28, 28);
        }
        if (ASSETS.LOGO_14BPM) {
          doc.addImage(ASSETS.LOGO_14BPM, 'PNG', pageWidth - 40, 6, 28, 28);
        }
      } catch (err) {
        console.warn("Logos no PDF:", err);
      }

      // Title & Subtitle
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.text('POLÍCIA MILITAR DE PERNAMBUCO', pageWidth / 2, 14, { align: 'center' });

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('DIRETORIA DE ASSISTÊNCIA SOCIAL E SAÚDE • SISMEPE / CMH', pageWidth / 2, 21, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(253, 224, 71); // Gold yellow
      doc.text('CARTILHA DA CAMPANHA OUTUBRO ROSA', pageWidth / 2, 30, { align: 'center' });

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      doc.text('Prevenção e Diagnóstico Precoce do Câncer de Mama e de Colo do Útero', pageWidth / 2, 37, { align: 'center' });

      let y = 54;

      const addSection = (title: string, items: string[]) => {
        if (y > pageHeight - 35) {
          doc.addPage();
          y = 20;
        }

        doc.setFillColor(255, 241, 242); // Rose 50
        doc.roundedRect(12, y, pageWidth - 24, 8, 2, 2, 'F');
        doc.setDrawColor(251, 113, 133); // Rose 400
        doc.roundedRect(12, y, pageWidth - 24, 8, 2, 2, 'S');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(159, 18, 57);
        doc.text(title, 16, y + 5.5);
        y += 12;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(30, 41, 59);

        items.forEach(item => {
          const lines = doc.splitTextToSize(`• ${item}`, pageWidth - 32);
          if (y + lines.length * 5 > pageHeight - 20) {
            doc.addPage();
            y = 20;
          }
          doc.text(lines, 16, y);
          y += lines.length * 4.8 + 2;
        });
        y += 4;
      };

      addSection('1. O QUE É O OUTUBRO ROSA E QUAL SUA IMPORTÂNCIA?', [
        'Campanha internacional de conscientização realizada anualmente em outubro.',
        'Objetivo central: alertar a sociedade sobre a prevenção e a detecção precoce do câncer de mama e do colo do útero.',
        'O diagnóstico em fases iniciais eleva para mais de 95% as chances de cura completa e permite tratamentos menos agressivos.',
        'A PMPE incentiva todas as policiais militares, servidoras civis e dependentes a manterem seus exames de rotina rigorosamente atualizados.'
      ]);

      addSection('2. CÂNCER DE MAMA: PREVENÇÃO, SINAIS E MAMOGRAFIA', [
        'Mamografia: Principal método de rastreamento. Recomendada a realização regular a partir dos 40 anos (Sociedade Brasileira de Mastologia) ou 50 anos (Diretrizes SUS), ou antes sob orientação médica em casos com histórico familiar.',
        'Sinais de Alerta: Nódulo fixo e geralmente indolor na mama ou axila; pele da mama avermelhada ou com aspecto de casca de laranja; retrações na mama ou no mamilo; saída espontânea de líquido anormal pelo mamilo.',
        'Autoexame das Mamas: Importante para que a mulher conheça a anatomia natural de seu corpo e procure imediatamente auxílio médico caso note qualquer alteração.'
      ]);

      addSection('3. CÂNCER DE COLO DO ÚTERO: VACINAÇÃO HPV E PAPANICOLAU', [
        'Causado principalmente pela infecção persistente por tipos oncogênicos do Papilomavírus Humano (HPV).',
        'Vacina contra o HPV: Prevenção primária segura e altamente eficaz, disponível no SUS para meninas e meninos.',
        'Exame Preventivo (Papanicolau): Indicado para todas as mulheres com vida sexual ativa na faixa dos 25 aos 64 anos. Capaz de identificar lesões pré-cancerosas antes que se transformem em câncer.'
      ]);

      addSection('4. REDE DE APOIO SISMEPE / CMH PMPE E DIREITOS DA PACIENTE', [
        'Centro Médico Hospitalar da PMPE (CMH Derby, Recife): Consultas ginecológicas, mastologia e encaminhamento para exames diagnósticos.',
        'SISMEPE (Sistema de Saúde dos Militares do Estado de PE): Atendimento ambulatorial e rede conveniada para realização de mamografias e ultrassonografias.',
        'Lei dos 60 Dias (Lei nº 12.732/2012): Garante ao paciente com câncer o direito de iniciar o tratamento no SUS em até 60 dias após o diagnóstico.',
        'Lei dos 30 Dias (Lei nº 13.896/2019): Estabelece prazo de até 30 dias para a realização de exames diagnósticos no SUS em caso de suspeita de câncer.',
        'Reconstrução Mamária: Direito assegurado por lei pelo SUS e pelos planos de saúde após a realização de mastectomia.'
      ]);

      // Footer
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text('Polícia Militar de Pernambuco • Campanha Outubro Rosa • Cuidar de si é um ato de coragem', 12, pageHeight - 8);
        doc.text(`Página ${i} de ${totalPages}`, pageWidth - 12, pageHeight - 8, { align: 'right' });
      }

      doc.save(`Cartilha_Outubro_Rosa_PMPE.pdf`);
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-950/60 rounded-[2.5rem] shadow-2xl w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-950 via-rose-950 to-slate-950 text-white p-6 border-b border-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center border border-pink-300/40 shadow-lg shadow-pink-600/30 shrink-0 p-2">
              <PinkRibbonSVG className="w-full h-full" glow={true} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider bg-pink-500/25 text-pink-300 border border-pink-500/40 px-2 py-0.5 rounded-full">
                  CAMPANHA OFICIAL
                </span>
                <span className="text-xs font-bold text-pink-200/80 uppercase tracking-widest">
                  PMPE • DAS & SISMEPE
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Outubro Rosa: Prevenção e Diagnóstico Precoce
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto relative z-10">
            <button
              onClick={handleCopyMessage}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-pink-200 rounded-xl font-bold text-xs transition-all border border-pink-400/30 cursor-pointer"
              title="Copiar mensagem para envio no WhatsApp"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
              <span>{copied ? 'Copiado!' : 'Compartilhar'}</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-xl font-bold text-xs transition-all shadow-md shadow-pink-500/20 active:scale-95 cursor-pointer"
              title="Baixar Cartilha em PDF"
            >
              <Download size={14} />
              <span>Baixar PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer ml-1"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-2 bg-rose-50/70 dark:bg-slate-950/70 border-b border-rose-100 dark:border-rose-950/40 overflow-x-auto custom-scrollbar shrink-0">
          {[
            { id: 'geral', label: 'Visão Geral & Campanha', icon: Ribbon },
            { id: 'mama', label: 'Câncer de Mama', icon: Heart },
            { id: 'autoexame', label: 'Autoexame & Sinais', icon: HeartPulse },
            { id: 'colo', label: 'Câncer de Colo do Útero', icon: Activity },
            { id: 'mamografia', label: 'Mamografia & Preventivo', icon: Stethoscope },
            { id: 'sismepe', label: 'Saúde PMPE & SISMEPE', icon: Hospital },
            { id: 'direitos', label: 'Direitos da Paciente', icon: Award },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md shadow-pink-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-rose-100/50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar space-y-6">
          
          {/* TAB 1: VISÃO GERAL */}
          {activeTab === 'geral' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-rose-950/30 dark:via-slate-900 dark:to-slate-900 p-6 rounded-3xl border border-rose-200 dark:border-rose-900/40">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                    <Ribbon size={30} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      O Movimento Outubro Rosa
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 leading-relaxed">
                      Nascido na década de 1990 nos Estados Unidos com a Corrida pela Cura da Fundação Susan G. Komen, o <strong>Outubro Rosa</strong> tornou-se a maior mobilização global em favor da saúde feminina. No Brasil e na Polícia Militar de Pernambuco, a campanha tem como foco central a <strong>conscientização, a desmistificação e o incentivo ao diagnóstico em estágios iniciais</strong>, garantindo mais qualidade de vida e cura para milhares de mulheres.
                    </p>
                  </div>
                </div>
              </div>

              {/* Statistics & Insights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-3xl font-black text-rose-600 dark:text-rose-400">95%</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-1">Chances de Cura</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                      Quando o câncer de mama é diagnosticado em sua fase inicial, as taxas de sucesso no tratamento ultrapassam os 90-95%.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-3xl font-black text-pink-600 dark:text-pink-400">1º Lugar</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-1">Incidência Feminina</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                      É o tipo de câncer mais frequente entre mulheres no Brasil (após o de pele não melanoma), com mais de 73 mil novos casos anuais previstos pelo INCA.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">Prevenção</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-1">Hábitos Saudáveis</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                      Cerca de 30% dos casos podem ser evitados com alimentação equilibrada, atividade física regular e controle do peso.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pillars of Action */}
              <div className="space-y-3">
                <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck size={18} className="text-rose-600" />
                  <span>Os Três Pilares da Campanha</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30">
                    <span className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center font-black text-sm mb-3">1</span>
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm">Autoconhecimento</h5>
                    <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">
                      Conhecer o próprio corpo para notar precocemente qualquer alteração visual ou tátil nas mamas.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30">
                    <span className="w-8 h-8 rounded-xl bg-pink-500 text-white flex items-center justify-center font-black text-sm mb-3">2</span>
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm">Exames de Rastreio</h5>
                    <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">
                      Realizar a mamografia de rotina e o exame preventivo de colo de útero (Papanicolau) periodicamente.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30">
                    <span className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black text-sm mb-3">3</span>
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm">Acesso Rápido</h5>
                    <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">
                      Buscar avaliação especializada no SISMEPE, CMH ou na rede de atenção básica logo ao primeiro sinal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CÂNCER DE MAMA */}
          {activeTab === 'mama' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Heart size={20} className="text-rose-600" />
                  <span>Entendendo o Câncer de Mama</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  O câncer de mama é resultante da multiplicação desordenada de células anormais da mama, que formam um tumor com potencial de invadir outros órgãos. Não existe uma causa única, mas sim um conjunto de fatores genéticos, ambientais, reprodutivos e de estilo de vida.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      <AlertCircle size={16} className="text-amber-500" />
                      <span>Fatores de Risco</span>
                    </h4>
                    <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <li>• Idade acima de 50 anos (fator de risco mais importante).</li>
                      <li>• Histórico familiar de câncer de mama ou ovário em parentes de 1º grau.</li>
                      <li>• Mutações genéticas hereditárias (como BRCA1 e BRCA2).</li>
                      <li>• Obesidade e sobrepeso, especialmente após a menopausa.</li>
                      <li>• Sedentarismo e consumo de bebidas alcoólicas.</li>
                      <li>• Primeira menstruação antes dos 12 anos e menopausa tardia (após 55 anos).</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
                    <h4 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm flex items-center gap-2">
                      <ShieldCheck size={16} className="text-emerald-600" />
                      <span>Fatores de Proteção e Prevenção</span>
                    </h4>
                    <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <li>• Prática regular de exercícios físicos (ao menos 150 min/semana).</li>
                      <li>• Alimentação rica em vegetais, frutas, fibras e pobre em ultraprocessados.</li>
                      <li>• Manutenção do peso corporal adequado.</li>
                      <li>• Amamentação (o ato de amamentar protege a mãe).</li>
                      <li>• Evitar o tabagismo e o consumo excessivo de álcool.</li>
                      <li>• Evitar uso prolongado de terapia de reposição hormonal sem acompanhamento rigoroso.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AUTOEXAME & SINAIS */}
          {activeTab === 'autoexame' && (
            <div className="space-y-6">
              <div className="bg-rose-50 dark:bg-rose-950/30 p-6 rounded-3xl border border-rose-200 dark:border-rose-900/50">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-rose-600 text-white">
                    <HeartPulse size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-rose-950 dark:text-rose-100">
                      Autoexame das Mamas: Como e Quando Fazer
                    </h3>
                    <p className="text-rose-800 dark:text-rose-300 text-xs mt-0.5">
                      O autoexame não substitui a mamografia, mas é fundamental para o autoconhecimento do seu corpo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step by step guide */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
                  <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-300 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Em Frente ao Espelho</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    Observe as mamas em três posições: com os braços abaixados ao lado do corpo, depois com as mãos nos quadris pressionando suavemente, e por fim com os braços erguidos atrás da cabeça. Veja se há retrações, assimetrias bruscas ou alterações na pele.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
                  <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-300 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Em Pé (Durante o Banho)</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    Com a pele ensaboada, coloque um braço atrás da cabeça e, com a ponta dos dedos da outra mão espalmados, faça movimentos circulares e de vai-e-vem da borda externa até o mamilo em toda a extensão da mama e na região das axilas.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
                  <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-300 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Deitada na Cama</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    Deite-se com um pequeno travesseiro sob o ombro do lado a ser examinado. Apalpe a mama suave e firmemente com a mão oposta. Pressione delicadamente o mamilo para verificar se há alguma saída de líquido anormal ou transparente/sanguinolento.
                  </p>
                </div>
              </div>

              {/* Sinais de Alerta */}
              <div className="p-6 rounded-3xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-3">
                <h4 className="font-black text-amber-900 dark:text-amber-200 text-sm flex items-center gap-2">
                  <AlertCircle size={18} className="text-amber-600" />
                  <span>Sinais de Alerta que Exigem Avaliação Médica Imediata:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-amber-600 shrink-0 mt-0.5" />
                    <span>Nódulo (caroço) fixo, duro e indolor na mama ou na região da axila.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-amber-600 shrink-0 mt-0.5" />
                    <span>Alterações na pele da mama (avermelhada, enrugada ou com textura de casca de laranja).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-amber-600 shrink-0 mt-0.5" />
                    <span>Retração, desvio ou inversão recente do mamilo.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-amber-600 shrink-0 mt-0.5" />
                    <span>Secreção sanguinolenta ou transparente saindo espontaneamente de um dos mamilos.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CÂNCER DE COLO DO ÚTERO */}
          {activeTab === 'colo' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Activity size={20} className="text-rose-600" />
                  <span>Câncer de Colo do Útero: Prevenção e Cura</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  O câncer do colo do útero (cervical) é uma das doenças malignas mais fáceis de serem prevenidas e curadas quando diagnosticada em sua fase pré-cancerosa. É provocado pela infecção persistente por alguns tipos oncogênicos do <strong>Papilomavírus Humano (HPV)</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Vacina Contra o HPV</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-xs mt-2 leading-relaxed">
                      A vacina quadrivalente protege contra os tipos 16 e 18 (responsáveis por cerca de 70% dos casos de câncer de colo de útero) e os tipos 6 e 11 (verrugas genitais). É disponibilizada gratuitamente pelo SUS para jovens de 9 a 14 anos e pessoas imunossuprimidas até os 45 anos.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Exame Preventivo (Papanicolau)</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-xs mt-2 leading-relaxed">
                      Coleta indolor de células da superfície do colo do útero. Capaz de identificar lesões iniciais anos antes de se tornarem malignas. É indicado para mulheres com vida sexual ativa dos 25 aos 64 anos.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                  <p className="font-bold text-slate-900 dark:text-white mb-1">Periodicidade do Preventivo:</p>
                  <p>
                    Recomenda-se realizar o exame anualmente. Após dois exames anuais consecutivos com resultados normais, o preventivo pode passar a ser feito a cada <strong>3 anos</strong>, conforme protocolo do Ministério da Saúde.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MAMOGRAFIA & EXAMES */}
          {activeTab === 'mamografia' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Stethoscope size={20} className="text-rose-600" />
                  <span>Mamografia: O Exame de Rastreio Mais Eficaz</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  A <strong>mamografia</strong> é uma radiografia das mamas feita por um aparelho chamado mamógrafo. É o único exame comprovadamente capaz de reduzir a mortalidade por câncer de mama porque detecta lesões mínimas, como microcalcificações e pequenos nódulos, muito antes de serem palpáveis no autoexame.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-xs uppercase tracking-wider text-rose-600">A partir dos 40 anos</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-1">Recomendação Médica</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                      A Sociedade Brasileira de Mastologia (SBM) e a FEBRASGO recomendam mamografia anual para todas as mulheres a partir dos 40 anos.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-xs uppercase tracking-wider text-blue-600">50 a 69 anos</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-1">Diretriz do SUS / INCA</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                      Recomenda realização de mamografia a cada 2 anos nessa faixa etária na rede de saúde pública.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-xs uppercase tracking-wider text-amber-600">Alto Risco Familiar</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-1">Rastreamento Individualizado</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                      Mulheres com parentes de 1º grau que tiveram a doença antes dos 50 anos devem iniciar o acompanhamento 10 anos antes da idade do diagnóstico do familiar.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <p className="font-bold text-rose-900 dark:text-rose-200">Dicas para o Dia do Exame:</p>
                  <p>• Evite usar desodorante, talco ou cremes nas axilas e mamas no dia da mamografia (podem interferir na imagem radiográfica).</p>
                  <p>• Prefira usar duas peças de roupa (blusa e saia/calça) para maior conforto durante a realização.</p>
                  <p>• Leve sempre os exames de mamografia e ultrassonografia anteriores para que o radiologista faça a comparação evolutiva.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SAÚDE PMPE & SISMEPE */}
          {activeTab === 'sismepe' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Hospital size={20} className="text-rose-600" />
                  <span>Rede de Cuidados: SISMEPE & CMH da PMPE</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  A Polícia Militar de Pernambuco, por meio da <strong>Diretoria de Assistência Social (DAS)</strong> e do <strong>Centro Médico Hospitalar (CMH)</strong>, disponibiliza suporte integral e atendimento ginecológico e mastológico para as policiais femininas, servidoras e dependentes de militares de todo o Estado.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider">Centro Médico Hospitalar</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">CMH PMPE (Derby, Recife)</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      Consultórios ambulatoriais de Ginecologia e Mastologia, exames clínicos e encaminhamento para exames de imagem e biópsia.
                    </p>
                    <p className="text-xs font-mono text-slate-700 dark:text-slate-300 font-bold">
                      📍 Praça do Derby, s/n - Recife/PE
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-[10px] font-black uppercase text-pink-600 tracking-wider">Sistema de Saúde Militar</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">SISMEPE - Central de Marcação</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      Agendamento de consultas médicas e autorização de exames de imagem (mamografia digital, ultrassom de mamas e preventivo) na rede própria e credenciada.
                    </p>
                    <p className="text-xs font-mono text-slate-700 dark:text-slate-300 font-bold">
                      📞 Central SISMEPE: (81) 3181-1700
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-xs text-emerald-900 dark:text-emerald-300">
                  <p className="font-bold mb-1">Policiais no Interior (Agreste e Sertão):</p>
                  <p>
                    As policiais e dependentes lotadas no interior de Pernambuco podem realizar seus exames através da rede credenciada do SISMEPE em Caruaru, Garanhuns, Arcoverde, Serra Talhada e Petrolina, ou através das unidades da rede pública (SUS) dos municípios.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: DIREITOS DA PACIENTE */}
          {activeTab === 'direitos' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Award size={20} className="text-rose-600" />
                  <span>Direitos Assegurados por Lei à Mulher com Câncer</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  A legislação brasileira prevê importantes garantias legais e financeiras para resguardar o tratamento digno, rápido e eficaz da paciente com diagnóstico oncológico.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Lei dos 60 Dias (Lei 12.732/12)</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                      Garante que o paciente tem direito de iniciar o primeiro tratamento (cirurgia, quimioterapia ou radioterapia) no SUS em no máximo 60 dias após a assinatura do laudo patológico.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Lei dos 30 Dias (Lei 13.896/19)</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                      Determina que em casos em que a principal hipótese diagnóstica seja de câncer, os exames necessários devem ser realizados em até 30 dias na rede pública.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Reconstrução Mamária</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                      A Lei nº 9.797/1999 e a Lei nº 12.802/2013 obrigam o SUS e os planos de saúde a realizarem a cirurgia de reconstrução mamária imediatamente após a retirada da mama, quando houver condições clínicas.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Saque de FGTS, PIS/PASEP e Isenção de IRPF</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                      Trabalhadoras ou dependentes com diagnóstico de câncer têm direito ao levantamento do FGTS e PIS/PASEP, além de isenção de imposto de renda sobre proventos de aposentadoria e pensão (Lei nº 7.713/1988).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 dark:bg-slate-950 p-4 px-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <PinkRibbonSVG className="w-4 h-4" />
            <span className="font-bold text-slate-700 dark:text-slate-300">
              Campanha Outubro Rosa • Polícia Militar de Pernambuco
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-medium text-[11px]">
              Dúvidas de saúde? Ligue <strong>136</strong> (Disque Saúde)
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold rounded-xl transition-all cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
