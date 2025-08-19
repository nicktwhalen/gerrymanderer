'use client';

import { GameState, District, DistrictWinner } from '@/types/game';
import ResetIcon from './ResetIcon';

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
  const redDistricts = completedDistricts.filter((d) => getDistrictMajority(d) === 'red').length;
  const blueDistricts = completedDistricts.filter((d) => getDistrictMajority(d) === 'blue').length;

  const districtToWin = requiredDistrictSize - Math.max(redDistricts, blueDistricts);

  return (
    <>
      <div className="flex-center">
        <div className="tile flex-center">
          <h2>Districts:</h2>
          <div className="district-meter">
            <div className="district-meter-label district-meter-label-blue" style={{ width: `${(blueDistricts / totalDistricts) * 100}%` }}></div>
            <div className="district-meter-label district-meter-label-open" style={{ width: `${((totalDistricts - redDistricts - blueDistricts) / totalDistricts) * 100}%` }}></div>
            <div className="district-meter-label district-meter-label-red" style={{ width: `${(redDistricts / totalDistricts) * 100}%` }}></div>
          </div>
        </div>
        <button aria-label="Reset board" onClick={resetGame}>
          <ResetIcon />
        </button>
      </div>
      <p className="tile">
        Draw {totalDistricts} districts of {requiredDistrictSize} voters each!
      </p>
    </>
  );
}
