import React from 'react';
import { Card, CardContent } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Gift, Coins, CheckCircle } from 'lucide-react';

const RewardCard = ({ reward, onClaim }) => {
  const { id, name, description, points_required, available } = reward;

  return (
    <div className="p-4 rounded-lg border hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-4 h-4 text-red-500" />
            <h3 className="font-semibold">{name}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-yellow-500" />
            <span className="text-xs text-gray-500">{points_required} pontos necessários</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant={available ? "default" : "secondary"}>
            {available ? "Disponível" : "Indisponível"}
          </Badge>
          <Button
            size="sm"
            disabled={!available}
            onClick={() => onClaim(id)}
            className="w-full"
          >
            {available ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Resgatar
              </>
            ) : (
              "Indisponível"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RewardCard;