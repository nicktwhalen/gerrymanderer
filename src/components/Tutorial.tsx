'use client';

import { useState } from 'react';

interface TutorialProps {
  onClose: () => void;
}

export default function Tutorial({ onClose }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

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
            <h2 className="comic-title text-2xl sm:text-3xl mb-6 text-center">WELCOME TO DEMOCRACY!</h2>

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
            <h2 className="comic-title text-2xl sm:text-3xl mb-6 text-center">MEET THE VOTERS</h2>

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
        return (
          <div>
            <h2 className="comic-title text-2xl sm:text-3xl mb-6 text-center">DISTRICTING MAGIC</h2>

            {/* Dictionary-style definition */}
            <div className="bg-yellow-50 p-3 mb-4 font-serif text-sm italic shadow-inner" style={{ border: '3px solid #000' }}>
              <div className="font-bold not-italic">District</div>
              <div className="text-xs text-gray-600 not-italic">/ˈdistrikt/ (noun)</div>
              <div className="mt-1">A carefully carved chunk of map used to group voters into one deciding vote - often done with the creativity of a villainous Michelangelo.</div>
            </div>

            <div className="flex justify-center mt-10 mb-2">
              <div className="relative">
                {/* Speech bubble with caret */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white border-2 border-black px-3 py-1 rounded text-xs font-bold whitespace-nowrap mb-2">
                  Together, we vote red!
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-black"></div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-[-2px] w-0 h-0 border-l-5 border-r-5 border-t-5 border-transparent border-t-white"></div>
                </div>
                <div className="grid grid-cols-5 gap-0 p-1 bg-red-200">
                  <div className="w-8 h-8 comic-tile comic-red-tile"></div>
                  <div className="w-8 h-8 comic-tile comic-red-tile"></div>
                  <div className="w-8 h-8 comic-tile comic-red-tile"></div>
                  <div className="w-8 h-8 comic-tile comic-blue-tile"></div>
                  <div className="w-8 h-8 comic-tile comic-blue-tile"></div>
                </div>
              </div>
            </div>

            <div className="text-center text-sm sm:text-base mt-2">A district is a collection of voters.</div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="comic-title text-2xl sm:text-3xl mb-6 text-center">GERRYMANDERING RULES</h2>

            <div className="space-y-4 text-sm sm:text-base">
              <div>
                <div className="font-bold text-lg mb-1">Your Mission</div>
                <div className="text-sm">You will be given a map of voters and tasked with splitting them up into a specific number of districts of equal size. Click, touch, or drag to select connected squares into a district.</div>
              </div>

              <div>
                <div className="font-bold text-lg mb-1">Victory</div>
                <div className="text-sm">You win by splitting voters into districts such that the minority of voters win a majority of districts.</div>
              </div>

              <div className="text-center font-bold text-lg pt-2">Go forth, Gerrymanderer!</div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
      <div className="comic-instructions p-6 max-w-lg w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute w-8 h-8 comic-tile comic-red-tile text-white text-xl font-bold hover:scale-110 transition-all flex items-center justify-center"
          style={{
            top: '8px',
            right: '8px',
            position: 'absolute',
          }}
          aria-label="Close tutorial"
        >
          ✕
        </button>

        {/* Tutorial content */}
        <div className="mb-6 h-72 flex flex-col justify-center">{renderStep()}</div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          {/* Back button or spacer */}
          <div className="flex-1">
            {currentStep > 1 && (
              <button onClick={prevStep} className="comic-tile comic-red-tile text-white font-bold px-4 py-2 text-sm hover:scale-105 transition-transform">
                BACK
              </button>
            )}
          </div>

          {/* Centered page counter */}
          <div className="comic-section-title text-sm">
            Page {currentStep} of {totalSteps}
          </div>

          {/* Next button */}
          <div className="flex-1 flex justify-end">
            <button onClick={nextStep} className="comic-tile comic-blue-tile text-white font-bold px-4 py-2 text-sm hover:scale-105 transition-transform">
              {currentStep === totalSteps ? 'START!' : 'NEXT'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
