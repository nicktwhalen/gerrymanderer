export type VoterColor = 'red' | 'blue';

export interface Voter {
  id: string;
  color: VoterColor;
  row: number;
  col: number;
}

export interface District {
  id: string;
  voters: Voter[];
  isComplete: boolean;
}

export interface GameState {
  board: Voter[][];
  districts: District[];
  currentDistrict: District | null;
  requiredDistrictSize: number;
  totalDistricts: number;
  redCount: number;
  blueCount: number;
}

export interface Position {
  row: number;
  col: number;
}

export interface GameResult {
  blueWins: number;
  redWins: number;
  ties: number;
  playerWon: boolean;
  isComplete: boolean;
}

export type TileState = 'default' | 'available' | 'selected' | 'completed';

export type DistrictWinner = VoterColor | 'tie';

export type TileSide = 'top' | 'right' | 'bottom' | 'left';

export type TileBorders = Record<TileSide, boolean>;

export type VoterMood =
  | 'elated'
  | 'happy'
  | 'neutral'
  | 'thinking'
  | 'worried'
  | 'sad';
export type Face = '😁' | '😊' | '😐' | '🤔' | '🥺' | '😢';
