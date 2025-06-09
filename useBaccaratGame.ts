
import { useState, useCallback, useEffect, useRef } from 'react';
import {
  GameRound, GameRoundExtended, Prediction, BaccaratStatistics,
  BeadPlateData, BigRoadData, DerivedRoadData
} from '../types';
import { getGeminiInsightForBaccarat } from '../services/geminiService';
import { calculateStatistics } from '../services/baccaratAnalyzer';

// Local implementations of missing functions
const makePrediction = (history: GameRoundExtended[]): Prediction => {
  // Simplified prediction logic
  const stats = calculateStatistics(history);
  return {
    nextOutcome: stats.bankerWins > stats.playerWins ? 'banker' : 'player',
    confidence: 0.5,
    reasoning: 'Basic prediction based on win counts',
    probabilityDistribution: {
      banker: 0.5,
      player: 0.5,
      tie: 0
    }
  };
};

const generateBeadPlateData = (history: GameRoundExtended[]) => ({
  player: history.filter(g => g.result === 'player').map((_, i) => i + 1),
  banker: history.filter(g => g.result === 'banker').map((_, i) => i + 1),
  tie: history.filter(g => g.result === 'tie').map((_, i) => i + 1)
});

const generateBigRoadData = (history: GameRoundExtended[]) => ({
  player: [history.filter(g => g.result === 'player').map(g => g.result)],
  banker: [history.filter(g => g.result === 'banker').map(g => g.result)],
  tie: [history.filter(g => g.result === 'tie').map(g => g.result)]
});

const generateDerivedRoadData = (history: GameRoundExtended[]) => ({
  bigEyeBoy: [history.map(g => g.result)],
  smallRoad: [history.map(g => g.result)],
  cockroachPig: [history.map(g => g.result)]
});

const MAX_HISTORY_LENGTH = 200; // Keep history manageable

export const useBaccaratGame = () => {
  const [gameHistory, setGameHistory] = useState<GameRoundExtended[]>(() => {
    try {
      const savedHistory = localStorage.getItem('baccaratGameHistory');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error("Error parsing game history from localStorage:", error);
      return [];
    }
  });
  const [prediction, setPrediction] = useState<Prediction | null>(makePrediction(gameHistory)); // Initial prediction
  const [geminiInsight, setGeminiInsight] = useState<string | null>(null);
  const [isLoadingGemini, setIsLoadingGemini] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<BaccaratStatistics>(calculateStatistics(gameHistory)); // Initial stats

  // Scoreboard data states
  const [beadPlateData, setBeadPlateData] = useState<BeadPlateData>(() => ({
    player: [],
    banker: [],
    tie: []
  }));
  const [bigRoadData, setBigRoadData] = useState<BigRoadData>(() => ({
    player: [[]],
    banker: [[]],
    tie: [[]]
  }));
  const [bigEyeBoyData, setBigEyeBoyData] = useState<DerivedRoadData>(() => ({
    bigEyeBoy: [[]],
    smallRoad: [[]],
    cockroachPig: [[]]
  }));
  const [smallRoadData, setSmallRoadData] = useState<DerivedRoadData>(() => ({
    bigEyeBoy: [[]],
    smallRoad: [[]],
    cockroachPig: [[]]
  }));
  const [cockroachPigData, setCockroachPigData] = useState<DerivedRoadData>(() => ({
    bigEyeBoy: [[]],
    smallRoad: [[]],
    cockroachPig: [[]]
  }));

  const geminiRequestPendingRef = useRef<boolean>(false); // To prevent multiple simultaneous requests

  // Effect for updating all derived states when gameHistory changes
  useEffect(() => {
    localStorage.setItem('baccaratGameHistory', JSON.stringify(gameHistory));
    
    const newStats = calculateStatistics(gameHistory);
    setStatistics(newStats);
    
    const newPrediction = makePrediction(gameHistory);
    setPrediction(newPrediction);

    // Generate scoreboards
    // Generate scoreboards with proper type structure
    // Generate scoreboard data using the helper functions
    const newBeadPlateData = generateBeadPlateData(gameHistory);
    const newBigRoadData = generateBigRoadData(gameHistory);
    const derivedData = generateDerivedRoadData(gameHistory);
    
    setBeadPlateData(newBeadPlateData);
    setBigRoadData(newBigRoadData);
    setBigEyeBoyData(derivedData);
    setSmallRoadData(derivedData);
    setCockroachPigData(derivedData);

    // Fetch Gemini insight (throttled approach)
    // Condition: API key exists, not currently loading, and specific game count milestones
    if (process.env.API_KEY && !geminiRequestPendingRef.current && 
        (gameHistory.length === 3 || (gameHistory.length > 3 && gameHistory.length % 5 === 0))) {
      fetchGeminiInsightDebounced();
    } else if (gameHistory.length === 0) {
      setGeminiInsight(null); // Clear insight if game is cleared
    }
  }, [gameHistory]);


  const fetchGeminiInsightRaw = useCallback(async () => {
    if (!process.env.API_KEY || geminiRequestPendingRef.current) return;

    geminiRequestPendingRef.current = true;
    setIsLoadingGemini(true);
    try {
      // Pass a deep copy of gameHistory to prevent modifications if any service did that
      const insight = await getGeminiInsightForBaccarat(gameHistory.map(g => ({...g})));
      setGeminiInsight(insight);
    } catch (error) {
      console.error("Failed to fetch Gemini insight:", error);
      setGeminiInsight(null); // Using null instead of error message since geminiInsight is typed as string | null
    } finally {
      setIsLoadingGemini(false);
      geminiRequestPendingRef.current = false;
    }
  }, [gameHistory]); // Depends on gameHistory to get the latest data

  // Simple debounce for Gemini calls
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fetchGeminiInsightDebounced = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
        fetchGeminiInsightRaw();
    }, 1000); // 1-second debounce
  }, [fetchGeminiInsightRaw]);


  const addGameResult = useCallback((newResult: GameRound) => {
    const newResultExtended: GameRoundExtended = { ...newResult, timestamp: Date.now().toString(), col: undefined, row: undefined, tieCount: 0 };
    setGameHistory(prevHistory => {
      const updatedHistory = [...prevHistory, newResultExtended];
      if (updatedHistory.length > MAX_HISTORY_LENGTH) {
        return updatedHistory.slice(updatedHistory.length - MAX_HISTORY_LENGTH);
      }
      return updatedHistory;
    });
  }, []);

  const clearGame = useCallback(() => {
    setGameHistory([]);
    // Other states like prediction, geminiInsight, stats, scoreboards will auto-clear/reset via useEffect
    localStorage.removeItem('baccaratGameHistory');
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current); // Clear any pending debounced calls
    }
    geminiRequestPendingRef.current = false; // Reset pending request flag
    setIsLoadingGemini(false); // Ensure loading state is reset
  }, []);

  return {
    gameHistory,
    prediction,
    geminiInsight,
    isLoadingGemini,
    addGameResult,
    updateGame: addGameResult, // Alias for consistency
    clearAll: clearGame, // Alias for consistency
    stats: statistics, // Renamed from statistics
    derivedRoadsData: {
      bigEyeBoy: bigEyeBoyData,
      smallRoad: smallRoadData,
      cockroachPig: cockroachPigData
    },
    beadPlateData,
    bigRoadData,
    bigEyeBoyData,
    smallRoadData,
    cockroachPigData,
  };
};
