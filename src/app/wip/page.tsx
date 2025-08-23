import { VoterColor } from '@/types/game';
import Text from '@/components/Text/Text';
import VoterButton from '@/components/VoterButton/VoterButton';
import VoterGrid from '@/components/VoterGrid/VoterGrid';

export default function WIP() {
  return (
    <>
      <Text>
        <h2>Pick your party:</h2>
      </Text>
      <div className="illustration">
        <VoterGrid cols={2} rows={1}>
          <VoterButton color={VoterColor.Blue} mood="party" size={2} />
          <VoterButton color={VoterColor.Red} mood="dignified" size={2} />
        </VoterGrid>
      </div>
      <Text>
        <p>
          Which one are you? Some clever copy about two sides of the same coin.
        </p>
      </Text>
    </>
  );
}
