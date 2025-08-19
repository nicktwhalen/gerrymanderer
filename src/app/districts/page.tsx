import type { Metadata } from 'next';
import Button from '@/components/Button/Button';
import Text from '@/components/Text/Text';
import Definition from '@/components/Definition/Definition';
import DistrictAnimation from '@/components/DistrictAnimation';

export const metadata: Metadata = {
  title: 'The Gerrymanderer: Draw the district',
  description: 'A group of voters where the majority wins—often drawn with the creativity of a villainous Michelangelo.',
};

export default function Districts() {
  return (
    <>
      <Text>
        <h2>Draw the district</h2>
      </Text>
      <Definition term="District" pronunciation="/ˈdistrikt/ (noun)" definition="A group of voters where the majority wins—often drawn with the creativity of a villainous Michelangelo." />
      <DistrictAnimation />
      <Text>Click or swipe to create a district of voters.</Text>
      <div className="flex-center" style={{ marginTop: 'auto' }}>
        <Button href="/voters/">Back</Button>
        <Text color="white">Page 2 of 3</Text>
        <Button href="/mission/">Next</Button>
      </div>
    </>
  );
}
