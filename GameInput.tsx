
import React, { useState } from 'react';
import { GameResult, Pair, Natural } from '../types';
import { Button } from './Button';
import { IconPlayerTrackNext, IconPlayerTrackPrev, IconTie, IconRefresh, IconSparkles } from './Icons';

interface GameInputProps {
  onAddResult: (result: GameResult, pair: Pair, natural: Natural, bankerScore?: number, playerScore?: number) => void;
  onClearGame: () => void;
  historyLength: number;
}

export const GameInput: React.FC<GameInputProps> = ({ onAddResult, onClearGame, historyLength }) => {
  const [bankerPair, setBankerPair] = useState(false);
  const [playerPair, setPlayerPair] = useState(false);
  const [isNatural, setIsNatural] = useState(false);
  // Optional scores, can be expanded later
  // const [bankerScore, setBankerScore] = useState<number | undefined>();
  // const [playerScore, setPlayerScore] = useState<number | undefined>();


  const handleSubmit = (result: GameResult) => {
    let pairStatus = Pair.None;
    if (bankerPair && playerPair) pairStatus = Pair.Both;
    else if (bankerPair) pairStatus = Pair.BankerPair;
    else if (playerPair) pairStatus = Pair.PlayerPair;

    let naturalStatus = Natural.None;
    // This is a simplification. A true natural needs score checks (8 or 9).
    // For now, any "Natural" checkbox click means natural for the winner.
    // A Tie cannot be a Natural win for Banker or Player in this simplified model.
    if (isNatural) {
        if (result === GameResult.Banker) naturalStatus = Natural.BankerNatural;
        else if (result === GameResult.Player) naturalStatus = Natural.PlayerNatural;
        // Natural Tie (both 8 or 9 and equal) is complex and rare; not handled in this simplified status.
        // If it's a tie and Natural is checked, it's ambiguous without scores. We'll assume it implies general high score context.
        // For simplicity, we'll only assign BN or PN. If it's a Tie result, natural status remains None for B/P.
    }
    
    onAddResult(result, pairStatus, naturalStatus);
    setBankerPair(false);
    setPlayerPair(false);
    setIsNatural(false);
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all game data? This action cannot be undone.")) {
        onClearGame();
    }
  };

  return (
    <div className="p-4 bg-slate-850 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-sky-400">Add Game Result</h2>
      
      <div className="grid grid-cols-3 gap-3 mb-4">
        <Button onClick={() => handleSubmit(GameResult.Player)} variant="primary" className="bg-blue-600 hover:bg-blue-700">
          <IconPlayerTrackPrev className="w-5 h-5 mr-2" /> Player
        </Button>
        <Button onClick={() => handleSubmit(GameResult.Banker)} variant="primary" className="bg-red-600 hover:bg-red-700">
          <IconPlayerTrackNext className="w-5 h-5 mr-2" /> Banker
        </Button>
        <Button onClick={() => handleSubmit(GameResult.Tie)} variant="primary" className="bg-green-600 hover:bg-green-700">
          <IconTie className="w-5 h-5 mr-2" /> Tie
        </Button>
      </div>

      <div className="space-y-3 mb-6">
        <label className="flex items-center space-x-2 cursor-pointer text-slate-300 hover:text-white">
          <input 
            type="checkbox" 
            checked={bankerPair} 
            onChange={(e) => setBankerPair(e.target.checked)}
            className="form-checkbox h-5 w-5 text-red-500 bg-slate-700 border-slate-600 rounded focus:ring-red-400"
            aria-label="Banker Pair"
          />
          <span>Banker Pair</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer text-slate-300 hover:text-white">
          <input 
            type="checkbox" 
            checked={playerPair} 
            onChange={(e) => setPlayerPair(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-500 bg-slate-700 border-slate-600 rounded focus:ring-blue-400"
            aria-label="Player Pair"
          />
          <span>Player Pair</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer text-slate-300 hover:text-white">
          <input 
            type="checkbox" 
            checked={isNatural} 
            onChange={(e) => setIsNatural(e.target.checked)}
            className="form-checkbox h-5 w-5 text-yellow-500 bg-slate-700 border-slate-600 rounded focus:ring-yellow-400"
            aria-label="Natural Win"
          />
          <span className="inline-flex items-center">Natural Win <IconSparkles className="w-4 h-4 ml-1 text-yellow-400" /></span>
        </label>
      </div>
      
      {historyLength > 0 && (
         <Button onClick={handleClear} variant="danger" className="w-full">
            <IconRefresh className="w-5 h-5 mr-2" /> Clear Game Data ({historyLength} rounds)
        </Button>
      )}
    </div>
  );
};
