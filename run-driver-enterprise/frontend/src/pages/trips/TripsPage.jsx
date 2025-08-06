import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Progress } from '../../components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  Navigation, 
  Play, 
  CheckCircle,
  Calendar,
  TrendingUp,
  Route,
  Car,
  Timer,
  Distance,
  User,
  Phone,
  MessageCircle
} from 'lucide-react';

const TripsPage = () => {
  const [tripHistory, setTripHistory] = useState([]);
  const [activeTrips, setActiveTrips] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showTripDetails, setShowTripDetails] = useState(false);

  useEffect(() => {
    fetchTripsData();
  }, []);

  const fetchTripsData = async () => {
    try {
      setLoading(true);
      
      // Mock data - in real app, these would be API calls
      const mockTripHistory = [
        {
          id: 1,
          driver_id: "driver_001",
          passenger_name: "Ana Silva",
          passenger_avatar: "AS",
          origin: "Shopping Morumbi, São Paulo",
          destination: "Avenida Paulista, 1000",
          distance: 8.5,
          duration: 25,
          fare: 25.50,
          status: "completed",
          rating: 5,
          start_time: "2024-08-05T14:30:00Z",
          end_time: "2024-08-05T14:55:00Z",
          payment_method: "credit_card"
        },
        {
          id: 2,
          driver_id: "driver_001",
          passenger_name: "Carlos Santos",
          passenger_avatar: "CS",
          origin: "Metrô Tatuapé, São Paulo",
          destination: "Shopping Eldorado, São Paulo",
          distance: 12.3,
          duration: 35,
          fare: 32.80,
          status: "completed",
          rating: 4,
          start_time: "2024-08-05T10:15:00Z",
          end_time: "2024-08-05T10:50:00Z",
          payment_method: "pix"
        },
        {
          id: 3,
          driver_id: "driver_001",
          passenger_name: "Maria Costa",
          passenger_avatar: "MC",
          origin: "Aeroporto Congonhas, São Paulo",
          destination: "Centro Empresarial, São Paulo",
          distance: 15.7,
          duration: 45,
          fare: 45.20,
          status: "completed",
          rating: 5,
          start_time: "2024-08-04T16:20:00Z",
          end_time: "2024-08-04T17:05:00Z",
          payment_method: "credit_card"
        }
      ];

      const mockActiveTrips = [
        {
          id: 4,
          driver_id: "driver_001",
          passenger_name: "João Oliveira",
          passenger_avatar: "JO",
          origin: "Shopping West Plaza, São Paulo",
          destination: "Rua Augusta, 500",
          distance: 6.2,
          estimated_duration: 18,
          estimated_fare: 20.50,
          status: "in_progress",
          start_time: "2024-08-05T15:30:00Z",
          current_location: {
            lat: -23.5505,
            lng: -46.6333
          },
          route: [
            {"lat": -23.5505, "lng": -46.6333},
            {"lat": -23.5510, "lng": -46.6340},
            {"lat": -23.5515, "lng": -46.6345}
          ]
        }
      ];

      const mockStatistics = {
        total_trips: 45,
        total_distance: 1250.5,
        total_earnings: 3250.75,
        average_rating: 4.6,
        total_time: 1250,
        weekly_trips: 12,
        weekly_earnings: 450.25,
        monthly_trips: 45,
        monthly_earnings: 3250.75,
        best_day: "Friday",
        peak_hours: ["08:00", "18:00"],
        favorite_areas: [
          {"area": "Centro", "trips": 15},
          {"area": "Vila Madalena", "trips": 12},
          {"area": "Pinheiros", "trips": 8}
        ]
      };

      setTripHistory(mockTripHistory);
      setActiveTrips(mockActiveTrips);
      setStatistics(mockStatistics);
    } catch (error) {
      console.error('Error fetching trips data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartTrip = async (tripId) => {
    try {
      // Mock API call
      console.log(`Starting trip ${tripId}`);
      // In real app: await api.post(`/api/trips/${tripId}/start`);
    } catch (error) {
      console.error('Error starting trip:', error);
    }
  };

  const handleCompleteTrip = async (tripId) => {
    try {
      // Mock API call
      console.log(`Completing trip ${tripId}`);
      // In real app: await api.post(`/api/trips/${tripId}/complete`);
    } catch (error) {
      console.error('Error completing trip:', error);
    }
  };

  const handleViewTripDetails = (trip) => {
    setSelectedTrip(trip);
    setShowTripDetails(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Concluída';
      case 'in_progress':
        return 'Em Andamento';
      case 'cancelled':
        return 'Cancelada';
      default:
        return 'Pendente';
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
        <h1 className="text-3xl font-bold text-gray-900">Viagens</h1>
        <Button>
          <Route className="w-4 h-4 mr-2" />
          Planejar Rota
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Ativas</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="statistics">Estatísticas</TabsTrigger>
          <TabsTrigger value="planning">Planejamento</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-green-600" />
                Viagens Ativas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeTrips.length === 0 ? (
                <div className="text-center py-8">
                  <Car className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Nenhuma viagem ativa no momento</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeTrips.map((trip) => (
                    <div key={trip.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{trip.passenger_avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{trip.passenger_name}</h3>
                            <Badge className={getStatusColor(trip.status)}>
                              {getStatusText(trip.status)}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleCompleteTrip(trip.id)}>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Finalizar
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleViewTripDetails(trip)}>
                            <Navigation className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">Origem:</span>
                            <span>{trip.origin}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">Destino:</span>
                            <span>{trip.destination}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Distance className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">Distância:</span>
                            <span>{trip.distance} km</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Timer className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">Tempo Estimado:</span>
                            <span>{trip.estimated_duration} min</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">Tarifa Estimada:</span>
                            <span>R$ {trip.estimated_fare}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Histórico de Viagens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tripHistory.map((trip) => (
                  <div key={trip.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{trip.passenger_avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{trip.passenger_name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(trip.status)}>
                              {getStatusText(trip.status)}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm">{trip.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">R$ {trip.fare}</div>
                        <div className="text-sm text-gray-600">
                          {new Date(trip.end_time).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">Origem:</span>
                        </div>
                        <p className="text-sm text-gray-600 ml-6">{trip.origin}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">Destino:</span>
                        </div>
                        <p className="text-sm text-gray-600 ml-6">{trip.destination}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">Duração:</span>
                          <span>{trip.duration} min</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Distance className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">Distância:</span>
                          <span>{trip.distance} km</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => handleViewTripDetails(trip)}>
                        <Navigation className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Contatar Passageiro
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Estatísticas de Viagens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{statistics.total_trips}</div>
                  <div className="text-sm text-gray-600">Total de Viagens</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{statistics.total_distance} km</div>
                  <div className="text-sm text-gray-600">Distância Total</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">R$ {statistics.total_earnings}</div>
                  <div className="text-sm text-gray-600">Ganhos Totais</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{statistics.average_rating}⭐</div>
                  <div className="text-sm text-gray-600">Avaliação Média</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Áreas Favoritas</h3>
                  <div className="space-y-2">
                    {statistics.favorite_areas?.map((area, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{area.area}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={(area.trips / statistics.total_trips) * 100} className="w-20" />
                          <span className="text-sm text-gray-600">{area.trips} viagens</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Informações Semanais</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Viagens da Semana</span>
                      <span className="font-semibold">{statistics.weekly_trips}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Ganhos da Semana</span>
                      <span className="font-semibold">R$ {statistics.weekly_earnings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Melhor Dia</span>
                      <span className="font-semibold">{statistics.best_day}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Horários de Pico</span>
                      <span className="font-semibold">{statistics.peak_hours?.join(' - ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="w-5 h-5" />
                Planejamento de Rotas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Route className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">Planeje suas rotas para otimizar seus ganhos</p>
                <Button>
                  <Navigation className="w-4 h-4 mr-2" />
                  Planejar Nova Rota
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Trip Details Dialog */}
      <Dialog open={showTripDetails} onOpenChange={setShowTripDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Viagem</DialogTitle>
          </DialogHeader>
          {selectedTrip && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{selectedTrip.passenger_avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedTrip.passenger_name}</h3>
                  <Badge className={getStatusColor(selectedTrip.status)}>
                    {getStatusText(selectedTrip.status)}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Origem</h4>
                  <p className="text-sm text-gray-600">{selectedTrip.origin}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Destino</h4>
                  <p className="text-sm text-gray-600">{selectedTrip.destination}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Distância</h4>
                  <p className="text-sm text-gray-600">{selectedTrip.distance} km</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Duração</h4>
                  <p className="text-sm text-gray-600">
                    {selectedTrip.duration || selectedTrip.estimated_duration} min
                  </p>
                </div>
                {selectedTrip.fare && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Tarifa</h4>
                    <p className="text-sm text-gray-600">R$ {selectedTrip.fare}</p>
                  </div>
                )}
                {selectedTrip.rating && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Avaliação</h4>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">{selectedTrip.rating}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Mensagem
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TripsPage;