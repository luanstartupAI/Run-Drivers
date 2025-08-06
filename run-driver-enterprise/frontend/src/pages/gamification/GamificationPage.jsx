import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Trophy, Star, Gift, TrendingUp, Target, Award } from 'lucide-react';

const GamificationPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGamificationData();
  }, []);

  const fetchGamificationData = async () => {
    try {
      setLoading(true);
      
      // Mock data - in real app, these would be API calls
      const mockLeaderboard = [
        { id: 1, name: "João Silva", points: 1250, rank: 1, trips: 45, rating: 4.8, avatar: "JS" },
        { id: 2, name: "Maria Santos", points: 1180, rank: 2, trips: 42, rating: 4.9, avatar: "MS" },
        { id: 3, name: "Pedro Costa", points: 1100, rank: 3, trips: 38, rating: 4.7, avatar: "PC" },
        { id: 4, name: "Ana Oliveira", points: 1050, rank: 4, trips: 35, rating: 4.6, avatar: "AO" },
        { id: 5, name: "Carlos Lima", points: 980, rank: 5, trips: 32, rating: 4.5, avatar: "CL" },
      ];

      const mockAchievements = [
        { id: 1, name: "Primeira Viagem", description: "Complete sua primeira viagem", icon: "🚗", unlocked: true, points: 50 },
        { id: 2, name: "Motorista Experiente", description: "Complete 50 viagens", icon: "🏆", unlocked: true, points: 200 },
        { id: 3, name: "Avaliação Perfeita", description: "Receba 5 estrelas em 10 viagens", icon: "⭐", unlocked: false, points: 150 },
        { id: 4, name: "Piloto Noturno", description: "Complete 20 viagens à noite", icon: "🌙", unlocked: false, points: 100 },
        { id: 5, name: "Campeão da Semana", description: "Seja o melhor da semana", icon: "👑", unlocked: false, points: 300 },
      ];

      const mockRewards = [
        { id: 1, name: "Desconto 10% Combustível", description: "Desconto em postos parceiros", points_required: 500, available: true },
        { id: 2, name: "Dia de Folga", description: "Um dia livre com pagamento", points_required: 1000, available: true },
        { id: 3, name: "Bonus R$ 50", description: "Bonus direto na carteira", points_required: 800, available: true },
        { id: 4, name: "Treinamento Premium", description: "Curso de direção defensiva", points_required: 1500, available: false },
      ];

      const mockProgress = {
        total_points: 1250,
        level: 8,
        level_progress: 75,
        points_to_next_level: 250,
        total_trips: 45,
        total_distance: 1250.5,
        total_earnings: 3250.75,
        current_streak: 7,
        best_streak: 15,
        weekly_goal: 1000,
        weekly_progress: 850
      };

      setLeaderboard(mockLeaderboard);
      setAchievements(mockAchievements);
      setRewards(mockRewards);
      setProgress(mockProgress);
    } catch (error) {
      console.error('Error fetching gamification data:', error);
    } finally {
      setLoading(false);
    }
  };

  const claimReward = async (rewardId) => {
    try {
      // Mock API call
      console.log(`Claiming reward ${rewardId}`);
      // In real app: await api.post(`/api/gamification/claim-reward/${rewardId}`);
    } catch (error) {
      console.error('Error claiming reward:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gamificação</h1>
        <Badge variant="secondary" className="text-sm">
          <Trophy className="w-4 h-4 mr-2" />
          Nível {progress.level}
        </Badge>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Seu Progresso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{progress.total_points}</div>
              <div className="text-sm text-gray-600">Pontos Totais</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{progress.total_trips}</div>
              <div className="text-sm text-gray-600">Viagens</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{progress.current_streak}</div>
              <div className="text-sm text-gray-600">Sequência Atual</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{progress.total_earnings.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Ganhos (R$)</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso do Nível</span>
              <span>{progress.level_progress}%</span>
            </div>
            <Progress value={progress.level_progress} className="h-2" />
            <p className="text-xs text-gray-500">
              {progress.points_to_next_level} pontos para o próximo nível
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="leaderboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="leaderboard">Ranking</TabsTrigger>
          <TabsTrigger value="achievements">Conquistas</TabsTrigger>
          <TabsTrigger value="rewards">Recompensas</TabsTrigger>
          <TabsTrigger value="stats">Estatísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Ranking dos Motoristas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((driver, index) => (
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
                        <div className="text-sm text-gray-600">{driver.trips} viagens • {driver.rating}⭐</div>
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
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-500" />
                Suas Conquistas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className={`p-4 rounded-lg border ${achievement.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold">{achievement.name}</div>
                        <div className="text-sm text-gray-600">{achievement.description}</div>
                        <div className="text-xs text-gray-500 mt-1">{achievement.points} pontos</div>
                      </div>
                      <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                        {achievement.unlocked ? "Desbloqueado" : "Bloqueado"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-red-500" />
                Recompensas Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rewards.map((reward) => (
                  <div key={reward.id} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-semibold">{reward.name}</div>
                        <div className="text-sm text-gray-600">{reward.description}</div>
                        <div className="text-xs text-gray-500 mt-1">{reward.points_required} pontos necessários</div>
                      </div>
                      <Button
                        size="sm"
                        disabled={!reward.available}
                        onClick={() => claimReward(reward.id)}
                      >
                        {reward.available ? "Resgatar" : "Indisponível"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Estatísticas Detalhadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Metas Semanais</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Meta de Pontos</span>
                      <span>{progress.weekly_progress}/{progress.weekly_goal}</span>
                    </div>
                    <Progress value={(progress.weekly_progress / progress.weekly_goal) * 100} className="h-2" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Recordes</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Melhor Sequência</span>
                      <span className="font-semibold">{progress.best_streak} dias</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Distância Total</span>
                      <span className="font-semibold">{progress.total_distance} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ganhos Totais</span>
                      <span className="font-semibold">R$ {progress.total_earnings.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GamificationPage;