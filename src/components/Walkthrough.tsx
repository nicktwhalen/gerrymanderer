'use client';

import { useState } from 'react';
import { useModal } from '@/hooks/useModal';

interface WalkthroughProps {
  onClose: () => void;
  levelId: number;
  currentStep: 'instructions' | 'step2' | 'completed';
  setCurrentStep: (step: 'instructions' | 'step2' | 'completed') => void;
}

export default function Walkthrough({ onClose, levelId, currentStep, setCurrentStep }: WalkthroughProps) {
  useModal(true, onClose);

  const nextStep = () => {
    if (currentStep === 'instructions') {
      setCurrentStep('step2');
    } else {
      onClose();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'instructions':
        return (
          <div className="text-center relative">
            {/* Comic book style arrow pointing up to instructions */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="text-3xl">⬆️</div>
            </div>

            <div className="text-sm mb-3">The instructions at the top tell you how many districts to draw, the size of each one, and which color needs to win the majority.</div>
            <div className="flex justify-center">
              <button onClick={nextStep} className="comic-tile comic-blue-tile text-white font-bold px-4 py-1 text-sm hover:scale-105 transition-transform">
                NEXT
              </button>
            </div>
          </div>
        );

      case 'step2':
        return (
          <div className="text-center relative">
            {/* Down block arrow half on modal, half hanging off */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              <div className="text-3xl">⬇️</div>
            </div>

            <div className="text-sm mb-3">Select the top three squares (click, tap, or drag) to make a district of three voters with a red majority.</div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Dark overlay - only show for step 1 */}
      {currentStep === 'instructions' && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}></div>
        </div>
      )}

      {/* Small modal positioned based on current step */}
      <div
        className="fixed max-w-sm p-4 z-70 border-4 border-black rounded-lg shadow-lg"
        style={{
          background: 'linear-gradient(45deg, #FFD700 25%, #FFCC33 25%, #FFCC33 50%, #FFD700 50%, #FFD700 75%, #FFCC33 75%)',
          backgroundSize: '40px 40px',
          fontFamily: '"Permanent Marker", cursive',
          color: '#000000',
          top: currentStep === 'step2' ? '130px' : '180px', // Position above gameboard, clipping the top
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {renderStep()}
      </div>
    </>
  );
}
