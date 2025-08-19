'use client';

import { useState, useEffect, CSSProperties } from 'react';
import VoterTile from './VoterTile';
import { Face } from '@/types/game';

// Animation phases for the district demonstration
type AnimationPhase = 'initial' | 'cursor-appear' | 'cursor-click' | 'drag-to-second' | 'drag-to-third' | 'final';

export default function DistrictAnimation() {
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
        setCursorPosition({ x: '3.5rem', y: '7rem' });
      } else if (step.phase === 'cursor-appear' || step.phase === 'cursor-click') {
        setCursorPosition({ x: '3.5rem', y: '6rem' }); // Center of first square
      } else if (step.phase === 'drag-to-second') {
        setCursorPosition({ x: '7.5rem', y: '6rem' }); // Center of second square
      } else if (step.phase === 'drag-to-third') {
        setCursorPosition({ x: '11.5rem', y: '6rem' }); // Center of third square
      } else if (step.phase === 'final') {
        setCursorPosition({ x: '11.5rem', y: '7rem' }); // disappear
      }

      currentStep++;
      setTimeout(runAnimation, step.duration);
    };

    const timer = setTimeout(runAnimation, 500); // Initial delay

    return () => clearTimeout(timer);
  }, []);

  const getFirstFace = (phase: AnimationPhase): Face => {
    switch (phase) {
      case 'cursor-click':
      case 'drag-to-second':
      case 'drag-to-third':
        return 'thinking';
      case 'final':
        return 'elated';
      default:
        return 'neutral';
    }
  };

  const getSecondFace = (phase: AnimationPhase): Face => {
    switch (phase) {
      case 'drag-to-second':
      case 'drag-to-third':
        return 'thinking';
      case 'final':
        return 'elated';
      default:
        return 'neutral';
    }
  };

  const getThirdFace = (phase: AnimationPhase): Face => {
    switch (phase) {
      case 'drag-to-third':
        return 'thinking';
      case 'final':
        return 'sad';
      default:
        return 'neutral';
    }
  };

  const getFirstClass = (phase: AnimationPhase): string => {
    switch (phase) {
      case 'cursor-click':
        return 'grid-cell red selected border-top border-bottom border-right border-left';
      case 'drag-to-second':
      case 'drag-to-third':
        return 'grid-cell red selected border-top border-bottom border-left';
      case 'final':
        return 'grid-cell red completed winner-red border-top border-bottom border-left';
      default:
        return 'grid-cell red';
    }
  };

  const getSecondClass = (phase: AnimationPhase): string => {
    switch (phase) {
      case 'drag-to-second':
        return 'grid-cell red selected border-top border-bottom border-right';
      case 'drag-to-third':
        return 'grid-cell red selected border-top border-bottom';
      case 'final':
        return 'grid-cell red completed winner-red border-top border-bottom';
      default:
        return 'grid-cell red';
    }
  };

  const getThirdClass = (phase: AnimationPhase): string => {
    switch (phase) {
      case 'drag-to-third':
        return 'grid-cell blue selected border-top border-bottom border-right';
      case 'final':
        return 'grid-cell blue completed winner-red border-top border-bottom border-right';
      default:
        return 'grid-cell blue';
    }
  };

  return (
    <>
      <div className="illustration" role="presentation">
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
              <span className="arrow right"></span>
            </div>
            {/* Red square 2 bubble */}
            <div className="bubble">
              I vote red!
              <span className="arrow"></span>
            </div>
            {/* Blue square bubble */}
            <div className="bubble">
              I vote blue!
              <span className="arrow left"></span>
            </div>
          </div>
        )}

        {/* Combined speech bubble for final state */}
        {phase === 'final' && (
          <div className="bubbles">
            <div className="bubble">
              Together, we vote red!
              <span className="arrow right"></span>
              <span className="arrow"></span>
              <span className="arrow left"></span>
            </div>
          </div>
        )}

        {/* The three voting squares */}
        <div className="voters">
          <div className={getFirstClass(phase)}>
            <div className="div-background" />
            <div className="div-foreground" />
            <VoterTile face={getFirstFace(phase)} />
            <div className="div-border-top" />
            <div className="div-border-right" />
            <div className="div-border-bottom" />
            <div className="div-border-left" />
            <div className="div-border-dashed" />
          </div>
          <div className={getSecondClass(phase)}>
            <div className="div-background" />
            <div className="div-foreground" />
            <VoterTile face={getSecondFace(phase)} />
            <div className="div-border-top" />
            <div className="div-border-right" />
            <div className="div-border-bottom" />
            <div className="div-border-left" />
            <div className="div-border-dashed" />
          </div>
          <div className={getThirdClass(phase)}>
            <div className="div-background" />
            <div className="div-foreground" />
            <VoterTile face={getThirdFace(phase)} />
            <div className="div-border-top" />
            <div className="div-border-right" />
            <div className="div-border-bottom" />
            <div className="div-border-left" />
            <div className="div-border-dashed" />
          </div>
        </div>
      </div>
    </>
  );
}
