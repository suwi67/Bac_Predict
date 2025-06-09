
import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { IconMessageChatbot } from './Icons';

interface GeminiInsightsProps {
  insight: string | null;
  isLoading: boolean;
}

export const GeminiInsights: React.FC<GeminiInsightsProps> = ({ insight, isLoading }) => {
  return (
    <div className="p-4 bg-slate-850 rounded-lg shadow-md" aria-live="polite" aria-atomic="true">
      <h2 className="text-xl font-semibold mb-3 text-sky-400 flex items-center">
        <IconMessageChatbot className="w-6 h-6 mr-2 text-sky-400" aria-hidden="true" /> IP-ENGINE's Commentary
      </h2>
      {isLoading && (
        <div className="flex items-center justify-center py-4">
          <LoadingSpinner size="md" />
          <p className="ml-2 text-slate-400">IP-ENGINE is analyzing the game...</p>
        </div>
      )}
      {!isLoading && !insight && (
        <p className="text-slate-400 text-sm">No commentary available yet. Play a few rounds for IP-ENGINE to analyze the patterns.</p>
      )}
      {!isLoading && insight && (
        <div className="text-sm text-slate-300 prose prose-sm prose-invert max-w-none">
          {insight.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  );
};