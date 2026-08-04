/* ==========================================================================
   BEM-ESTAR — DADOS CENTRALIZADOS
   --------------------------------------------------------------------------
   Conteúdo fornecido pelo responsável (referência em imagem). Nenhum texto
   comercial vive em componentes: edite aqui para alterar preços, horários,
   descrições, contatos e QR codes sem tocar na UI.

   ⚠️  NÃO foram inventadas alegações médicas, eficácia garantida, diagnósticos
       nem relação comercial específica com a Locanda. O Espaço Onoda é
       apresentado pelo próprio nome, no contexto do totem.

   🔤  EN/IT: traduções do conteúdo original em pt-BR, mantendo os mesmos
       fatos. [TRADUÇÃO A VALIDAR PELO RESPONSÁVEL]
   ========================================================================== */

import type { QrTarget } from '@/types/content';
import type { WellnessPartner } from '@/types/wellness';

export const WELLNESS_PARTNERS: WellnessPartner[] = [
  {
    id: 'espaco-onoda',
    name: {
      'pt-BR': 'Espaço Onoda',
      en: 'Espaço Onoda',
      it: 'Espaço Onoda',
    },
    tagline: {
      'pt-BR': 'Massagem & Acupuntura',
      en: 'Massage & Acupuncture',
      it: 'Massaggio & Agopuntura',
    },
    description: {
      'pt-BR':
        'Massagens, terapias e momentos de cuidado para relaxamento, alívio de tensões e bem-estar.',
      en: 'Massages, therapies and moments of care for relaxation, tension relief and well-being.',
      it: 'Massaggi, terapie e momenti di cura per il relax, il sollievo dalle tensioni e il benessere.',
    },
    notes: 'Relação comercial com a Locanda não informada — texto mantido neutro. [RELAÇÃO A VALIDAR]',
    services: [
      {
        id: 'massagem-relaxante',
        name: {
          'pt-BR': 'Massagem Relaxante',
          en: 'Relaxing Massage',
          it: 'Massaggio Rilassante',
        },
        duration: {
          'pt-BR': '55 min — corpo completo',
          en: '55 min — full body',
          it: '55 min — corpo intero',
        },
        summary: {
          'pt-BR': 'Corpo completo. Auxilia na diminuição do estresse diário.',
          en: 'Full body. Helps reduce everyday stress.',
          it: 'Corpo intero. Aiuta a ridurre lo stress quotidiano.',
        },
        description: {
          'pt-BR':
            'Massagem relaxante — corpo completo (55 min). Auxilia na diminuição do estresse diário. Toque leve que estimula a circulação sanguínea e o relaxamento.',
          en: 'Relaxing massage — full body (55 min). Helps reduce everyday stress. Light touch that stimulates blood circulation and relaxation.',
          it: 'Massaggio rilassante — corpo intero (55 min). Aiuta a ridurre lo stress quotidiano. Tocco leggero che stimola la circolazione sanguigna e il rilassamento.',
        },
      },
      {
        id: 'massagem-desportiva',
        name: {
          'pt-BR': 'Massagem Desportiva',
          en: 'Sports Massage',
          it: 'Massaggio Sportivo',
        },
        duration: {
          'pt-BR': '55 min — corpo completo',
          en: '55 min — full body',
          it: '55 min — corpo intero',
        },
        summary: {
          'pt-BR': 'Corpo completo. Focada na liberação da musculatura, pré ou pós-esporte.',
          en: 'Full body. Focused on muscle release, pre- or post-sport.',
          it: 'Corpo intero. Focalizzata sul rilascio muscolare, pre o post sport.',
        },
        description: {
          'pt-BR':
            'Massagem desportiva — corpo completo (55 min). Focada na liberação da musculatura, pré ou pós-esporte. Massagem com pressão forte que estimula a musculatura a se regenerar. Massagem associada a alongamentos.',
          en: 'Sports massage — full body (55 min). Focused on muscle release, pre- or post-sport. Firm-pressure massage that stimulates muscle regeneration. Massage combined with stretching.',
          it: 'Massaggio sportivo — corpo intero (55 min). Focalizzato sul rilascio muscolare, pre o post sport. Massaggio a pressione decisa che stimola la rigenerazione muscolare. Massaggio associato allo stretching.',
        },
      },
      {
        id: 'massagem-terapeutica',
        name: {
          'pt-BR': 'Massagem Terapêutica',
          en: 'Therapeutic Massage',
          it: 'Massaggio Terapeutico',
        },
        duration: {
          'pt-BR': '55 min',
          en: '55 min',
          it: '55 min',
        },
        summary: {
          'pt-BR': 'Área específica do corpo, para tratamento de dores e pontos de tensão.',
          en: 'Specific area of the body, for treating pain and tension points.',
          it: 'Area specifica del corpo, per il trattamento di dolori e punti di tensione.',
        },
        description: {
          'pt-BR':
            'Massagem terapêutica (55 min). Massagem em área específica do corpo, para tratamento de dores, pontos de tensão e liberação muscular local.',
          en: 'Therapeutic massage (55 min). Massage on a specific area of the body, for treating pain, tension points and local muscle release.',
          it: 'Massaggio terapeutico (55 min). Massaggio su un’area specifica del corpo, per il trattamento di dolori, punti di tensione e rilascio muscolare locale.',
        },
      },
      {
        id: 'ventosas',
        name: {
          'pt-BR': 'Ventosas',
          en: 'Cupping',
          it: 'Coppettazione',
        },
        summary: {
          'pt-BR':
            'Método de tratamento para relaxamento muscular, liberação de tensões e equilíbrio energético.',
          en: 'Treatment method for muscle relaxation, tension release and energy balance.',
          it: 'Metodo di trattamento per il rilassamento muscolare, il rilascio delle tensioni e l’equilibrio energetico.',
        },
        description: {
          'pt-BR':
            'Ventosas. Método de tratamento para relaxamento muscular, liberação de tensões e equilíbrio energético.',
          en: 'Cupping. Treatment method for muscle relaxation, tension release and energy balance.',
          it: 'Coppettazione. Metodo di trattamento per il rilassamento muscolare, il rilascio delle tensioni e l’equilibrio energetico.',
        },
      },
      {
        id: 'acupuntura',
        name: {
          'pt-BR': 'Acupuntura',
          en: 'Acupuncture',
          it: 'Agopuntura',
        },
        duration: {
          'pt-BR': '50 min',
          en: '50 min',
          it: '50 min',
        },
        summary: {
          'pt-BR':
            'Método de tratamento para melhorar dores, equilíbrio energético e liberação de pontos de tensão muscular.',
          en: 'Treatment method to improve pain, energy balance and release of muscle tension points.',
          it: 'Metodo di trattamento per migliorare i dolori, l’equilibrio energetico e il rilascio dei punti di tensione muscolare.',
        },
        description: {
          'pt-BR':
            'Acupuntura (50 min). Método de tratamento para melhorar dores, equilíbrio energético e liberação de pontos de tensão muscular.',
          en: 'Acupuncture (50 min). Treatment method to improve pain, energy balance and release of muscle tension points.',
          it: 'Agopuntura (50 min). Metodo di trattamento per migliorare i dolori, l’equilibrio energetico e il rilascio dei punti di tensione muscolare.',
        },
      },
      {
        id: 'dry-needling',
        name: {
          'pt-BR': 'Dry Needling',
          en: 'Dry Needling',
          it: 'Dry Needling',
        },
        summary: {
          'pt-BR':
            'Técnica de agulhamento local em pontos de tensão muscular. Dry Needling associada a massagem local.',
          en: 'Local needling technique on muscle tension points. Dry Needling combined with local massage.',
          it: 'Tecnica di aghi locali sui punti di tensione muscolare. Dry Needling associata a massaggio locale.',
        },
        description: {
          'pt-BR':
            'Dry Needling. Técnica de agulhamento local em pontos de tensão muscular. Dry Needling associada a massagem local.',
          en: 'Dry Needling. Local needling technique on muscle tension points. Dry Needling combined with local massage.',
          it: 'Dry Needling. Tecnica di aghi locali sui punti di tensione muscolare. Dry Needling associata a massaggio locale.',
        },
      },
      {
        id: 'quiropraxia',
        name: {
          'pt-BR': 'Quiropraxia',
          en: 'Chiropractic',
          it: 'Chiropratica',
        },
        summary: {
          'pt-BR':
            'Técnica manual de ajuste das articulações do corpo. Quiropraxia associada a massagem.',
          en: 'Manual technique for adjusting body joints. Chiropractic combined with massage.',
          it: 'Tecnica manuale di regolazione delle articolazioni del corpo. Chiropratica associata a massaggio.',
        },
        description: {
          'pt-BR':
            'Quiropraxia. Técnica manual de ajuste das articulações do corpo. Quiropraxia associada a massagem.',
          en: 'Chiropractic. Manual technique for adjusting body joints. Chiropractic combined with massage.',
          it: 'Chiropratica. Tecnica manuale di regolazione delle articolazioni del corpo. Chiropratica associata a massaggio.',
        },
      },
      {
        id: 'wellness-day',
        name: {
          'pt-BR': 'Wellness Day — Combo',
          en: 'Wellness Day — Combo',
          it: 'Wellness Day — Combo',
        },
        duration: {
          'pt-BR': '1h30',
          en: '1h30',
          it: '1h30',
        },
        summary: {
          'pt-BR': 'Escalda-pés e massagem relaxante corporal.',
          en: 'Foot bath and relaxing full-body massage.',
          it: 'Pediluvio e massaggio rilassante corpo intero.',
        },
        description: {
          'pt-BR':
            'Wellness Day — combo (1h30). Uma experiência de cuidado completa: escalda-pés e massagem relaxante corporal.',
          en: 'Wellness Day — combo (1h30). A complete care experience: foot bath and relaxing full-body massage.',
          it: 'Wellness Day — combo (1h30). Un’esperienza di cura completa: pediluvio e massaggio rilassante corpo intero.',
        },
        includes: [
          {
            'pt-BR': 'Escalda-pés',
            en: 'Foot bath',
            it: 'Pediluvio',
          },
          {
            'pt-BR': 'Massagem relaxante corporal',
            en: 'Relaxing full-body massage',
            it: 'Massaggio rilassante corpo intero',
          },
        ],
      },
    ],
    contact: {
      whatsapp: '+55 (88) 99630-9247',
      // Derivado com segurança do número informado (55 + DDD 88 + número).
      whatsappUrl: 'https://wa.me/5588996309247',
      instagram: '@espaco_onoda',
      // Derivado com segurança do handle informado.
      instagramUrl: 'https://instagram.com/espaco_onoda',
    },
    qrTargets: [
      {
        id: 'onoda-whatsapp',
        url: 'https://wa.me/5588996309247',
        isPlaceholder: false,
        title: {
          'pt-BR': 'WhatsApp do Espaço Onoda',
          en: 'Espaço Onoda on WhatsApp',
          it: 'WhatsApp di Espaço Onoda',
        },
        instruction: {
          'pt-BR': 'Aponte a câmera do seu celular para abrir a conversa.',
          en: 'Point your phone camera at the code to open the chat.',
          it: 'Inquadra il codice con la fotocamera per aprire la chat.',
        },
        destinationLabel: {
          'pt-BR': 'WhatsApp — +55 (88) 99630-9247',
          en: 'WhatsApp — +55 (88) 99630-9247',
          it: 'WhatsApp — +55 (88) 99630-9247',
        },
      },
      {
        id: 'onoda-instagram',
        url: 'https://instagram.com/espaco_onoda',
        isPlaceholder: false,
        title: {
          'pt-BR': 'Instagram do Espaço Onoda',
          en: 'Espaço Onoda on Instagram',
          it: 'Instagram di Espaço Onoda',
        },
        instruction: {
          'pt-BR': 'Aponte a câmera do seu celular para abrir o perfil.',
          en: 'Point your phone camera at the code to open the profile.',
          it: 'Inquadra il codice con la fotocamera per aprire il profilo.',
        },
        destinationLabel: {
          'pt-BR': 'Instagram — @espaco_onoda',
          en: 'Instagram — @espaco_onoda',
          it: 'Instagram — @espaco_onoda',
        },
      },
    ] satisfies QrTarget[],
  },
];
