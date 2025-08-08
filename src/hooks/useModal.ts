'use client';

import { useEffect } from 'react';

/**
 * Custom hook to handle modal behavior including:
 * - Preventing background scrolling
 * - Handling escape key to close
 * - Proper focus management
 */
export const useModal = (isOpen: boolean, onClose?: () => void) => {
  useEffect(() => {
    if (!isOpen) return;

    // Prevent scrolling on the background
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalWidth = document.body.style.width;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = '0';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';

    // Handle escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    // Cleanup function
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = originalWidth;
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
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
