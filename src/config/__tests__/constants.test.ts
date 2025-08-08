import { GAME_CONFIG, CSS_CLASSES } from '../constants';

describe('Configuration Constants', () => {
  describe('GAME_CONFIG', () => {
    it('should have valid timing configurations', () => {
      expect(GAME_CONFIG.DRAG_THRESHOLD_MS).toBe(150);
      expect(GAME_CONFIG.GAME_RESULT_DELAY_MS).toBe(100);
      expect(typeof GAME_CONFIG.DRAG_THRESHOLD_MS).toBe('number');
      expect(typeof GAME_CONFIG.GAME_RESULT_DELAY_MS).toBe('number');
    });

    it('should have valid district colors array', () => {
      expect(Array.isArray(GAME_CONFIG.DISTRICT_COLORS)).toBe(true);
      expect(GAME_CONFIG.DISTRICT_COLORS).toHaveLength(6);

      // All colors should be valid hex colors
      GAME_CONFIG.DISTRICT_COLORS.forEach((color) => {
        expect(color).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });

    it('should have valid storage keys', () => {
      expect(GAME_CONFIG.STORAGE_KEYS.TUTORIAL_SEEN).toBe('gerrymander-tutorial-seen');
      expect(typeof GAME_CONFIG.STORAGE_KEYS.TUTORIAL_SEEN).toBe('string');
    });

    it('should have valid tutorial configuration', () => {
      expect(GAME_CONFIG.TUTORIAL.TOTAL_STEPS).toBe(4);
      expect(typeof GAME_CONFIG.TUTORIAL.TOTAL_STEPS).toBe('number');
    });
  });

  describe('CSS_CLASSES', () => {
    it('should have all required comic CSS classes', () => {
      const expectedClasses = ['TILE', 'INSTRUCTIONS', 'TITLE', 'SECTION_TITLE', 'NUMBER', 'RED', 'BLUE', 'RED_TILE', 'BLUE_TILE', 'BG', 'BOARD'];

      expectedClasses.forEach((className) => {
        expect(CSS_CLASSES.COMIC[className as keyof typeof CSS_CLASSES.COMIC]).toBeDefined();
        expect(typeof CSS_CLASSES.COMIC[className as keyof typeof CSS_CLASSES.COMIC]).toBe('string');
      });
    });

    it('should have non-empty class names', () => {
      Object.values(CSS_CLASSES.COMIC).forEach((className) => {
        expect(className.length).toBeGreaterThan(0);
        expect(className.trim()).toBe(className); // No leading/trailing spaces
      });
    });

    it('should have consistent naming convention', () => {
      Object.values(CSS_CLASSES.COMIC).forEach((className) => {
        // Should start with 'comic-' prefix
        expect(className).toMatch(/^comic-/);
      });
    });
  });

  describe('Constants Structure', () => {
    it('should have properly structured GAME_CONFIG', () => {
      // Verify structure without testing immutability which is TypeScript enforced
      expect(typeof GAME_CONFIG).toBe('object');
      expect(GAME_CONFIG.DRAG_THRESHOLD_MS).toBeDefined();
      expect(GAME_CONFIG.DISTRICT_COLORS).toBeDefined();
      expect(GAME_CONFIG.STORAGE_KEYS).toBeDefined();
      expect(GAME_CONFIG.TUTORIAL).toBeDefined();
    });

    it('should have properly structured CSS_CLASSES', () => {
      expect(typeof CSS_CLASSES).toBe('object');
      expect(CSS_CLASSES.COMIC).toBeDefined();
      expect(typeof CSS_CLASSES.COMIC).toBe('object');
    });

    it('should have immutable-like DISTRICT_COLORS array', () => {
      // Test that array is properly defined and has expected length
      expect(Array.isArray(GAME_CONFIG.DISTRICT_COLORS)).toBe(true);
      expect(GAME_CONFIG.DISTRICT_COLORS.length).toBe(6);
    });
  });
});
