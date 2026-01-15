import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

interface ConfidenceMeterProps {
  prediction: number;
  lowerBound: number;
  upperBound: number;
  confidence: number;
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({
  prediction,
  lowerBound,
  upperBound,
  confidence
}) => {
  const range = upperBound - lowerBound;
  const uncertainty = (range / prediction) * 100;
  
  const getRiskLevel = (uncertainty: number) => {
    if (uncertainty < 10) return {
      level: 'Low Risk',
      color: 'green',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      textColor: 'text-green-400',
      icon: CheckCircle,
      description: 'High confidence prediction with minimal variance',
      recommendation: 'Prediction is highly reliable for decision-making'
    };
    if (uncertainty < 20) return {
      level: 'Medium Risk',
      color: 'yellow',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      textColor: 'text-yellow-400',
      icon: AlertTriangle,
      description: 'Moderate uncertainty in prediction range',
      recommendation: 'Consider additional validation before critical decisions'
    };
    return {
      level: 'High Risk',
      color: 'red',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      textColor: 'text-red-400',
      icon: AlertTriangle,
      description: 'Significant uncertainty - use caution',
      recommendation: 'Verify with additional data points or alternative models'
    };
  };
  
  const risk = getRiskLevel(uncertainty);
  const RiskIcon = risk.icon;
  
  // Calculate position of prediction marker (0-100%)
  const markerPosition = ((prediction - lowerBound) / range) * 100;
  
  return (
    <div className="p-6 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-indigo-500/10 rounded-xl border border-white/20 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Prediction Confidence Analysis
          </h3>
          <p className="text-sm text-gray-400">Statistical reliability assessment</p>
        </div>
        <div className="text-5xl">
          <RiskIcon className={`w-10 h-10 ${risk.textColor}`} />
        </div>
      </div>
      
      {/* Main Prediction Display */}
      <div className="mb-6 p-6 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 rounded-xl border border-white/10">
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-2">Predicted Energy Consumption</div>
          <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            {prediction.toFixed(2)}
          </div>
          <div className="text-xl text-gray-300">kWh</div>
        </div>
      </div>
      
      {/* Confidence Score */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Confidence Level</span>
          <span className="font-bold text-blue-400">{(confidence * 100).toFixed(1)}%</span>
        </div>
        <div className="relative h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transition-all duration-1000 ease-out"
            style={{ width: `${confidence * 100}%` }}
          >
            <div className="absolute inset-0 animate-pulse bg-white/20"></div>
          </div>
          {/* Threshold markers */}
          <div className="absolute top-0 left-[80%] w-0.5 h-full bg-white/30"></div>
          <div className="absolute top-0 left-[90%] w-0.5 h-full bg-white/30"></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </div>
      </div>
      
      {/* Prediction Range Visualization */}
      <div className="mb-6">
        <div className="text-sm text-gray-400 mb-3 flex items-center justify-between">
          <span>Expected Range (95% confidence interval)</span>
          <span className="text-xs text-gray-500">±{(range/2).toFixed(2)} kWh</span>
        </div>
        
        {/* Range indicator */}
        <div className="relative h-20 bg-gradient-to-r from-green-500/10 via-blue-500/20 to-red-500/10 rounded-lg border border-white/10 mb-3">
          {/* Background gradient zones */}
          <div className="absolute inset-0 flex">
            <div className="flex-1 bg-gradient-to-r from-green-500/5 to-transparent"></div>
            <div className="flex-1 bg-blue-500/10"></div>
            <div className="flex-1 bg-gradient-to-l from-red-500/5 to-transparent"></div>
          </div>
          
          {/* Bounds labels */}
          <div className="absolute inset-0 flex items-center justify-between px-4 text-xs font-semibold">
            <div className="flex items-center gap-1">
              <TrendingDown className="w-3 h-3 text-green-400" />
              <span className="text-green-400">{lowerBound.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-red-400" />
              <span className="text-red-400">{upperBound.toFixed(1)}</span>
            </div>
          </div>
          
          {/* Prediction marker */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-blue-400 shadow-lg shadow-blue-500/50 transition-all duration-500"
            style={{ left: `${markerPosition}%` }}
          >
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <div className="px-3 py-1.5 bg-blue-500 rounded-full text-xs font-bold shadow-lg relative">
                {prediction.toFixed(2)} kWh
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rotate-45"></div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full"></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Lower Bound</span>
          <span className="text-blue-400 font-semibold">● Predicted Value</span>
          <span>Upper Bound</span>
        </div>
      </div>
      
      {/* Risk Assessment Card */}
      <div className={`p-4 ${risk.bgColor} border ${risk.borderColor} rounded-lg mb-6`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <RiskIcon className={`w-5 h-5 ${risk.textColor}`} />
            <span className="text-sm font-medium">Uncertainty Risk Assessment</span>
          </div>
          <span className={`text-sm font-bold ${risk.textColor}`}>
            {risk.level}
          </span>
        </div>
        <p className="text-xs text-gray-400 mb-2">{risk.description}</p>
        <div className="text-xs text-gray-500 flex items-start gap-2">
          <span className="text-blue-400">💡</span>
          <span>{risk.recommendation}</span>
        </div>
      </div>
      
      {/* Statistical Details */}
      <div className="grid grid-cols-4 gap-3">
        <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="text-xs text-gray-400 mb-1">Range</div>
          <div className="text-sm font-semibold">{range.toFixed(2)}</div>
          <div className="text-xs text-gray-500">kWh</div>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="text-xs text-gray-400 mb-1">Std Dev</div>
          <div className="text-sm font-semibold">±{(range / 3.92).toFixed(2)}</div>
          <div className="text-xs text-gray-500">kWh</div>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="text-xs text-gray-400 mb-1">Precision</div>
          <div className="text-sm font-semibold">{(100 - uncertainty).toFixed(1)}%</div>
          <div className="text-xs text-gray-500">accuracy</div>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="text-xs text-gray-400 mb-1">Variance</div>
          <div className="text-sm font-semibold">±{uncertainty.toFixed(1)}%</div>
          <div className="text-xs text-gray-500">from mean</div>
        </div>
      </div>
      
      {/* Interpretation Guide */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="text-xs text-gray-400 mb-3 font-semibold">📊 How to interpret:</div>
        <div className="space-y-2 text-xs text-gray-500">
          <div className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span><span className="text-green-400 font-semibold">High confidence (80-100%):</span> Prediction is reliable for planning</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-400">!</span>
            <span><span className="text-yellow-400 font-semibold">Medium confidence (60-80%):</span> Consider margin of error</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-400">⚠</span>
            <span><span className="text-red-400 font-semibold">Low confidence (&lt;60%):</span> Additional validation recommended</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfidenceMeter;
