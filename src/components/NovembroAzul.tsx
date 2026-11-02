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
  Share2,
  Clock,
  ShieldAlert,
  Flame,
  ArrowRight
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { ASSETS } from '../assets/logos';

// --- Iconic Blue Awareness Ribbon SVG Component ---
export const BlueRibbonSVG = ({ className = "w-6 h-6", glow = false }: { className?: string; glow?: boolean }) => (
  <svg 
    viewBox="0 0 100 120" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${glow ? 'drop-shadow-[0_0_10px_rgba(59,130,246,0.65)]' : 'drop-shadow-sm'}`}
  >
    <defs>
      <linearGradient id="blueRibbonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="50%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
      <linearGradient id="blueRibbonGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="60%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <linearGradient id="blueRibbonLoop" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#93c5fd" />
        <stop offset="40%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1e40af" />
      </linearGradient>
    </defs>
    {/* Left Ribbon Leg */}
    <path 
      d="M32 60 L14 112 C13 115 16 117 19 116 L40 100 L50 78 Z" 
      fill="url(#blueRibbonGrad1)" 
      opacity="0.95"
    />
    {/* Right Ribbon Leg (Overlaps left) */}
    <path 
      d="M68 60 L86 112 C87 115 84 117 81 116 L60 100 L50 78 Z" 
      fill="url(#blueRibbonGrad2)" 
    />
    {/* Top Awareness Loop with smooth bezier curves */}
    <path 
      d="M50 8 C33 8 20 22 22 45 C23 60 35 72 50 88 C65 72 77 60 78 45 C80 22 67 8 50 8 Z" 
      fill="url(#blueRibbonLoop)" 
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
      opacity="0.6"
    />
  </svg>
);

// --- Novembro Azul Emblem / Badge ---
export const NovembroAzulEmblem = ({ size = 26, className = "" }: { size?: number; className?: string }) => (
  <div 
    style={{ width: size, height: size }} 
    className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-800 text-white shadow-md shadow-blue-500/25 shrink-0 ${className}`}
  >
    <Ribbon size={Math.round(size * 0.65)} className="text-white drop-shadow-sm" />
  </div>
);

// --- Top Alert Bar ---
export const NovembroAzulTopBar = ({ onOpenModal }: { onOpenModal: (tab?: string) => void }) => {
  return (
    <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-white shadow-lg border-b border-blue-500/30 px-3 py-2 flex items-center justify-between sticky top-0 z-[160] transition-all">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="bg-blue-950/90 p-1 rounded-xl border border-blue-400/50 shadow-inner flex items-center justify-center shrink-0">
            <NovembroAzulEmblem size={20} />
          </div>
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span className="font-black text-white uppercase tracking-wider text-[10px] sm:text-xs bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 px-2.5 py-0.5 rounded-full border border-blue-400/40 shadow-sm shrink-0 flex items-center gap-1">
              <Ribbon size={11} className="text-blue-100" />
              NOVEMBRO AZUL
            </span>
            <span className="font-bold text-blue-100 text-xs sm:text-sm truncate">
              Saúde do Homem & Prevenção do Câncer de Próstata • PMPE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onOpenModal('exames')}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-lg font-bold text-xs transition-all border border-blue-500/40 cursor-pointer"
            title="Conheça os exames de PSA e Toque Retal para diagnóstico precoce"
          >
            <Stethoscope size={12} className="text-sky-300" />
            <span>Exames PSA & Toque</span>
          </button>
          <button
            onClick={() => onOpenModal('sinais')}
            className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg font-black text-xs transition-all shadow-md shadow-blue-500/20 active:scale-95 border border-blue-400/50 cursor-pointer"
            title="Sinais de alerta e sintomas do câncer de próstata"
          >
            <HeartPulse size={13} className="text-white" />
            <span className="hidden sm:inline">Sinais & Sintomas</span>
            <span className="sm:hidden">Sintomas</span>
          </button>
          <button
            onClick={() => onOpenModal('geral')}
            className="flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-blue-100 rounded-lg font-bold text-xs transition-all border border-blue-400/30 cursor-pointer"
          >
            <Sparkles size={13} className="text-blue-300" />
            <span className="hidden md:inline">Guia Completo</span>
            <span className="md:hidden">Guia</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Featured Dashboard Banner ---
export const NovembroAzulBanner = ({ onOpenModal }: { onOpenModal: (tab?: string) => void }) => {
  return (
    <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-950 via-blue-950/95 to-indigo-950 text-white rounded-[2.5rem] border border-blue-500/40 shadow-2xl overflow-hidden relative mb-8 group">
      {/* Decorative background watermark */}
      <div className="absolute -right-8 -bottom-12 opacity-10 pointer-events-none group-hover:scale-105 group-hover:rotate-3 transition-transform duration-700">
        <BlueRibbonSVG className="w-96 h-96" />
      </div>
      <div className="absolute top-0 right-0 p-24 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 p-20 bg-sky-600/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center border border-blue-300/40 shadow-xl shadow-blue-600/20 shrink-0 p-2.5 group-hover:scale-105 transition-transform">
            <BlueRibbonSVG className="w-full h-full" glow={true} />
          </div>
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black bg-gradient-to-r from-blue-500 to-indigo-600 text-white border border-blue-300/40 px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Ribbon size={11} className="text-white" />
                CAMPANHA NOVEMBRO AZUL
              </span>
              <span className="text-[10px] font-bold text-blue-200/90 uppercase tracking-widest flex items-center gap-1">
                <span>DIRETORIA DE SAÚDE & ASSISTÊNCIA SOCIAL (DS / CMH • PMPE)</span>
              </span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              <span>Cuidar da Saúde Também É Coisa de Homem</span>
            </h3>
            
            <p className="text-blue-100/90 text-xs sm:text-sm font-medium leading-relaxed">
              O <strong>Novembro Azul</strong> é a campanha mundial para conscientizar os homens sobre a importância da prevenção e do diagnóstico precoce do <strong>câncer de próstata</strong> e da saúde masculina integral. O preconceito não salva vidas; a prevenção sim! Quando diagnosticado precocemente, as chances de cura chegam a <strong>90% a 95%</strong>.
            </p>

            {/* Quick badges */}
            <div className="pt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold text-blue-200/90">
              <span className="flex items-center gap-1 text-sky-300">
                <Ribbon size={12} className="text-sky-400" /> Laço Azul da Prevenção
              </span>
              <span aria-hidden="true" className="text-blue-400/60">·</span>
              <span className="flex items-center gap-1 text-blue-200">
                <Stethoscope size={12} className="text-blue-300" /> Exame de Sangue PSA
              </span>
              <span aria-hidden="true" className="text-blue-400/60">·</span>
              <span className="flex items-center gap-1 text-amber-200">
                <HeartPulse size={12} className="text-amber-300" /> Toque Retal Indolor
              </span>
              <span aria-hidden="true" className="text-blue-400/60">·</span>
              <span className="flex items-center gap-1 text-emerald-200">
                <Hospital size={12} className="text-emerald-300" /> Atendimento SISMEPE / CMH
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 w-full lg:w-auto shrink-0 relative z-10">
          <button 
            onClick={() => onOpenModal('geral')}
            className="px-5 py-3.5 bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-700 hover:from-blue-600 hover:to-indigo-800 text-white font-black rounded-xl shadow-lg shadow-blue-500/25 transition-all text-center flex items-center justify-center gap-2 active:scale-95 text-sm border border-blue-300/40 cursor-pointer"
            title="Abrir o Guia Completo do Novembro Azul"
          >
            <Sparkles size={16} className="text-white" />
            <span>Guia Novembro Azul</span>
          </button>
          
          <button 
            onClick={() => onOpenModal('exames')}
            className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-blue-100 font-bold rounded-xl border border-blue-400/30 transition-all text-center flex items-center justify-center gap-2 active:scale-95 text-sm cursor-pointer"
          >
            <Stethoscope size={16} className="text-sky-300" />
            <span>Exames & Sinais</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Full Educational & Informational Modal ---
export const NovembroAzulModal = ({ 
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
    const text = `💙 *CAMPANHA NOVEMBRO AZUL - POLÍCIA MILITAR DE PERNAMBUCO* 💙\n` +
      `🎗️ *Cuidar da saúde também é coisa de homem!*\n\n` +
      `O mês de novembro é dedicado à conscientização, prevenção e diagnóstico precoce do *Câncer de Próstata* e à saúde integral masculina.\n\n` +
      `📌 *PRINCIPAIS ORIENTAÇÕES:*\n` +
      `1️⃣ *Exame de Toque Retal:* Rápido (dura 10-15 segundos), indolor e fundamental para avaliar a consistência da próstata. Não diminui a masculinidade de ninguém!\n` +
      `2️⃣ *Exame de Sangue PSA:* Avalia os níveis do antígeno prostático específico. A combinação de Toque + PSA alcança mais de 90% de precisão diagnóstica!\n` +
      `3️⃣ *Quando Iniciar:* A partir dos 50 anos para homens em geral, ou a partir dos 45 anos para homens negros ou com histórico familiar de câncer de próstata.\n` +
      `4️⃣ *Fase Inicial Assintomática:* O câncer de próstata não costuma provocar dores no início. Quando os sintomas aparecem, a doença já pode estar avançada. Por isso o check-up anual é vital!\n` +
      `5️⃣ *Chances de Cura:* Diagnosticado precocemente, as chances de cura chegam a *90% a 95%*!\n\n` +
      `🏥 *ATENDIMENTO AO POLICIAL MILITAR E DEPENDENTES:*\n` +
      `• SISMEPE / Centro Médico Hospitalar da PMPE (CMH Derby)\n` +
      `• Diretoria de Assistência Social da PMPE (DAS) e Diretoria de Saúde (DS)\n` +
      `• Rede de Saúde Pública (SUS) e Disque Saúde 136\n\n` +
      `💪 *Compartilhe com seus irmãos de farda, amigos e familiares! Um simples exame garante muitos anos de vida ao lado de quem você ama.*`;

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

      // Header Banner (Royal Blue / Navy)
      doc.setFillColor(30, 58, 138); // Deep Blue 900
      doc.rect(0, 0, pageWidth, 42, 'F');

      // Accent Ribbon Stripe
      doc.setFillColor(59, 130, 246); // Sky Blue 500
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
      doc.setFontSize(16);
      doc.text('CAMPANHA NOVEMBRO AZUL • PMPE', pageWidth / 2, 18, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text('GUIA DE ORIENTAÇÃO SOBRE A SAÚDE DO HOMEM E COMBATE AO CÂNCER DE PRÓSTATA', pageWidth / 2, 26, { align: 'center' });
      doc.setFontSize(8);
      doc.text('Diretoria de Saúde (DS) • Centro Médico Hospitalar (CMH) • 14º BPM', pageWidth / 2, 33, { align: 'center' });

      // Body Section
      let currentY = 54;

      doc.setTextColor(15, 23, 42); // slate-900
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('1. Mensagem de Conscientização & Diagnóstico Precoce', 14, currentY);
      currentY += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      const introText = 
        "O Novembro Azul é o movimento dedicado a conscientizar o público masculino sobre a necessidade premente " +
        "de cuidar da própria saúde, quebrando preconceitos históricos que afastam os homens dos consultórios médicos. " +
        "No Brasil, o câncer de próstata é o segundo tumor mais incidente entre homens (atrás apenas do câncer de pele não melanoma). " +
        "A detecção em estágios iniciais é o fator determinante para o sucesso terapêutico: quando identificado precocemente, " +
        "a probabilidade de cura alcança até 95%. Homens sem sintomas a partir dos 50 anos (ou aos 45 anos em caso de negros " +
        "ou histórico familiar em primeiro grau) devem realizar anualmente o exame de toque retal e a dosagem sérica do PSA.";
      
      const splitIntro = doc.splitTextToSize(introText, pageWidth - 28);
      doc.text(splitIntro, 14, currentY);
      currentY += (splitIntro.length * 4.5) + 6;

      // Table / Box of Exams
      doc.setFillColor(241, 245, 249); // slate-100
      doc.roundedRect(14, currentY, pageWidth - 28, 48, 3, 3, 'F');
      doc.setDrawColor(191, 219, 254); // blue-200
      doc.roundedRect(14, currentY, pageWidth - 28, 48, 3, 3, 'D');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(30, 64, 175);
      doc.text('EXAMES ESSENCIAIS DE RASTREIO:', 20, currentY + 8);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);

      doc.text('• EXAME DE TOQUE RETAL: Rápido (10 a 15 segundos), indolor e permite avaliar tamanho, forma e textura da próstata.', 20, currentY + 16);
      doc.text('• EXAME DE SANGUE PSA: Dosagem do Antígeno Prostático Específico em laboratório clínico.', 20, currentY + 23);
      doc.text('• ASSOCIAÇÃO COMPLEMENTAR: O PSA e o Toque se complementam e não são excludentes (precisão > 90%).', 20, currentY + 30);
      doc.text('• ULTRASSONOGRAFIA & BIÓPSIA: Indicados pelo urologista quando identificada alguma alteração suspeita.', 20, currentY + 37);
      doc.text('• FREQUÊNCIA: Check-up urológico anual a partir dos 45/50 anos.', 20, currentY + 44);

      currentY += 56;

      // Warning signs
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text('2. Sinais e Sintomas de Alerta', 14, currentY);
      currentY += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      const sinaisText = 
        "ATENÇÃO: Na fase inicial, o câncer de próstata é silencioso e NÃO costuma apresentar sintomas. " +
        "Ao surgirem sintomas, pode indicar doença localmente avançada. Fique atento a:\n" +
        "• Dificuldade ou demora para iniciar a micção;\n" +
        "• Jato urinário fraco, reduzido ou entrecortado;\n" +
        "• Vontade frequente de urinar, especialmente durante a noite (noctúria);\n" +
        "• Sensação de que a bexiga não foi completamente esvaziada;\n" +
        "• Presença de sangue na urina (hematúria) ou no sêmen;\n" +
        "• Dores ósseas persistentes na região lombar, quadris ou coxas.";

      const splitSinais = doc.splitTextToSize(sinaisText, pageWidth - 28);
      doc.text(splitSinais, 14, currentY);
      currentY += (splitSinais.length * 4.5) + 6;

      // Channels and rights
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('3. Onde Buscar Atendimento (Efetivo PMPE e Dependentes)', 14, currentY);
      currentY += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      const canaisText = 
        "• SISMEPE / CMH (Centro Médico Hospitalar Derby): Agendamento de consultas com Urologia e Clínica Geral.\n" +
        "• Diretoria de Saúde da PMPE (DS) e Diretoria de Assistência Social (DAS): Apoio integral ao policial e familiares.\n" +
        "• Policlínicas e Unidades Básicas de Saúde da Rede SUS em todo o Estado de Pernambuco.\n" +
        "• Disque Saúde 136 (Central gratuita do Ministério da Saúde).\n" +
        "• Lei Federal nº 12.732/2012 (Lei dos 60 dias para início do tratamento oncológico pelo SUS).";

      const splitCanais = doc.splitTextToSize(canaisText, pageWidth - 28);
      doc.text(splitCanais, 14, currentY);
      currentY += (splitCanais.length * 4.5) + 10;

      // Footer
      doc.setDrawColor(203, 213, 225);
      doc.line(14, pageHeight - 16, pageWidth - 14, pageHeight - 16);
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text('Polícia Militar de Pernambuco • 14º Batalhão de Polícia Militar (BPM) • Campanha Novembro Azul 2026', 14, pageHeight - 10);
      doc.text('Documento Informativo para Conscientização Operacional', pageWidth - 14, pageHeight - 10, { align: 'right' });

      doc.save('PMPE_Guia_Informativo_Novembro_Azul_Saude_Homem.pdf');
    } catch (error) {
      console.error("Erro ao gerar PDF do Novembro Azul:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-blue-200/60 dark:border-blue-900/50 rounded-[2.5rem] shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 transition-colors">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white p-5 sm:p-6 relative border-b border-blue-500/30 shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center border border-blue-300/40 shadow-lg shadow-blue-500/30 p-2 shrink-0">
                <BlueRibbonSVG className="w-full h-full" glow={true} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-blue-500/30 text-blue-200 border border-blue-400/30 px-2 py-0.5 rounded-full">
                    Campanha Novembro Azul
                  </span>
                  <span className="text-[10px] font-bold text-blue-300/80 uppercase">
                    PMPE / 14º BPM
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>Saúde do Homem & Prevenção do Câncer de Próstata</span>
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyMessage}
                className="p-2 sm:px-3 sm:py-2 bg-blue-600/40 hover:bg-blue-600/60 text-blue-100 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all border border-blue-400/30 cursor-pointer"
                title="Copiar texto de conscientização para WhatsApp"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Share2 size={16} />}
                <span className="hidden sm:inline">{copied ? 'Copiado!' : 'Compartilhar'}</span>
              </button>

              <button
                onClick={handleDownloadPDF}
                className="p-2 sm:px-3 sm:py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-black text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                title="Baixar Guia Oficial em PDF"
              >
                <Download size={16} />
                <span className="hidden sm:inline">Baixar PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 bg-white/10 hover:bg-white/20 text-blue-200 hover:text-white rounded-xl transition-all cursor-pointer ml-1"
                title="Fechar"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Quick Tabs Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-4 pb-1 no-scrollbar text-xs">
            {[
              { id: 'geral', label: 'Visão Geral', icon: <Info size={13} /> },
              { id: 'exames', label: 'Exames & Diagnóstico', icon: <Stethoscope size={13} /> },
              { id: 'sinais', label: 'Sinais & Sintomas', icon: <AlertCircle size={13} /> },
              { id: 'habitos', label: 'Prevenção & Hábitos', icon: <HeartPulse size={13} /> },
              { id: 'canais', label: 'Canais PMPE & SUS', icon: <Hospital size={13} /> },
              { id: 'direitos', label: 'Direitos & Legislação', icon: <ShieldCheck size={13} /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/25 border border-blue-300/40'
                    : 'bg-white/5 hover:bg-white/10 text-blue-200 border border-transparent'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 md:p-8 overflow-y-auto space-y-6 flex-1 text-slate-700 dark:text-slate-200">
          
          {/* TAB 1: VISÃO GERAL */}
          {activeTab === 'geral' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Highlight Card */}
              <div className="p-5 sm:p-6 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 dark:from-blue-950/40 dark:via-sky-950/30 dark:to-indigo-950/40 rounded-3xl border border-blue-200 dark:border-blue-800/60 shadow-sm flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-700 rounded-3xl flex items-center justify-center p-3 shrink-0 shadow-lg shadow-blue-500/20">
                  <BlueRibbonSVG className="w-full h-full" glow={true} />
                </div>
                <div className="space-y-2 text-center md:text-left flex-1">
                  <span className="text-xs font-black uppercase text-blue-700 dark:text-blue-300 tracking-wider">
                    Origem e Propósito do Movimento
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                    Quebrando o Preconceito para Salvar Vidas
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    O <strong>Novembro Azul</strong> surgiu na Austrália em 2003 (movimento <em>Movember</em>) e se espalhou pelo mundo para chamar a atenção dos homens para o cuidado com a sua saúde. Historicamente, os homens procuram menos os serviços de saúde, muitas vezes por machismo, desinformação ou vergonha. A campanha é um chamado direto para vencer esse tabu!
                  </p>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-blue-100 dark:border-slate-700 shadow-sm text-center">
                  <div className="text-3xl font-black text-blue-600 dark:text-blue-400">95%</div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase">Chance de Cura</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Quando diagnosticado na fase inicial da doença.</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-blue-100 dark:border-slate-700 shadow-sm text-center">
                  <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">2º Maior</div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase">Incidência Masculina</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Apenas atrás do câncer de pele não melanoma.</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-blue-100 dark:border-slate-700 shadow-sm text-center">
                  <div className="text-3xl font-black text-sky-600 dark:text-sky-400">+70 mil</div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase">Novos Casos / Ano</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Estimativa anual do INCA para o Brasil.</p>
                </div>
              </div>

              {/* What is Prostate */}
              <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-3xl border border-slate-200 dark:border-slate-700/60 space-y-3">
                <h4 className="font-black text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Activity size={18} className="text-blue-600 dark:text-blue-400" />
                  <span>O Que É a Próstata e Qual Sua Função?</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  A próstata é uma glândula do aparelho reprodutor masculino em formato de castanha, localizada logo abaixo da bexiga e à frente do reto. Ela envolve a porção inicial da uretra (canal por onde passa a urina) e é responsável por produzir cerca de 30% do líquido seminal que nutre e protege os espermatozoides. Com o avanço da idade, a próstata pode aumentar de volume (hiperplasia benigna) ou desenvolver células tumorais malignas.
                </p>
              </div>

              {/* Callout */}
              <div className="p-4 bg-blue-500/10 dark:bg-blue-500/20 rounded-2xl border border-blue-500/30 flex items-start gap-3">
                <AlertCircle size={20} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-blue-950 dark:text-blue-200">
                  <strong>Mensagem ao Efetivo Policial Militar:</strong> A rotina operacional exige força e prontidão contínua. Cuidar de você mesmo e realizar o check-up anual é um ato de disciplina, bravura e amor para com sua família e companheiros de farda.
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXAMES & DIAGNÓSTICO */}
          {activeTab === 'exames' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  Os Dois Exames Fundamentais e Complementares
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Um exame não substitui o outro: a associação do Toque Retal e do PSA eleva a precisão para além de 90%.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Toque Retal */}
                <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-blue-200 dark:border-slate-700 shadow-sm space-y-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-xl flex items-center justify-center">
                    <UserCheck size={20} />
                  </div>
                  <h4 className="font-black text-base text-slate-900 dark:text-slate-100">
                    1. Exame de Toque Retal
                  </h4>
                  <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Duração:</strong> Muito rápido, leva de 10 a 15 segundos.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Indolor:</strong> Pode causar leve desconforto momentâneo, mas não causa dor.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Objetivo:</strong> O urologista avalia o volume, formato, consistência e eventuais nódulos suspeitos na parte posterior da próstata.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Sem tabus:</strong> Não afeta masculinidade ou virilidade em nada. É um procedimento puramente médico.</span>
                    </li>
                  </ul>
                </div>

                {/* PSA */}
                <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-blue-200 dark:border-slate-700 shadow-sm space-y-3">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 rounded-xl flex items-center justify-center">
                    <Stethoscope size={20} />
                  </div>
                  <h4 className="font-black text-base text-slate-900 dark:text-slate-100">
                    2. Exame de Sangue PSA
                  </h4>
                  <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Definição:</strong> Mede a quantidade do Antígeno Prostático Específico no sangue.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Coleta Simples:</strong> Coleta convencional de sangue em laboratório clínico.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Alerta:</strong> Níveis elevados de PSA não significam necessariamente câncer (podem indicar inflamação ou crescimento benigno), daí a necessidade do toque para correlacionar.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Preparo:</strong> Requer 48h sem ejaculação, sem ciclismo ou esforço perineal prévio.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Age guidelines */}
              <div className="p-5 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl shadow-md space-y-3">
                <h4 className="font-black text-base text-blue-200 flex items-center gap-2">
                  <Calendar size={18} className="text-sky-400" />
                  <span>Quando Devo Começar a Fazer os Exames?</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                    <div className="text-sky-300 font-black text-sm uppercase">A partir dos 50 Anos</div>
                    <p className="mt-1 text-slate-200 leading-relaxed">
                      Para todos os homens sem histórico familiar e sem outros fatores de risco associados.
                    </p>
                  </div>
                  <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                    <div className="text-amber-300 font-black text-sm uppercase">A partir dos 45 Anos</div>
                    <p className="mt-1 text-slate-200 leading-relaxed">
                      Para homens com histórico familiar de câncer de próstata (pai ou irmãos antes dos 60 anos) ou homens negros (maior propensão genética).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SINAIS & SINTOMAS */}
          {activeTab === 'sinais' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-4 bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 rounded-2xl flex items-start gap-3">
                <AlertCircle size={22} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                  <strong className="text-amber-700 dark:text-amber-300 block mb-0.5">ATENÇÃO CRUCIAL:</strong>
                  Em sua fase inicial, o câncer de próstata é <strong>totalmente silencioso e assintomático</strong>. Não espere sentir dores para marcar sua consulta anual!
                </div>
              </div>

              <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  Sinais e Sintomas que Exigem Avaliação Imediata
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  {
                    title: "Dificuldade ou demora para urinar",
                    desc: "Sensação de esforço para iniciar o fluxo ou fluxo fraco/interrompido."
                  },
                  {
                    title: "Necessidade frequente de urinar à noite",
                    desc: "Acordar diversas vezes durante o sono para urinar (noctúria)."
                  },
                  {
                    title: "Sangue na urina ou no sêmen",
                    desc: "Coloração avermelhada ou amarronzada que exige investigação urgente."
                  },
                  {
                    title: "Sensação de esvaziamento incompleto",
                    desc: "Sentir que a bexiga continua cheia mesmo logo após urinar."
                  },
                  {
                    title: "Dor ou queimação ao urinar ou ejacular",
                    desc: "Desconforto que pode indicar infecção, prostatite ou alterações tumorais."
                  },
                  {
                    title: "Dores ósseas persistentes",
                    desc: "Principalmente nas costas (lombar), quadris ou coxas em fases mais adiantadas."
                  }
                ].map((symptom, idx) => (
                  <div key={idx} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm flex items-start gap-3">
                    <div className="w-6 h-6 bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-lg flex items-center justify-center shrink-0 font-black text-xs">
                      {idx + 1}
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 dark:text-slate-100">{symptom.title}</h5>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5">{symptom.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: HÁBITOS SAUDÁVEIS & PREVENÇÃO */}
          {activeTab === 'habitos' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  Prevenção Primária & Estilo de Vida Protetor
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Adotar hábitos saudáveis reduz o risco não apenas de câncer, mas de infarto, AVC e hipertensão.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
                  <h4 className="font-bold text-sm text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <Heart size={16} /> Alimentação Funcional e Rica em Licopeno
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Priorize frutas, verduras, grãos integrais e peixes. Alimentos ricos em licopeno (tomate cozido, molho de tomate natural, melancia, goiaba) são potentes antioxidantes associados à proteção da próstata. Evite excesso de carnes vermelhas, gorduras saturadas e ultraprocessados.
                  </p>
                </div>

                <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
                  <h4 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                    <Activity size={16} /> Atividade Física & Controle do Peso
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Pratique pelo menos 150 minutos de exercícios aeróbicos ou de musculação por semana. A obesidade e o sedentarismo estão diretamente ligados a formas mais agressivas de câncer de próstata e problemas cardíacos.
                  </p>
                </div>

                <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
                  <h4 className="font-bold text-sm text-amber-600 dark:text-amber-400 flex items-center gap-2">
                    <Flame size={16} /> Não Fumar & Moderar no Álcool
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    O tabagismo aumenta as taxas de mortalidade em diversos tipos de câncer e acelera o envelhecimento vascular. A moderação no consumo de bebidas alcoólicas protege o fígado e a bexiga.
                  </p>
                </div>

                <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
                  <h4 className="font-bold text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <ShieldCheck size={16} /> Saúde Cardiovascular & Mental
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Monitore periodicamente pressão arterial, colesterol, triglicerídeos e glicemia. Cuide também da sua mente: o estresse operacional do policial precisa de momentos de descanso, convívio familiar e suporte psicológico quando necessário.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CANAIS PMPE & SUS */}
          {activeTab === 'canais' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  Onde Buscar Atendimento e Consultas Especializadas
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Canais de saúde oficiais para o policial militar, seus dependentes e a comunidade.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* CMH */}
                <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 rounded-3xl border border-blue-200 dark:border-slate-700 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <Hospital className="text-blue-600 dark:text-blue-400" size={20} />
                    <h4 className="font-black text-sm text-slate-900 dark:text-slate-100">
                      Centro Médico Hospitalar da PMPE (CMH)
                    </h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Localizado no bairro do Derby em Recife, o CMH oferece consultas especializadas em Urologia, Clínica Médica, Cardiologia e exames laboratoriais/imagem para o efetivo militar e dependentes do SISMEPE.
                  </p>
                  <div className="pt-2 border-t border-blue-200 dark:border-slate-700 flex flex-col gap-1 text-[11px] font-bold text-blue-700 dark:text-blue-300">
                    <span>• Central SISMEPE de Agendamento</span>
                    <span>• Atendimento Urológico Preventivo</span>
                  </div>
                </div>

                {/* Diretoria de Saúde & DAS */}
                <div className="p-5 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/80 rounded-3xl border border-blue-200 dark:border-slate-700 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <Award className="text-indigo-600 dark:text-indigo-400" size={20} />
                    <h4 className="font-black text-sm text-slate-900 dark:text-slate-100">
                      Diretoria de Saúde (DS) & DAS PMPE
                    </h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Apoio social, orientação administrativa, concessão de licenças para tratamento de saúde (LTS), junta militar de saúde e programas de prevenção para a tropa.
                  </p>
                  <div className="pt-2 border-t border-blue-200 dark:border-slate-700 flex flex-col gap-1 text-[11px] font-bold text-indigo-700 dark:text-indigo-300">
                    <span>• Assistência integral ao PM e familiares</span>
                    <span>• Campanhas de saúde preventiva nas OMEs</span>
                  </div>
                </div>

                {/* SUS */}
                <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="text-emerald-600 dark:text-emerald-400" size={20} />
                    <h4 className="font-black text-sm text-slate-900 dark:text-slate-100">
                      Disque Saúde 136 (SUS)
                    </h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Central telefônica nacional do Ministério da Saúde. Gratuita e com funcionamento em todo o território nacional para tirar dúvidas e localizar a Unidade Básica de Saúde mais próxima.
                  </p>
                </div>

                {/* INCA & SBU */}
                <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="text-blue-600 dark:text-blue-400" size={20} />
                    <h4 className="font-black text-sm text-slate-900 dark:text-slate-100">
                      INCA & Sociedade Brasileira de Urologia
                    </h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Portais de referência técnica com cartilhas atualizadas sobre câncer de próstata, saúde sexual masculina e orientações para pacientes e profissionais.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: DIREITOS & LEGISLAÇÃO */}
          {activeTab === 'direitos' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  Direitos do Paciente com Neoplasia Maligna
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Conheça as garantias legais e benefícios previdenciários previstos na legislação brasileira.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400">Lei nº 12.732/2012</span>
                  <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100">Lei dos 60 Dias</h5>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    O paciente com câncer tem direito a iniciar seu primeiro tratamento no SUS (cirurgia, radioterapia ou quimioterapia) em no máximo 60 dias após a confirmação diagnóstica.
                  </p>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400">Lei nº 13.896/2019</span>
                  <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100">Lei dos 30 Dias para Diagnóstico</h5>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Garante a realização dos exames diagnósticos necessários no SUS em até 30 dias nos casos em que a principal suspeita médica for de neoplasia maligna.
                  </p>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">FGTS & PIS/PASEP</span>
                  <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100">Saque Integral dos Fundos</h5>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    O trabalhador portador de câncer (ou que tenha dependente acometido) tem direito ao levantamento dos saldos integrais das contas do FGTS e PIS/PASEP.
                  </p>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-sky-600 dark:text-sky-400">Tributário</span>
                  <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100">Isenção de Imposto de Renda</h5>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Aposentados, pensionistas e militares da reserva/reforma diagnosticados com neoplasia maligna têm direito à isenção do IRPF sobre os proventos de inatividade.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <BlueRibbonSVG className="w-5 h-5 shrink-0" />
            <span className="font-medium hidden sm:inline">Novembro Azul: A prevenção é a melhor estratégia de proteção.</span>
            <span className="font-medium sm:hidden">Novembro Azul • PMPE</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
          >
            Fechar Guia
          </button>
        </div>
      </div>
    </div>
  );
};
