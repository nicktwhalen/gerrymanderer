'use client';

import { GameState, District, DistrictWinner, VoterType } from '@/types/game';
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
    const usCount = district.voters.filter(
      (v) => v.type === VoterType.Us,
    ).length;
    const themCount = district.voters.filter(
      (v) => v.type === VoterType.Them,
    ).length;

    if (usCount > themCount) return VoterType.Us;
    if (themCount > usCount) return VoterType.Them;
    return 'tie';
  };

  const completedDistricts = districts.filter((d) => d.isComplete);
  const usDistricts = completedDistricts.filter(
    (d) => getDistrictMajority(d) === VoterType.Us,
  ).length;
  const themDistricts = completedDistricts.filter(
    (d) => getDistrictMajority(d) === VoterType.Them,
  ).length;

  return (
    <>
      <div className="flex-center">
        <Text>
          <div className="flex-center">
            <h2>Districts:</h2>
            <Meter
              red={themDistricts}
              blue={usDistricts}
              total={totalDistricts}
            />
          </div>
        </Text>
        <Button ariaLabel="Reset board" onClick={resetGame}>
          <ResetIcon />
        </Button>
      </div>
    </>
  );
}
