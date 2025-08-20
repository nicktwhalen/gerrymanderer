'use client';

import { useState, useEffect, CSSProperties } from 'react';
import Voter, { VoterProps } from '@/components/Voter/Voter';
import { VoterMood } from '@/types/game';

// Animation phases for the district demonstration
type AnimationPhase =
  | 'initial'
  | 'cursor-appear'
  | 'cursor-click'
  | 'drag-to-second'
  | 'drag-to-third'
  | 'final';

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
      } else if (
        step.phase === 'cursor-appear' ||
        step.phase === 'cursor-click'
      ) {
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

  const getFirstVoterProps = (phase: AnimationPhase): VoterProps => {
    const color = 'red';
    switch (phase) {
      case 'cursor-click':
        return {
          color,
          mood: 'thinking',
          state: 'selected',
          borders: { top: true, right: true, bottom: true, left: true },
        };
      case 'drag-to-second':
      case 'drag-to-third':
        return {
          color,
          mood: 'thinking',
          state: 'selected',
          borders: { top: true, right: false, bottom: true, left: true },
        };
      case 'final':
        return {
          color,
          mood: 'elated',
          state: 'completed',
          districtColor: 'red',
          borders: { top: true, right: false, bottom: true, left: true },
        };
      default:
        return { color, mood: 'neutral' };
    }
  };

  const getSecondVoterProps = (phase: AnimationPhase): VoterProps => {
    const color = 'red';
    switch (phase) {
      case 'drag-to-second':
        return {
          color,
          mood: 'thinking',
          state: 'selected',
          borders: { top: true, right: true, bottom: true, left: false },
        };
      case 'drag-to-third':
        return {
          color,
          mood: 'thinking',
          state: 'selected',
          borders: { top: true, right: false, bottom: true, left: false },
        };
      case 'final':
        return {
          color,
          mood: 'elated',
          state: 'completed',
          districtColor: 'red',
          borders: { top: true, right: false, bottom: true, left: false },
        };
      default:
        return { color, mood: 'neutral' };
    }
  };

  const getThirdVoterProps = (phase: AnimationPhase): VoterProps => {
    const color = 'blue';
    switch (phase) {
      case 'drag-to-third':
        return {
          color,
          mood: 'thinking',
          state: 'selected',
          borders: { top: true, right: true, bottom: true, left: false },
        };
      case 'final':
        return {
          color,
          mood: 'sad',
          state: 'completed',
          districtColor: 'red',
          borders: { top: true, right: true, bottom: true, left: false },
        };
      default:
        return { color, mood: 'neutral' };
    }
  };

  return (
    <>
      <div className="illustration" role="presentation">
        {/* Cursor */}
        {[
          'initial',
          'cursor-appear',
          'cursor-click',
          'drag-to-second',
          'drag-to-third',
          'final',
        ].includes(phase) && (
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
        {[
          'initial',
          'cursor-appear',
          'cursor-click',
          'drag-to-second',
          'drag-to-third',
        ].includes(phase) && (
          <div className="bubbles">
            {/* Red square 1 bubble */}
            <div className="bubble">
              I vote red!
              <span className="arrow" style={{ left: '5rem' }}></span>
            </div>
            {/* Red square 2 bubble */}
            <div className="bubble">
              I vote red!
              <span className="arrow"></span>
            </div>
            {/* Blue square bubble */}
            <div className="bubble">
              I vote blue!
              <span className="arrow" style={{ left: '1rem' }}></span>
            </div>
          </div>
        )}

        {/* Combined speech bubble for final state */}
        {phase === 'final' && (
          <div className="bubbles">
            <div className="bubble">
              Together, we vote red!
              <span className="arrow" style={{ left: '1.5rem' }}></span>
              <span className="arrow"></span>
              <span className="arrow" style={{ left: '9.5rem' }}></span>
            </div>
          </div>
        )}

        <div className="voters" style={{ '--count': 3 } as CSSProperties}>
          <Voter {...getFirstVoterProps(phase)} />
          <Voter {...getSecondVoterProps(phase)} />
          <Voter {...getThirdVoterProps(phase)} />
        </div>
      </div>
    </>
  );
}
