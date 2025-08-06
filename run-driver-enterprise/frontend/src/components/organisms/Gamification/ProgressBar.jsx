import React from 'react';
import { Progress } from '../../../ui/progress';
import { TrendingUp, Target } from 'lucide-react';

const ProgressBar = ({ 
  currentValue, 
  maxValue, 
  label = "Progresso", 
  showPercentage = true,
  showIcon = true,
  color = "primary"
}) => {
  const percentage = Math.min((currentValue / maxValue) * 100, 100);
  
  const getColorClasses = () => {
    switch (color) {
      case "green":
        return "bg-green-600";
      case "blue":
        return "bg-blue-600";
      case "purple":
        return "bg-purple-600";
      case "yellow":
        return "bg-yellow-600";
      default:
        return "bg-primary";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showIcon && <TrendingUp className="w-4 h-4 text-gray-500" />}
          <span className="text-sm font-medium">{label}</span>
        </div>
        {showPercentage && (
          <span className="text-sm text-gray-600">{Math.round(percentage)}%</span>
        )}
      </div>
      <Progress value={percentage} className="h-2" />
      <div className="flex justify-between text-xs text-gray-500">
        <span>{currentValue} / {maxValue}</span>
        <span>{maxValue - currentValue} restantes</span>
      </div>
    </div>
  );
};

export default ProgressBar;