'use client';

import { GameState, District, DistrictWinner } from '@/types/game';
import Button from '@/components/Button/Button';
import ResetIcon from '@/icons/ResetIcon';
import Meter from '@/components/Meter/Meter';
import Text from '@/components/Text/Text';

interface GameStatsProps {
  gameState: GameState;
  resetGame?: () => void;
}

export default function GameStats({ gameState, resetGame }: GameStatsProps) {
  const { districts, requiredDistrictSize, totalDistricts } = gameState;

  const getDistrictMajority = (district: District): DistrictWinner => {
    const redCount = district.voters.filter((v) => v.color === 'red').length;
    const blueCount = district.voters.filter((v) => v.color === 'blue').length;

    if (redCount > blueCount) return 'red';
    if (blueCount > redCount) return 'blue';
    return 'tie';
  };

  const completedDistricts = districts.filter((d) => d.isComplete);
  const redDistricts = completedDistricts.filter(
    (d) => getDistrictMajority(d) === 'red',
  ).length;
  const blueDistricts = completedDistricts.filter(
    (d) => getDistrictMajority(d) === 'blue',
  ).length;

  return (
    <>
      <div className="flex-center">
        <Text>
          <div className="flex-center">
            <h2>Districts:</h2>
            <Meter
              red={redDistricts}
              blue={blueDistricts}
              total={totalDistricts}
            />
          </div>
        </Text>
        <Button ariaLabel="Reset board" onClick={resetGame}>
          <ResetIcon />
        </Button>
      </div>
      <Text>
        <p>
          Draw {totalDistricts} districts of {requiredDistrictSize} voters each!
        </p>
      </Text>
    </>
  );
}
