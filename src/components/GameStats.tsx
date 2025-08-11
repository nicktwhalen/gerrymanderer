'use client';

import { GameState, District, DistrictWinner } from '@/types/game';
import { CSS_CLASSES } from '@/config/constants';

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
    <div className={`${CSS_CLASSES.COMIC.INSTRUCTIONS} mt-4 p-3 max-w-md relative`}>
      {/* Vertical dividing line through entire scoreboard */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-black" style={{ left: 'calc(50% + 1px)' }}></div>

      <div className="grid grid-cols-4 gap-3 text-center mb-2">
        <div>
          <div className={`${CSS_CLASSES.COMIC.RED} font-bold`}>RED</div>
          <div className={`${CSS_CLASSES.COMIC.NUMBER} ${CSS_CLASSES.COMIC.RED}`}>{gameState.redCount}</div>
        </div>
        <div>
          <div className={`${CSS_CLASSES.COMIC.BLUE} font-bold`}>BLUE</div>
          <div className={`${CSS_CLASSES.COMIC.NUMBER} ${CSS_CLASSES.COMIC.BLUE}`}>{gameState.blueCount}</div>
        </div>
        <div>
          <div className={`${CSS_CLASSES.COMIC.RED} font-bold`}>RED</div>
          <div className={`${CSS_CLASSES.COMIC.NUMBER} ${CSS_CLASSES.COMIC.RED}`}>{redDistricts}</div>
        </div>
        <div>
          <div className={`${CSS_CLASSES.COMIC.BLUE} font-bold`}>BLUE</div>
          <div className={`${CSS_CLASSES.COMIC.NUMBER} ${CSS_CLASSES.COMIC.BLUE}`}>{blueDistricts}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-0 text-xs font-bold text-center">
        <span>VOTERS</span>
        <span>DISTRICTS</span>
      </div>
    </div>
  );
}
