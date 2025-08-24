import type { Metadata } from 'next';
import Text from '@/components/Text/Text';
import Definition from '@/components/Definition/Definition';
import PartyPicker from '@/components/PartyPicker/PartyPicker';

export const metadata: Metadata = {
  title: 'The Gerrymanderer: Settings',
  description: 'Pick your party!',
};

export default function Settings() {
  return (
    <>
      <Text tag="h2">Pick your party!</Text>
      <Definition
        term="Party"
        pronunciation="/ˈpɑɹ.ti/ (noun)"
        definition="A gang of voters who believe winning the game is more important than doing the right thing."
      />
      <PartyPicker />
    </>
  );
}
