'use client';

import { VoterColor } from '@/types/game';
import { useGame } from '@/context/GameContext';
import Text from '@/components/Text/Text';
import Button from '@/components/Button/Button';

interface GameFooterProps {
  party: VoterColor;
}

export default function GameFooter({ party }: GameFooterProps) {
  const { gameState, gameResult, showGameResult } = useGame();
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
