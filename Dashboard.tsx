// Dashboard.tsx (main composition file)
import { useBaccaratGame } from '../hooks/useBaccaratGame';
import { BeadPlate } from '../components/BeadPlate';
import { BigRoad } from '../components/BigRoad';
import { ScoreboardSelector } from '../components/ScoreboardSelector';
import { Scoreboard } from '../components/Scoreboard';
import { Statistics } from '../components/Statistics';
import { PredictionDisplay } from '../components/PredictionDisplay';
import { GeminiInsight } from '../components/GeminiInsight';
import { GameHistory } from '../components/GameHistory';
import { GameInput } from '../components/GameInput';
import { Layout } from '../components/Layout';
import { InfoModal } from '../components/InfoModal';
import { GameResult } from '../types';
import { ScoreboardType } from '../types';

export default function Dashboard() {
  const {
    gameHistory,
    beadPlateData,
    bigRoadData,
    derivedRoadsData,
    stats,
    updateGame,
    clearAll,
    prediction,
    geminiInsight,
    isLoadingGemini,
    addGameResult,
    bigEyeBoyData,
    smallRoadData,
    cockroachPigData,
    selectedScoreboard,
    setSelectedScoreboard,
    isGeminiLoading,
    geminiError,
    setGeminiError
  } = useBaccaratGame();

  const handleGameResult = (result: GameResult) => {
    addGameResult(result);
  };

  const handleScoreboardSelect = (type: ScoreboardType) => {
    setSelectedScoreboard(type);
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Game Input + Stats */}
        <div className="col-span-1 space-y-4">
          <GameInput onGameResult={handleGameResult} onSubmit={updateGame} onClear={clearAll} />
          <StatisticsPanel stats={{ ...stats, history: gameHistory }} />
          <ScoreboardSelector 
            selected={selectedScoreboard}
            onSelect={handleScoreboardSelect}
          />
        </div>

        {/* Main Scoreboards */}
        <div className="col-span-1 xl:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <BeadPlate data={beadPlateData} />
            <BigRoad data={bigRoadData} />
            <DerivedRoad roads={derivedRoadsData} />
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <Scoreboard 
              type={selectedScoreboard} 
              data={{
                bigEyeBoy: bigEyeBoyData,
                smallRoad: smallRoadData,
                cockroachPig: cockroachPigData
              }} 
              gameHistory={gameHistory}
            />
          </div>

          {/* Predictor */}
          {prediction && <PredictionDisplay prediction={prediction} />}
        </div>
      </div>

      {/* AI Insights */}
      <div className="mt-8">
        <GeminiInsight 
          insight={geminiInsight} 
          isLoading={isGeminiLoading} 
          error={geminiError} 
          onDismissError={() => setGeminiError(undefined)}
        />
      </div>

      <InfoModal 
        isOpen={false}
        onClose={() => {}}
      />
    </Layout>
  );
}
