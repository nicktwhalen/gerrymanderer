'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { CSS_CLASSES } from '@/config/constants';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Game error caught by boundary:', error, errorInfo);

    // In a production app, you might want to log this to an error reporting service
    if (typeof window !== 'undefined') {
      try {
        // Clear potentially corrupted localStorage data
        localStorage.removeItem('gerrymander-tutorial-seen');
      } catch (e) {
        console.error('Failed to clear localStorage:', e);
      }
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
        // className={`${CSS_CLASSES.COMIC.BG} flex flex-col items-center justify-center min-h-screen p-4`}
        >
          <div
          // className={`${CSS_CLASSES.COMIC.INSTRUCTIONS} p-6 text-center max-w-md`}
          >
            <h1
            // className={`${CSS_CLASSES.COMIC.TITLE} text-3xl mb-4 text-red-600`}
            >
              OOPS! SOMETHING BROKE!
            </h1>

            <div
            // className="mb-6 text-sm"
            >
              <p
              // className="mb-4"
              >
                The gerrymanderer has encountered an unexpected error. Don&apos;t worry - democracy is still intact (probably).
              </p>

              <details
              // className="text-xs text-left bg-gray-100 p-2 rounded border"
              >
                <summary
                // className="cursor-pointer font-bold mb-2"
                >
                  Technical Details
                </summary>
                <code
                // className="block whitespace-pre-wrap"
                >
                  {this.state.error?.message || 'Unknown error'}
                  {this.state.error?.stack && (
                    <>
                      {'\n\n'}
                      {this.state.error.stack}
                    </>
                  )}
                </code>
              </details>
            </div>

            <button
              onClick={() => {
                // Reset the error boundary
                this.setState({ hasError: false, error: undefined });
                // Force a page reload as a last resort
                window.location.reload();
              }}

              // className={`${CSS_CLASSES.COMIC.TILE} ${CSS_CLASSES.COMIC.RED_TILE} text-white font-bold px-6 py-3 hover:scale-105 transition-transform`}
            >
              RELOAD GAME
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
