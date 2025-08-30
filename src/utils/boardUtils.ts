import {
  Voter,
  District,
  VoterType,
  VoterColor,
  VoterMood,
  TileBorders,
} from '@/types/game';

export const getVoterColor = (
  voterType: VoterType,
  US: VoterColor,
  THEM: VoterColor,
): VoterColor => {
  if (voterType === VoterType.Us) return US;
  if (voterType === VoterType.Them) return THEM;
  return VoterColor.Empty;
};

export const getDistrictWinnerColor = (
  district: District | null | undefined,
  US: VoterColor,
  THEM: VoterColor,
): VoterColor | undefined => {
  if (!district?.isComplete) return undefined;

  const usVotes = district.voters.filter((v) => v.type === VoterType.Us).length;
  const themVotes = district.voters.filter(
    (v) => v.type === VoterType.Them,
  ).length;

  return usVotes > themVotes
    ? US
    : themVotes > usVotes
      ? THEM
      : VoterColor.Purple;
};

export const getVoterMood = (
  voter: Voter,
  district: District | null | undefined,
  gameResult?: { usWins: number; themWins: number } | null,
): VoterMood => {
  if (!district) return 'neutral';

  // If the game is complete, determine the face based on the game result
  if (gameResult) {
    const { usWins, themWins } = gameResult;
    if (usWins > themWins) {
      if (voter.type === VoterType.Us) return 'elated';
      if (voter.type === VoterType.Them) return 'sad';
    } else if (themWins > usWins) {
      if (voter.type === VoterType.Us) return 'sad';
      if (voter.type === VoterType.Them) return 'elated';
    }
  }

  // Check if voter is in district by position
  const isVoterInDistrict = district.voters.some(
    (v) => v.row === voter.row && v.col === voter.col,
  );
  if (!isVoterInDistrict) return 'neutral';

  // If the district is not complete, return thinking
  if (!district.isComplete) return 'thinking';

  // If the district is complete, determine the face based on the majority type
  const usVotes = district.voters.filter((v) => v.type === VoterType.Us).length;
  const themVotes = district.voters.filter(
    (v) => v.type === VoterType.Them,
  ).length;

  if (usVotes > themVotes) {
    return voter.type === VoterType.Us ? 'happy' : 'worried';
  } else if (themVotes > usVotes) {
    return voter.type === VoterType.Them ? 'happy' : 'worried';
  } else {
    return 'thinking';
  }
};

export const getTileBorders = (
  voter: Voter,
  district: District | null | undefined,
  board: Voter[][],
): TileBorders => {
  const borders: TileBorders = {
    top: false,
    right: false,
    bottom: false,
    left: false,
  };

  // No district, no borders
  if (!district) {
    return borders;
  }

  // Check if voter is in district by position
  const isVoterInDistrict = district.voters.some(
    (v) => v.row === voter.row && v.col === voter.col,
  );
  if (!isVoterInDistrict) return borders;

  // Helper function to check if a position is in the district
  const isPositionInDistrict = (row: number, col: number) =>
    district.voters.some((v) => v.row === row && v.col === col);

  // Check adjacent positions
  const hasVoterAbove = isPositionInDistrict(voter.row - 1, voter.col);
  const hasVoterBelow = isPositionInDistrict(voter.row + 1, voter.col);
  const hasVoterLeft = isPositionInDistrict(voter.row, voter.col - 1);
  const hasVoterRight = isPositionInDistrict(voter.row, voter.col + 1);

  // Add borders where there's no adjacent voter in the same district
  borders.top = !hasVoterAbove;
  borders.bottom = !hasVoterBelow;
  borders.left = !hasVoterLeft;
  borders.right = !hasVoterRight;

  return borders;
};
