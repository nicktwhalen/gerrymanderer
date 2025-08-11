'use client';

import { useState } from 'react';

type WalkthroughStep = 'instructions' | 'step2' | 'step3' | 'completed';

export const useWalkthrough = () => {
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [currentStep, setCurrentStep] = useState<WalkthroughStep>('instructions');

  const openWalkthrough = () => {
    setShowWalkthrough(true);
    setCurrentStep('instructions');
  };
  const closeWalkthrough = () => {
    setShowWalkthrough(false);
    setCurrentStep('instructions');
  };

  return {
    showWalkthrough,
    currentStep,
    setCurrentStep,
    openWalkthrough,
    closeWalkthrough,
  };
};
