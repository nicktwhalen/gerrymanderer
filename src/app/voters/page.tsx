import type { Metadata } from 'next';
import Text from '@/components/Text/Text';
import Definition from '@/components/Definition/Definition';
import Button from '@/components/Button/Button';
import VoterButton from '@/components/VoterButton/VoterButton';
import Bubble from '@/components/Bubble/Bubble';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/icons/ArrowRightIcon';
import { VoterColor } from '@/types/game';
import VoterGrid from '@/components/VoterGrid/VoterGrid';
import Board from '@/components/Board/Board';

export const metadata: Metadata = {
  title: 'The Gerrymanderer: Meet the voters',
  description:
    'A human unit of democracy who shows up, fills in bubbles, and hopes their voice counts.',
};

export default function Voters() {
  return (
    <>
      <Text tag="h2">Meet the voters</Text>
      <Definition
        term="Voter"
        pronunciation="/ˈvōdər/ (noun)"
        definition="A human unit of democracy who shows up, fills in bubbles, and hopes their voice counts."
      />
      <Board interactive={false} style={{ margin: '0.5rem auto -1.5rem' }}>
        <div className="bubbles">
          <Bubble delay={500}>I vote red!</Bubble>
          <Bubble delay={1000}>I vote blue!</Bubble>
        </div>
        <VoterGrid cols={2} rows={1}>
          <VoterButton color={VoterColor.Red} size={3} />
          <VoterButton color={VoterColor.Blue} size={3} />
        </VoterGrid>
      </Board>
      <Text>Each square is a voter.</Text>
      <div className="flex-center" style={{ marginTop: 'auto' }}>
        <Button href="/" ariaLabel="Back: Home">
          <ArrowLeftIcon />
        </Button>
        <Text color="white">Page 1 of 3</Text>
        <Button href="/districts" ariaLabel="Next: Districts">
          <ArrowRightIcon />
        </Button>
      </div>
    </>
  );
}
