import { HOME_MEDIA } from '@/data/homeMedia';

/** Poster leve da Home, carregado antes do iframe externo do Vimeo. */
export function getHomeAmbientVideoPoster(): string {
  return HOME_MEDIA.ambientVideoPosterThumb;
}
