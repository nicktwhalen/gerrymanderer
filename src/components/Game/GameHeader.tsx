'use client';

import { VoterColor } from '@/types/game';
import { useGame } from '@/context/GameContext';
import Text from '@/components/Text/Text';

interface GameHeaderProps {
  party: VoterColor;
}

export default function GameHeader({ party }: GameHeaderProps) {
  const { currentLevel } = useGame();

  return (
    <div className="flex-center">
      <Text tag="h2">
        <span className={`text-${party}`}>You</span> vs. Democracy: Round{' '}
        {currentLevel.id}
      </Text>
    </div>
  );
}
