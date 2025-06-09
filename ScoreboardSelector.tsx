
import React from 'react';
import { ScoreboardType } from '../types';

// Define the scoreboard options as a readonly array of ScoreboardType values
const SCOREBOARD_OPTIONS = [
  'bigEyeBoy',
  'smallRoad',
  'cockroachPig'
] as const satisfies readonly ScoreboardType[];

interface ScoreboardSelectorProps {
  selected: ScoreboardType;
  onSelect: (type: ScoreboardType) => void;
}

export const ScoreboardSelector: React.FC<ScoreboardSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3 text-sky-400">Scoreboards</h2>
      <div className="flex flex-wrap gap-2">
        {SCOREBOARD_OPTIONS.map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-md transition-colors ${
              selected === type ? 'bg-sky-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => onSelect(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};
