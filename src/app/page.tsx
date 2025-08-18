'use client';

import { GameProvider } from '@/context/GameContext';
import { useIntro } from '@/hooks/useIntro';
import Game from '@/components/Game';
import Intro from '../components/Intro';

export default function Home() {
  const { showIntro, closeIntro } = useIntro();
  return <GameProvider>{showIntro ? <Intro onClose={closeIntro} /> : <Game />}</GameProvider>;
}
