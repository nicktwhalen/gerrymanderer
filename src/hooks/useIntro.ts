'use client';

import { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { GAME_CONFIG } from '@/config/constants';

export const useIntro = () => {
  const { showIntro, setShowIntro } = useGame();

  // Check if user has seen tutorial on component mount
  useEffect(() => {
    try {
      const seenIntro = localStorage.getItem(GAME_CONFIG.STORAGE_KEYS.INTRO_SEEN);
      if (!seenIntro) {
        setShowIntro(true);
      }
    } catch (error) {
      console.error('Failed to access localStorage for tutorial:', error);
      // Fallback to showing tutorial if localStorage fails
      setShowIntro(true);
    }
  }, [setShowIntro]);

  const closeIntro = () => {
    setShowIntro(false);
    try {
      localStorage.setItem(GAME_CONFIG.STORAGE_KEYS.INTRO_SEEN, 'true');
    } catch (error) {
      console.error('Failed to save tutorial state to localStorage:', error);
    }
  };

  const openIntro = () => {
    setShowIntro(true);
  };

  return {
    showIntro,
    closeIntro,
    openIntro,
  };
};
