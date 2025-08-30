export enum VoterColor {
  Red = 'red',
  Blue = 'blue',
  Purple = 'purple',
  Empty = 'empty',
}

export enum VoterType {
  Them = 'them',
  Us = 'us',
  Nobody = 'nobody',
}

export const US = VoterColor.Blue;
export const THEM = US === VoterColor.Blue ? VoterColor.Red : VoterColor.Blue;

export interface Voter {
  id: string;
  type: VoterType;
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
  usCount: number;
  themCount: number;
}

export interface Position {
  row: number;
  col: number;
}

export interface Move {
  voters: Position[];
}

export interface GameResult {
  usWins: number;
  themWins: number;
  ties: number;
  playerWon: boolean;
  isComplete: boolean;
}

export type TileState = 'default' | 'available' | 'selected' | 'completed';

export type DistrictWinner = VoterType | 'tie';

export type TileSide = 'top' | 'right' | 'bottom' | 'left';

export type TileBorders = Partial<Record<TileSide, boolean>>;

export type VoterMood =
  | 'elated'
  | 'happy'
  | 'neutral'
  | 'thinking'
  | 'worried'
  | 'sad'
  | 'party'
  | 'dignified';
