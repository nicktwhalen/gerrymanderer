'use client';

import { VoterColor } from '@/types/game';
import { useGame } from '@/context/GameContext';
import Text from '@/components/Text/Text';

interface GameFooterProps {
  party: VoterColor;
}

export default function GameFooter({ party }: GameFooterProps) {
  const { gameState, gameResult, showGameResult } = useGame();
  const { requiredDistrictSize, totalDistricts } = gameState;
  const { playerWon } = gameResult || {};
  const districtsNeeded = Math.floor(totalDistricts / 2) + 1;

  if (!showGameResult) {
    return (
      <Text>
        Each district must have {requiredDistrictSize} voters.
        <br />
        Take {districtsNeeded} districts to win!
      </Text>
    );
  }

  if (playerWon) {
    return (
      <Text>
        <span className={`text-${party}`}>You</span> win! Take that, Democracy!
      </Text>
    );
  } else {
    return (
      <Text>
        <span className={`text-${party}`}>You</span> lose! Democracy prevails.
      </Text>
    );
  }
}
