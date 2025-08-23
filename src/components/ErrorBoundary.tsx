'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import Button from '@/components/Button/Button';
import Text from '@/components/Text/Text';

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
        localStorage.removeItem('gerrymander-intro-seen');
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
        <>
          <Text>
            <h2>Oops! Something broke!</h2>
          </Text>
          <Text>
            <p>
              The gerrymanderer has encountered an unexpected error. Don’t worry
              - democracy is still intact (probably).
            </p>
          </Text>
          <Button
            onClick={() => {
              // Reset the error boundary
              this.setState({ hasError: false, error: undefined });
              // Force a page reload as a last resort
              window.location.reload();
            }}
          >
            Reload game
          </Button>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
