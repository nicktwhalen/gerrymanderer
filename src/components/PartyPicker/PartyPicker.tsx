'use client';
import { useRouter } from 'next/navigation';
import { VoterColor } from '@/types/game';
import Board from '@/components/Board/Board';
import Text from '@/components/Text/Text';
import VoterGrid from '@/components/VoterGrid/VoterGrid';
import VoterButton from '@/components/VoterButton/VoterButton';
import Bubble from '@/components/Bubble/Bubble';
import Button from '@/components/Button/Button';

export type PartyPickerProps = {};

export default function PartyPicker(props: PartyPickerProps) {
  const router = useRouter();

  return (
    <>
      <Board style={{ marginTop: '1rem' }}>
        <div className="bubbles" style={{ gap: '3rem' }}>
          <Bubble>I vote blue!</Bubble>
          <Bubble>I vote red!</Bubble>
        </div>
        <VoterGrid cols={2} rows={1}>
          <VoterButton
            onClick={() => {
              localStorage.setItem('party', VoterColor.Blue);
              router.push('/game');
            }}
            color={VoterColor.Blue}
            mood="party"
            size={2}
          />
          <VoterButton
            onClick={() => {
              localStorage.setItem('party', VoterColor.Red);
              router.push('/game');
            }}
            color={VoterColor.Red}
            mood="dignified"
            size={2}
          />
        </VoterGrid>
      </Board>
      <Text>Select a party to start the game</Text>
    </>
  );
}
