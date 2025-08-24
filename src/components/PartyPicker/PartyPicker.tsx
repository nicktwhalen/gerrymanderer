'use client';
import { useEffect, useState } from 'react';
import { VoterColor } from '@/types/game';
import Board from '@/components/Board/Board';
import Text from '@/components/Text/Text';
import VoterGrid from '@/components/VoterGrid/VoterGrid';
import VoterButton from '@/components/VoterButton/VoterButton';
import Bubble from '@/components/Bubble/Bubble';
import Button from '@/components/Button/Button';

export type PartyPickerProps = {};

export default function PartyPicker(props: PartyPickerProps) {
  const [party, setParty] = useState<VoterColor>();

  useEffect(() => {
    const party = localStorage.getItem('party');
    if (party) {
      setParty(party as VoterColor);
    }
  }, []);

  const selectedBorders = { top: true, right: true, bottom: true, left: true };
  return (
    <>
      <Board style={{ marginTop: '1rem' }}>
        <div className="bubbles" style={{ gap: '3rem' }}>
          <Bubble>I vote blue!</Bubble>
          <Bubble>I vote red!</Bubble>
        </div>
        <VoterGrid cols={2} rows={1}>
          <VoterButton
            state={party === VoterColor.Blue ? 'selected' : 'default'}
            onClick={() => {
              setParty(VoterColor.Blue);
            }}
            color={VoterColor.Blue}
            mood="party"
            size={2}
            borders={party === VoterColor.Blue ? selectedBorders : undefined}
          />
          <VoterButton
            state={party === VoterColor.Red ? 'selected' : 'default'}
            onClick={() => {
              setParty(VoterColor.Red);
            }}
            color={VoterColor.Red}
            mood="dignified"
            size={2}
            borders={party === VoterColor.Red ? selectedBorders : undefined}
          />
        </VoterGrid>
      </Board>
      {party ? (
        <Button
          href="/game"
          onClick={() => {
            localStorage.setItem('party', party);
          }}
        >
          Join the {party === VoterColor.Blue ? 'Blue' : 'Red'} party
        </Button>
      ) : (
        <Text>Join a party to start the game</Text>
      )}
    </>
  );
}
