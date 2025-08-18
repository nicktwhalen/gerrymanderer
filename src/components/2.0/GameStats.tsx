'use client';

import { GameState, District, DistrictWinner } from '@/types/game';

interface GameStatsProps {
  gameState: GameState;
}

export default function GameStats({ gameState }: GameStatsProps) {
  const getDistrictMajority = (district: District): DistrictWinner => {
    const redCount = district.voters.filter((v) => v.color === 'red').length;
    const blueCount = district.voters.filter((v) => v.color === 'blue').length;

    if (redCount > blueCount) return 'red';
    if (blueCount > redCount) return 'blue';
    return 'tie';
  };

  const completedDistricts = gameState.districts.filter((d) => d.isComplete);
  const redDistricts = completedDistricts.filter((d) => getDistrictMajority(d) === 'red').length;
  const blueDistricts = completedDistricts.filter((d) => getDistrictMajority(d) === 'blue').length;

  return (
    <div className="tile flex-center">
      <h2>Districts:</h2>
      <div className="district-meter">
        <div className="district-meter-label district-meter-label-blue" style={{ width: `${(blueDistricts / gameState.totalDistricts) * 100}%` }}></div>
        <div className="district-meter-label district-meter-label-open" style={{ width: `${((gameState.totalDistricts - redDistricts - blueDistricts) / gameState.totalDistricts) * 100}%` }}></div>
        <div className="district-meter-label district-meter-label-red" style={{ width: `${(redDistricts / gameState.totalDistricts) * 100}%` }}></div>
      </div>
    </div>
  );
}
