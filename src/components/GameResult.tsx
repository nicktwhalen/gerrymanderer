'use client';

import {
  GameState,
  US,
  THEM,
  District,
  DistrictWinner,
  VoterType,
} from '@/types/game';
import { Level } from '@/types/level';
import GameBoard from './GameBoard';
import Text from './Text/Text';
import Meter from '@/components/Meter/Meter';

interface GameResultProps {
  usWins: number;
  themWins: number;
  ties: number;
  playerWon: boolean;
  onNewGame: () => void;
  onNextLevel?: () => void;
  usCount: number;
  themCount: number;
  hasNextLevel: boolean;
  gameState: GameState;
  currentLevel: Level;
  version?: string; // Optional version prop for conditional rendering
}

export default function GameResult({
  playerWon,
  onNewGame,
  onNextLevel,
  hasNextLevel,
  currentLevel,
  gameState,
}: GameResultProps) {
  const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

  // Calculate district meter data (same logic as GameStats)
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

  const completedDistricts = gameState.districts.filter((d) => d.isComplete);
  const usDistricts = completedDistricts.filter(
    (d) => getDistrictMajority(d) === VoterType.Us,
  ).length;
  const themDistricts = completedDistricts.filter(
    (d) => getDistrictMajority(d) === VoterType.Them,
  ).length;

  return (
    <>
      {playerWon ? (
        <>
          <Text>
            <h2>
              Victory: <span className={`text-${US}`}>you</span> win!
            </h2>
          </Text>

          <GameBoard
            onBoardClick={hasNextLevel ? onNextLevel : onNewGame}
            isInteractive={true}
          />

          <div className="flex-center">
            <Text>
              <div className="flex-center">
                <h2>Districts:</h2>
                <Meter
                  red={themDistricts}
                  blue={usDistricts}
                  total={gameState.totalDistricts}
                />
              </div>
            </Text>
          </div>

          <Text>
            <p>Click board for next level</p>
          </Text>
        </>
      ) : (
        <>
          <Text>
            <h2>
              Defeat: <span className={`text-${US}`}>you</span> lose!
            </h2>
          </Text>

          <GameBoard onBoardClick={onNewGame} isInteractive={true} />

          <div className="flex-center">
            <Text>
              <div className="flex-center">
                <h2>Districts:</h2>
                <Meter
                  red={themDistricts}
                  blue={usDistricts}
                  total={gameState.totalDistricts}
                />
              </div>
            </Text>
          </div>

          <Text>
            <p>Click board to try again</p>
          </Text>
        </>
      )}
    </>
  );
}
