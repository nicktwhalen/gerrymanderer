'use client';

import { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { GAME_CONFIG } from '@/config/constants';

export const useTutorial = () => {
  const { showTutorial, setShowTutorial } = useGame();

  // Check if user has seen tutorial on component mount
  useEffect(() => {
    try {
      const hasSeenTutorial = localStorage.getItem(GAME_CONFIG.STORAGE_KEYS.TUTORIAL_SEEN);
      if (!hasSeenTutorial) {
        setShowTutorial(true);
      }
    } catch (error) {
      console.error('Failed to access localStorage for tutorial:', error);
      // Fallback to showing tutorial if localStorage fails
      setShowTutorial(true);
    }
  }, [setShowTutorial]);

  const closeTutorial = () => {
    setShowTutorial(false);
    try {
      localStorage.setItem(GAME_CONFIG.STORAGE_KEYS.TUTORIAL_SEEN, 'true');
    } catch (error) {
      console.error('Failed to save tutorial state to localStorage:', error);
    }
  };

  const openTutorial = () => {
    setShowTutorial(true);
  };

  return {
    showTutorial,
    closeTutorial,
    openTutorial,
  };
};
