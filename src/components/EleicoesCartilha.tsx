import React, { useState, useMemo } from 'react';
import { 
  Vote, 
  BookOpen, 
  Scale, 
  ShieldAlert, 
  ShieldCheck, 
  Smartphone, 
  Lock, 
  AlertOctagon, 
  Phone, 
  Printer, 
  Download, 
  Search, 
  X, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  FileText,
  AlertTriangle,
  Info,
  Check,
  Building,
  ChevronRight
} from 'lucide-react';
import { jsPDF } from 'jspdf';

// --- Civic Electoral Emblem Icon ---
export const EleicoesEmblem = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <div 
    style={{ width: size, height: size }} 
    className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-900 text-white shadow-md shadow-blue-900/30 shrink-0 ${className}`}
  >
    <Vote size={Math.round(size * 0.6)} className="text-amber-300 drop-shadow-sm" />
  </div>
);

// --- Top Alert Bar ---
export const EleicoesTopBar = ({ onOpenCartilha }: { onOpenCartilha: (tab?: string) => void }) => {
  return (
    <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-white shadow-lg border-b border-blue-500/40 px-3 py-2 flex items-center justify-between sticky top-0 z-[160] transition-all">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="bg-blue-900/80 p-1 rounded-xl border border-blue-400/50 shadow-inner flex items-center justify-center shrink-0">
            <EleicoesEmblem size={20} />
          </div>
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span className="font-black text-slate-950 uppercase tracking-wider text-[10px] sm:text-xs bg-gradient-to-r from-amber-400 to-amber-300 px-2.5 py-0.5 rounded-full border border-amber-200 shadow-sm shrink-0">
              ELEIÇÕES 2026
            </span>
            <span className="font-bold text-blue-100 text-xs sm:text-sm truncate">
              Operação Eleições PMPE • Cartilha de Orientações aos Policiais Militares
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onOpenCartilha('armas')}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg font-bold text-xs transition-all border border-red-500/40"
            title="Atenção à regra dos 100m para porte de armas"
          >
            <ShieldAlert size={12} className="text-red-300" />
            <span>Raio 100m Armas</span>
          </button>
          <button
            onClick={() => onOpenCartilha('podenaopode')}
            className="flex items-center gap-1.5 px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg font-black text-xs transition-all shadow-sm active:scale-95 border border-amber-200"
            title="Guia Rápido de Bolso: Pode x Não Pode"
          >
            <Scale size={13} className="text-slate-950" />
            <span className="hidden sm:inline">Pode x Não Pode</span>
            <span className="sm:hidden">Guia Rápido</span>
          </button>
          <button
            onClick={() => onOpenCartilha('todos')}
            className="flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-blue-200 rounded-lg font-bold text-xs transition-all border border-blue-400/30"
          >
            <BookOpen size={13} />
            <span className="hidden md:inline">Cartilha Completa</span>
            <span className="md:hidden">Cartilha</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Featured Dashboard Banner ---
export const EleicoesBanner = ({ onOpenCartilha }: { onOpenCartilha: (tab?: string) => void }) => {
  return (
    <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white rounded-[2.5rem] border border-blue-700/50 shadow-2xl overflow-hidden relative mb-8 group">
      {/* Decorative background watermark */}
      <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
        <Vote size={300} />
      </div>
      <div className="absolute top-0 right-0 p-24 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-900 rounded-2xl flex items-center justify-center border border-blue-400/40 shadow-xl shrink-0 p-3">
            <Vote size={36} className="text-amber-300 drop-shadow" />
          </div>
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 border border-amber-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                OPERAÇÃO ELEIÇÕES 2026
              </span>
              <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest flex items-center gap-1">
                <span>DIRETORIA DE PLANEJAMENTO OPERACIONAL (DPO/PMPE)</span>
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              <span>Cartilha de Orientações aos Policiais Militares</span>
            </h3>
            <p className="text-blue-100/90 text-xs sm:text-sm font-medium leading-relaxed">
              Diretrizes de conduta para o pleito de 2026: restrição rigorosa ao <strong>porte de armas a 100m</strong> das seções, vedação total de <strong>celular na cabina</strong> de votação, condutas vedadas ao militar da ativa e protocolos de flagrante de crimes eleitorais.
            </p>

            {/* Quick unboxed text badges */}
            <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold text-blue-200/90">
              <span className="flex items-center gap-1 text-red-300"><ShieldAlert size={12} /> Raio de 100m</span>
              <span aria-hidden="true" className="text-blue-400/60">·</span>
              <span className="flex items-center gap-1 text-amber-300"><Smartphone size={12} /> Sem Celular na Urna</span>
              <span aria-hidden="true" className="text-blue-400/60">·</span>
              <span className="flex items-center gap-1 text-emerald-300"><Scale size={12} /> Neutralidade Partidária</span>
              <span aria-hidden="true" className="text-blue-400/60">·</span>
              <span className="flex items-center gap-1 text-sky-300"><Lock size={12} /> Imunidade Prisional (Art. 236)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 w-full lg:w-auto shrink-0 relative z-10">
          <button 
            onClick={() => onOpenCartilha('todos')}
            className="px-5 py-3.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/20 transition-all text-center flex items-center justify-center gap-2 active:scale-95 text-sm border border-amber-200"
            title="Abrir a cartilha completa com busca e seções detalhadas"
          >
            <BookOpen size={16} className="text-slate-950" />
            <span>Consultar Cartilha Completa</span>
          </button>
          
          <button 
            onClick={() => onOpenCartilha('podenaopode')}
            className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-blue-100 font-bold rounded-xl border border-blue-400/30 transition-all text-center flex items-center justify-center gap-2 active:scale-95 text-sm"
          >
            <Scale size={16} className="text-amber-400" />
            <span>Guia Rápido: Pode x Não Pode</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Topics Data for Cartilha Eleições 2026 ---
interface CartilhaTopic {
  id: string;
  category: string;
  title: string;
  highlight?: string;
  legalBase: string;
  badgeType?: 'danger' | 'warning' | 'success' | 'info';
  icon: React.ReactNode;
  summary: string;
  dosAndDonts?: {
    can: string[];
    cannot: string[];
  };
  details: string[];
  operationalProtocol?: string[];
}

export const CARTILHA_TOPICS: CartilhaTopic[] = [
  {
    id: 'armas',
    category: 'armas',
    title: 'Porte de Arma de Fogo: Restrição Rigorosa no Raio de 100 Metros',
    highlight: 'CRÍTICO: Policial de folga ao votar DEVE COMPARECER DESARMADO',
    legalBase: 'Art. 141 da Lei nº 4.737/1965 (Código Eleitoral) e Resolução TSE',
    badgeType: 'danger',
    icon: <ShieldAlert size={20} className="text-red-500" />,
    summary: 'A força armada não pode aproximar-se do local de votação a menos de 100 metros nas 48h anteriores e 24h posteriores à eleição, salvo os policiais escalados em serviço formal de policiamento daquele local.',
    details: [
      'A proibição do porte de armas no raio de 100 metros dos locais de votação aplica-se indistintamente a civis e a policiais militares que NÃO estejam de serviço no local de votação.',
      'O policial militar de folga ou que compareça ao seu colégio eleitoral para exercer o direito de voto deve comparecer DESARMADO. Não há prerrogativa funcional para portar arma dentro da seção eleitoral em trajes civis/fora da escala de serviço do pleito.',
      'Apenas os policiais militares devidamente escalados em ordem de serviço para a segurança externa e interna autorizada dos locais de votação e escolta de urnas têm permissão legal para portar armamento funcional.',
      'Colecionadores, Atiradores Desportivos e Caçadores (CACs): Suspensão total do transporte e porte de armas de fogo e munições em todo o Estado e país nas 48h que antecedem e nas 24h posteriores ao pleito.',
      'Em caso de descumprimento por qualquer pessoa armada não autorizada: abordagem imediata, desarmamento, lavratura de flagrante delito por porte ilegal eleitoral e encaminhamento à autoridade competente.'
    ],
    operationalProtocol: [
      'Identificar o perímetro de 100 metros ao redor dos portões e acessos do colégio eleitoral.',
      'Se um militar de folga se apresentar armado para votar: orientar que guarde seu armamento em local seguro fora do perímetro de 100m antes de ingressar.',
      'Persistindo na tentativa de ingressar armado: advertir que constitui crime eleitoral e transgressão militar grave, agindo com firmeza e comunicando ao Oficial de Dia/Juiz Eleitoral.'
    ]
  },
  {
    id: 'celular',
    category: 'celular',
    title: 'Aparelhos Celulares, Câmeras e Transmissores na Cabine de Votação',
    highlight: 'Proibição absoluta de celular na urna: quebra do sigilo do voto',
    legalBase: 'Art. 91-A da Lei nº 9.504/1997 e Resoluções do TSE',
    badgeType: 'warning',
    icon: <Smartphone size={20} className="text-amber-500" />,
    summary: 'É terminantemente vedado ao eleitor entrar na cabina de votação portando aparelho de telefone celular, máquina fotográfica, filmadora, equipamento de radiocomunicação ou qualquer dispositivo transmissor/gravador.',
    details: [
      'Ao entrar na seção, o eleitor deve desligar seu aparelho telefônico e deixá-lo sobre a mesa receptora sob a guarda dos mesários, juntamente com seu documento oficial de identificação.',
      'Somente após votar e assinar o caderno de votação é que o eleitor poderá recolher novamente o seu aparelho telefônico.',
      'A "colinha" em papel (anotação manual com os números dos candidatos) é totalmente permitida e recomendada pela Justiça Eleitoral para agilizar a votação.',
      'Se o eleitor se recusar a entregar o celular: a mesa receptora NÃO autorizará o eleitor a votar e recolherá seu documento.',
      'Se insistir em entrar na cabina com o celular ou for flagrado filmando/fotografando a urna: o Presidente da Mesa Receptora acionará a PMPE imediatamente. Configura crime eleitoral (Art. 312 do Código Eleitoral) e desobediência (Art. 347 do CE).'
    ],
    operationalProtocol: [
      'Manter prontidão nas imediações das seções para pronto atendimento caso acionado pelo Presidente de Mesa.',
      'Ao ser acionado por recusa de entrega de celular ou tentativa de registro: ingressar na seção mediante autorização do Presidente de Mesa, identificar o autor e recolher o dispositivo.',
      'Conduzir o infrator à Delegacia de Plantão Eleitoral acompanhado do Presidente de Mesa ou mesário na qualidade de testemunha.'
    ]
  },
  {
    id: 'vedacoes',
    category: 'vedacoes',
    title: 'Condutas Vedadas ao Policial Militar: Neutralidade e Imparcialidade',
    highlight: 'Policial militar fardado ou de serviço representa o Estado e a Lei',
    legalBase: 'Art. 73 da Lei nº 9.504/1997, Estatuto dos Policiais Militares de PE e CF/88',
    badgeType: 'danger',
    icon: <ShieldCheck size={20} className="text-blue-500" />,
    summary: 'A Polícia Militar é uma instituição do Estado, apartidária. É expressamente vedado ao militar da ativa manifestar preferência partidária fardado ou utilizar bens públicos para fins de campanha.',
    details: [
      'VEDADO manifestar preferência político-partidária em serviço ou fardado (usar broches, adesivos, bandeiras ou adereços em farda, colete, boné ou arma).',
      'VEDADO participar fardado ou em serviço de comícios, passeatas, reuniões partidárias, carreatas ou carreatas de candidatos.',
      'VEDADO utilizar viaturas, armamentos, combustíveis, quartéis, linhas de telefone ou instalações da corporação para transportar materiais ou promover candidatos.',
      'VEDADO distribuir panfletos, "santinhos" ou fazer propaganda política a favor ou contra qualquer concorrente ao pleito.',
      'VEDADO utilizar perfis oficiais da PMPE ou postar fotos fardado em redes sociais emitindo juízo de valor ou apoio a candidatos políticos sem autorização do Comando.',
      'Militares da ativa sem 10 anos de serviço que forem concorrer a cargo eletivo devem afastar-se definitivamente da corporação; com mais de 10 anos, ficam agregados e, se eleitos, passam para a inatividade.'
    ]
  },
  {
    id: 'crimes',
    category: 'crimes',
    title: 'Crimes Eleitorais Mais Comuns no Dia do Pleito e Ação Policial',
    highlight: 'Flagrante delito exige condução imediata e apreensão de provas',
    legalBase: 'Lei nº 9.504/1997, Lei nº 6.091/1974 e Código Eleitoral',
    badgeType: 'danger',
    icon: <AlertOctagon size={20} className="text-red-500" />,
    summary: 'Identificação rápida dos crimes que ocorrem comumente na data da votação: boca de urna, compra de votos, transporte irregular e derrame de santinhos.',
    details: [
      'BOCA DE URNA (Art. 39, § 5º, II da Lei 9.504/97): Aliciamento de eleitores, distribuição de santinhos, panfletos ou material de propaganda, uso de alto-falantes e comícios paralelos no dia da votação. Pena: detenção de 6 meses a 1 ano e multa. Ação: prisão em flagrante e apreensão de todo o material.',
      'COMPRA DE VOTO / CORRUPÇÃO ELEITORAL (Art. 299 do Código Eleitoral): Dar, oferecer, prometer, solicitar ou receber dinheiro, dádiva, emprego, combustível ou qualquer outra vantagem em troca do voto. Pena: reclusão de até 4 anos e multa. Ação: detenção em flagrante, apreensão do dinheiro, listas e veículos envolvidos.',
      'TRANSPORTE ILEGAL DE ELEITORES (Lei nº 6.091/1974): O transporte de eleitores só pode ser realizado por veículos oficiais credenciados pela Justiça Eleitoral ou por linhas regulares do sistema de transporte público coletivo. É crime fazer transporte de eleitores em veículos particulares ou contratados por candidatos. Pena: reclusão de 4 a 6 anos e apreensão do veículo.',
      'DERRAME DE SANTINHOS (Art. 39, § 5º, III da Lei 9.504/97 c/c Legislação Ambiental): O despejo e espalhamento de material impresso de propaganda pelas vias públicas na véspera ou na madrugada da eleição constitui crime eleitoral e dano ambiental.',
      'DESOBEDIÊNCIA À JUSTIÇA ELEITORAL (Art. 347 do Código Eleitoral): Recusar cumprimento a ordens de mesários ou juízes eleitorais durante os trabalhos de votação e apuração.'
    ],
    operationalProtocol: [
      'Diante de flagrante de crime eleitoral: cessar a conduta criminosa imediatamente.',
      'Apreender o material probatório (santinhos, listas de votantes, quantias em dinheiro, celulares utilizados na infração) e registrar cadeia de custódia com recibo.',
      'Conduzir o infrator, testemunhas e vítimas à Delegacia da Polícia Federal (ou Polícia Civil onde designado).',
      'Lavrar o Boletim de Ocorrência detalhado e informar imediatamente o Oficial de Operações e o COPOM.'
    ]
  },
  {
    id: 'garantias',
    category: 'garantias',
    title: 'Garantia de Votação e Imunidade Prisional (Art. 236 do Código Eleitoral)',
    highlight: 'Nenhum eleitor pode ser preso nos 5 dias anteriores, SALVO flagrante delito',
    legalBase: 'Art. 236 do Código Eleitoral (Lei nº 4.737/1965)',
    badgeType: 'info',
    icon: <Lock size={20} className="text-indigo-500" />,
    summary: 'Regras de salvo-conduto e restrições a prisões e detenções durante o período eleitoral para proteger a soberania do sufrágio universal.',
    details: [
      'ELEITORES EM GERAL: Desde 5 dias antes até 48 horas depois do encerramento da votação, nenhum eleitor poderá ser preso ou detido, SALVO:',
      '  1. Em flagrante delito;',
      '  2. Em virtude de sentença criminal condenatória por crime inafiançável;',
      '  3. Por desrespeito a salvo-conduto emitido pela Justiça Eleitoral.',
      'MANDADOS DE PRISÃO COMUNS: Mandados de prisão por crimes comuns ou pensão alimentícia que não se enquadrem nas exceções expressas acima NÃO podem ser cumpridos durante este período.',
      'CANDIDATOS: Não podem ser presos desde 15 dias antes da eleição até 48 horas após o pleito, SALVO em flagrante delito.',
      'MEMBROS DAS MESAS E FISCAIS: Não podem ser detidos ou presos durante o exercício de suas funções, SALVO em flagrante delito.'
    ]
  },
  {
    id: 'podenaopode',
    category: 'podenaopode',
    title: 'Guia de Bolso: O Que PODE e O Que NÃO PODE no Dia da Eleição',
    highlight: 'Tabela comparativa direta para consulta rápida da guarnição em serviço',
    legalBase: 'Normas conjuntas TSE / TRE-PE / DPO-PMPE',
    badgeType: 'success',
    icon: <Scale size={20} className="text-emerald-500" />,
    summary: 'Tabela direta comparativa do que é permitido e do que é expressamente proibido para eleitores, fiscais e policiais no dia da eleição.',
    dosAndDonts: {
      can: [
        'Manifestação individual e silenciosa do eleitor comum (uso de broche pessoal, bandeira ou adesivo pequeno).',
        'Levar "colinha" em papel para a cabine com os números dos candidatos.',
        'Policial militar escalado em serviço oficial portar armamento na segurança externa do colégio eleitoral.',
        'Fiscais de partido usarem crachá simples padronizado pelo TSE (sem uniforme ou propaganda partidária).',
        'Transporte regular coletivo e veículos oficiais a serviço da Justiça Eleitoral.',
        'Apoio do policial para garantir acessibilidade a idosos e pessoas com deficiência na entrada do local.'
      ],
      cannot: [
        'Portar arma a menos de 100 metros da seção eleitoral (inclusive policial militar de folga ou civil).',
        'Entrar na cabine de votação com telefone celular, câmera ou radiocomunicador.',
        'Policial militar fardado ou em serviço manifestar apoio político ou usar propaganda partidária.',
        'Boca de urna, abordagem de eleitores ou distribuição de "santinhos" no dia do pleito.',
        'Aglomeração de pessoas com roupas padronizadas ou bandeiras (caracterizando manifestação coletiva).',
        'Uso de alto-falantes, amplificadores de som ou comícios paralelos no dia da votação.',
        'Transporte gratuito irregular de eleitores em veículos particulares ou de candidatos.',
        'Derrame de santinhos e panfletos nas vias públicas e portões de escolas.'
      ]
    },
    details: [
      'A atuação policial deve ser orientada pelo princípio da intervenção mínima necessária, mantendo a firmeza da lei sem provocar comoção ou desordem desnecessária.',
      'Dúvidas sobre o funcionamento de urnas ou seções devem ser dirimidas diretamente com o Delegado do Prédio / Chefe de Cartório da Justiça Eleitoral.'
    ]
  },
  {
    id: 'procedimentos',
    category: 'procedimentos',
    title: 'Protocolo de Encaminhamento, Destino de Ocorrências e BOPM',
    highlight: 'Prioridade da Polícia Federal e registro completo da cadeia de custódia',
    legalBase: 'Portaria Conjunta SSP-PE / TRE-PE / PMPE',
    badgeType: 'info',
    icon: <FileText size={20} className="text-blue-500" />,
    summary: 'Fluxo oficial para onde encaminhar os infratores presos e como redigir o Boletim de Ocorrência Policial Militar (BOPM/SisCOpI).',
    details: [
      'DESTINO DAS OCORRÊNCIAS: Os crimes eleitorais são de competência da Justiça Federal / Justiça Eleitoral.',
      '1. Municípios com sede da Polícia Federal (Recife, Caruaru, Salgueiro): Condução direta à sede ou posto avançado de plantão da PF.',
      '2. Demais municípios: Condução à Delegacia de Polícia Civil local designada pela Justiça Eleitoral como Plantão Eleitoral Oficial.',
      'CADEIA DE CUSTÓDIA: Todo material apreendido (impressos, celulares apreendidos após flagrante, quantias em dinheiro, cadernos de anotação) deve ser inventariado com recibo assinado pelo delegado plantonista.',
      'REGISTRO NO SISCOPI / BOPM: Constar identificação precisa de testemunhas (especialmente mesários quando envolver a seção), horário, número da zona e seção eleitoral, narrativa cronológica e providências adotadas.',
      'COMUNICAÇÃO IMEDIATA: Notificar o Oficial Coordenador da Operação e o COPOM/CIODS para alimentar o mapa estatístico do Centro de Comando e Controle Estadual (CICCE).'
    ]
  },
  {
    id: 'contatos',
    category: 'contatos',
    title: 'Canais de Emergência, Contatos Úteis e Aplicativo Pardal',
    highlight: 'Números oficiais para denúncias e acionamento de plantão',
    legalBase: 'TRE-PE / TSE / CIODS',
    badgeType: 'info',
    icon: <Phone size={20} className="text-emerald-500" />,
    summary: 'Linhas diretas do Tribunal Regional Eleitoral de Pernambuco, Disque-Denúncia, Pardal e Centro de Operações.',
    details: [
      'TRE-PE (Tribunal Regional Eleitoral de Pernambuco): (81) 3194-9200',
      'Disque-Eleitor / Informações ao Cidadão: 148',
      'Aplicativo Pardal (TSE): Aplicativo oficial para recebimento de denúncias de propaganda irregular e boca de urna com geolocalização e fotos.',
      'CIODS / COPOM 190: Acionamento prioritário da Polícia Militar de Pernambuco 24h.',
      'Ouvidoria da Justiça Eleitoral de Pernambuco: Disponível no portal do TRE-PE e por telefone para consultas de legalidade.'
    ]
  }
];

// --- PDF Generation Utility for Cartilha Eleições 2026 ---
export const generateCartilhaEleicoesPDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // Header Box
  doc.setFillColor(11, 37, 69); // Deep Navy Blue
  doc.rect(0, 0, pageWidth, 36, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('POLÍCIA MILITAR DE PERNAMBUCO', pageWidth / 2, 14, { align: 'center' });
  doc.setFontSize(11);
  doc.setTextColor(245, 158, 11); // Amber
  doc.text('OPERAÇÃO ELEIÇÕES 2026 • GUIA OPERACIONAL DO POLICIAMENTO', pageWidth / 2, 22, { align: 'center' });
  doc.setFontSize(8);
  doc.setTextColor(200, 220, 255);
  doc.text('Diretoria de Planejamento Operacional (DPO) • SisCOpI PMPE', pageWidth / 2, 29, { align: 'center' });

  y = 44;

  // Introduction Note
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  doc.setFont('helvetica', 'italic');
  doc.text('Resumo de diretrizes legais e operacionais para a segurança do pleito e cumprimento da lei eleitoral.', 14, y);
  y += 8;

  // Section 1: Raio 100m Armamento
  doc.setFillColor(239, 68, 68);
  doc.rect(14, y, 4, 12, 'F');
  doc.setTextColor(185, 28, 28);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('1. PORTE DE ARMA NO RAIO DE 100M (LEI 4.737/65 - CÓDIGO ELEITORAL)', 22, y + 5);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 40, 40);
  doc.text('• Nenhuma pessoa armada poderá se aproximar a menos de 100m do local de votação.', 22, y + 10);
  y += 16;
  doc.text('• Policiais militares de folga ao votar DEVEM ESTAR DESARMADOS (mesma regra do cidadão civil).', 18, y);
  y += 5;
  doc.text('• Somente policiais em efetivo serviço escalados para o local de votação podem atuar armados.', 18, y);
  y += 5;
  doc.text('• CACs (Colecionadores, Atiradores e Caçadores): Transporte e porte suspensos no período eleitoral.', 18, y);
  y += 9;

  // Section 2: Proibição de Celular
  doc.setFillColor(245, 158, 11);
  doc.rect(14, y, 4, 12, 'F');
  doc.setTextColor(180, 83, 9);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('2. PROIBIÇÃO DE CELULAR E APARELHOS NA CABINE (LEI 9.504/97)', 22, y + 5);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 40, 40);
  doc.text('• Proibido entrar com celular, câmera ou radiocomunicador na cabine da urna eletrônica.', 22, y + 10);
  y += 16;
  doc.text('• O eleitor deve desligar e deixar o celular na mesa receptora com os mesários antes de votar.', 18, y);
  y += 5;
  doc.text('• Recusa: o eleitor NÃO vota. Tentativa de filmagem: condução imediata por crime eleitoral.', 18, y);
  y += 5;
  doc.text('• A "colinha" impressa ou manuscrita em papel é permitida e incentivada pela Justiça Eleitoral.', 18, y);
  y += 9;

  // Section 3: Neutralidade do Militar
  doc.setFillColor(37, 99, 235);
  doc.rect(14, y, 4, 12, 'F');
  doc.setTextColor(29, 78, 216);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('3. CONDUTAS VEDADAS AO POLICIAL MILITAR (NEUTRALIDADE ESTATAL)', 22, y + 5);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 40, 40);
  doc.text('• Proibido manifestar preferência partidária fardado ou durante a escala de serviço.', 22, y + 10);
  y += 16;
  doc.text('• VEDADO usar adesivos, broches, bandeiras na farda, colete, boné, viatura ou instalações.', 18, y);
  y += 5;
  doc.text('• VEDADO participar de passeatas, comícios, carreatas fardado ou fazer boca de urna.', 18, y);
  y += 5;
  doc.text('• VEDADO utilizar viaturas ou recursos da PMPE para beneficiar partidos ou candidatos.', 18, y);
  y += 9;

  // Section 4: Pode x Não Pode (Resumo Rápido)
  doc.setFillColor(16, 185, 129);
  doc.rect(14, y, 4, 12, 'F');
  doc.setTextColor(5, 150, 105);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('4. GUIA RÁPIDO: PODE x NÃO PODE NO DIA DO PLEITO', 22, y + 5);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 40, 40);
  doc.text('PODE: Manifestação individual silenciosa civil (broche/adesivo pequeno), colinha em papel.', 22, y + 10);
  y += 16;
  doc.text('NÃO PODE: Boca de urna, panfletagem no dia, derrame de santinhos na rua, comícios paralelos.', 18, y);
  y += 5;
  doc.text('NÃO PODE: Aglomerações com roupas padronizadas de candidatos (caracteriza ato partidário ilícito).', 18, y);
  y += 5;
  doc.text('NÃO PODE: Transporte ilegal de eleitores em veículos particulares ou contratados por políticos.', 18, y);
  y += 9;

  // Section 5: Imunidade Prisional (Art. 236)
  doc.setFillColor(99, 102, 241);
  doc.rect(14, y, 4, 12, 'F');
  doc.setTextColor(67, 56, 202);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('5. PRISÕES E IMUNIDADES (ART. 236 DO CÓDIGO ELEITORAL)', 22, y + 5);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 40, 40);
  doc.text('• 5 dias antes até 48h após: NENHUM eleitor poderá ser preso, EXCETO em flagrante delito.', 22, y + 10);
  y += 16;
  doc.text('• Candidatos: Imunidade 15 dias antes até 48h após, SALVO em flagrante delito.', 18, y);
  y += 5;
  doc.text('• Mesários e fiscais: Imunidade durante o exercício de suas funções, SALVO flagrante delito.', 18, y);
  y += 9;

  // Section 6: Contatos
  doc.setFillColor(15, 23, 42);
  doc.rect(14, y, pageWidth - 28, 22, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('CENTRAL DE APOIO OPERACIONAL - ELEIÇÕES 2026', 18, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(245, 158, 11);
  doc.text('Disque-Eleitor TRE-PE: 148  |  Ouvidoria: (81) 3194-9200  |  COPOM: 190  |  App Pardal (TSE)', 18, y + 12);
  doc.setTextColor(200, 200, 200);
  doc.text('Documento gerado pelo SisCOpI PMPE para uso operacional do efetivo em serviço.', 18, y + 17);

  // Footer
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text('Polícia Militar de Pernambuco - Segurança com Cidadania e Respeito à Democracia', pageWidth / 2, 290, { align: 'center' });

  doc.save('PMPE_Cartilha_Eleicoes_2026_Guia_Operacional.pdf');
};

// --- Full Interactive Modal Component ---
export const EleicoesCartilhaModal = ({ 
  isOpen, 
  onClose, 
  initialTab = 'todos' 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  initialTab?: string;
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialTab);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({
    armas: true,
    celular: true,
    podenaopode: true
  });
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Sync initial tab when changed
  React.useEffect(() => {
    if (initialTab) {
      setActiveCategory(initialTab);
    }
  }, [initialTab]);

  const toggleTopic = (id: string) => {
    setExpandedTopics(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    CARTILHA_TOPICS.forEach(t => { all[t.id] = true; });
    setExpandedTopics(all);
  };

  const collapseAll = () => {
    setExpandedTopics({});
  };

  const filteredTopics = useMemo(() => {
    return CARTILHA_TOPICS.filter(topic => {
      // Category match
      if (activeCategory !== 'todos' && topic.category !== activeCategory && activeCategory !== 'destaques') {
        return false;
      }
      // Search match
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        topic.title.toLowerCase().includes(term) ||
        topic.summary.toLowerCase().includes(term) ||
        topic.legalBase.toLowerCase().includes(term) ||
        topic.details.some(d => d.toLowerCase().includes(term)) ||
        (topic.dosAndDonts?.can.some(c => c.toLowerCase().includes(term)) ?? false) ||
        (topic.dosAndDonts?.cannot.some(c => c.toLowerCase().includes(term)) ?? false)
      );
    });
  }, [activeCategory, searchTerm]);

  const handleCopySummary = () => {
    const summaryText = `POLÍCIA MILITAR DE PERNAMBUCO - ORIENTAÇÕES ELEIÇÕES 2026
1. PORTE DE ARMA: Proibido a menos de 100m da votação (inclusive policial de folga).
2. CELULAR: Proibido entrar com aparelho na cabine da urna.
3. NEUTRALIDADE: Policial fardado/em serviço não pode usar propaganda nem apoiar candidatos.
4. BOCA DE URNA: Crime eleitoral flagrante no dia da eleição.
5. IMUNIDADE (ART. 236): Ninguém pode ser preso de 5 dias antes até 48h após, SALVO em flagrante delito.
Plantão TRE-PE: 148 | COPOM: 190 | App Pardal`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(summaryText);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-blue-400/40 dark:border-blue-700/60 shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto custom-scrollbar relative overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white relative">
          <div className="absolute top-0 right-0 p-16 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            title="Fechar Cartilha"
          >
            <X size={22} />
          </button>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 bg-blue-600/30 backdrop-blur-md border border-blue-400/40 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
              <Vote size={32} className="text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 border border-amber-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  CARTILHA ELEIÇÕES 2026
                </span>
                <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">
                  DPO / PMPE • DIRETRIZES DO POLICIAMENTO
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                Orientações Operacionais aos Policiais Militares
              </h2>
            </div>
          </div>
          <p className="text-blue-100/90 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
            Guia oficial de condutas legais, proibições de armamento no raio de 100 metros, vedação de celulares na cabine de votação, garantia da neutralidade institucional e procedimentos de prisão em flagrante eleitoral.
          </p>

          {/* Quick Actions Bar inside Header */}
          <div className="mt-4 pt-4 border-t border-blue-800/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => generateCartilhaEleicoesPDF()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-lg text-xs transition-colors shadow-sm active:scale-95"
                title="Gerar PDF oficial formatado da Cartilha Eleições 2026"
              >
                <Download size={13} />
                <span>Baixar Guia em PDF</span>
              </button>
              
              <button
                onClick={handleCopySummary}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg text-xs transition-colors border border-white/20 active:scale-95"
                title="Copiar pontos principais para WhatsApp ou relatório"
              >
                {copiedNotification ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span className="text-emerald-300">Copiado!</span>
                  </>
                ) : (
                  <>
                    <FileText size={13} />
                    <span>Copiar Resumo</span>
                  </>
                )}
              </button>

              <button
                onClick={() => window.print()}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-blue-200 font-bold rounded-lg text-xs transition-colors border border-blue-400/20"
                title="Imprimir cartilha na impressora"
              >
                <Printer size={13} />
                <span>Imprimir</span>
              </button>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-blue-200">
              <button 
                onClick={expandAll} 
                className="hover:underline font-semibold hover:text-white transition-colors"
              >
                Expandir Todos
              </button>
              <span>·</span>
              <button 
                onClick={collapseAll} 
                className="hover:underline font-semibold hover:text-white transition-colors"
              >
                Recolher Todos
              </button>
            </div>
          </div>
        </div>

        {/* Modal Search & Category Filter Navigation */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 space-y-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Buscar regras na cartilha (ex: arma, celular, 100m, boca de urna, prisão, farda)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 text-xs">
            {[
              { id: 'todos', label: 'Todos os Tópicos', icon: <BookOpen size={13} /> },
              { id: 'podenaopode', label: 'Pode x Não Pode (Bolso)', icon: <Scale size={13} /> },
              { id: 'armas', label: 'Porte de Armas (100m)', icon: <ShieldAlert size={13} /> },
              { id: 'celular', label: 'Sem Celular na Cabine', icon: <Smartphone size={13} /> },
              { id: 'vedacoes', label: 'Vedações ao Policial', icon: <ShieldCheck size={13} /> },
              { id: 'crimes', label: 'Crimes & Flagrantes', icon: <AlertOctagon size={13} /> },
              { id: 'garantias', label: 'Prisões & Imunidades', icon: <Lock size={13} /> },
              { id: 'procedimentos', label: 'BOPM & Encaminhamento', icon: <FileText size={13} /> },
              { id: 'contatos', label: 'Canais & Pardal', icon: <Phone size={13} /> }
            ].map(tab => {
              const active = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveCategory(tab.id); }}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 whitespace-nowrap transition-all text-xs shrink-0 ${
                    active 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-700 dark:text-slate-300">
          
          {/* Critical Highlight Box: Regra dos 100m e Celular */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/60 rounded-2xl flex items-start gap-3">
              <ShieldAlert size={22} className="text-red-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[10px] font-black text-red-700 dark:text-red-300 uppercase tracking-wider">
                  REGRA FUNDAMENTAL • ART. 141 C.E.
                </span>
                <h4 className="text-sm font-bold text-red-950 dark:text-red-100">
                  Armas Proibidas a Menos de 100m
                </h4>
                <p className="text-xs text-red-900/90 dark:text-red-200 leading-relaxed font-medium">
                  Policial militar de folga ou à paisana <strong>ao votar deve comparecer desarmado</strong>. Apenas policiais em escala formal de serviço no colégio eleitoral podem estar armados no perímetro.
                </p>
              </div>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-2xl flex items-start gap-3">
              <Smartphone size={22} className="text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[10px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                  SIGILO DO VOTO • ART. 91-A LEI 9.504/97
                </span>
                <h4 className="text-sm font-bold text-amber-950 dark:text-amber-100">
                  Vedação Absoluta de Celular na Urna
                </h4>
                <p className="text-xs text-amber-900/90 dark:text-amber-200 leading-relaxed font-medium">
                  É proibido ingressar na cabina com aparelho celular ou câmera. O aparelho deve ser entregue na mesa. A recusa impede a votação e tentativa de gravação gera prisão imediata.
                </p>
              </div>
            </div>
          </div>

          {/* Empty Search State */}
          {filteredTopics.length === 0 && (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Search size={22} />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">Nenhum resultado encontrado</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Não encontramos tópicos com o termo "{searchTerm}". Tente pesquisar por palavras como "arma", "celular", "boca de urna" ou limpe a busca.
              </p>
              <button
                onClick={() => { setSearchTerm(''); setActiveCategory('todos'); }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
              >
                Restaurar visualização completa
              </button>
            </div>
          )}

          {/* Topics List */}
          <div className="space-y-4">
            {filteredTopics.map((topic) => {
              const isExpanded = !!expandedTopics[topic.id];

              return (
                <div 
                  key={topic.id}
                  className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all hover:border-blue-400/50"
                >
                  {/* Card Header (Collapsible toggle) */}
                  <button
                    onClick={() => toggleTopic(topic.id)}
                    className="w-full p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 text-left transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0 mt-0.5 sm:mt-0">
                        {topic.icon}
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                            {topic.legalBase}
                          </span>
                          {topic.highlight && (
                            <span className="text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded">
                              {topic.highlight}
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                          {topic.title}
                        </h3>
                        {!isExpanded && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                            {topic.summary}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 text-slate-400 p-1">
                      <ChevronRight 
                        size={18} 
                        className={`transition-transform duration-200 ${isExpanded ? 'rotate-90 text-blue-600 dark:text-blue-400' : ''}`} 
                      />
                    </div>
                  </button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 space-y-4 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm animate-in fade-in-50 duration-150">
                      
                      {/* Summary callout */}
                      <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-750">
                        {topic.summary}
                      </p>

                      {/* Side by Side "Pode x Não Pode" if available */}
                      {topic.dosAndDonts && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                          {/* PODE */}
                          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-2xl space-y-2.5">
                            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-black text-xs uppercase tracking-wider">
                              <CheckCircle2 size={16} className="text-emerald-600" />
                              <span>O QUE É PERMITIDO (PODE)</span>
                            </div>
                            <ul className="space-y-2 text-xs font-medium text-emerald-950 dark:text-emerald-100/90">
                              {topic.dosAndDonts.can.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* NÃO PODE */}
                          <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 rounded-2xl space-y-2.5">
                            <div className="flex items-center gap-2 text-red-800 dark:text-red-300 font-black text-xs uppercase tracking-wider">
                              <XCircle size={16} className="text-red-600" />
                              <span>O QUE É EXPRESSAMENTE PROIBIDO (NÃO PODE)</span>
                            </div>
                            <ul className="space-y-2 text-xs font-medium text-red-950 dark:text-red-100/90">
                              {topic.dosAndDonts.cannot.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <X size={14} className="text-red-600 shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Detailed Bullet Points */}
                      <div className="space-y-2 pt-1">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                          <Info size={14} className="text-blue-500" />
                          <span>Diretrizes e Fundamentação</span>
                        </h4>
                        <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-300 list-disc list-inside">
                          {topic.details.map((detail, idx) => (
                            <li key={idx} className="leading-relaxed">
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Operational Action Protocol if present */}
                      {topic.operationalProtocol && (
                        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 rounded-xl space-y-2">
                          <h4 className="text-xs font-black uppercase tracking-wider text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                            <ShieldCheck size={14} className="text-blue-600" />
                            <span>Protocolo Prático de Ação da Guarnição PMPE</span>
                          </h4>
                          <ol className="space-y-1.5 text-xs font-medium text-blue-950 dark:text-blue-100 list-decimal list-inside">
                            {topic.operationalProtocol.map((step, idx) => (
                              <li key={idx} className="leading-relaxed">
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Emergency & Official Support Contacts */}
          <div className="p-6 bg-slate-900 text-white rounded-[2rem] border border-blue-700/50 shadow-xl space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-600 rounded-xl">
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="text-base font-black">Canais Oficiais de Plantão & Denúncias</h4>
                  <p className="text-xs text-blue-200">Justiça Eleitoral e Central de Operações da PMPE</p>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Plantão 24 Horas
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">TRE-PE Eleitor</span>
                <span className="text-lg font-black text-white">Disque 148</span>
                <p className="text-[10px] text-slate-300 mt-0.5">Dúvidas sobre locais de votação e títulos</p>
              </div>

              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">Emergência Policial</span>
                <span className="text-lg font-black text-white">190 (CIODS / PMPE)</span>
                <p className="text-[10px] text-slate-300 mt-0.5">Acionamento imediato de viaturas</p>
              </div>

              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">App Pardal (TSE)</span>
                <a 
                  href="https://www.tse.jus.br/comunicacao/noticias/2022/Agosto/pardal-ja-esta-disponivel-para-download" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs font-bold text-blue-300 hover:text-white flex items-center gap-1 mt-1"
                >
                  <span>Acessar aplicativo</span>
                  <ExternalLink size={12} />
                </a>
                <p className="text-[10px] text-slate-300 mt-0.5">Denúncias com fotos e localização</p>
              </div>

              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">Sede TRE-PE</span>
                <span className="text-xs font-bold text-white">(81) 3194-9200</span>
                <p className="text-[10px] text-slate-300 mt-0.5">Tribunal Regional Eleitoral de PE</p>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3">
            <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
              <Vote size={14} className="text-amber-500" />
              Operação Eleições 2026 • Polícia Militar de Pernambuco
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => generateCartilhaEleicoesPDF()}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Download size={14} />
                <span>Baixar em PDF</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
