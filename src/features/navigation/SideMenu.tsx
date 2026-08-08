/* ==========================================================================
   SIDE MENU — menu lateral animado (estilo "Awwwards")
   --------------------------------------------------------------------------
   Adaptação do script GSAP fornecido para o React/totem:

   - Uma ÚNICA timeline GSAP pausada; clique → tl.play() (abre),
     clique de novo → tl.reverse() (fecha reproduzindo ao contrário);
   - Mesmos elementos do script: #menuPanel, #btnSlider, #nav,
     .nav__link, .nav__footer-link, #menuBtn;
   - Adições "inteligentes" para o totem: focus trap, Esc fecha, backdrop
     clicável, fecha no session reset e ao navegar, reduz movimento
     (durations ~0) e handoff mobile via QR.
   ========================================================================== */

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useKioskNavigation } from '@/app/navigation';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { ROUTES } from '@/config/kiosk';
import { useAccessibility } from '@/features/a11y/AccessibilityProvider';
import { useI18n } from '@/features/i18n/useI18n';
import { QRCodePanel } from '@/features/qr/QRCodePanel';
import { subscribeToSessionReset } from '@/features/session/resetBus';
import { getQrTarget } from '@/services/contentService';
import type { IconName, QrTarget } from '@/types/content';
import { cn } from '@/utils/cn';
import './SideMenu.css';

interface MenuItem {
  key: string;
  icon: IconName;
  label: string;
  to: () => void;
}

/** Parâmetros para construir a timeline (elementos já montados). */
interface BuildTimelineParams {
  panel: HTMLDivElement;
  slider: HTMLSpanElement;
  nav: HTMLElement;
  links: HTMLButtonElement[];
  footerLinks: HTMLButtonElement[];
  reduced: boolean;
  onReady: (tl: gsap.core.Timeline) => void;
}

/**
 * Constrói a ÚNICA timeline pausada do menu, fiel ao script fornecido:
 * painel expande → botão desliza → nav visível → links flip 3D em cascata
 * → footer sobe com fade. Ao reverter por completo, o nav volta a ficar
 * inerte. Com "reduzir animações", tudo dura ~0 (instantâneo).
 */
function buildTimeline(gsapLib: typeof import('gsap')['default'], params: BuildTimelineParams) {
  const { panel, slider, nav, links, footerLinks, reduced, onReady } = params;
  // "Reduzir animações" do totem: tudo instantâneo, sem quebrar o fluxo.
  const D = reduced ? 0.001 : 1;

  const tl = gsapLib.timeline({ paused: true, defaults: { ease: 'power3.inOut' } });

  // 👉 PAINEL EXPANDE — cresce do canto inferior direito (vem do botão).
  tl.to(
    panel,
    {
      width: 480,
      height: 650,
      bottom: -25,
      right: -25,
      borderRadius: 25,
      duration: 0.75 * D,
    },
    0,
  );

  // 👉 BOTÃO DESLIZA — revela o rótulo "Fechar" (top: -100%).
  tl.to(slider, { top: '-100%', duration: 0.5 * D }, 0);

  // 👉 NAV VISÍVEL — a classe entra pouco depois do painel começar a crescer.
  // (a visibilidade do painel em si é controlada pelo React via isOpen;
  //  esta classe apenas libera o pointer-events dos links durante a abertura)
  tl.add(() => {
    nav.classList.add('nav--visible');
  }, 0.2);

  // 👉 LINKS — estado inicial (invisíveis, rotacionados 90°, abaixo).
  tl.set(
    links,
    {
      opacity: 0,
      rotateX: 90,
      y: 80,
      x: -20,
      transformPerspective: 300,
      transformOrigin: 'bottom',
    },
    0,
  );

  // 👉 LINKS — entram com flip 3D + cascata (stagger).
  tl.to(
    links,
    {
      opacity: 1,
      rotateX: 0,
      y: 0,
      x: 0,
      duration: 0.65 * D,
      ease: 'back.out(1.2)',
      stagger: 0.1,
    },
    0.5,
  );

  // 👉 FOOTER — estado inicial (escondido, um pouco abaixo).
  tl.set(footerLinks, { opacity: 0, y: 20 }, 0);

  // 👉 FOOTER — sobe com fade, depois dos links principais.
  tl.to(
    footerLinks,
    {
      opacity: 1,
      y: 0,
      duration: 0.5 * D,
      ease: 'power2.out',
      stagger: 0.1,
    },
    0.75,
  );

  // 👉 Cleanup ao fechar: nav volta a ficar inerte (pointer-events: none).
  tl.eventCallback('onReverseComplete', () => {
    nav.classList.remove('nav--visible');
  });

  onReady(tl);
}

export function SideMenu() {
  const { t } = useI18n();
  const navigation = useKioskNavigation();
  const { motionReduced } = useAccessibility();

  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const sliderRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const footerListRef = useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeQr, setActiveQr] = useState<QrTarget | undefined>();
  // Timeline GSAP única e pausada — em estado (não ref) para manter a
  // análise de refs do React Compiler feliz: closures podem chamá-la.
  const [tl, setTl] = useState<gsap.core.Timeline | null>(null);

  /* ------------------------------------------------------- itens do menu */
  const mainItems: MenuItem[] = [
    {
      key: 'amenities',
      icon: 'wifi',
      label: t.home.amenitiesCta,
      to: () => navigation.push(ROUTES.contentDetail('comodidades')),
    },
    {
      key: 'happy-hour',
      icon: 'cocktail',
      label: t.home.happyHourCta,
      to: () => navigation.push(ROUTES.contentDetail('happy-hour')),
    },
    {
      key: 'on-demand',
      icon: 'bell',
      label: t.home.onDemandCta,
      to: () => navigation.push(ROUTES.contentDetail('servicos-on-demand')),
    },
    {
      key: 'wellness',
      icon: 'spa',
      label: t.home.wellnessCta,
      to: () => navigation.push(ROUTES.wellnessIndex),
    },
    {
      key: 'tours',
      icon: 'compass',
      label: t.home.toursCta,
      to: () => navigation.push(ROUTES.toursIndex),
    },
    {
      key: 'kite',
      icon: 'kite',
      label: t.home.kiteCta,
      to: () => navigation.push(ROUTES.contentDetail('kite-center')),
    },
  ];

  const qrTargets = [
    getQrTarget('qr-contato'),
    getQrTarget('qr-galeria'),
    getQrTarget('qr-site'),
    getQrTarget('qr-reservas'),
  ].filter((target): target is QrTarget => Boolean(target));

  const footerItems: MenuItem[] = [
    {
      key: 'whatsapp',
      icon: 'chat',
      label: t.wellness.whatsapp,
      to: () => openQr('qr-contato'),
    },
    {
      key: 'instagram',
      icon: 'instagram',
      label: t.wellness.instagram,
      to: () => openQr('qr-galeria'),
    },
    {
      key: 'site',
      icon: 'globe',
      label: t.home.siteCta,
      to: () => openQr('qr-site'),
    },
    {
      key: 'bookings',
      icon: 'bed',
      label: t.home.bookingsCta,
      to: () => openQr('qr-reservas'),
    },
  ];

  /* ------------------------------------------------- fechar (com reversão) */
  const close = useCallback(() => {
    if (isOpen) tl?.reverse();
    setIsOpen(false);
  }, [isOpen, tl]);

  const toggle = useCallback(() => {
    if (isOpen) {
      tl?.reverse();
      setIsOpen(false);
    } else {
      tl?.play();
      setIsOpen(true);
    }
  }, [isOpen, tl]);

  const go = useCallback(
    (to: () => void) => {
      close();
      to();
    },
    [close],
  );

  const openQr = useCallback(
    (id: string) => {
      const target = qrTargets.find((item) => item.id === id);
      if (!target) return;
      close();
      setActiveQr(target);
    },
    [qrTargets, close],
  );

  /* ------------------------------------------- timeline GSAP (uma só, pausada) */
  useEffect(() => {
    const panel = panelRef.current;
    const slider = sliderRef.current;
    const nav = navRef.current;
    const links = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>('.nav__link') ?? [],
    );
    const footerLinks = Array.from(
      footerListRef.current?.querySelectorAll<HTMLButtonElement>('.nav__footer-link') ?? [],
    );
    if (!panel || !slider || !nav || links.length === 0) return;

    // GSAP carregado sob demanda (chunk separado) — o boot do totem não
    // carrega a lib de animação até o menu existir de fato.
    let cancelled = false;
    void import('gsap').then(({ default: gsapLib }) => {
      if (cancelled) return;
      buildTimeline(gsapLib, {
        panel,
        slider,
        nav,
        links,
        footerLinks,
        reduced: motionReduced,
        onReady: setTl,
      });
    });

    return () => {
      cancelled = true;
      setTl((current) => {
        current?.kill();
        return null;
      });
    };
  }, [motionReduced]);

  /* ------------------------------------------- foco, Esc, session reset */
  useEffect(() => {
    if (!isOpen) return;

    const first = listRef.current?.querySelector<HTMLButtonElement>('.nav__link');
    first?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const btn = btnRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        btnRef.current?.focus();
        return;
      }
      if (event.key === 'Tab') {
        // Focus trap simples: cicla entre os controles do painel.
        const panel = panelRef.current;
        if (!panel) return;
        const focusables = Array.from(
          panel.querySelectorAll<HTMLElement>('button:not([tabindex="-1"])'),
        ).filter((el) => !el.hasAttribute('disabled'));
        if (focusables.length === 0) return;
        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && active === firstEl) {
          event.preventDefault();
          lastEl.focus();
        } else if (!event.shiftKey && active === lastEl) {
          event.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);

    // Reset da sessão (timeout/inatividade) fecha o menu.
    const unsubscribe = subscribeToSessionReset(() => close());

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      unsubscribe();
      document.body.style.overflow = previous;
      btn?.focus();
    };
  }, [isOpen, close]);

  /* ------------------------------------------------------------- render */
  return (
    <>
      <Button
        ref={btnRef}
        id="menuBtn"
        variant="quiet"
        size="md"
        icon={isOpen ? 'close' : 'menu'}
        onClick={toggle}
        disableTapGuard
        aria-expanded={isOpen}
        aria-controls="menuPanel"
        aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
      >
        <span id="btnSlider" ref={sliderRef} className="btn-slider">
          <span>{t.nav.menuLabel}</span>
          <span>{t.nav.close}</span>
        </span>
      </Button>

      {createPortal(
        <div
          className={cn('menu-backdrop', isOpen && 'menu-backdrop--visible')}
          onClick={close}
          aria-hidden="true"
        />,
        document.body,
      )}

      {createPortal(
        <div
          id="menuPanel"
          ref={panelRef}
          className={cn('menu-panel', isOpen && 'menu-panel--open')}
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
          aria-hidden={!isOpen || undefined}
        >
          <header className="menu-panel__head">
            <span className="menu-panel__eyebrow">{t.home.experienceHubTitle}</span>
            <h2 className="menu-panel__title">{t.nav.menu}</h2>
          </header>

          <nav id="nav" ref={navRef} aria-label={t.nav.menu}>
            <ul className="nav__list" ref={listRef}>
              {mainItems.map((item, index) => (
                <li key={item.key}>
                  <button
                    type="button"
                    className="nav__link"
                    tabIndex={isOpen ? 0 : -1}
                    onClick={() => go(item.to)}
                  >
                    <span className="nav__link--num">{String(index + 1).padStart(2, '0')}</span>
                    <Icon name={item.icon} size="1.6rem" />
                    <span className="nav__link--label">{item.label}</span>
                    <Icon name="arrow-right" size="1.4rem" className="nav__link--arrow" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <footer className="menu-panel__foot">
            <p className="menu-panel__foot-label">{t.wellness.contactTitle}</p>
            <ul className="nav__footer" ref={footerListRef}>
              {footerItems.map((item) => (
                <li key={item.key}>
                  <button
                    type="button"
                    className="nav__footer-link"
                    tabIndex={isOpen ? 0 : -1}
                    onClick={() => go(item.to)}
                  >
                    <Icon name={item.icon} size="1.3rem" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </footer>
        </div>,
        document.body,
      )}

      {qrTargets.map((target) => (
        <QRCodePanel
          key={target.id}
          target={target}
          open={activeQr?.id === target.id}
          onClose={() => setActiveQr(undefined)}
        />
      ))}
    </>
  );
}
