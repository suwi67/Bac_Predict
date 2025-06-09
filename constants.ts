// Constants for the application

// Gemini AI configuration
export const GEMINI_MODEL_NAME = 'gemini-pro';

// Game configuration
export const MAX_HISTORY_LENGTH = 200;
export const GAME_RESULTS = ['player', 'banker', 'tie'] as const;
export const ROAD_TYPES = ['bigRoad', 'bigEyeBoy', 'smallRoad', 'cockroachPig'] as const;

// UI configuration
export const DEFAULT_SCOREBOARD = 'bigRoad';
export const SCOREBOARD_ROWS = 10;
export const SCOREBOARD_SIZES = {
  small: 'w-64',
  medium: 'w-96',
  large: 'w-128'
};

// Error messages
export const ERROR_MESSAGES = {
  noAPIKey: 'Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file.',
  invalidGameResult: 'Invalid game result. Must be one of: player, banker, or tie.',
  maxHistoryExceeded: `Maximum history length (${MAX_HISTORY_LENGTH}) exceeded.`,
  invalidRoadType: 'Invalid road type. Must be one of: bigRoad, bigEyeBoy, smallRoad, or cockroachPig.'
} as const;

export const RESULT_NAMES = {
  banker: 'Banker',
  player: 'Player',
  tie: 'Tie'
};

export const RESULT_TEXT_COLORS = {
  banker: 'text-red-500',
  player: 'text-blue-500',
  tie: 'text-green-500'
};
