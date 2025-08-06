import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Switch } from '../../components/ui/switch';
import { Separator } from '../../components/ui/separator';
import { 
  User, 
  Settings, 
  Shield, 
  Bell, 
  Camera, 
  Upload, 
  Edit, 
  Save,
  Download,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [documents, setDocuments] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      
      // Mock data - in real app, these would be API calls
      const mockUser = {
        id: "driver_001",
        name: "João Silva",
        email: "joao.silva@email.com",
        phone: "+55 11 99999-9999",
        avatar: "JS",
        status: "active",
        rating: 4.8,
        total_trips: 45,
        member_since: "2024-01-15",
        vehicle: {
          model: "Toyota Corolla",
          year: "2020",
          plate: "ABC-1234",
          color: "Prata"
        },
        documents: {
          cnh: "verified",
          cpf: "verified",
          vehicle_docs: "pending"
        }
      };

      const mockDocuments = [
        {
          id: 1,
          name: "CNH - João Silva",
          type: "cnh",
          status: "verified",
          uploaded_at: "2024-01-15T10:30:00Z",
          file_size: "2.5 MB"
        },
        {
          id: 2,
          name: "CPF - João Silva",
          type: "cpf",
          status: "verified",
          uploaded_at: "2024-01-15T10:35:00Z",
          file_size: "1.8 MB"
        },
        {
          id: 3,
          name: "Documento do Veículo",
          type: "vehicle_docs",
          status: "pending",
          uploaded_at: "2024-01-20T14:20:00Z",
          file_size: "3.2 MB"
        }
      ];

      const mockSettings = {
        notifications: {
          push: true,
          email: true,
          sms: false
        },
        privacy: {
          share_location: true,
          share_rating: true,
          share_earnings: false
        },
        preferences: {
          language: "pt-BR",
          theme: "light",
          auto_accept_trips: false
        }
      };

      setUser(mockUser);
      setDocuments(mockDocuments);
      setSettings(mockSettings);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      // Mock API call
      console.log('Saving profile:', user);
      setEditing(false);
      // In real app: await api.put('/api/user/profile', user);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleUploadDocument = async (file) => {
    try {
      // Mock upload
      console.log('Uploading document:', file);
      // In real app: await api.post('/api/documents/upload', formData);
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  const handleDeleteDocument = async (documentId) => {
    try {
      // Mock delete
      console.log('Deleting document:', documentId);
      setDocuments(docs => docs.filter(doc => doc.id !== documentId));
      // In real app: await api.delete(`/api/documents/${documentId}`);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
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
        <h1 className="text-3xl font-bold text-gray-900">Perfil</h1>
        <Button onClick={() => setEditing(!editing)}>
          <Edit className="w-4 h-4 mr-2" />
          {editing ? 'Cancelar' : 'Editar'}
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Informações</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="text-lg">{user.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-gray-600">{user.phone}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                    disabled={!editing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    disabled={!editing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={user.phone}
                    onChange={(e) => setUser({...user, phone: e.target.value})}
                    disabled={!editing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="member_since">Membro desde</Label>
                  <Input
                    id="member_since"
                    value={user.member_since}
                    disabled
                  />
                </div>
              </div>

              {editing && (
                <div className="flex gap-2">
                  <Button onClick={handleSaveProfile}>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                  <Button variant="outline" onClick={() => setEditing(false)}>
                    Cancelar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações do Veículo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Modelo</Label>
                  <Input value={user.vehicle?.model} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Ano</Label>
                  <Input value={user.vehicle?.year} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Placa</Label>
                  <Input value={user.vehicle?.plate} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Cor</Label>
                  <Input value={user.vehicle?.color} disabled />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Documentos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-semibold">{doc.name}</div>
                        <div className="text-sm text-gray-600">
                          {doc.file_size} • {new Date(doc.uploaded_at).toLocaleDateString()}
                        </div>
                        <Badge 
                          variant={doc.status === 'verified' ? 'default' : 'secondary'}
                          className="mt-2"
                        >
                          {doc.status === 'verified' ? 'Verificado' : 'Pendente'}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteDocument(doc.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600">Arraste e solte documentos aqui ou</p>
                <Button variant="outline" className="mt-2">
                  Selecionar Arquivo
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configurações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Notificações</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações Push</Label>
                      <p className="text-sm text-gray-600">Receber notificações no app</p>
                    </div>
                    <Switch
                      checked={settings.notifications?.push}
                      onCheckedChange={(checked) => updateSetting('notifications', 'push', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações por Email</Label>
                      <p className="text-sm text-gray-600">Receber notificações por email</p>
                    </div>
                    <Switch
                      checked={settings.notifications?.email}
                      onCheckedChange={(checked) => updateSetting('notifications', 'email', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações SMS</Label>
                      <p className="text-sm text-gray-600">Receber notificações por SMS</p>
                    </div>
                    <Switch
                      checked={settings.notifications?.sms}
                      onCheckedChange={(checked) => updateSetting('notifications', 'sms', checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-4">Privacidade</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Compartilhar Localização</Label>
                      <p className="text-sm text-gray-600">Permitir que passageiros vejam sua localização</p>
                    </div>
                    <Switch
                      checked={settings.privacy?.share_location}
                      onCheckedChange={(checked) => updateSetting('privacy', 'share_location', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Compartilhar Avaliação</Label>
                      <p className="text-sm text-gray-600">Mostrar sua avaliação para outros motoristas</p>
                    </div>
                    <Switch
                      checked={settings.privacy?.share_rating}
                      onCheckedChange={(checked) => updateSetting('privacy', 'share_rating', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha Atual</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha atual"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Digite sua nova senha"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirme sua nova senha"
                />
              </div>

              <Button className="w-full">
                Alterar Senha
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;