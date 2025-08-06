import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Avatar, AvatarFallback } from '../../../ui/avatar';
import { Badge } from '../../../ui/badge';
import { Trophy, Star, TrendingUp } from 'lucide-react';

const LeaderboardCard = ({ leaderboardData, title = "Ranking dos Motoristas" }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboardData.map((driver, index) => (
            <div key={driver.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback>{driver.avatar}</AvatarFallback>
                  </Avatar>
                  {index < 3 && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-semibold">{driver.name}</div>
                  <div className="text-sm text-gray-600">
                    {driver.trips} viagens • {driver.rating}⭐
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">{driver.points} pts</div>
                <div className="text-sm text-gray-600">#{driver.rank}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;