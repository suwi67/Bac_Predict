
import React, { useEffect, useRef } from 'react';
import { Button } from './Button';
import { IconCircleX, IconInfoCircle, IconBrandGithub } from './Icons';
import { CSSProperties } from 'react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0] as HTMLElement | undefined;
      const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement | undefined;

      closeButtonRef.current?.focus(); // Focus the close button initially

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
        if (event.key === 'Tab') {
          if (event.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement || document.activeElement === closeButtonRef.current) {
              lastElement?.focus();
              event.preventDefault();
            }
          } else { // Tab
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              event.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);


  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-95 animate-modal-appear styled-scrollbar"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-sky-400 flex items-center" id="info-modal-title">
            <IconInfoCircle className="w-7 h-7 mr-3" aria-hidden="true" /> About Baccarat AI Predictor
          </h2>
          <Button ref={closeButtonRef} onClick={onClose} variant="ghost" size="sm" className="!p-2" aria-label="Close informational dialog">
            <IconCircleX className="w-6 h-6" />
          </Button>
        </div>

        <div className="prose prose-slate prose-invert max-w-none text-slate-300 space-y-4">
          <p>
            Welcome to the Baccarat AI Predictor, featuring the conceptual <strong>IP-ENGINE</strong>! This application is designed for
            educational and entertainment purposes to explore Baccarat patterns and AI-driven analysis.
          </p>
          
          <h3 className="text-sky-400 !mb-2 !mt-4">How it Works:</h3>
          
          <ul>
            <li><strong>Game Input:</strong> Use the "Add Game Result" section to log Banker (B), Player (P), or Tie (T) outcomes, along with any Pairs or Natural wins.</li>
            <li><strong>Scoreboards:</strong> Visualize game history through various standard Baccarat scoreboards:
              <ul className="!mt-1">
                <li><strong>Bead Plate:</strong> A direct recording of game results.</li>
                <li><strong>Big Road:</strong> Shows streaks of Banker or Player wins.</li>
                <li><strong>Derived Roads (Big Eye Boy, Small Road, Cockroach Pig):</strong> Abstract representations of patterns derived from the Big Road. These indicate predictability or choppiness. (Simplified implementation)</li>
              </ul>
            </li>
            <li><strong>IP-ENGINE's Prediction:</strong> Our AI engine analyzes game history to predict the next likely outcome. This is based on pattern recognition and heuristic algorithms (not a true ML model in this version).</li>
            <li><strong>IP-ENGINE's Commentary:</strong> Powered by Google's Gemini API, this provides natural language insights and commentary on emerging game trends. (Requires a valid API key configured in the environment).</li>
            <li><strong>Statistics:</strong> Track key game metrics like win percentages, streaks, and occurrences of pairs/naturals.</li>
          </ul>

          <h3 className="text-sky-400 !mb-2 !mt-4">Important Disclaimer:</h3>
          <p className="font-semibold text-amber-400">
            Baccarat is a game of chance. Past results do not guarantee future outcomes. This tool should NOT be used for actual gambling decisions.
            The AI predictions and insights are for illustrative purposes only and do not offer any certainty of winning.
          </p>
          <p>
            The "IP-ENGINE" and its predictions are conceptual and part of this demonstration. True casino-grade prediction is vastly more complex.
          </p>
          
          <h3 className="text-sky-400 !mb-2 !mt-4">Technical Notes:</h3>
          <ul>
            <li>Built with React, TypeScript, and Tailwind CSS.</li>
            <li>Integrates with Google Gemini API for AI-powered text generation. (Ensure `process.env.API_KEY` is set).</li>
            <li>Scoreboard logic is based on common Baccarat rules, with simplifications for derived roads.</li>
             <li>
                <a
                  href="https://github.com/your-repo/baccarat-ai-predictor" // Replace with actual repo
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <IconBrandGithub className="w-5 h-5" />
                  View Project on GitHub (Placeholder)
                </a>
            </li>
          </ul>
        </div>

        <div className="mt-8 text-right">
          <Button onClick={onClose} variant="primary">
            Got it!
          </Button>
        </div>
      </div>
      <style jsx global>{`
        @keyframes modal-appear {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modal-appear {
          animation: modal-appear 0.3s ease-out forwards;
        }
        .styled-scrollbar::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        .styled-scrollbar::-webkit-scrollbar-track {
            background: #334155; /* slate-700 */
        }
        .styled-scrollbar::-webkit-scrollbar-thumb {
            background: #64748b; /* slate-500 */
            border-radius: 4px;
        }
        .styled-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8; /* slate-400 */
        }
      `}</style>
    </div>
  );
};