import type { Metadata } from 'next';
import Text from '@/components/Text/Text';
import Definition from '@/components/Definition/Definition';
import Button from '@/components/Button/Button';
import Voter from '@/components/Voter/Voter';
import Bubble from '@/components/Bubble/Bubble';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/icons/ArrowRightIcon';

export const metadata: Metadata = {
  title: 'The Gerrymanderer: Meet the voters',
  description:
    'A human unit of democracy who shows up, fills in bubbles, and hopes their voice counts.',
};

export default function Voters() {
  return (
    <>
      <Text>
        <h2>Meet the voters</h2>
      </Text>
      <Definition
        term="Voter"
        pronunciation="/ˈvōdər/ (noun)"
        definition="A human unit of democracy who shows up, fills in bubbles, and hopes their voice counts."
      />
      <div className="illustration" role="presentation">
        <div className="bubbles">
          <Bubble arrow="right" delay={500}>
            I vote red!
          </Bubble>
          <Bubble arrow="left" delay={1000}>
            I vote blue!
          </Bubble>
        </div>
        <div className="voters" style={{ '--count': 2 } as React.CSSProperties}>
          <Voter color="red" />
          <Voter color="blue" />
        </div>
      </div>
      <Text>
        <p>Each square is a voter.</p>
      </Text>
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
