// Game configuration constants
export const GAME_CONFIG = {
  // Interaction timing
  DRAG_THRESHOLD_MS: 150,
  GAME_RESULT_DELAY_MS: 100,

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
