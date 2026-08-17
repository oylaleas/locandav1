/* ==========================================================================
   WELLNESS SERVICE
   --------------------------------------------------------------------------
   Porta de entrada para os dados de bem-estar (Espaço Onoda).
   Mesma convenção do contentService: hoje lê dados locais tipados; amanhã
   pode ler CMS/API mantendo as assinaturas.
   ========================================================================== */

import { WELLNESS_PARTNERS } from '@/data/wellness';
import type { WellnessPartner, WellnessService } from '@/types/wellness';

export function getWellnessPartners(): WellnessPartner[] {
  return WELLNESS_PARTNERS;
}

export function getWellnessPartner(id: string | undefined): WellnessPartner | undefined {
  if (!id) return undefined;
  return WELLNESS_PARTNERS.find((partner) => partner.id === id);
}

export function getWellnessService(
  partner: WellnessPartner,
  id: string | undefined,
): WellnessService | undefined {
  if (!id) return undefined;
  return partner.services.find((service) => service.id === id);
}
