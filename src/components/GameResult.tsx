'use client';

import { useModal } from '@/hooks/useModal';

interface GameResultProps {
  blueWins: number;
  redWins: number;
  ties: number;
  playerWon: boolean;
  onNewGame: () => void;
  onNextLevel?: () => void;
  redCount: number;
  blueCount: number;
  hasNextLevel: boolean;
}

export default function GameResult({ blueWins, redWins, ties, playerWon, onNewGame, onNextLevel, redCount, blueCount, hasNextLevel }: GameResultProps) {
  const { handleBackdropClick, handleModalClick } = useModal(true);

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }} onClick={handleBackdropClick}>
      <div className="comic-instructions p-6 max-w-sm w-full text-center" onClick={handleModalClick}>
        <h2 className={`comic-title text-3xl sm:text-4xl mb-4 ${playerWon ? 'text-green-600' : 'text-red-600'}`}>{playerWon ? 'VICTORY!' : 'DEFEAT!'}</h2>

        <div className="mb-6">
          {/* Voter and District Stats */}
          <div className="grid grid-cols-4 gap-3 text-center mb-4">
            <div className="p-2">
              <div className="comic-red font-bold">RED</div>
              <div className="comic-number comic-red">{redCount}</div>
            </div>
            <div className="p-2">
              <div className="comic-blue font-bold">BLUE</div>
              <div className="comic-number comic-blue">{blueCount}</div>
            </div>
            <div className={`p-2 ${redWins > blueWins ? 'comic-tile' : 'border-2 border-transparent'}`}>
              <div className="comic-red font-bold">RED</div>
              <div className="comic-number comic-red">{redWins}</div>
            </div>
            <div className={`p-2 ${blueWins > redWins ? 'comic-tile' : 'border-2 border-transparent'}`}>
              <div className="comic-blue font-bold">BLUE</div>
              <div className="comic-number comic-blue">{blueWins}</div>
            </div>
          </div>

          <div className="flex justify-between text-xs font-bold mb-4">
            <span>VOTERS</span>
            <span>DISTRICTS</span>
          </div>

          {ties > 0 && (
            <div className="text-center mb-2">
              <span>Tied Districts: </span>
              <span className="comic-number">{ties}</span>
            </div>
          )}
        </div>

        <div className="mb-3 text-sm">{playerWon ? 'You win! Take that, democracy!' : 'You lose! Try again.'}</div>

        <button onClick={playerWon && hasNextLevel ? onNextLevel : onNewGame} className="comic-tile comic-red-tile text-white font-bold px-6 py-3 text-lg hover:scale-105 transition-transform">
          {playerWon ? (hasNextLevel ? 'NEXT LEVEL' : 'PLAY AGAIN') : 'TRY AGAIN'}
        </button>
      </div>
    </div>
  );
}
