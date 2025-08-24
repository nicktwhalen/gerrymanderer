'use client';
import { GameState } from '@/types/game';
import Text from '@/components/Text/Text';

interface GameInstructionProps {
  gameState: GameState;
}

export default function GameInstructions({ gameState }: GameInstructionProps) {
  const { requiredDistrictSize, totalDistricts } = gameState;

  return (
    <Text>
      Draw {totalDistricts} districts of {requiredDistrictSize} voters each!
    </Text>
  );
}
