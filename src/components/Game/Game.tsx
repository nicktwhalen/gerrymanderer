'use client';

import { useEffect, useState } from 'react';
import { redirect, RedirectType } from 'next/navigation';
import { VoterColor } from '@/types/game';
import GameBoard from '@/components/Game/GameBoard';
import GameHeader from '@/components/Game/GameHeader';
import GameStats from '@/components/Game/GameStats';
import GameFooter from '@/components/Game/GameFooter';

export default function Game() {
  const [party, setParty] = useState<VoterColor>();

  useEffect(() => {
    const party = localStorage.getItem('party') as VoterColor;
    if (party) {
      setParty(party);
    } else {
      redirect('/settings', RedirectType.replace);
    }
  }, []);

  if (!party) {
    return null;
  }

  return (
    <>
      <GameHeader party={party} />
      <GameBoard party={party} />
      <GameStats party={party} />
      <GameFooter party={party} />
    </>
  );
}
