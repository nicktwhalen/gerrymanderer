import GameBoard from '@/components/GameBoard';
import { GameProvider } from '@/context/GameContext';

export default function Home() {
  return (
    <GameProvider>
      <GameBoard version="2.0" />
    </GameProvider>
  );
}
