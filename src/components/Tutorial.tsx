'use client';

import { useState, useEffect } from 'react';
import { useModal } from '@/hooks/useModal';

interface TutorialProps {
  onClose: () => void;
}

// Animation phases for the district demonstration
type AnimationPhase = 'initial' | 'cursor-appear' | 'cursor-click' | 'drag-to-second' | 'drag-to-third' | 'final';

function DistrictAnimation() {
  const [phase, setPhase] = useState<AnimationPhase>('initial');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const sequence = [
      { phase: 'initial', duration: 1500 },
      { phase: 'cursor-appear', duration: 800 },
      { phase: 'cursor-click', duration: 600 },
      { phase: 'drag-to-second', duration: 800 },
      { phase: 'drag-to-third', duration: 800 },
      { phase: 'final', duration: 2000 },
    ] as const;

    let currentStep = 0;

    const runAnimation = () => {
      if (currentStep >= sequence.length) {
        // Reset animation
        currentStep = 0;
      }

      const step = sequence[currentStep];
      setPhase(step.phase);

      // Update cursor position based on phase (adjusted for w-12 h-12 squares with gap-1)
      if (step.phase === 'cursor-appear' || step.phase === 'cursor-click') {
        setCursorPosition({ x: 24, y: 24 }); // Center of first square
      } else if (step.phase === 'drag-to-second') {
        setCursorPosition({ x: 76, y: 24 }); // Center of second square (48 + 4 gap + 24)
      } else if (step.phase === 'drag-to-third' || step.phase === 'final') {
        setCursorPosition({ x: 128, y: 24 }); // Center of third square (96 + 8 gap + 24)
      }

      currentStep++;
      setTimeout(runAnimation, step.duration);
    };

    const timer = setTimeout(runAnimation, 500); // Initial delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h2 className="comic-title text-xl sm:text-3xl mb-4 sm:mb-6 text-center">DISTRICTING MAGIC</h2>

      {/* Dictionary-style definition */}
      <div className="bg-yellow-50 p-3 mb-4 font-serif text-sm italic shadow-inner" style={{ border: '3px solid #000' }}>
        <div className="font-bold not-italic">District</div>
        <div className="text-xs text-gray-600 not-italic">/ˈdistrikt/ (noun)</div>
        <div className="mt-1">A group of voters where the majority wins—often drawn with the creativity of a villainous Michelangelo.</div>
      </div>

      <div className="flex justify-center mt-10 mb-2">
        <div className="relative">
          {/* Cursor */}
          {(phase === 'cursor-appear' || phase === 'cursor-click' || phase === 'drag-to-second' || phase === 'drag-to-third' || phase === 'final') && (
            <div
              className="absolute pointer-events-none transition-all duration-300 ease-in-out z-20"
              style={{
                left: `${cursorPosition.x}px`,
                top: `${cursorPosition.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="text-2xl">👆</div>
            </div>
          )}

          {/* Individual speech bubbles for initial state */}
          {(phase === 'initial' || phase === 'cursor-appear' || phase === 'cursor-click' || phase === 'drag-to-second' || phase === 'drag-to-third') && (
            <>
              {/* Red square 1 bubble */}
              <div className="absolute -top-8 transform -translate-x-1/2 bg-white border-2 border-black px-2 py-1 rounded text-xs font-bold whitespace-nowrap" style={{ left: '-12px' }}>
                I vote red!
                <div className="absolute top-full right-2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-black"></div>
                <div className="absolute top-full right-2 translate-y-[-2px] w-0 h-0 border-l-5 border-r-5 border-t-5 border-transparent border-t-white"></div>
              </div>

              {/* Red square 2 bubble */}
              <div className="absolute -top-8 transform -translate-x-1/2 bg-white border-2 border-black px-2 py-1 rounded text-xs font-bold whitespace-nowrap" style={{ left: '76px' }}>
                I vote red!
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-black"></div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-[-2px] w-0 h-0 border-l-5 border-r-5 border-t-5 border-transparent border-t-white"></div>
              </div>

              {/* Blue square bubble */}
              <div className="absolute -top-8 transform -translate-x-1/2 bg-white border-2 border-black px-2 py-1 rounded text-xs font-bold whitespace-nowrap" style={{ left: '164px' }}>
                I vote blue!
                <div className="absolute top-full left-2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-black"></div>
                <div className="absolute top-full left-2 translate-y-[-2px] w-0 h-0 border-l-5 border-r-5 border-t-5 border-transparent border-t-white"></div>
              </div>
            </>
          )}

          {/* Combined speech bubble for final state */}
          {phase === 'final' && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white border-2 border-black px-3 py-1 rounded text-xs font-bold whitespace-nowrap">
              Together, we vote red!
              {/* Multiple carets pointing to each square */}
              <div className="absolute top-full left-4 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-black"></div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-black"></div>
              <div className="absolute top-full right-4 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-black"></div>
              {/* White inner carets */}
              <div className="absolute top-full left-4 translate-y-[-2px] w-0 h-0 border-l-5 border-r-5 border-t-5 border-transparent border-t-white"></div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-[-2px] w-0 h-0 border-l-5 border-r-5 border-t-5 border-transparent border-t-white"></div>
              <div className="absolute top-full right-4 translate-y-[-2px] w-0 h-0 border-l-5 border-r-5 border-t-5 border-transparent border-t-white"></div>
            </div>
          )}

          {/* The three voting squares */}
          <div className="flex gap-1">
            <div
              className={`w-12 h-12 comic-tile comic-red-tile transition-all duration-300 ${phase === 'cursor-click' || phase === 'drag-to-second' || phase === 'drag-to-third' || phase === 'final' ? 'comic-tile-selected transform scale-105' : ''}`}
            ></div>
            <div className={`w-12 h-12 comic-tile comic-red-tile transition-all duration-300 ${phase === 'drag-to-second' || phase === 'drag-to-third' || phase === 'final' ? 'comic-tile-selected transform scale-105' : ''}`}></div>
            <div className={`w-12 h-12 comic-tile comic-blue-tile transition-all duration-300 ${phase === 'drag-to-third' || phase === 'final' ? 'comic-tile-selected transform scale-105' : ''}`}></div>
          </div>
        </div>
      </div>

      <div className="text-center text-sm sm:text-base mt-2">Click and drag to create a district of voters.</div>
    </div>
  );
}

export default function Tutorial({ onClose }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const { handleBackdropClick, handleModalClick } = useModal(true, onClose);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="comic-title text-xl sm:text-3xl mb-4 sm:mb-6 text-center">WELCOME TO DEMOCRACY!</h2>

            {/* Dictionary-style definition */}
            <div className="bg-yellow-50 p-3 mb-4 font-serif text-sm italic shadow-inner" style={{ border: '3px solid #000' }}>
              <div className="font-bold not-italic">Gerrymandering</div>
              <div className="text-xs text-gray-600 not-italic">/ˈjerēˌmandəriNG/ (noun)</div>
              <div className="mt-1">The fine art of drawing voting districts so creatively that politicians get to choose their voters — rather than the other way around.</div>
            </div>

            <div className="text-sm sm:text-base">You are the world&apos;s best gerrymanderer. It is your job to draw districts so that the voting minority wins a majority of districts.</div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="comic-title text-xl sm:text-3xl mb-4 sm:mb-6 text-center">MEET THE VOTERS</h2>

            {/* Dictionary-style definition */}
            <div className="bg-yellow-50 p-3 mb-4 font-serif text-sm italic shadow-inner" style={{ border: '3px solid #000' }}>
              <div className="font-bold not-italic">Voter</div>
              <div className="text-xs text-gray-600 not-italic">/ˈvōdər/ (noun)</div>
              <div className="mt-1">A human unit of democracy who shows up, fills in bubbles, and hopes their voice counts.</div>
            </div>

            <div className="flex justify-center items-center gap-12 mt-10 mb-2">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 comic-tile comic-red-tile relative">
                  {/* Speech bubble with caret */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white border-2 border-black px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                    I vote red!
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-black"></div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-[-2px] w-0 h-0 border-l-5 border-r-5 border-t-5 border-transparent border-t-white"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 comic-tile comic-blue-tile relative">
                  {/* Speech bubble with caret */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white border-2 border-black px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                    I vote blue!
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-black"></div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-[-2px] w-0 h-0 border-l-5 border-r-5 border-t-5 border-transparent border-t-white"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-sm sm:text-base mt-2">Each square is a voter.</div>
          </div>
        );

      case 3:
        return <DistrictAnimation />;

      case 4:
        return (
          <div>
            <h2 className="comic-title text-lg sm:text-3xl mb-3 sm:mb-6 text-center">GERRYMANDERING RULES</h2>

            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <div>
                <div className="font-bold text-base sm:text-lg mb-1">Your Mission</div>
                <div className="text-xs sm:text-sm">You will be given a map of voters and tasked with splitting them up into a specific number of districts of equal size. Click, touch, or drag to select connected squares into a district.</div>
              </div>

              <div>
                <div className="font-bold text-base sm:text-lg mb-1">Victory</div>
                <div className="text-xs sm:text-sm">You win by splitting voters into districts such that the minority of voters win a majority of districts.</div>
              </div>

              <div className="text-center font-bold text-base sm:text-lg pt-1 sm:pt-2">Go forth, Gerrymanderer!</div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }} onClick={handleBackdropClick}>
      <div
        className="comic-instructions w-full max-w-md sm:max-w-lg relative"
        onClick={handleModalClick}
        style={{
          height: '420px', // Fixed height - no shrinking allowed
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute w-8 h-8 comic-tile comic-red-tile text-white text-xl font-bold hover:scale-110 transition-all flex items-center justify-center z-10"
          style={{
            top: '12px',
            right: '12px',
            position: 'absolute',
          }}
          aria-label="Close tutorial"
        >
          ✕
        </button>

        {/* Tutorial content - uses available space between header and navigation */}
        <div className="absolute inset-x-0 top-4 bottom-16 px-4 sm:px-6 pr-12 sm:pr-14 overflow-y-auto">
          <div className="h-full flex flex-col justify-center">{renderStep()}</div>
        </div>

        {/* Navigation - fixed at bottom */}
        <div className="absolute inset-x-0 bottom-0 px-4 sm:px-6 pb-4">
          <div className="flex items-center justify-between">
            {/* Back button or spacer */}
            <div className="flex-1">
              {currentStep > 1 && (
                <button onClick={prevStep} className="comic-tile comic-red-tile text-white font-bold px-3 sm:px-4 py-2 text-xs sm:text-sm hover:scale-105 transition-transform">
                  BACK
                </button>
              )}
            </div>

            {/* Centered page counter */}
            <div className="comic-section-title text-xs sm:text-sm px-2">
              Page {currentStep} of {totalSteps}
            </div>

            {/* Next button */}
            <div className="flex-1 flex justify-end">
              <button onClick={nextStep} className="comic-tile comic-blue-tile text-white font-bold px-3 sm:px-4 py-2 text-xs sm:text-sm hover:scale-105 transition-transform">
                {currentStep === totalSteps ? 'START!' : 'NEXT'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
