/* ==========================================================================
   CONTENT SERVICE
   --------------------------------------------------------------------------
   Única porta de entrada para conteúdo e mídia.
   Hoje lê dados locais tipados (src/data). Amanhã pode ler JSON, CMS ou API
   sem que nenhum componente precise mudar: basta trocar a implementação
   destas funções (mantendo as assinaturas).
   ========================================================================== */

import {
  CONTENT_SECTIONS,
  GALLERIES,
  QR_TARGETS,
  SITE_IDENTITY,
} from '@/data/content';
import { IMAGE_ASSETS, VIDEO_ASSETS } from '@/data/media';
import type { ContentSection, GalleryDefinition, QrTarget, SiteIdentity } from '@/types/content';
import type { ImageAsset, VideoAsset } from '@/types/media';

const imageIndex = IMAGE_ASSETS as Record<string, ImageAsset>;
const videoIndex = VIDEO_ASSETS as Record<string, VideoAsset>;

export function getSiteIdentity(): SiteIdentity {
  return SITE_IDENTITY;
}

export function getSections(): ContentSection[] {
  return [...CONTENT_SECTIONS].sort((a, b) => a.order - b.order);
}

export function getSectionBySlug(slug: string | undefined): ContentSection | undefined {
  if (!slug) return undefined;
  return CONTENT_SECTIONS.find((section) => section.slug === slug);
}

export function getRelatedSections(section: ContentSection): ContentSection[] {
  return section.relatedSlugs
    .map((slug) => getSectionBySlug(slug))
    .filter((value): value is ContentSection => Boolean(value));
}

export function getImage(id: string | undefined): ImageAsset | undefined {
  if (!id) return undefined;
  return imageIndex[id];
}

export function getImages(ids: readonly string[]): ImageAsset[] {
  return ids.map((id) => getImage(id)).filter((value): value is ImageAsset => Boolean(value));
}

export function getVideo(id: string | undefined): VideoAsset | undefined {
  if (!id) return undefined;
  return videoIndex[id];
}

export function getVideos(ids: readonly string[]): VideoAsset[] {
  return ids.map((id) => getVideo(id)).filter((value): value is VideoAsset => Boolean(value));
}

export function getGalleries(): GalleryDefinition[] {
  return GALLERIES;
}

export function getGallery(id: string): GalleryDefinition | undefined {
  return GALLERIES.find((gallery) => gallery.id === id);
}

export function getMainGallery(): GalleryDefinition | undefined {
  return GALLERIES[0];
}

export function getQrTarget(id: string | undefined): QrTarget | undefined {
  if (!id) return undefined;
  return QR_TARGETS.find((target) => target.id === id);
}

/** Vídeo usado pelo Attract Mode (pode não existir — a UI trata o fallback). */
export function getAttractVideo(): VideoAsset | undefined {
  return getVideo('video-attract');
}

export function getAttractImages(): ImageAsset[] {
  return getImages(['img-attract', 'img-01', 'img-05']);
}
