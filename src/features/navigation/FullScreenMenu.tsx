/* ==========================================================================
   FULLSCREEN MENU — navegação fullscreen premium (GSAP + SplitText)
   --------------------------------------------------------------------------
   RECONSTRUÇÃO PROFISSIONAL da navegação. Substitui por completo a antiga
   implementação (painel pill que expandia do canto) — não há código antigo
   coexistindo: um único sistema de estado, uma única timeline, uma única
   arquitetura de animação.

   Direção visual do briefing de referência preservada (menu fullscreen,
   camadas de fundo em scaleY, painel revelado por clip-path, links que
   sobem linha a linha via SplitText, hamburger → X), adaptada à identidade
   do totem (azul profundo + dourado da marca — a paleta verde do exemplo
   pertence ao site de referência, não à Locanda; aplicá-la aqui
   descaracterizaria a marca que o cliente pediu para preservar).

   Coreografia:
     CLICK → hamburger→X
           → camadas de fundo (scaleY, stagger)
           → painel revela (clip-path)
           → links primários sobem (SplitText, stagger)
           → rodapé (SplitText, stagger)
   Fechamento = reverse da MESMA timeline (sequência inversa elegante).
   ========================================================================== */

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useKioskNavigation } from '@/app/navigation';
import { ROUTES } from '@/config/kiosk';
import { useAccessibility } from '@/features/a11y/AccessibilityProvider';
import { useI18n } from '@/features/i18n/useI18n';
import { QRCodePanel } from '@/features/qr/QRCodePanel';
import { subscribeToSessionReset } from '@/features/session/resetBus';
import { getQrTarget } from '@/services/contentService';
import type { QrTarget } from '@/types/content';
import { cn } from '@/utils/cn';
import './FullScreenMenu.css';

interface MenuLink {
  key: string;
  label: string;
  onSelect: () => void;
}

export function FullScreenMenu() {
  const { t } = useI18n();
  const navigation = useKioskNavigation();
  const { motionReduced } = useAccessibility();

  const btnRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLUListElement>(null);
  const footRef = useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeQr, setActiveQr] = useState<QrTarget | undefined>();
  const [tl, setTl] = useState<gsap.core.Timeline | null>(null);
  // Trava de cliques rápidos (estado — evita leitura de refs em handlers).
  const [isAnimating, setIsAnimating] = useState(false);

  // Ref espelho lido SOMENTE no effect da timeline (lazy load do GSAP):
  // se o visitante tocar antes do carregamento, a timeline nasce aberta.
  const isOpenRef = useRef(false);
  // Instância do SplitText (recriada no resize sem acumular transforms).
  const splitRef = useRef<{ revert: () => void } | null>(null);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  /* ------------------------------------------------------- itens do menu */
  const primaryLinks: MenuLink[] = [
    {
      key: 'amenities',
      label: t.home.amenitiesCta,
      onSelect: () => navigation.push(ROUTES.contentDetail('comodidades')),
    },
    {
      key: 'happy-hour',
      label: t.home.happyHourCta,
      onSelect: () => navigation.push(ROUTES.contentDetail('happy-hour')),
    },
    {
      key: 'on-demand',
      label: t.home.onDemandCta,
      onSelect: () => navigation.push(ROUTES.contentDetail('servicos-on-demand')),
    },
    {
      key: 'wellness',
      label: t.home.wellnessCta,
      onSelect: () => navigation.push(ROUTES.wellnessIndex),
    },
    {
      key: 'tours',
      label: t.home.toursCta,
      onSelect: () => navigation.push(ROUTES.toursIndex),
    },
    {
      key: 'kite',
      label: t.home.kiteCta,
      onSelect: () => navigation.push(ROUTES.contentDetail('kite-center')),
    },
  ];

  const qrTargets = [
    getQrTarget('qr-contato'),
    getQrTarget('qr-galeria'),
    getQrTarget('qr-site'),
    getQrTarget('qr-reservas'),
  ].filter((target): target is QrTarget => Boolean(target));

  const footLinks: MenuLink[] = [
    { key: 'whatsapp', label: t.wellness.whatsapp, onSelect: () => openQr('qr-contato') },
    { key: 'instagram', label: t.wellness.instagram, onSelect: () => openQr('qr-galeria') },
    { key: 'site', label: t.home.siteCta, onSelect: () => openQr('qr-site') },
    { key: 'bookings', label: t.home.bookingsCta, onSelect: () => openQr('qr-reservas') },
  ];

  /* -------------------------------------------- abrir / fechar (estado único) */
  const close = useCallback(() => {
    if (!isOpen) return;
    setIsOpen(false);
    if (tl) {
      // Fecha animando (reverse da mesma timeline). A visibilidade é
      // desligada apenas no onReverseComplete — fechamento elegante.
      setIsAnimating(true);
      tl.reverse();
    } else {
      // GSAP ainda não carregou: fecha imediatamente (sem dead state).
      setVisible(false);
    }
  }, [isOpen, tl]);

  const toggle = useCallback(() => {
    if (isAnimating) return;
    if (isOpen) {
      close();
    } else {
      setIsOpen(true);
      setVisible(true);
      if (tl) {
        setIsAnimating(true);
        tl.play();
      }
      // Sem timeline ainda: o estado já reflete aberto e a timeline nasce
      // aberta via isOpenRef quando o GSAP terminar de carregar.
    }
  }, [isOpen, isAnimating, close, tl]);

  const go = useCallback(
    (link: MenuLink) => {
      close();
      link.onSelect();
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

  /* Carrega GSAP/SplitText somente ao abrir o menu. Antes, os dois chunks eram
     baixados durante o boot da Home, mesmo quando o visitante nunca tocava no
     hamburger — um custo desnecessário no tablet de 1 GB. */
  useEffect(() => {
    if (!visible) return undefined;

    const overlay = overlayRef.current;
    if (!overlay) return;

    const bgs = Array.from(overlay.querySelectorAll<HTMLElement>('.menu__bg'));
    const panel = overlay.querySelector<HTMLElement>('.menu__panel');
    const primaryList = primaryRef.current;
    const footList = footRef.current;
    if (!panel || !primaryList || !footList || bgs.length === 0) return;

    let cancelled = false;

    // GSAP + SplitText carregados sob demanda (chunk separado).
    void Promise.all([import('gsap'), import('gsap/SplitText')]).then(([gsapMod, splitMod]) => {
      if (cancelled) return;
      const gsapLib = gsapMod.default;
      const SplitTextLib = splitMod.SplitText;
      gsapLib.registerPlugin(SplitTextLib);

      const buildSplit = () => {
        // Reverte a instância anterior (resize) antes de recriar.
        splitRef.current?.revert();
        let split: { revert: () => void } | null = null;
        try {
          const created = SplitTextLib.create(
            [
              ...primaryList.querySelectorAll<HTMLElement>('.menu__link'),
              ...footList.querySelectorAll<HTMLElement>('.menu__link'),
            ],
            { type: 'lines', mask: 'lines', linesClass: 'menu__line' },
          );
          split = { revert: () => created.revert() };
        } catch {
          split = null; // ambiente sem layout (jsdom): segue sem máscara
        }
        splitRef.current = split;

        const primaryLines = primaryList.querySelectorAll<HTMLElement>('.menu__line');
        const footLines = footList.querySelectorAll<HTMLElement>('.menu__line');
        const allLines = [...primaryLines, ...footLines];

        // Estado inicial: linhas escondidas abaixo da máscara. Se o menu já
        // está aberto (resize durante a visita), mantém visíveis.
        gsapLib.set(allLines, { yPercent: isOpenRef.current ? 0 : 120 });
        return { primaryLines, footLines, allLines };
      };

      const { primaryLines, footLines } = buildSplit();

      const D = motionReduced ? 0.001 : 1;
      const timeline = gsapLib.timeline({ paused: true, defaults: { ease: 'power3.inOut' } });

      // 1) Camadas de fundo — scaleY em cascata (origem no topo).
      timeline.to(bgs, { scaleY: 1, duration: 0.6 * D, stagger: 0.09, ease: 'power3.inOut' }, 0);

      // 2) Painel — revelação por clip-path (overlap com as camadas).
      timeline.to(
        panel,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.7 * D,
          ease: 'power4.inOut',
        },
        0.2,
      );

      // 3) Links primários sobem linha a linha.
      timeline.to(primaryLines, { yPercent: 0, duration: 0.65 * D, stagger: 0.055, ease: 'power4.out' }, 0.75);

      // 4) Rodapé sobe depois.
      timeline.to(footLines, { yPercent: 0, duration: 0.5 * D, stagger: 0.05, ease: 'power3.out' }, 1.0);

      timeline.eventCallback('onReverseComplete', () => {
        setIsAnimating(false);
        setVisible(false);
      });
      timeline.eventCallback('onComplete', () => {
        setIsAnimating(false);
      });

      setTl(timeline);
      if (isOpenRef.current) timeline.play();
    });

    return () => {
      cancelled = true;
      splitRef.current?.revert();
      splitRef.current = null;
      setTl((current) => {
        current?.kill();
        return null;
      });
    };
  }, [motionReduced, visible]);

  /* Recalcula SplitText só enquanto o menu está visível. Resize da Home não
     deve acordar GSAP nem reconstruir nós invisíveis. */
  useEffect(() => {
    if (!visible) return undefined;
    let timer: number | undefined;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        // Recria as linhas do SplitText com o novo layout; a timeline atual
        // (se aberta) permanece válida — os seletores são reavaliados.
        const primaryList = primaryRef.current;
        const footList = footRef.current;
        if (!primaryList || !footList) return;
        splitRef.current?.revert();
        splitRef.current = null;
        void Promise.all([import('gsap'), import('gsap/SplitText')]).then(
          ([gsapMod, splitMod]) => {
            const gsapLib = gsapMod.default;
            try {
              const created = splitMod.SplitText.create(
                [
                  ...primaryList.querySelectorAll<HTMLElement>('.menu__link'),
                  ...footList.querySelectorAll<HTMLElement>('.menu__link'),
                ],
                { type: 'lines', mask: 'lines', linesClass: 'menu__line' },
              );
              splitRef.current = { revert: () => created.revert() };
            } catch {
              splitRef.current = null;
            }
            const lines = primaryList.querySelectorAll<HTMLElement>('.menu__line');
            gsapLib.set(lines, { yPercent: isOpenRef.current ? 0 : 120 });
          },
        );
      }, 250);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, [visible]);

  /* ------------------------------------- foco, Esc, session reset, scroll lock */
  useEffect(() => {
    if (!isOpen) return;

    const first = primaryRef.current?.querySelector<HTMLAnchorElement>('a');
    first?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const btn = btnRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        btn?.focus();
        return;
      }
      if (event.key === 'Tab') {
        const overlay = overlayRef.current;
        if (!overlay) return;
        const focusables = Array.from(
          overlay.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
        ).filter((el) => el.tabIndex !== -1);
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
      <button
        ref={btnRef}
        type="button"
        id="menuBtn"
        className={cn('nav-toggler', isOpen && 'nav-toggler--open')}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="menuOverlay"
        aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
      >
        <span className="nav-toggler__line" />
        <span className="nav-toggler__line" />
      </button>

      {createPortal(
        <div
          id="menuOverlay"
          ref={overlayRef}
          className={cn('menu', visible && 'menu--visible')}
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
          aria-hidden={!isOpen || undefined}
        >
          <div className="menu__bg menu__bg--1" />
          <div className="menu__bg menu__bg--2" />
          <div className="menu__bg menu__bg--3" />

          <div className="menu__panel">
            <header className="menu__head">
              <span className="menu__eyebrow">{t.home.homeEyebrow}</span>
              <h2 className="menu__title">{t.nav.menu}</h2>
            </header>

            <nav className="menu__nav" aria-label={t.nav.menu}>
              <ul className="menu__primary" ref={primaryRef}>
                {primaryLinks.map((link) => (
                  <li key={link.key}>
                    <a
                      href="#"
                      className="menu__link menu__link--primary"
                      onClick={(event) => {
                        event.preventDefault();
                        go(link);
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <footer className="menu__foot">
                <p className="menu__foot-label">{t.wellness.contactTitle}</p>
                <ul className="menu__foot-list" ref={footRef}>
                  {footLinks.map((link) => (
                    <li key={link.key}>
                      <a
                        href="#"
                        className="menu__link menu__link--foot"
                        onClick={(event) => {
                          event.preventDefault();
                          go(link);
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </footer>
            </nav>
          </div>
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
