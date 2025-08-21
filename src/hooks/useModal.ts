'use client';

import { useEffect } from 'react';

/**
 * Custom hook to handle modal behavior including:
 * - Handling escape key to close
 * - Proper focus management
 */
export const useModal = (isOpen: boolean, onClose?: () => void) => {
  useEffect(() => {
    if (!isOpen) return;

    // Handle escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Handler for backdrop clicks
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && onClose) {
      onClose();
    }
  };

  // Handler to prevent event propagation
  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return {
    handleBackdropClick,
    handleModalClick,
  };
};
