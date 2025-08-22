import { Voter } from '@/types/game';

// Simple utility tests that don't require React context
describe('Game Logic Utilities', () => {
  const createTestVoter = (
    id: string,
    row: number,
    col: number,
    color: 'red' | 'blue' = 'red',
  ): Voter => ({
    id,
    row,
    col,
    color,
  });

  describe('Adjacent Position Logic', () => {
    const isAdjacent = (
      pos1: { row: number; col: number },
      pos2: { row: number; col: number },
    ): boolean => {
      const rowDiff = Math.abs(pos1.row - pos2.row);
      const colDiff = Math.abs(pos1.col - pos2.col);
      return (
        (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)
      );
    };

    it('should return true for horizontally adjacent positions', () => {
      const pos1 = { row: 1, col: 1 };
      const pos2 = { row: 1, col: 2 };
      expect(isAdjacent(pos1, pos2)).toBe(true);
    });

    it('should return true for vertically adjacent positions', () => {
      const pos1 = { row: 1, col: 1 };
      const pos2 = { row: 2, col: 1 };
      expect(isAdjacent(pos1, pos2)).toBe(true);
    });

    it('should return false for diagonally adjacent positions', () => {
      const pos1 = { row: 1, col: 1 };
      const pos2 = { row: 2, col: 2 };
      expect(isAdjacent(pos1, pos2)).toBe(false);
    });

    it('should return false for non-adjacent positions', () => {
      const pos1 = { row: 1, col: 1 };
      const pos2 = { row: 3, col: 3 };
      expect(isAdjacent(pos1, pos2)).toBe(false);
    });
  });

  describe('Contiguity Algorithm', () => {
    const isContiguous = (voters: Voter[]): boolean => {
      if (voters.length <= 1) return true;

      const isAdjacent = (
        pos1: { row: number; col: number },
        pos2: { row: number; col: number },
      ): boolean => {
        const rowDiff = Math.abs(pos1.row - pos2.row);
        const colDiff = Math.abs(pos1.col - pos2.col);
        return (
          (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)
        );
      };

      const visited = new Set<string>();
      const queue = [voters[0]];
      visited.add(voters[0].id);

      while (queue.length > 0) {
        const current = queue.shift();
        if (!current) continue;

        for (const voter of voters) {
          if (!visited.has(voter.id) && isAdjacent(current, voter)) {
            visited.add(voter.id);
            queue.push(voter);
          }
        }
      }

      return visited.size === voters.length;
    };

    it('should return true for single voter', () => {
      const voters = [createTestVoter('1', 0, 0)];
      expect(isContiguous(voters)).toBe(true);
    });

    it('should return true for empty array', () => {
      expect(isContiguous([])).toBe(true);
    });

    it('should return true for contiguous voters in a line', () => {
      const voters = [
        createTestVoter('1', 0, 0),
        createTestVoter('2', 0, 1),
        createTestVoter('3', 0, 2),
      ];
      expect(isContiguous(voters)).toBe(true);
    });

    it('should return true for contiguous voters in L-shape', () => {
      const voters = [
        createTestVoter('1', 0, 0),
        createTestVoter('2', 0, 1),
        createTestVoter('3', 1, 1),
      ];
      expect(isContiguous(voters)).toBe(true);
    });

    it('should return false for non-contiguous voters', () => {
      const voters = [
        createTestVoter('1', 0, 0),
        createTestVoter('2', 2, 2), // Not adjacent to first voter
      ];
      expect(isContiguous(voters)).toBe(false);
    });

    it('should return false for voters with gaps', () => {
      const voters = [
        createTestVoter('1', 0, 0),
        createTestVoter('2', 0, 1),
        createTestVoter('3', 0, 3), // Gap at 0,2
      ];
      expect(isContiguous(voters)).toBe(false);
    });
  });
});
