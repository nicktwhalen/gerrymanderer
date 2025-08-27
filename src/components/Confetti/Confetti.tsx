import confetti from 'canvas-confetti';
import { VoterColor } from '@/types/game';

type ConfettiProps = {
  party: VoterColor;
};

export default function Confetti({ party }: ConfettiProps) {
  const count = 100;
  const blueColors = ['#ffffff', '#0066cc', '#0000f0', '#00ccff'];
  const redColors = ['#ffffff', '#dc143c', '#b22222', '#8b0000'];

  const fire = (particleRatio: number, opts: confetti.Options) => {
    confetti({
      origin: { y: 0.65 },
      colors: party === VoterColor.Blue ? blueColors : redColors,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  };

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });

  return <></>;
}
