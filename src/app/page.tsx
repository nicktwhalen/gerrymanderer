import { Metadata } from 'next';
import Hero from '@/components/Hero/Hero';
import Button from '@/components/Button/Button';
import Text from '@/components/Text/Text';

export const metadata: Metadata = {
  title: 'The Gerrymanderer',
  description:
    'A game that teaches the concepts of gerrymandering and democracy.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <Text>
        <p>
          The world’s best
          <span
            style={{
              display: 'block',
              marginTop: '-0.25rem',
              fontSize: '1.75rem',
            }}
          >
            gerrymanderer
          </span>
        </p>
      </Text>
      <Text>
        <p>
          It’s your job to draw districts
          <br />
          so that the voting minority wins
          <br />
          the majority of districts.
        </p>
      </Text>
      <div className="flex-center">
        <Button href="/voters">How to play</Button>
        <Button href="/game">Start game</Button>
      </div>
    </>
  );
}
