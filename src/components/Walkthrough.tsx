'use client';

import { useState, useEffect } from 'react';
import { useModal } from '@/hooks/useModal';
import { useGame } from '@/context/GameContext';

interface WalkthroughProps {
  onClose: () => void;
  levelId: number;
  currentStep: 'instructions' | 'step2' | 'step3' | 'completed';
  setCurrentStep: (step: 'instructions' | 'step2' | 'step3' | 'completed') => void;
}

export default function Walkthrough({ onClose, levelId, currentStep, setCurrentStep }: WalkthroughProps) {
  useModal(true, onClose);
  const { gameState, currentLevel } = useGame();

  // Auto-advance from step2 to step3 when top row district is completed
  useEffect(() => {
    if (currentStep === 'step2' && gameState.districts.length > 0) {
      // Check if there's a completed district containing all top row voters (positions 0, 1, 2)
      const topRowPositions = [0, 1, 2];

      const completedTopRowDistrict = gameState.districts.find((district) => {
        if (!district.isComplete) return false;

        // Get positions of all voters in this district
        const districtPositions = district.voters.map((voter) => {
          return gameState.board.flat().findIndex((v) => v.id === voter.id);
        });

        // Check if this district contains exactly the top row positions
        const hasAllTopRow = topRowPositions.every((pos) => districtPositions.includes(pos));
        const hasOnlyTopRow = districtPositions.every((pos) => topRowPositions.includes(pos));

        return hasAllTopRow && hasOnlyTopRow && districtPositions.length === 3;
      });

      if (completedTopRowDistrict) {
        setCurrentStep('step3');
      }
    }
  }, [currentStep, gameState.districts, gameState.board, setCurrentStep]);

  const nextStep = () => {
    if (currentStep === 'instructions') {
      setCurrentStep('step2');
    } else if (currentStep === 'step3') {
      onClose();
    }
    // step2 transitions automatically when district is completed
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

      case 'step3':
        return (
          <div className="text-center relative">
            {/* Down block arrow pointing to scoreboard */}
            <div className="absolute left-1/2 transform -translate-x-1/2" style={{ bottom: '-39px' }}>
              <div className="text-3xl">⬇️</div>
            </div>

            <div className="text-sm mb-3">Great job! Since the district you created has more red voters than blue, the entire district will vote red. The scoreboard below now shows that you have 1 red district.</div>
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
      {/* Dark overlay - show for step 1 and step 3 */}
      {(currentStep === 'instructions' || currentStep === 'step3') && (
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
          top: currentStep === 'step2' ? '130px' : currentStep === 'step3' ? '350px' : '180px', // Position based on step
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {renderStep()}
      </div>
    </>
  );
}
