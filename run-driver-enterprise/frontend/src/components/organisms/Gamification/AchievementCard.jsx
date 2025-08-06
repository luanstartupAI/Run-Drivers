import React from 'react';
import { Card, CardContent } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Award, Lock, Unlock } from 'lucide-react';

const AchievementCard = ({ achievement }) => {
  const { id, name, description, icon, unlocked, points } = achievement;

  return (
    <div className={`p-4 rounded-lg border transition-all duration-200 ${
      unlocked 
        ? 'bg-green-50 border-green-200 hover:bg-green-100' 
        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
    }`}>
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-gray-600">{description}</div>
          <div className="text-xs text-gray-500 mt-1">{points} pontos</div>
        </div>
        <div className="flex items-center gap-2">
          {unlocked ? (
            <Unlock className="w-4 h-4 text-green-600" />
          ) : (
            <Lock className="w-4 h-4 text-gray-400" />
          )}
          <Badge variant={unlocked ? "default" : "secondary"}>
            {unlocked ? "Desbloqueado" : "Bloqueado"}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;