/* ==========================================================================
   TOURS SERVICE
   --------------------------------------------------------------------------
   Porta de entrada para os dados de experiências e passeios.
   Mesma convenção do contentService: hoje lê dados locais tipados; amanhã
   pode ler CMS/API mantendo as assinaturas.
   ========================================================================== */

import { TOURS } from '@/data/tours';
import type { Tour, TourOption } from '@/types/tours';

/** Formata o valor na moeda exibida (ex.: 370 → "R$ 370"). */
export function formatTourPrice(price: number, currency: 'BRL' = 'BRL'): string {
  if (currency === 'BRL') return `R$ ${price}`;
  return `${price} ${currency}`;
}

export function getTours(): Tour[] {
  return TOURS;
}

export function getTourBySlug(slug: string | undefined): Tour | undefined {
  if (!slug) return undefined;
  return TOURS.find((tour) => tour.slug === slug);
}

export function getTourOption(tour: Tour, id: string | undefined): TourOption | undefined {
  if (!id || !tour.options) return undefined;
  return tour.options.find((option) => option.id === id);
}
