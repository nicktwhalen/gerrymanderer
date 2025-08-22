import { GAME_CONFIG } from '../constants';

describe('Configuration Constants', () => {
  describe('GAME_CONFIG', () => {
    it('should have valid timing configurations', () => {
      expect(GAME_CONFIG.DRAG_THRESHOLD_MS).toBe(150);
      expect(GAME_CONFIG.GAME_RESULT_DELAY_MS).toBe(100);
      expect(typeof GAME_CONFIG.DRAG_THRESHOLD_MS).toBe('number');
      expect(typeof GAME_CONFIG.GAME_RESULT_DELAY_MS).toBe('number');
    });

    it('should have valid storage keys', () => {
      expect(GAME_CONFIG.STORAGE_KEYS.TUTORIAL_SEEN).toBe(
        'gerrymander-tutorial-seen',
      );
      expect(typeof GAME_CONFIG.STORAGE_KEYS.TUTORIAL_SEEN).toBe('string');
    });

    it('should have valid tutorial configuration', () => {
      expect(GAME_CONFIG.TUTORIAL.TOTAL_STEPS).toBe(4);
      expect(typeof GAME_CONFIG.TUTORIAL.TOTAL_STEPS).toBe('number');
    });
  });

  describe('Constants Structure', () => {
    it('should have properly structured GAME_CONFIG', () => {
      expect(typeof GAME_CONFIG).toBe('object');
      expect(GAME_CONFIG.DRAG_THRESHOLD_MS).toBeDefined();
      expect(GAME_CONFIG.STORAGE_KEYS).toBeDefined();
      expect(GAME_CONFIG.TUTORIAL).toBeDefined();
    });
  });
});
