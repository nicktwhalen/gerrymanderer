'use client';

import Intro from '../../components/2.0/Intro';
import { useIntro } from '@/hooks/useIntro';
import Game from '@/components/2.0/Game';

export default function Home() {
  const { showIntro, closeIntro } = useIntro();
  return showIntro ? <Intro onClose={closeIntro} /> : <Game />;
}
