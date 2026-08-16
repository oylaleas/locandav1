import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ErrorBoundary } from './ErrorBoundary';
import { useKioskNavigation } from './navigation';
import { ErrorState, LoadingState } from '@/components/states/StateMessage';
import { ROUTES } from '@/config/kiosk';
import { useI18n } from '@/features/i18n/useI18n';
import { useSession } from '@/features/session/SessionProvider';
import { TimeoutModal } from '@/features/session/TimeoutModal';
import { onServiceWorkerUpdate } from '@/services/serviceWorker';
import { track } from '@/services/analytics';
import styles from './AppShell.module.css';

// Code splitting por rota: o boot do totem carrega apenas o essencial.
const HomePage = lazy(() => import('@/pages/HomePage'));
const ContentIndexPage = lazy(() => import('@/pages/ContentIndexPage'));
const ContentDetailPage = lazy(() => import('@/pages/ContentDetailPage'));
const WellnessIndexPage = lazy(() => import('@/pages/WellnessIndexPage'));
const WellnessPartnerPage = lazy(() => import('@/pages/WellnessPartnerPage'));
const ToursIndexPage = lazy(() => import('@/pages/ToursIndexPage'));
const TourDetailPage = lazy(() => import('@/pages/TourDetailPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function ScreenViewTracker() {
  const location = useLocation();
  useEffect(() => {
    track({ name: 'screen_view', path: location.pathname });
  }, [location.pathname]);
  return null;
}

export function AppShell() {
  const { t } = useI18n();
  const session = useSession();
  const navigation = useKioskNavigation();
  const location = useLocation();
  const [updateReady, setUpdateReady] = useState<(() => void) | null>(null);
  const applyUpdateRef = useRef<(() => void) | null>(null);

  // Atualizações do Service Worker nunca interrompem uma visita: aplicamos
  // apenas quando o visitante está na Home (momento de "descanso").
  useEffect(() => {
    onServiceWorkerUpdate((apply) => {
      applyUpdateRef.current = apply;
      setUpdateReady(() => apply);
    });
  }, []);

  useEffect(() => {
    if (location.pathname === ROUTES.home && updateReady && applyUpdateRef.current) {
      const apply = applyUpdateRef.current;
      applyUpdateRef.current = null;
      setUpdateReady(null);
      apply();
    }
  }, [location.pathname, updateReady]);

  return (
    <div className={styles.root}>
      <ScreenViewTracker />

      {/*
        A árvore da aplicação é remontada a cada sessão (key = sessionId):
        garante que nenhum estado temporário do visitante anterior sobreviva
        ao reset (inatividade, "encerrar", Início).
      */}
      <div key={session.sessionId} className={styles.appLayer}>
        <ErrorBoundary
          scope="app-shell"
          fallback={(retry) => (
            <div className={styles.errorWrapper}>
              <ErrorState
                onRetry={retry}
                onHome={() => {
                  retry();
                  navigation.home();
                }}
              />
            </div>
          )}
        >
          <Suspense fallback={<LoadingState label={t.app.loading} />}>
            <Routes>
              <Route path="/" element={<Navigate to={ROUTES.home} replace />} />
              <Route path={ROUTES.home} element={<HomePage />} />
              <Route path={ROUTES.contentIndex} element={<ContentIndexPage />} />
              <Route path={`${ROUTES.contentIndex}/:slug`} element={<ContentDetailPage />} />
              <Route path={ROUTES.wellnessIndex} element={<WellnessIndexPage />} />
              <Route path={`${ROUTES.wellnessIndex}/:partnerId`} element={<WellnessPartnerPage />} />
              <Route path={ROUTES.toursIndex} element={<ToursIndexPage />} />
              <Route path={`${ROUTES.toursIndex}/:slug`} element={<TourDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>

      <TimeoutModal />
    </div>
  );
}
