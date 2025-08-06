import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { 
  Users, 
  Calendar, 
  MessageCircle, 
  Heart, 
  Share, 
  MoreHorizontal,
  Send,
  MapPin,
  Clock,
  UserPlus,
  MessageSquare,
  TrendingUp,
  Star
} from 'lucide-react';

const SocialPage = () => {
  const [feed, setFeed] = useState([]);
  const [events, setEvents] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);

  useEffect(() => {
    fetchSocialData();
  }, []);

  const fetchSocialData = async () => {
    try {
      setLoading(true);
      
      // Mock data - in real app, these would be API calls
      const mockFeed = [
        {
          id: 1,
          driver_id: "driver_001",
          driver_name: "João Silva",
          driver_avatar: "JS",
          content: "Acabei de completar minha 100ª viagem! 🚗✨",
          image: "https://via.placeholder.com/400x200",
          likes: 24,
          comments: 8,
          created_at: "2024-08-05T10:30:00Z",
          type: "achievement"
        },
        {
          id: 2,
          driver_id: "driver_002",
          driver_name: "Maria Santos",
          driver_avatar: "MS",
          content: "Dica do dia: Sempre mantenha o carro limpo e organizado! 🧹",
          image: null,
          likes: 15,
          comments: 12,
          created_at: "2024-08-05T09:15:00Z",
          type: "tip"
        },
        {
          id: 3,
          driver_id: "driver_003",
          driver_name: "Pedro Costa",
          driver_avatar: "PC",
          content: "Encontrei um passageiro super legal hoje! Conversa boa durante toda a viagem 😊",
          image: "https://via.placeholder.com/400x200",
          likes: 31,
          comments: 5,
          created_at: "2024-08-05T08:45:00Z",
          type: "experience"
        }
      ];

      const mockEvents = [
        {
          id: 1,
          title: "Encontro de Motoristas",
          description: "Encontro mensal para networking e troca de experiências",
          date: "2024-08-15T19:00:00Z",
          location: "Restaurante Central, São Paulo",
          attendees: 45,
          max_attendees: 50,
          image: "https://via.placeholder.com/400x200",
          type: "meetup"
        },
        {
          id: 2,
          title: "Workshop de Direção Defensiva",
          description: "Aprenda técnicas avançadas de direção segura",
          date: "2024-08-20T14:00:00Z",
          location: "Centro de Treinamento, Rio de Janeiro",
          attendees: 28,
          max_attendees: 30,
          image: "https://via.placeholder.com/400x200",
          type: "workshop"
        },
        {
          id: 3,
          title: "Competição de Motoristas",
          description: "Competição de eficiência e segurança na direção",
          date: "2024-08-25T10:00:00Z",
          location: "Autódromo de Interlagos, São Paulo",
          attendees: 15,
          max_attendees: 20,
          image: "https://via.placeholder.com/400x200",
          type: "competition"
        }
      ];

      const mockCommunities = [
        {
          id: 1,
          name: "Motoristas SP",
          description: "Comunidade de motoristas de São Paulo",
          members: 1250,
          image: "https://via.placeholder.com/200x200",
          type: "regional"
        },
        {
          id: 2,
          name: "Dicas de Direção",
          description: "Compartilhamento de dicas e experiências",
          members: 890,
          image: "https://via.placeholder.com/200x200",
          type: "tips"
        },
        {
          id: 3,
          name: "Motoristas Noturnos",
          description: "Especialistas em viagens noturnas",
          members: 456,
          image: "https://via.placeholder.com/200x200",
          type: "specialized"
        }
      ];

      const mockMessages = [
        {
          id: 1,
          sender_id: "driver_001",
          sender_name: "João Silva",
          receiver_id: "driver_002",
          content: "Oi! Viu o novo evento de direção defensiva?",
          timestamp: "2024-08-05T10:30:00Z",
          read: true
        },
        {
          id: 2,
          sender_id: "driver_002",
          sender_name: "Maria Santos",
          receiver_id: "driver_001",
          content: "Sim! Vou participar. Você também?",
          timestamp: "2024-08-05T10:32:00Z",
          read: true
        },
        {
          id: 3,
          sender_id: "driver_003",
          sender_name: "Pedro Costa",
          receiver_id: "driver_001",
          content: "Dica: Use o Waze para rotas mais eficientes!",
          timestamp: "2024-08-05T09:15:00Z",
          read: false
        }
      ];

      setFeed(mockFeed);
      setEvents(mockEvents);
      setCommunities(mockCommunities);
      setMessages(mockMessages);
    } catch (error) {
      console.error('Error fetching social data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      // Mock API call
      setFeed(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      ));
      // In real app: await api.post(`/api/social/feed/${postId}/like`);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleCreatePost = async () => {
    try {
      if (!newPost.trim()) return;
      
      const post = {
        id: feed.length + 1,
        driver_id: "driver_001",
        driver_name: "João Silva",
        driver_avatar: "JS",
        content: newPost,
        image: null,
        likes: 0,
        comments: 0,
        created_at: new Date().toISOString(),
        type: "general"
      };
      
      setFeed(prev => [post, ...prev]);
      setNewPost('');
      setShowNewPostDialog(false);
      
      // In real app: await api.post('/api/social/feed', post);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleJoinEvent = async (eventId) => {
    try {
      // Mock API call
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, attendees: event.attendees + 1 }
          : event
      ));
      // In real app: await api.post(`/api/social/events/${eventId}/join`);
    } catch (error) {
      console.error('Error joining event:', error);
    }
  };

  const handleJoinCommunity = async (communityId) => {
    try {
      // Mock API call
      console.log(`Joining community ${communityId}`);
      // In real app: await api.post(`/api/social/community/${communityId}/join`);
    } catch (error) {
      console.error('Error joining community:', error);
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
        <h1 className="text-3xl font-bold text-gray-900">Social</h1>
        <Dialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog}>
          <DialogTrigger asChild>
            <Button>
              <MessageCircle className="w-4 h-4 mr-2" />
              Nova Publicação
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Publicação</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="O que você quer compartilhar?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                rows={4}
              />
              <div className="flex gap-2">
                <Button onClick={handleCreatePost}>
                  <Send className="w-4 h-4 mr-2" />
                  Publicar
                </Button>
                <Button variant="outline" onClick={() => setShowNewPostDialog(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="feed" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="events">Eventos</TabsTrigger>
          <TabsTrigger value="communities">Comunidades</TabsTrigger>
          <TabsTrigger value="messages">Mensagens</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Feed da Comunidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feed.map((post) => (
                  <div key={post.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar>
                        <AvatarFallback>{post.driver_avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{post.driver_name}</span>
                          <Badge variant="outline" className="text-xs">
                            {post.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <p className="mb-3">{post.content}</p>
                    
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt="Post" 
                        className="w-full rounded-lg mb-3"
                      />
                    )}
                    
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleLikePost(post.id)}
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="w-4 h-4 mr-2" />
                        Compartilhar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                  <div key={event.id} className="border rounded-lg overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{event.type}</Badge>
                        <span className="text-sm text-gray-600">
                          {event.attendees}/{event.max_attendees} participantes
                        </span>
                      </div>
                      <h3 className="font-semibold mb-2">{event.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full"
                        onClick={() => handleJoinEvent(event.id)}
                        disabled={event.attendees >= event.max_attendees}
                      >
                        {event.attendees >= event.max_attendees ? 'Lotado' : 'Participar'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Comunidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {communities.map((community) => (
                  <div key={community.id} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <img 
                        src={community.image} 
                        alt={community.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{community.name}</h3>
                        <p className="text-sm text-gray-600">{community.members} membros</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{community.description}</p>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm"
                        onClick={() => handleJoinCommunity(community.id)}
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Entrar
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Ver Discussões
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Mensagens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Avatar>
                      <AvatarFallback>
                        {message.sender_name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{message.sender_name}</span>
                        {!message.read && (
                          <Badge variant="secondary" className="text-xs">
                            Nova
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{message.content}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(message.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialPage;