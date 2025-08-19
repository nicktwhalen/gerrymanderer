import type { Metadata } from 'next';
import Button from '@/components/Button/Button';
import Text from '@/components/Text/Text';
import Definition from '@/components/Definition/Definition';
import VoterTile from '@/components/VoterTile';

export const metadata: Metadata = {
  title: 'The Gerrymanderer: Meet the voters',
  description: 'A human unit of democracy who shows up, fills in bubbles, and hopes their voice counts.',
};

export default function Voters() {
  return (
    <>
      <Text>
        <h2>Meet the voters</h2>
      </Text>
      <Definition term="Voter" pronunciation="/ˈvōdər/ (noun)" definition="A human unit of democracy who shows up, fills in bubbles, and hopes their voice counts." />
      <div className="illustration">
        <div className="bubbles">
          <div className="bubble">
            I vote red!
            <span className="arrow right"></span>
          </div>
          <div className="bubble">
            I vote blue!
            <span className="arrow left"></span>
          </div>
        </div>
        <div className="voters" style={{ '--grid-size-x': '2' } as React.CSSProperties}>
          <div className="grid-cell red">
            <div className="div-background" />
            <div className="div-foreground" />
            <VoterTile face="neutral" />
            <div className="div-border-top" />
            <div className="div-border-right" />
            <div className="div-border-bottom" />
            <div className="div-border-left" />
            <div className="div-border-dashed" />
          </div>
          <div className="grid-cell blue">
            <div className="div-background" />
            <div className="div-foreground" />
            <VoterTile face="neutral" />
            <div className="div-border-top" />
            <div className="div-border-right" />
            <div className="div-border-bottom" />
            <div className="div-border-left" />
            <div className="div-border-dashed" />
          </div>
        </div>
      </div>
      <Text>Each square is a voter.</Text>
      <div className="flex-center" style={{ marginTop: 'auto' }}>
        <Button disabled>Back</Button>
        <Text color="white">Page 1 of 3</Text>
        <Button href="/districts/">Next</Button>
      </div>
    </>
  );
}
