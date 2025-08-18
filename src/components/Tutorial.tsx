'use client';

import { useState, useEffect, CSSProperties } from 'react';
import { useModal } from '@/hooks/useModal';

interface TutorialProps {
  onClose: () => void;
}

// Animation phases for the district demonstration
type AnimationPhase = 'initial' | 'cursor-appear' | 'cursor-click' | 'drag-to-second' | 'drag-to-third' | 'final';

function DistrictAnimation() {
  const [phase, setPhase] = useState<AnimationPhase>('initial');
  const [cursorPosition, setCursorPosition] = useState({ x: '0', y: '0' });

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

      // Update cursor position based on phase
      if (step.phase === 'initial') {
        setCursorPosition({ x: '1.75rem', y: '5rem' });
      } else if (step.phase === 'cursor-appear' || step.phase === 'cursor-click') {
        setCursorPosition({ x: '1.75rem', y: '2.5rem' }); // Center of first square
      } else if (step.phase === 'drag-to-second') {
        setCursorPosition({ x: '50%', y: '2.5rem' }); // Center of second square
      } else if (step.phase === 'drag-to-third') {
        setCursorPosition({ x: '9rem', y: '2.5rem' }); // Center of third square
      } else if (step.phase === 'final') {
        setCursorPosition({ x: '9rem', y: '5rem' }); // disappear
      }

      currentStep++;
      setTimeout(runAnimation, step.duration);
    };

    const timer = setTimeout(runAnimation, 500); // Initial delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <h2>Districting magic</h2>
      {/* Dictionary-style definition */}
      <div className="dictionary">
        <h3>District</h3>
        <div className="pronunciation">/ˈdistrikt/ (noun)</div>
        <div className="definition">A group of voters where the majority wins—often drawn with the creativity of a villainous Michelangelo.</div>
      </div>

      <div className="illustration">
        {/* Cursor */}
        {['initial', 'cursor-appear', 'cursor-click', 'drag-to-second', 'drag-to-third', 'final'].includes(phase) && (
          <div
            className={`cursor ${phase}`}
            style={
              {
                '--x': `${cursorPosition.x}`,
                '--y': `${cursorPosition.y}`,
              } as CSSProperties
            }
          >
            👆
          </div>
        )}

        {/* Individual speech bubbles for initial state */}
        {['initial', 'cursor-appear', 'cursor-click', 'drag-to-second', 'drag-to-third'].includes(phase) && (
          <div className="bubbles">
            {/* Red square 1 bubble */}
            <div className="bubble">
              I vote red!
              <span className="arrow left"></span>
            </div>
            {/* Red square 2 bubble */}
            <div className="bubble">
              I vote red!
              <span className="arrow"></span>
            </div>
            {/* Blue square bubble */}
            <div className="bubble">
              I vote blue!
              <span className="arrow right"></span>
            </div>
          </div>
        )}

        {/* Combined speech bubble for final state */}
        {phase === 'final' && (
          <div className="bubbles">
            <div className="bubble">
              Together, we vote red!
              <span className="arrow left"></span>
              <span className="arrow"></span>
              <span className="arrow right"></span>
            </div>
          </div>
        )}

        {/* The three voting squares */}
        <div className="voters">
          <div
            className={`
              grid-cell
              ${['cursor-click', 'drag-to-second', 'drag-to-third'].includes(phase) ? 'selected' : ''}
              ${['cursor-click'].includes(phase) ? 'border-all' : ''}
              ${['drag-to-second', 'drag-to-third', 'final'].includes(phase) ? 'border-top border-left border-bottom' : ''}
              ${['final'].includes(phase) ? 'completed' : ''}
            `}
          >
            <button className="voter red" />
          </div>
          <div
            className={`
              grid-cell
              ${['drag-to-second', 'drag-to-third', 'final'].includes(phase) ? 'selected' : ''}
              ${['drag-to-second'].includes(phase) ? 'border-top border-bottom border-right' : ''}
              ${['drag-to-third', 'final'].includes(phase) ? 'border-top border-bottom' : ''}
              ${['final'].includes(phase) ? 'completed' : ''}
            `}
          >
            <button className="voter red" />
          </div>
          <div
            className={`
              grid-cell
              ${['drag-to-third'].includes(phase) ? 'selected' : ''}
              ${['drag-to-third', 'final'].includes(phase) ? 'border-top border-bottom border-right' : ''}
              ${['final'].includes(phase) ? 'completed' : ''}
            `}
          >
            <button className="voter blue" />
          </div>
        </div>
      </div>

      <p>Click and drag to create a district of voters.</p>
    </>
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
          <>
            <h2>Welcome to democracy!</h2>
            {/* Dictionary-style definition */}
            <div className="dictionary">
              <h3>Gerrymandering</h3>
              <div className="pronunciation">/ˈjerēˌmandəriNG/ (noun)</div>
              <div className="definition">The fine art of drawing voting districts so creatively that politicians get to choose their voters — rather than the other way around.</div>
            </div>
            <p>You are the world’s best gerrymanderer. It is your job to draw districts so that the voting minority wins a majority of districts.</p>
          </>
        );

      case 2:
        return (
          <>
            <h2>Meet the voters</h2>
            {/* Dictionary-style definition */}
            <div className="dictionary">
              <h3>Voter</h3>
              <div className="pronunciation">/ˈvōdər/ (noun)</div>
              <div className="definition">A human unit of democracy who shows up, fills in bubbles, and hopes their voice counts.</div>
            </div>
            <div className="illustration">
              <div className="bubbles">
                <div className="bubble">
                  I vote red!
                  <span className="arrow left"></span>
                </div>
                <div className="bubble">
                  I vote blue!
                  <span className="arrow right"></span>
                </div>
              </div>
              <div className="voters">
                <button className="voter red" />
                <button className="voter blue" />
              </div>
            </div>
            <p>Each square is a voter.</p>
          </>
        );

      case 3:
        return <DistrictAnimation />;

      case 4:
        return (
          <>
            <h2>The rules</h2>
            <h3>Your mission</h3>
            <p>You will be given a map of voters and tasked with splitting them up into a specific number of districts of equal size. Click, touch, or drag to select connected squares into a district.</p>
            <h3>Victory</h3>
            <p>You win by splitting voters into districts such that the minority of voters win a majority of districts.</p>
            <p>Go forth, Gerrymanderer!</p>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className="tile tile-tutorial" onClick={handleModalClick}>
        {/* Close button */}
        <button className="close-button" onClick={onClose} aria-label="Close tutorial">
          x
        </button>

        {/* Tutorial content - uses available space between header and navigation */}
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="tutorial-nav">
        <button disabled={currentStep <= 1} className="back-button" onClick={prevStep}>
          Back
        </button>
        <div className="tile tile-page">
          <div className="current">
            Page {currentStep} of {totalSteps}
          </div>
        </div>
        <button className="next-button" onClick={nextStep}>
          {currentStep === totalSteps ? 'Start!' : 'Next'}
        </button>
      </div>
    </div>
  );
}
