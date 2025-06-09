import React from 'react';
import { BigRoadData, BigRoadCell, GameResult } from '../../types';
import { SCOREBOARD_ROWS, SCOREBOARD_MIN_COLS_DISPLAY, RESULT_NAMES } from '../../constants';
import { getBigRoadSymbol } from '../../constants';

interface BigRoadProps {
  data: BigRoadData;
}

export const BigRoad: React.FC<BigRoadProps> = ({ data }) => {
  const numRows = SCOREBOARD_ROWS;
  const numCols = Math.max(SCOREBOARD_MIN_COLS_DISPLAY, Array.isArray(data) ? data.length : 0);

  // Validate data structure
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div className="text-center text-slate-500 p-8" aria-live="polite">No game data yet for Big Road.</div>;
  }

  // Ensure each column has the correct number of rows
  const normalizedData = data.map(col => {
    if (!Array.isArray(col)) return Array(numRows).fill(null);
    return col.slice(0, numRows).concat(Array(numRows - col.length).fill(null));
  });

  // Check if all cells are empty
  if (normalizedData.every(col => col.every(cell => !cell || !cell?.result))) {
    return <div className="text-center text-slate-500 p-8" aria-live="polite">No game data yet for Big Road.</div>;
  }

  return (
    <div 
      className="grid gap-px bg-slate-700 border border-slate-700" 
      style={{ gridTemplateColumns: `repeat(${numCols}, minmax(30px, 1fr))` }}
      role="grid"
      aria-label="Big Road Scoreboard"
    >
      {normalizedData.map((column, colIndex) =>
        column.map((cellData, rowIndex) => {
          let cellLabel = `Empty cell ${rowIndex + 1}-${colIndex + 1}`;
          if (cellData && cellData.result) {
            cellLabel = `${RESULT_NAMES[cellData.result]}`;
            if (cellData.isTie) cellLabel += ` with ${cellData.tieCount || ''} Tie(s)`;
            if (cellData.pair !== "N") cellLabel += `, Pair: ${cellData.pair}`;
            if (cellData.natural !== "N") cellLabel += `, Natural: ${cellData.natural}`;
          }
          return (
            <div
              key={`bigroad-${rowIndex}-${colIndex}`}
              role="gridcell"
              aria-label={cellLabel}
              className="w-full aspect-square flex items-center justify-center bg-slate-800"
            >
              {cellData && cellData.result ? getBigRoadSymbol(cellData.result, cellData.isTie, cellData.tieCount, cellData.pair, cellData.natural) : <span className="sr-only">Empty</span>}
            </div>
          );
        })
      )}
    </div>
  );
};
