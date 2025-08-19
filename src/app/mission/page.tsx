import type { Metadata } from 'next';
import Button from '@/components/Button/Button';
import Text from '@/components/Text/Text';
import Definition from '@/components/Definition/Definition';

export const metadata: Metadata = {
  title: 'The Gerrymanderer: Your mission',
  description: 'When a minority of voters control the majority of districts, you win!',
};

export default function Mission() {
  return (
    <>
      <Text>
        <h2>Your mission</h2>
      </Text>
      <Definition term="Gerrymandering" pronunciation="/ˈjerēˌmandəriNG/ (noun)" definition="The fine art of drawing voting districts so creatively that politicians get to choose their voters — rather than the other way around." />
      <Text>Divide the map into equal-sized districts by selecting connected squares.</Text>
      <Text>When a minority of voters control the majority of districts, you win!</Text>
      <div className="flex-center" style={{ marginTop: 'auto' }}>
        <Button href="/districts/">Back</Button>
        <Text color="white">Page 3 of 3</Text>
        <Button href="/game/">Start</Button>
      </div>
    </>
  );
}
