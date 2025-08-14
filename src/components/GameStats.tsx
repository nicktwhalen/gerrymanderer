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
    <div className="flex-center">
      <div className="tile flex-center">
        <h2>Voters:</h2>
        <h3 className="visually-hidden">Blue</h3>
        <p className="text-number text-blue">{gameState.blueCount}</p>
        <h3 className="visually-hidden">Red</h3>
        <p className="text-number text-red">{gameState.redCount}</p>
      </div>
      <div className="tile flex-center">
        <h2>Districts:</h2>
        <h3 className="visually-hidden">Blue</h3>
        <p className="text-number text-blue">{blueDistricts}</p>
        <h3 className="visually-hidden">Red</h3>
        <p className="text-number text-red">{redDistricts}</p>
      </div>
    </div>
  );
}
