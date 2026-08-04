import type { ReactNode } from 'react';
import { KioskNavigationProvider } from './navigation';
import { AccessibilityProvider } from '@/features/a11y/AccessibilityProvider';
import { I18nProvider } from '@/features/i18n/I18nProvider';
import { MediaProvider } from '@/features/media/MediaProvider';
import { SessionProvider } from '@/features/session/SessionProvider';

/**
 * Ordem dos providers (de fora para dentro):
 *  I18n           → textos disponíveis para todos
 *  Accessibility  → aplica tokens de contraste/escala no <html>
 *  Media          → controla o player único e o estado de áudio
 *  Session        → depende de Media (mídia ativa suspende a inatividade)
 *  KioskNavigation→ depende de Media (Início interrompe vídeos) e do Router
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <AccessibilityProvider>
        <MediaProvider>
          <SessionProvider>
            <KioskNavigationProvider>{children}</KioskNavigationProvider>
          </SessionProvider>
        </MediaProvider>
      </AccessibilityProvider>
    </I18nProvider>
  );
}
