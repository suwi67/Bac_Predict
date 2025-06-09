
import React from 'react';
import { DerivedRoadData, DerivedRoadCell, ScoreboardType, DerivedRoadSymbol } from '../../types';
import { SCOREBOARD_ROWS, SCOREBOARD_MIN_COLS_DISPLAY, getDerivedRoadSymbol } from '../../constants';

interface DerivedRoadProps {
  data: DerivedRoadData;
  type: ScoreboardType;
}

export const DerivedRoad: React.FC<DerivedRoadProps> = ({ data, type }) => {
  const numRows = SCOREBOARD_ROWS;
  // data is col-major: data[colIndex][rowIndex]
  const numDataCols = Array.isArray(data) ? data.length : 0;
  const numCols = Math.max(SCOREBOARD_MIN_COLS_DISPLAY, numDataCols);

  const isEmpty = numDataCols === 0 || data.every(col => !Array.isArray(col) || col.every(cell => !cell || cell.symbol === DerivedRoadSymbol.Empty));

  if (isEmpty) {
    return <div className="text-center text-slate-500 p-8" aria-live="polite">Not enough data to form {type}. Needs more Big Road history.</div>;
  }
  
  return (
    <div 
      className="grid gap-px bg-slate-700 border border-slate-700" 
      style={{ gridTemplateColumns: `repeat(${numCols}, minmax(20px, 1fr))` }} // Smaller minmax for derived roads
      role="grid"
      aria-label={`${type} Scoreboard`}
    >
      {Array.from({ length: numRows }).map((_, rowIndex) =>
        Array.from({ length: numCols }).map((_, colIndex) => {
          const cellData: DerivedRoadCell | undefined = data[colIndex]?.[rowIndex];
          let cellLabel = `Empty cell ${rowIndex + 1}-${colIndex + 1}`;
           if (cellData && cellData.symbol !== DerivedRoadSymbol.Empty) {
            cellLabel = `${cellData.symbol === DerivedRoadSymbol.Red ? 'Red' : 'Blue'} symbol`;
          }
          return (
            <div
              key={`${type}-${rowIndex}-${colIndex}`}
              role="gridcell"
              aria-label={cellLabel}
              className="w-full aspect-square flex items-center justify-center bg-slate-800 p-1"
            >
              {cellData ? getDerivedRoadSymbol(cellData.symbol) : <span className="sr-only">Empty</span>}
            </div>
          );
        })
      )}
    </div>
  );
};
