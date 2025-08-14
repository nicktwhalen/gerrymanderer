'use client';

import { useState, useEffect } from 'react';
import { useModal } from '@/hooks/useModal';
import { useGame } from '@/context/GameContext';

interface WalkthroughProps {
  onClose: () => void;
  levelId: number;
  currentStep: 'instructions' | 'step2' | 'step3' | 'step4' | 'step5' | 'completed';
  setCurrentStep: (step: 'instructions' | 'step2' | 'step3' | 'step4' | 'step5' | 'completed') => void;
}

export default function Walkthrough({ onClose, levelId, currentStep, setCurrentStep }: WalkthroughProps) {
  useModal(true, onClose);
  const { gameState, currentLevel } = useGame();
  const [gameboardTop, setGameboardTop] = useState<number>(200); // Default fallback
  const [instructionsTop, setInstructionsTop] = useState<number>(90); // Default fallback
  const [scoreboardTop, setScoreboardTop] = useState<number>(350); // Default fallback

  // Get target color and opposite color for level 1
  const targetColor = currentLevel.targetColor; // This will be 'blue' for level 1
  const otherColor = targetColor === 'blue' ? 'red' : 'blue';

  // Calculate gameboard, instructions, and scoreboard positions for modal positioning
  useEffect(() => {
    const calculatePositions = () => {
      const gameboardElement = document.querySelector('[data-gameboard]');
      if (gameboardElement) {
        const rect = gameboardElement.getBoundingClientRect();
        setGameboardTop(rect.top + window.scrollY);
      }

      const instructionsElement = document.querySelector('[data-instructions]');
      if (instructionsElement) {
        const rect = instructionsElement.getBoundingClientRect();
        setInstructionsTop(rect.top + window.scrollY);
      }

      const scoreboardElement = document.querySelector('[data-scoreboard]');
      if (scoreboardElement) {
        const rect = scoreboardElement.getBoundingClientRect();
        setScoreboardTop(rect.top + window.scrollY);
      }
    };

    calculatePositions();
    window.addEventListener('resize', calculatePositions);
    return () => window.removeEventListener('resize', calculatePositions);
  }, [currentStep]);

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

    // Auto-advance from step4 to step5 when bottom row district is completed
    if (currentStep === 'step4' && gameState.districts.length > 1) {
      // Check if there's a completed district containing all bottom row voters (positions 6, 7, 8)
      const bottomRowPositions = [6, 7, 8];

      const completedBottomRowDistrict = gameState.districts.find((district) => {
        if (!district.isComplete) return false;

        // Get positions of all voters in this district
        const districtPositions = district.voters.map((voter) => {
          return gameState.board.flat().findIndex((v) => v.id === voter.id);
        });

        // Check if this district contains exactly the bottom row positions
        const hasAllBottomRow = bottomRowPositions.every((pos) => districtPositions.includes(pos));
        const hasOnlyBottomRow = districtPositions.every((pos) => bottomRowPositions.includes(pos));

        return hasAllBottomRow && hasOnlyBottomRow && districtPositions.length === 3;
      });

      if (completedBottomRowDistrict) {
        setCurrentStep('step5');
      }
    }

    // Auto-advance from step5 to step6 when middle row district is completed
    if (currentStep === 'step5' && gameState.districts.length > 2) {
      // Check if there's a completed district containing all middle row voters (positions 3, 4, 5)
      const middleRowPositions = [3, 4, 5];

      const completedMiddleRowDistrict = gameState.districts.find((district) => {
        if (!district.isComplete) return false;

        // Get positions of all voters in this district
        const districtPositions = district.voters.map((voter) => {
          return gameState.board.flat().findIndex((v) => v.id === voter.id);
        });

        // Check if this district contains exactly the middle row positions
        const hasAllMiddleRow = middleRowPositions.every((pos) => districtPositions.includes(pos));
        const hasOnlyMiddleRow = districtPositions.every((pos) => middleRowPositions.includes(pos));

        return hasAllMiddleRow && hasOnlyMiddleRow && districtPositions.length === 3;
      });

      if (completedMiddleRowDistrict) {
        // For now, close the walkthrough when step 5 is completed
        // TODO: Add step 6 when ready
        onClose();
      }
    }
  }, [currentStep, gameState.districts, gameState.board, setCurrentStep, onClose]);

  const nextStep = () => {
    if (currentStep === 'instructions') {
      setCurrentStep('step2');
    } else if (currentStep === 'step3') {
      setCurrentStep('step4');
    }
    // step2 and step4 transition automatically when districts are completed
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'instructions':
        return (
          <div
          // className="text-center relative"
          >
            {/* Comic book style arrow pointing up to instructions */}
            <div
            // className="absolute -top-8 left-1/2 transform -translate-x-1/2"
            >
              <div
              // className="text-3xl"
              >
                ⬆️
              </div>
            </div>

            <div
            // className="text-sm mb-3"
            >
              The instructions at the top tell you how many districts to draw, the size of each one, and which color needs to win the majority.
            </div>
            <div
            // className="flex justify-center"
            >
              <button
                onClick={nextStep}
                // className="comic-tile comic-blue-tile text-white font-bold px-4 py-1 text-sm hover:scale-105 transition-transform"
              >
                NEXT
              </button>
            </div>
          </div>
        );

      case 'step2':
        return (
          <div
          // className="text-center relative"
          >
            {/* Down block arrow half on modal, half hanging off */}
            <div
            // className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
            >
              <div
              // className="text-3xl"
              >
                ⬇️
              </div>
            </div>

            <div
            // className="text-sm mb-3"
            >
              Select the top three squares (click, tap, or drag) to make a district of three voters with a {targetColor} majority.
            </div>
          </div>
        );

      case 'step3':
        return (
          <div
          // className="text-center relative"
          >
            {/* Down block arrow pointing to scoreboard */}
            <div
            // className="absolute left-1/2 transform -translate-x-1/2" style={{ bottom: '-39px' }}
            >
              <div
              // className="text-3xl"
              >
                ⬇️
              </div>
            </div>

            <div
            // className="text-sm mb-3"
            >
              Great job! Since the district you created has more {targetColor} voters than {otherColor}, the entire district will vote {targetColor}. The scoreboard below now shows that you have 1 {targetColor} district.
            </div>
            <div
            // className="flex justify-center"
            >
              <button
                onClick={nextStep}
                // className="comic-tile comic-blue-tile text-white font-bold px-4 py-1 text-sm hover:scale-105 transition-transform"
              >
                NEXT
              </button>
            </div>
          </div>
        );

      case 'step4':
        return (
          <div
          // className="text-center relative"
          >
            <div
            // className="text-sm mb-3"
            >
              Now create a second district with a {targetColor} majority. Remember — voters have to be neighbors (above, below, left, or right) to join the same district.
            </div>
          </div>
        );

      case 'step5':
        return (
          <div
          // className="text-center relative"
          >
            <div
            // className="text-sm mb-3"
            >
              Awesome! You now have 2 {targetColor} districts. It's okay if the last district is all {otherColor} — the majority of districts will still be {targetColor}. Create the final district to win!
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
        <div
        // className="fixed inset-0 z-50"
        >
          <div
          // className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
          ></div>
        </div>
      )}

      {/* Small modal positioned based on current step */}
      <div

      // className={`fixed p-4 z-70 border-4 border-black rounded-lg shadow-lg ${currentStep === 'step5' ? '' : 'max-w-sm'}`}
      // style={{
      //   background: 'linear-gradient(45deg, #FFD700 25%, #FFCC33 25%, #FFCC33 50%, #FFD700 50%, #FFD700 75%, #FFCC33 75%)',
      //   backgroundSize: '40px 40px',
      //   fontFamily: '"Permanent Marker", cursive',
      //   color: '#000000',
      //   top: currentStep === 'instructions' ? `${instructionsTop + 90}px` : currentStep === 'step2' || currentStep === 'step4' || currentStep === 'step5' ? `${gameboardTop - 100}px` : currentStep === 'step3' ? `${scoreboardTop - 155}px` : '180px', // Position based on step
      //   left: '50%',
      //   transform: 'translateX(-50%)',
      //   width: '24rem',
      // }}
      >
        {renderStep()}
      </div>
    </>
  );
}
