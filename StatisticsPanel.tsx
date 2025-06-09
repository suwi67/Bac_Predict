
import React from 'react';
import { BaccaratStatistics, GameResult, GameRoundExtended } from '../types';
import { RESULT_NAMES, RESULT_TEXT_COLORS, getBeadPlateSymbol } from '../constants';
import { IconChartPie, IconListNumbers, IconFlame, IconHistory } from './Icons';

interface StatisticsPanelProps {
  stats: BaccaratStatistics;
  history: GameRoundExtended[];
}

const StatItem: React.FC<{ label: string; value: string | number; colorClass?: string; icon?: React.ReactNode, 'aria-label'?: string }> = ({ label, value, colorClass, icon, ...rest }) => (
  <div className={`flex justify-between items-center p-2 rounded ${colorClass ? '' : 'bg-slate-700/50'}`} {...rest}>
    <span className="text-sm text-slate-300 flex items-center">{icon && <span className="mr-2" aria-hidden="true">{icon}</span>}{label}</span>
    <span className={`font-semibold ${colorClass || 'text-slate-100'}`}>{value}</span>
  </div>
);

export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ stats, history }) => {
  const {
    totalGames, bankerWins, playerWins, tieGames,
    bankerPairCount, playerPairCount, bankerNaturalCount, playerNaturalCount,
    currentStreak, longestBankerStreak, longestPlayerStreak
  } = stats;

  const recentHistory = history.slice(-5).reverse();

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-2xl" aria-labelledby="stats-heading">
      <h2 className="text-xl font-semibold mb-4 text-sky-400 flex items-center" id="stats-heading">
        <IconChartPie className="w-6 h-6 mr-2" aria-hidden="true" /> Game Statistics
      </h2>
      
      {totalGames > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Main Stats */}
          <section className="space-y-2 p-3 bg-slate-850 rounded-lg" aria-labelledby="overall-stats-heading">
            <h3 className="text-md font-semibold text-slate-400 mb-1" id="overall-stats-heading">Overall</h3>
            <StatItem label="Total Games" value={totalGames} aria-label={`Total games played: ${totalGames}`}/>
            <StatItem 
                label="Banker Wins" 
                value={`${bankerWins} (${totalGames > 0 ? ((bankerWins / totalGames) * 100).toFixed(1) : 0}%)`} 
                colorClass={RESULT_TEXT_COLORS.B}
                aria-label={`Banker wins: ${bankerWins}, which is ${totalGames > 0 ? ((bankerWins / totalGames) * 100).toFixed(1) : 0}%`}
            />
            <StatItem 
                label="Player Wins" 
                value={`${playerWins} (${totalGames > 0 ? ((playerWins / totalGames) * 100).toFixed(1) : 0}%)`} 
                colorClass={RESULT_TEXT_COLORS.P}
                aria-label={`Player wins: ${playerWins}, which is ${totalGames > 0 ? ((playerWins / totalGames) * 100).toFixed(1) : 0}%`}
            />
            <StatItem 
                label="Tie Games" 
                value={`${tieGames} (${totalGames > 0 ? ((tieGames / totalGames) * 100).toFixed(1) : 0}%)`} 
                colorClass={RESULT_TEXT_COLORS.T}
                aria-label={`Tie games: ${tieGames}, which is ${totalGames > 0 ? ((tieGames / totalGames) * 100).toFixed(1) : 0}%`}
            />
          </section>

          {/* Streaks */}
          <section className="space-y-2 p-3 bg-slate-850 rounded-lg" aria-labelledby="streaks-stats-heading">
            <h3 className="text-md font-semibold text-slate-400 mb-1 flex items-center" id="streaks-stats-heading"><IconFlame className="w-5 h-5 mr-1 text-orange-400" aria-hidden="true"/>Streaks</h3>
             <StatItem 
                label="Current Streak" 
                value={currentStreak.type ? `${RESULT_NAMES[currentStreak.type]} x ${currentStreak.count}` : 'None'}
                colorClass={currentStreak.type ? RESULT_TEXT_COLORS[currentStreak.type] : 'text-slate-100'}
                aria-label={`Current streak: ${currentStreak.type ? `${RESULT_NAMES[currentStreak.type]} times ${currentStreak.count}` : 'None'}`}
            />
            <StatItem label="Longest Banker Streak" value={longestBankerStreak} aria-label={`Longest Banker streak: ${longestBankerStreak}`} />
            <StatItem label="Longest Player Streak" value={longestPlayerStreak} aria-label={`Longest Player streak: ${longestPlayerStreak}`} />
          </section>

          {/* Pairs & Naturals */}
          <section className="space-y-2 p-3 bg-slate-850 rounded-lg md:col-span-1" aria-labelledby="specials-stats-heading">
             <h3 className="text-md font-semibold text-slate-400 mb-1 flex items-center" id="specials-stats-heading"><IconListNumbers className="w-5 h-5 mr-1 text-teal-400" aria-hidden="true"/>Specials</h3>
            <StatItem label="Banker Pairs" value={bankerPairCount} aria-label={`Banker Pairs: ${bankerPairCount}`} />
            <StatItem label="Player Pairs" value={playerPairCount} aria-label={`Player Pairs: ${playerPairCount}`} />
            <StatItem label="Banker Naturals" value={bankerNaturalCount} aria-label={`Banker Naturals: ${bankerNaturalCount}`} />
            <StatItem label="Player Naturals" value={playerNaturalCount} aria-label={`Player Naturals: ${playerNaturalCount}`} />
          </section>
          
          {/* Recent History */}
          {recentHistory.length > 0 && (
            <section className="space-y-2 p-3 bg-slate-850 rounded-lg md:col-span-1" aria-labelledby="recent-history-heading">
              <h3 className="text-md font-semibold text-slate-400 mb-2 flex items-center" id="recent-history-heading"><IconHistory className="w-5 h-5 mr-1" aria-hidden="true"/>Recent History (Last 5)</h3>
              <div className="flex flex-row flex-wrap gap-2 items-center justify-start" role="list" aria-label="Recent 5 game results">
                {recentHistory.map((item, index) => (
                  <div 
                    key={index} 
                    role="listitem"
                    title={`${RESULT_NAMES[item.result]}${item.pair !== 'N' ? ` ${item.pair}` : ''}${item.natural !== 'N' ? ` ${item.natural}`: ''}`}
                    aria-label={`Game ${history.length - index}: ${RESULT_NAMES[item.result]}${item.pair !== 'N' ? ` ${item.pair}` : ''}${item.natural !== 'N' ? ` ${item.natural}`: ''}`}
                  >
                     {getBeadPlateSymbol(item.result, item.pair, item.natural)}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <p className="text-slate-500 text-center py-4" aria-live="polite">No game statistics to display yet. Play some rounds!</p>
      )}
    </div>
  );
};
