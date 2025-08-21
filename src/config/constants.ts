// Game configuration constants
export const GAME_CONFIG = {
  // Interaction timing
  DRAG_THRESHOLD_MS: 150,
  GAME_RESULT_DELAY_MS: 100,

  // District colors for visual representation
  DISTRICT_COLORS: [
    '#F39C12', // Orange
    '#2ECC71', // Green
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#9B59B6', // Purple
    '#FF9FF3', // Pink
  ] as const,

  // LocalStorage keys
  STORAGE_KEYS: {
    INTRO_SEEN: 'gerrymander-intro-seen',
    TUTORIAL_SEEN: 'gerrymander-tutorial-seen',
  } as const,

  // Tutorial configuration
  TUTORIAL: {
    TOTAL_STEPS: 4,
  } as const,
} as const;

// CSS class constants
export const CSS_CLASSES = {
  COMIC: {
    TILE: 'comic-tile',
    INSTRUCTIONS: 'comic-instructions',
    TITLE: 'comic-title',
    SECTION_TITLE: 'comic-section-title',
    NUMBER: 'comic-number',
    RED: 'comic-red',
    BLUE: 'comic-blue',
    RED_TILE: 'comic-red-tile',
    BLUE_TILE: 'comic-blue-tile',
    BG: 'comic-bg',
    BOARD: 'comic-board',
  } as const,
} as const;
