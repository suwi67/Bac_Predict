export type GameResult = 'player' | 'banker' | 'tie';
export type Pair = 'yes' | 'no';
export type Natural = 'yes' | 'no';

export interface HeuristicFactor {
  name: string;
  value: number;
  description: string;
}

export enum ConfidenceCategory {
  VERY_LOW = 'VERY_LOW',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH'
}

export type ConfidenceCategoryString = keyof typeof ConfidenceCategory;

export type ProbabilityDistribution = {
  [key in GameResult]: number;
};

export interface ScoreboardData {
  player: number;
  banker: number;
  tie: number;
}

export type RoadSymbol = DerivedRoadSymbol | 'Red' | 'Blue';

export interface SimulatedBettingIntelligence {
  strategy: string;
  confidence: number;
  expectedValue: number;
  riskLevel: string;
  assessedStrategyInfluence?: string;
  riskProfileAlignment?: string;
}

export interface SpecializedInsight {
  insight: string;
  relevance: number;
  confidence: number;
  predictorName?: string;
}

export interface EnsembleComponent {
  componentName: string;
  confidence: number;
  weight: number;
}

export enum DerivedRoadSymbol {
  Player = 'P',
  Banker = 'B',
  Empty = 'E',
  Red = 'R',
  Blue = 'B'
}

export interface GameRound {
  id: number;
  result: GameResult;
  playerPoints: number;
  bankerPoints: number;
  timestamp: string;
  pair: Pair;
  natural: Natural;
  bankerScore?: number;
  playerScore?: number;
}

export interface GameRoundExtended extends GameRound {
  prediction?: Prediction;
  confidence?: number;
  col?: number;
  row?: number;
  tieCount?: number;
  isDragonContinuation?: boolean;
}

export interface Prediction {
  nextOutcome: GameResult | null;
  confidence: number;
  reasoning: string;
  potentialPatterns?: string[];
  probabilityDistribution?: ProbabilityDistribution;
  modelDetails?: {
    modelId: string;
    name: string;
    type: string;
    version: string;
    status: string;
    confidenceCategory?: ConfidenceCategory;
    lastRefreshed?: string;
    notes?: string;
    accuracyTargetProfile?: string;
  };
  simulatedFeatureImportance?: HeuristicFactor[];
  simulatedScoreboardAnalysisInput?: string;
  activeAiComponents?: string[];
  simulatedValidationScore?: number;
  simulatedBettingIntelligence?: SimulatedBettingIntelligence;
  specializedInsights?: SpecializedInsight[];
}

export interface BaccaratStatistics {
  totalGames: number;
  bankerWins: number;
  playerWins: number;
  tieGames: number;
  bankerPairCount: number;
  playerPairCount: number;
  bankerNaturalCount: number;
  playerNaturalCount: number;
  currentStreak: { type: GameResult | null; count: number };
  longestBankerStreak: number;
  longestPlayerStreak: number;
}

export interface BeadPlateData {
  player: number[];
  banker: number[];
  tie: number[];
}

export interface BigRoadData {
  player: string[][];
  banker: string[][];
  tie: string[][];
}

export interface DerivedRoadData {
  bigEyeBoy: string[][];
  smallRoad: string[][];
  cockroachPig: string[][];
}

export type ScoreboardType = keyof DerivedRoadData;

export interface BigRoadCell {
  result?: GameResult | null;
  pair?: Pair | null;
  natural?: Natural | null;
  isTie?: boolean;
  tieCount?: number;
  col?: number;
  row?: number;
}

export interface DerivedRoadCell {
  result?: GameResult | null;
  symbol: DerivedRoadSymbol;
  col?: number;
  row?: number;
}
