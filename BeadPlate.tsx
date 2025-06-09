import React from 'react';
import { BeadPlateData, GameRoundExtended } from '../../types';
import { SCOREBOARD_ROWS, SCOREBOARD_MIN_COLS_DISPLAY, getBeadPlateSymbol } from '../../constants';

interface BeadPlateProps {
  data: BeadPlateData;
}

export const BeadPlate: React.FC<BeadPlateProps> = ({ data }) => {
  const numRows = SCOREBOARD_ROWS;
  // Calculate number of columns needed. Ensure at least SCOREBOARD_MIN_COLS_DISPLAY or enough for data.
  const numCols = Math.max(SCOREBOARD_MIN_COLS_DISPLAY, data.length > 0 ? Math.ceil(data.length / numRows) : SCOREBOARD_MIN_COLS_DISPLAY);

  const grid: (GameRoundExtended | null)[][] = Array(numRows)
    .fill(null)
    .map(() => Array(numCols).fill(null));

  data.forEach((item, index) => {
    const col = Math.floor(index / numRows);
    const row = index % numRows;
    if (row < numRows && col < numCols) {
      grid[row][col] = item;
    }
  });

  if (data.length === 0) {
    return <div className="text-center text-slate-500 p-8" aria-live="polite">No game data yet for Bead Plate.</div>;
  }
  
  return (
    <div 
      className="grid gap-px bg-slate-700 border border-slate-700" 
      style={{ gridTemplateColumns: `repeat(${numCols}, minmax(30px, 1fr))` }}
      role="grid"
      aria-label="Bead Plate Scoreboard"
    >
      {grid.map((rowItems, rowIndex) =>
        rowItems.map((item, colIndex) => (
          <div
            key={`bead-${rowIndex}-${colIndex}`}
            role="gridcell"
            aria-label={item ? `Game ${data.indexOf(item) + 1}: ${item.result}, Pair: ${item.pair}, Natural: ${item.natural}` : `Empty cell ${rowIndex + 1}-${colIndex + 1}`}
            className="w-full aspect-square flex items-center justify-center bg-slate-800" // Use bg-slate-800 for cells, gap-px will create borders
          >
            {item ? getBeadPlateSymbol(item.result, item.pair, item.natural) : <span className="sr-only">Empty</span>}
          </div>
        ))
      )}
    </div>
  );
};

export const BeadPlate = () => <div>Bead Plate</div>;
