'use client';

import { District, DistrictWinner, VoterColor, VoterType } from '@/types/game';
import { useGame } from '@/context/GameContext';
import ResetIcon from '@/icons/ResetIcon';
import Button from '@/components/Button/Button';
import SettingsIcon from '@/icons/SettingsIcon';
import Meter from '@/components/Meter/Meter';

interface GameStatsProps {
  party: VoterColor;
}

export default function GameStats({ party }: GameStatsProps) {
  const { gameState, resetGame, currentLevel, gameResult } = useGame();
  const { districts, totalDistricts } = gameState;

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

  const redDistricts = party === VoterColor.Red ? usDistricts : themDistricts;
  const blueDistricts = party === VoterColor.Red ? themDistricts : usDistricts;

  // Disable buttons when player has won
  const isPlayerWon = gameResult?.playerWon;

  return (
    <div className="flex-center" style={{ marginTop: '-.5rem' }}>
      <Button
        ariaLabel="Settings"
        href={isPlayerWon ? undefined : '/settings'}
        disabled={isPlayerWon}
        onClick={() => {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('returnLevel', currentLevel.id.toString());
          }
        }}
      >
        <SettingsIcon />
      </Button>
      <Meter red={redDistricts} blue={blueDistricts} total={totalDistricts} />
      <Button
        ariaLabel="Reset board"
        onClick={isPlayerWon ? undefined : resetGame}
        disabled={isPlayerWon}
      >
        <ResetIcon />
      </Button>
    </div>
  );
}
