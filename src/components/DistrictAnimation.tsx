'use client';

import { useState, useEffect, CSSProperties } from 'react';
import VoterButton, {
  VoterButtonProps,
} from '@/components/VoterButton/VoterButton';
import Cursor from '@/components/Cursor/Cursor';
import Bubble from '@/components/Bubble/Bubble';
import { VoterColor } from '@/types/game';
import VoterGrid from './VoterGrid/VoterGrid';
import Board from './Board/Board';

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
      { phase: 'initial', duration: 3000 },
      { phase: 'cursor-appear', duration: 500 },
      { phase: 'cursor-click', duration: 0 },
      { phase: 'drag-to-second', duration: 500 },
      { phase: 'drag-to-third', duration: 500 },
      { phase: 'final', duration: 2500 },
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
        setCursorPosition({ x: '4.5rem', y: '9rem' });
      } else if (
        step.phase === 'cursor-appear' ||
        step.phase === 'cursor-click'
      ) {
        setCursorPosition({ x: '4.5rem', y: '7rem' }); // Center of first square
      } else if (step.phase === 'drag-to-second') {
        setCursorPosition({ x: '10.5rem', y: '7rem' }); // Center of second square
      } else if (step.phase === 'drag-to-third') {
        setCursorPosition({ x: '17rem', y: '7rem' }); // Center of third square
      } else if (step.phase === 'final') {
        setCursorPosition({ x: '17rem', y: '9rem' }); // disappear
      }

      currentStep++;
      setTimeout(runAnimation, step.duration);
    };

    const timer = setTimeout(runAnimation, 1); // Initial delay

    return () => clearTimeout(timer);
  }, []);

  const getFirstVoterButtonProps = (
    phase: AnimationPhase,
  ): VoterButtonProps => {
    const color = VoterColor.Red;
    switch (phase) {
      case 'cursor-appear':
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
          districtColor: VoterColor.Red,
          borders: { top: true, right: false, bottom: true, left: true },
        };
      default:
        return { color, mood: 'neutral' };
    }
  };

  const getSecondVoterButtonProps = (
    phase: AnimationPhase,
  ): VoterButtonProps => {
    const color = VoterColor.Blue;
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
          mood: 'sad',
          state: 'completed',
          districtColor: VoterColor.Red,
          borders: { top: true, right: false, bottom: true, left: false },
        };
      default:
        return { color, mood: 'neutral' };
    }
  };

  const getThirdVoterButtonProps = (
    phase: AnimationPhase,
  ): VoterButtonProps => {
    const color = VoterColor.Red;
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
          mood: 'elated',
          state: 'completed',
          districtColor: VoterColor.Red,
          borders: { top: true, right: true, bottom: true, left: false },
        };
      default:
        return { color, mood: 'neutral' };
    }
  };

  return (
    <Board interactive={false} style={{ margin: '0.5rem auto -1.5rem' }}>
      <Cursor
        x={cursorPosition.x}
        y={cursorPosition.y}
        visible={!['initial', 'final'].includes(phase)}
      />

      {/* Individual speech bubbles for initial state */}
      {[
        'initial',
        'cursor-appear',
        'cursor-click',
        'drag-to-second',
        'drag-to-third',
      ].includes(phase) && (
        <div className="bubbles">
          <Bubble delay={1000}>I vote red!</Bubble>
          <Bubble delay={1500}>I vote blue!</Bubble>
          <Bubble delay={2000}>I vote red!</Bubble>
        </div>
      )}

      {/* Combined speech bubble for final state */}
      {phase === 'final' && (
        <div className="bubbles">
          <Bubble arrow="all">Together, the district votes red!</Bubble>
        </div>
      )}

      <VoterGrid cols={3} rows={1}>
        <VoterButton size={3} {...getFirstVoterButtonProps(phase)} />
        <VoterButton size={3} {...getSecondVoterButtonProps(phase)} />
        <VoterButton size={3} {...getThirdVoterButtonProps(phase)} />
      </VoterGrid>
    </Board>
  );
}
