'use client';

import { useState } from 'react';

interface WalkthroughProps {
  onClose: () => void;
  levelId: number;
}

type WalkthroughStep = 'instructions' | 'step2';

export default function Walkthrough({ onClose, levelId }: WalkthroughProps) {
  const [currentStep, setCurrentStep] = useState<WalkthroughStep>('instructions');

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
          <div className="text-center">
            <div className="text-sm mb-3">Step 2 placeholder</div>
            <div className="flex justify-center">
              <button onClick={nextStep} className="comic-tile comic-blue-tile text-white font-bold px-4 py-1 text-sm hover:scale-105 transition-transform">
                NEXT
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Dark overlay */}
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}></div>
      </div>

      {/* Small modal positioned to slightly overlap instructions - higher than instructions */}
      <div
        className="fixed max-w-sm p-4 z-70 border-4 border-black rounded-lg shadow-lg"
        style={{
          background: 'linear-gradient(45deg, #FFD700 25%, #FFCC33 25%, #FFCC33 50%, #FFD700 50%, #FFD700 75%, #FFCC33 75%)',
          backgroundSize: '40px 40px',
          fontFamily: '"Permanent Marker", cursive',
          color: '#000000',
          top: '180px', // Overlapping the bottom of the instructions area
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {renderStep()}
      </div>
    </>
  );
}
