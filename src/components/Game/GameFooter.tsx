'use client';

import { VoterColor } from '@/types/game';
import { useGame } from '@/context/GameContext';
import Text from '@/components/Text/Text';
import Button from '@/components/Button/Button';

interface GameFooterProps {
  party: VoterColor;
}

export default function GameFooter({ party }: GameFooterProps) {
  const {
    gameState,
    gameResult,
    showGameResult,
    hasNextLevel,
    nextLevel,
    resetGame,
  } = useGame();
  const { requiredDistrictSize, totalDistricts } = gameState;
  const { playerWon } = gameResult || {};

  if (!showGameResult) {
    return (
      <Text>
        Draw {totalDistricts} districts of {requiredDistrictSize} voters each!
      </Text>
    );
  }

  if (playerWon) {
    return (
      <>
        <Text>
          <span className={`text-${party}`}>You</span> win! Take that,
          Democracy!
        </Text>
        <Button onClick={hasNextLevel ? nextLevel : resetGame}>
          {hasNextLevel ? 'Next level' : 'Play again'}
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Text>
          <span className={`text-${party}`}>You</span> lose! Democracy prevails.
        </Text>
        <Button onClick={resetGame}>Try again</Button>
      </>
    );
  }
}
