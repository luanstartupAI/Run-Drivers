// Configuração do Supabase para Run Driver
import { createClient } from '@supabase/supabase-js';

// URLs e chaves do Supabase (serão configuradas via variáveis de ambiente)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Criar cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Tipos para TypeScript
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone: string;
          type: 'driver' | 'passenger';
          verified: boolean;
          onboarding_completed: boolean;
          biometric_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          phone: string;
          type?: 'driver' | 'passenger';
          verified?: boolean;
          onboarding_completed?: boolean;
          biometric_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          phone?: string;
          type?: 'driver' | 'passenger';
          verified?: boolean;
          onboarding_completed?: boolean;
          biometric_verified?: boolean;
          updated_at?: string;
        };
      };
      drivers: {
        Row: {
          id: string;
          user_id: string;
          license_number: string;
          license_category: string;
          license_expiry: string;
          vehicle_model: string;
          vehicle_plate: string;
          vehicle_year: number;
          rating: number;
          total_trips: number;
          level: number;
          xp: number;
          earnings_today: number;
          earnings_week: number;
          earnings_month: number;
          is_online: boolean;
          current_lat: number;
          current_lng: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          license_number?: string;
          license_category?: string;
          license_expiry?: string;
          vehicle_model?: string;
          vehicle_plate?: string;
          vehicle_year?: number;
          rating?: number;
          total_trips?: number;
          level?: number;
          xp?: number;
          earnings_today?: number;
          earnings_week?: number;
          earnings_month?: number;
          is_online?: boolean;
          current_lat?: number;
          current_lng?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          license_number?: string;
          license_category?: string;
          license_expiry?: string;
          vehicle_model?: string;
          vehicle_plate?: string;
          vehicle_year?: number;
          rating?: number;
          total_trips?: number;
          level?: number;
          xp?: number;
          earnings_today?: number;
          earnings_week?: number;
          earnings_month?: number;
          is_online?: boolean;
          current_lat?: number;
          current_lng?: number;
          updated_at?: string;
        };
      };
      trips: {
        Row: {
          id: string;
          driver_id: string;
          passenger_id: string;
          origin_lat: number;
          origin_lng: number;
          origin_address: string;
          destination_lat: number;
          destination_lng: number;
          destination_address: string;
          distance: number;
          duration: number;
          price: number;
          status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
          driver_rating: number;
          passenger_rating: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          driver_id: string;
          passenger_id: string;
          origin_lat: number;
          origin_lng: number;
          origin_address: string;
          destination_lat: number;
          destination_lng: number;
          destination_address: string;
          distance: number;
          duration: number;
          price: number;
          status?: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
          driver_rating?: number;
          passenger_rating?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
          driver_rating?: number;
          passenger_rating?: number;
          updated_at?: string;
        };
      };
      achievements: {
        Row: {
          id: string;
          driver_id: string;
          type: string;
          name: string;
          description: string;
          icon: string;
          xp_reward: number;
          unlocked_at: string;
        };
        Insert: {
          id?: string;
          driver_id: string;
          type: string;
          name: string;
          description: string;
          icon: string;
          xp_reward: number;
          unlocked_at?: string;
        };
        Update: {
          unlocked_at?: string;
        };
      };
      documents: {
        Row: {
          id: string;
          user_id: string;
          type: 'driver_license' | 'vehicle_registration' | 'insurance' | 'background_check';
          url: string;
          status: 'pending' | 'approved' | 'rejected';
          extracted_data: any;
          uploaded_at: string;
          reviewed_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: 'driver_license' | 'vehicle_registration' | 'insurance' | 'background_check';
          url: string;
          status?: 'pending' | 'approved' | 'rejected';
          extracted_data?: any;
          uploaded_at?: string;
          reviewed_at?: string;
        };
        Update: {
          status?: 'pending' | 'approved' | 'rejected';
          extracted_data?: any;
          reviewed_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Funções utilitárias para autenticação
export const auth = {
  // Fazer login
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // Fazer registro
  async signUp(email: string, password: string, metadata?: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    return { data, error };
  },

  // Fazer logout
  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Obter usuário atual
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // Obter sessão atual
  async getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  // Escutar mudanças de autenticação
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
};

// Funções utilitárias para banco de dados
export const db = {
  // Usuários
  users: {
    async create(user: Database['public']['Tables']['users']['Insert']) {
      const { data, error } = await supabase
        .from('users')
        .insert(user)
        .select()
        .single();
      return { data, error };
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
      return { data, error };
    },

    async update(id: string, updates: Database['public']['Tables']['users']['Update']) {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      return { data, error };
    },
  },

  // Motoristas
  drivers: {
    async create(driver: Database['public']['Tables']['drivers']['Insert']) {
      const { data, error } = await supabase
        .from('drivers')
        .insert(driver)
        .select()
        .single();
      return { data, error };
    },

    async getByUserId(userId: string) {
      const { data, error } = await supabase
        .from('drivers')
        .select('*')
        .eq('user_id', userId)
        .single();
      return { data, error };
    },

    async update(id: string, updates: Database['public']['Tables']['drivers']['Update']) {
      const { data, error } = await supabase
        .from('drivers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      return { data, error };
    },

    async updateLocation(id: string, lat: number, lng: number) {
      const { data, error } = await supabase
        .from('drivers')
        .update({ 
          current_lat: lat, 
          current_lng: lng,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      return { data, error };
    },

    async setOnlineStatus(id: string, isOnline: boolean) {
      const { data, error } = await supabase
        .from('drivers')
        .update({ 
          is_online: isOnline,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      return { data, error };
    },
  },

  // Viagens
  trips: {
    async create(trip: Database['public']['Tables']['trips']['Insert']) {
      const { data, error } = await supabase
        .from('trips')
        .insert(trip)
        .select()
        .single();
      return { data, error };
    },

    async getByDriverId(driverId: string, limit = 10) {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('driver_id', driverId)
        .order('created_at', { ascending: false })
        .limit(limit);
      return { data, error };
    },

    async updateStatus(id: string, status: Database['public']['Tables']['trips']['Row']['status']) {
      const { data, error } = await supabase
        .from('trips')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      return { data, error };
    },
  },

  // Conquistas
  achievements: {
    async getByDriverId(driverId: string) {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('driver_id', driverId)
        .order('unlocked_at', { ascending: false });
      return { data, error };
    },

    async unlock(achievement: Database['public']['Tables']['achievements']['Insert']) {
      const { data, error } = await supabase
        .from('achievements')
        .insert(achievement)
        .select()
        .single();
      return { data, error };
    },
  },

  // Documentos
  documents: {
    async upload(document: Database['public']['Tables']['documents']['Insert']) {
      const { data, error } = await supabase
        .from('documents')
        .insert(document)
        .select()
        .single();
      return { data, error };
    },

    async getByUserId(userId: string) {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', userId)
        .order('uploaded_at', { ascending: false });
      return { data, error };
    },

    async updateStatus(id: string, status: Database['public']['Tables']['documents']['Row']['status']) {
      const { data, error } = await supabase
        .from('documents')
        .update({ 
          status,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      return { data, error };
    },
  },
};

// Funções para storage (arquivos)
export const storage = {
  // Upload de arquivo
  async uploadFile(bucket: string, path: string, file: File) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });
    return { data, error };
  },

  // Obter URL pública do arquivo
  getPublicUrl(bucket: string, path: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    return data.publicUrl;
  },

  // Deletar arquivo
  async deleteFile(bucket: string, path: string) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    return { data, error };
  },
};

// Funções para realtime
export const realtime = {
  // Escutar mudanças em uma tabela
  subscribeToTable(table: string, callback: (payload: any) => void) {
    return supabase
      .channel(`public:${table}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table }, 
        callback
      )
      .subscribe();
  },

  // Escutar mudanças específicas de um usuário
  subscribeToUserChanges(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`user:${userId}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'drivers', filter: `user_id=eq.${userId}` }, 
        callback
      )
      .subscribe();
  },

  // Remover subscription
  unsubscribe(subscription: any) {
    return supabase.removeChannel(subscription);
  },
};

export default supabase;

