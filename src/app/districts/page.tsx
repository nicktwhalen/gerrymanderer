import type { Metadata } from 'next';
import Button from '@/components/Button/Button';
import Text from '@/components/Text/Text';
import Definition from '@/components/Definition/Definition';
import DistrictAnimation from '@/components/DistrictAnimation';
import ArrowRightIcon from '@/icons/ArrowRightIcon';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon';

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
      <Text>
        <p>Click or swipe to create a district of voters.</p>
      </Text>
      <div className="flex-center" style={{ marginTop: 'auto' }}>
        <Button ariaLabel="Previous: Voters" href="/voters/">
          <ArrowLeftIcon />
        </Button>
        <Text color="white">Page 2 of 3</Text>
        <Button ariaLabel="Next: Mission" href="/mission/">
          <ArrowRightIcon />
        </Button>
      </div>
    </>
  );
}
