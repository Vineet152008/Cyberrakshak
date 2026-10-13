import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import i18n from '../../i18n';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CyberRakshak UI Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-2xl border border-[rgba(244,63,94,0.3)] bg-[#0D1322] space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[rgba(244,63,94,0.15)] flex items-center justify-center text-[#F43F5E]">
              <AlertTriangle className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-bold font-display text-[#F8FAFC]">
              {i18n.t('common.errorTitle')}
            </h2>
            <p className="text-sm text-[#94A3B8]">
              {i18n.t('common.errorDesc')}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C9A96E] text-[#070B14] font-semibold text-sm hover:bg-[#E4D1A8] transition-colors cursor-pointer focus-visible:outline-[#C9A96E]"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              <span>{i18n.t('common.errorReload')}</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
