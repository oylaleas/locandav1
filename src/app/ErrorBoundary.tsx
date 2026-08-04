import { Component, type ErrorInfo, type ReactNode } from 'react';
import { track } from '@/services/analytics';

interface Props {
  children: ReactNode;
  /** Recebe uma função de recuperação para renderizar a UI de erro. */
  fallback: (retry: () => void) => ReactNode;
  scope: string;
}

interface State {
  hasError: boolean;
}

/**
 * Isola falhas de render.
 * Uma tela com problema não pode derrubar o totem inteiro — o visitante
 * sempre recebe uma mensagem simples e um caminho de volta.
 * Detalhes técnicos NUNCA são exibidos.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    track({ name: 'error', scope: this.props.scope, message: error.message });
    if (import.meta.env.DEV) {
      console.error(`[${this.props.scope}]`, error, info.componentStack);
    }
  }

  private retry = () => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback(this.retry);
    }
    return this.props.children;
  }
}
