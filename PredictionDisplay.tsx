
import React from 'react';
import { Prediction, GameResult, HeuristicFactor, ConfidenceCategory, EnsembleComponent, SpecializedInsight, SimulatedBettingIntelligence } from '../types';
import { RESULT_NAMES, RESULT_TEXT_COLORS } from '../constants';
import { 
    IconBulb, IconChartBar, IconTrendingUp, IconCpu, IconFilterCog, IconInfoCircle, IconClock, 
    IconShieldCheck, IconActivity, IconViewfinder, IconPuzzle, IconBadgeCheck, IconBrain,
    IconLogic, IconCrosshair, IconScale, IconNetwork, IconArrowsShuffle, IconTargetArrow,
    IconDiamond, IconRecycle, IconFlame, IconChartPie, IconListNumbers 
} from './Icons'; 

interface PredictionDisplayProps {
  prediction: Prediction | null;
}

const FeatureImportanceItem: React.FC<{factor: HeuristicFactor}> = ({ factor }) => (
  <li className="flex justify-between items-center text-xs py-0.5">
    <span className="text-slate-300 truncate pr-2" title={factor.featureName}>{factor.featureName}</span>
    <span className="font-semibold text-sky-400 tabular-nums">{(factor.importanceScore * 100).toFixed(1)}%</span>
  </li>
);

const ModelDetailItem: React.FC<{label: string; value?: string | number; icon?: React.ReactNode; className?: string, valueClassName?: string}> = 
    ({ label, value, icon, className = '', valueClassName = '' }) => (
  value || value === 0 ? (
    <div className={`text-xs text-slate-400 flex items-center ${className}`}>
      {icon && React.cloneElement(icon as React.ReactElement, { className: "w-3.5 h-3.5 mr-1.5 text-slate-500 flex-shrink-0"})}
      <span className="font-medium text-slate-500 flex-shrink-0">{label}:</span>
      <span className={`ml-1 text-slate-300 truncate ${valueClassName}`} title={String(value)}>{String(value)}</span>
    </div>
  ) : null
);

const getInsightIcon = (iconName?: string): React.ReactNode => {
    switch(iconName?.toLowerCase()) { // Make matching case-insensitive for robustness
        case "iconflame": return <IconFlame className="w-3.5 h-3.5" />;
        case "iconarrowsshuffle": return <IconArrowsShuffle className="w-3.5 h-3.5" />;
        case "iconchartpie": return <IconChartPie className="w-3.5 h-3.5" />;
        case "iconviewfinder": return <IconViewfinder className="w-3.5 h-3.5" />;
        case "icontargetarrow": return <IconTargetArrow className="w-3.5 h-3.5" />;
        case "iconpuzzle": return <IconPuzzle className="w-3.5 h-3.5" />;
        case "icondiamond": return <IconDiamond className="w-3.5 h-3.5" />;
        case "iconrecycle": return <IconRecycle className="w-3.5 h-3.5" />;
        case "iconlistnumbers": return <IconListNumbers className="w-3.5 h-3.5" />;
        default: return <IconBrain className="w-3.5 h-3.5" />;
    }
}

const SectionTitle: React.FC<{title: string, icon: React.ReactNode}> = ({title, icon}) => (
    <h3 className="text-sm font-semibold text-slate-400 mb-1.5 flex items-center">
        {React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4 mr-1.5"})}
        {title}
    </h3>
);

export const PredictionDisplay: React.FC<PredictionDisplayProps> = ({ prediction }) => {
  if (!prediction || prediction.nextOutcome === null) {
    return (
      <div className="p-4 bg-slate-850 rounded-lg shadow-md text-center">
        <IconBulb className="w-8 h-8 mx-auto mb-2 text-slate-500" />
        <p className="text-slate-400">Awaiting game data for IP-ENGINE's first analysis...</p>
      </div>
    );
  }

  const { 
    nextOutcome, confidence, reasoning, probabilityDistribution, modelDetails, 
    simulatedFeatureImportance, simulatedScoreboardAnalysisInput, 
    simulatedValidationScore, simulatedBettingIntelligence, specializedInsights 
  } = prediction;

  const outcomeName = RESULT_NAMES[nextOutcome];
  const outcomeColor = RESULT_TEXT_COLORS[nextOutcome];

  return (
    <div className="p-4 bg-slate-850 rounded-lg shadow-md space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-0.5 text-sky-400 flex items-center">
            <IconChartBar className="w-6 h-6 mr-2 text-sky-400" /> {modelDetails?.name || "IP-ENGINE | Analysis"}
        </h2>
        {modelDetails?.accuracyTargetProfile && (
            <ModelDetailItem label="Target Profile" value={modelDetails.accuracyTargetProfile} icon={<IconCrosshair />} className="text-[11px]" />
        )}
      </div>
      

      <div className="text-center my-2">
        <p className="text-base text-slate-300">Next Predicted Outcome:</p>
        <p className={`text-4xl md:text-5xl font-bold ${outcomeColor}`}>{outcomeName}</p>
        {confidence !== undefined && (
          <p className="text-xs text-slate-400 mt-1">
            Overall Confidence: <span className="font-semibold text-slate-100">{(confidence * 100).toFixed(1)}%</span>
            {modelDetails?.confidenceCategory && (
                <span className={`ml-1.5 px-1.5 py-0.5 text-[10px] rounded-full font-semibold
                    ${modelDetails.confidenceCategory === ConfidenceCategory.VeryHigh || modelDetails.confidenceCategory === ConfidenceCategory.High ? 'bg-green-500/30 text-green-300' :
                    modelDetails.confidenceCategory === ConfidenceCategory.Medium ? 'bg-yellow-500/30 text-yellow-300' :
                    'bg-red-500/30 text-red-300'}`}>
                    {modelDetails.confidenceCategory}
                </span>
            )}
          </p>
        )}
      </div>

      {probabilityDistribution && (
        <div>
          <SectionTitle title="Probability Distribution:" icon={<IconChartPie className="text-indigo-400"/>} />
          <div className="grid grid-cols-3 gap-2 text-center text-xs bg-slate-900/30 p-2 rounded-md">
            {Object.values(GameResult).map(key => (
              <div key={key}>
                <div className={`font-medium ${RESULT_TEXT_COLORS[key]}`}>{RESULT_NAMES[key]}</div>
                <div className="text-slate-200 tabular-nums">{ (probabilityDistribution[key] * 100).toFixed(1) }%</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {simulatedFeatureImportance && simulatedFeatureImportance.length > 0 && (
        <div>
          <SectionTitle title="Key Heuristic Factors (Sim.):" icon={<IconFilterCog className="text-teal-400"/>} />
          <ul className="space-y-0.5 bg-slate-900/30 p-2 rounded-md">
            {simulatedFeatureImportance.map((factor, index) => (
              <FeatureImportanceItem key={index} factor={factor} />
            ))}
          </ul>
        </div>
      )}

      {simulatedScoreboardAnalysisInput && (
         <div>
            <SectionTitle title="Scoreboard Insights (Sim.):" icon={<IconViewfinder className="text-rose-400"/>} />
            <p className="text-xs text-slate-300 bg-slate-900/30 p-2 rounded-md">{simulatedScoreboardAnalysisInput}</p>
         </div>
      )}

      {specializedInsights && specializedInsights.length > 0 && (
        <div>
          <SectionTitle title="Specialized Analysis Snippets (Sim.):" icon={<IconPuzzle className="text-purple-400"/>} />
          <ul className="space-y-1.5 bg-slate-900/30 p-2 rounded-md">
            {specializedInsights.map((item, index) => (
              <li key={index} className="text-xs text-slate-300 flex items-start">
                <span className="mr-1.5 text-purple-400 flex-shrink-0 pt-0.5">{getInsightIcon(item.iconName)}</span>
                <div>
                  <span className="font-medium text-slate-400">{item.predictorName}: </span>
                  {item.insight} 
                  <span className="text-purple-400 opacity-80 text-[10px]"> (Rel: {(item.relevance * 100).toFixed(0)}%)</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {simulatedBettingIntelligence && (
        <div>
          <SectionTitle title="Strategic Alignment (IP-ENGINE's Internal Simulation):" icon={<IconLogic className="text-orange-400"/>} />
          <div className="bg-slate-900/30 p-2 rounded-md space-y-1 text-xs">
            <ModelDetailItem label="Assessed Strategy Influence" value={simulatedBettingIntelligence.assessedStrategyInfluence} icon={<IconTrendingUp />} valueClassName="whitespace-normal text-slate-200" />
            <ModelDetailItem label="Risk Profile Alignment" value={simulatedBettingIntelligence.riskProfileAlignment} icon={<IconScale />} valueClassName="text-slate-200"/>
          </div>
        </div>
      )}

      {reasoning && (
        <div>
          <SectionTitle title="Reasoning Highlights:" icon={<IconBulb className="text-yellow-400"/>} />
          <p className="text-xs text-slate-300 bg-slate-700/70 p-2 rounded-md">{reasoning}</p>
        </div>
      )}

      {modelDetails && (
        <div className="mt-3 pt-3 border-t border-slate-700/50 space-y-1.5">
           <h3 className="text-xs font-semibold text-slate-500 mb-1 flex items-center">
             <IconCpu className="w-4 h-4 mr-1.5" /> Engine Component Details:
            </h3>
            <ModelDetailItem label="Model ID" value={modelDetails.modelId} icon={<IconInfoCircle />} />
            <ModelDetailItem label="Consensus Mech." value={modelDetails.finalConsensusMechanism} icon={<IconNetwork />} valueClassName="whitespace-normal"/>
            <ModelDetailItem label="Analysis Depth" value={modelDetails.reasoningTier} icon={<IconBrain />} />
            
            {modelDetails.ensembleConfidenceBreakdown && modelDetails.ensembleConfidenceBreakdown.length > 0 && (
                <div className="pt-1">
                    <p className="text-xs font-medium text-slate-500 mb-0.5">Contributing AI Modules (Simulated):</p>
                    <ul className="pl-3 space-y-0.5 text-xs text-slate-400 list-disc list-inside">
                    {modelDetails.ensembleConfidenceBreakdown.map(comp => (
                        <li key={comp.componentName}>
                          {comp.componentName} - Conf: <span className="text-sky-300">{(comp.confidence*100).toFixed(1)}%</span>, Weight: <span className="text-teal-300">{(comp.weight*100).toFixed(0)}%</span>
                        </li>
                    ))}
                    </ul>
                </div>
            )}
            <ModelDetailItem label="Version" value={modelDetails.version} icon={<IconActivity />} />
            <ModelDetailItem label="Status" value={modelDetails.status} icon={<IconShieldCheck />} />
            {simulatedValidationScore && <ModelDetailItem label="Sim. Validation Score" value={`${(simulatedValidationScore * 100).toFixed(2)}%`} icon={<IconBadgeCheck />} />}
            {modelDetails.lastRefreshed && 
                <ModelDetailItem label="Refreshed" value={new Date(modelDetails.lastRefreshed).toLocaleString()} icon={<IconClock />} />
            }
           {modelDetails.notes && <p className="italic text-[11px] text-slate-500 mt-2 p-1.5 bg-slate-900/30 rounded">{modelDetails.notes}</p>}
        </div>
      )}
    </div>
  );
};