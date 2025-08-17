'use client';

import { GameState, District, DistrictWinner } from '@/types/game';

interface GameStatsProps {
  gameState: GameState;
  version?: string; // Optional version prop for conditional rendering
}

export default function GameStats({ gameState, version = '1.0' }: GameStatsProps) {
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

  return version === '1.0' ? (
    <>
      <div className="tile tile-scoreboard flex-center">
        <h2>Voters:</h2>
        <h3 className="visually-hidden">Blue</h3>
        <p className="text-number text-blue">{gameState.blueCount}</p>
        <h3 className="visually-hidden">Red</h3>
        <p className="text-number text-red">{gameState.redCount}</p>
      </div>
      <div className="tile tile-scoreboard flex-center">
        <h2>Districts:</h2>
        <h3 className="visually-hidden">Blue</h3>
        <p className="text-number text-blue">{blueDistricts}</p>
        <h3 className="visually-hidden">Red</h3>
        <p className="text-number text-red">{redDistricts}</p>
      </div>
    </>
  ) : (
    <div className="tile tile-scoreboard-v2 flex-center">
      <h2>Districts:</h2>
      <div className="district-meter">
        <div className="district-meter-label district-meter-label-red" style={{ width: `${(redDistricts / gameState.totalDistricts) * 100}%` }}></div>
        <div className="district-meter-label district-meter-label-open" style={{ width: `${((gameState.totalDistricts - redDistricts - blueDistricts) / gameState.totalDistricts) * 100}%` }}></div>
        <div className="district-meter-label district-meter-label-blue" style={{ width: `${(blueDistricts / gameState.totalDistricts) * 100}%` }}></div>
      </div>
    </div>
  );
}
