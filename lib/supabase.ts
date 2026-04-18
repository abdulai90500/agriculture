import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Lazy initialization of Supabase client
let _supabase: SupabaseClient | null = null

export const getSupabaseClient = (): SupabaseClient | null => {
  if (_supabase) return _supabase

  if (!supabaseUrl || !supabaseAnonKey ||
      supabaseUrl === 'https://placeholder.supabase.co' ||
      supabaseAnonKey === 'placeholder-key') {
    return null
  }

  try {
    _supabase = createClient(supabaseUrl, supabaseAnonKey)
    return _supabase
  } catch (error) {
    console.warn('Failed to initialize Supabase client:', error)
    return null
  }
}

// For backward compatibility, but will be null if not configured
export const supabase = getSupabaseClient()

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return getSupabaseClient() !== null
}

// Database types (generated from Prisma schema)
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          role: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          role?: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          role?: string
          createdAt?: string
          updatedAt?: string
        }
      }
      farmers: {
        Row: {
          id: string
          name: string
          phone: string | null
          location: string
          latitude: number | null
          longitude: number | null
          status: string
          joinDate: string
          lastActivity: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          name: string
          phone?: string | null
          location: string
          latitude?: number | null
          longitude?: number | null
          status?: string
          joinDate?: string
          lastActivity?: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string | null
          location?: string
          latitude?: number | null
          longitude?: number | null
          status?: string
          joinDate?: string
          lastActivity?: string
          createdAt?: string
          updatedAt?: string
        }
      }
      crops: {
        Row: {
          id: string
          name: string
          variety: string | null
          category: string
          description: string | null
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          name: string
          variety?: string | null
          category: string
          description?: string | null
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          name?: string
          variety?: string | null
          category?: string
          description?: string | null
          createdAt?: string
          updatedAt?: string
        }
      }
      livestock: {
        Row: {
          id: string
          type: string
          breed: string | null
          category: string
          description: string | null
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          type: string
          breed?: string | null
          category: string
          description?: string | null
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          type?: string
          breed?: string | null
          category?: string
          description?: string | null
          createdAt?: string
          updatedAt?: string
        }
      }
      farmer_crops: {
        Row: {
          id: string
          farmerId: string
          cropId: string
          area: number
          yield: number | null
          status: string
          plantDate: string | null
          harvestDate: string | null
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          farmerId: string
          cropId: string
          area: number
          yield?: number | null
          status?: string
          plantDate?: string | null
          harvestDate?: string | null
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          farmerId?: string
          cropId?: string
          area?: number
          yield?: number | null
          status?: string
          plantDate?: string | null
          harvestDate?: string | null
          createdAt?: string
          updatedAt?: string
        }
      }
      farmer_livestock: {
        Row: {
          id: string
          farmerId: string
          livestockId: string
          count: number
          healthStatus: string
          productivity: number | null
          avgWeight: number | null
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          farmerId: string
          livestockId: string
          count: number
          healthStatus?: string
          productivity?: number | null
          avgWeight?: number | null
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          farmerId?: string
          livestockId?: string
          count?: number
          healthStatus?: string
          productivity?: number | null
          avgWeight?: number | null
          createdAt?: string
          updatedAt?: string
        }
      }
      data_collections: {
        Row: {
          id: string
          farmerId: string
          userId: string
          cropId: string | null
          livestockId: string | null
          dataType: string
          quantity: number | null
          unit: string | null
          quality: string | null
          notes: string | null
          location: string | null
          latitude: number | null
          longitude: number | null
          collectedAt: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          farmerId: string
          userId: string
          cropId?: string | null
          livestockId?: string | null
          dataType: string
          quantity?: number | null
          unit?: string | null
          quality?: string | null
          notes?: string | null
          location?: string | null
          latitude?: number | null
          longitude?: number | null
          collectedAt?: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          farmerId?: string
          userId?: string
          cropId?: string | null
          livestockId?: string | null
          dataType?: string
          quantity?: number | null
          unit?: string | null
          quality?: string | null
          notes?: string | null
          location?: string | null
          latitude?: number | null
          longitude?: number | null
          collectedAt?: string
          createdAt?: string
          updatedAt?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          status: string
          startDate: string | null
          endDate: string | null
          budget: number | null
          location: string | null
          latitude: number | null
          longitude: number | null
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          status?: string
          startDate?: string | null
          endDate?: string | null
          budget?: number | null
          location?: string | null
          latitude?: number | null
          longitude?: number | null
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          status?: string
          startDate?: string | null
          endDate?: string | null
          budget?: number | null
          location?: string | null
          latitude?: number | null
          longitude?: number | null
          createdAt?: string
          updatedAt?: string
        }
      }
      indicators: {
        Row: {
          id: string
          projectId: string
          name: string
          description: string | null
          category: string
          targetValue: number | null
          currentValue: number | null
          unit: string | null
          baseline: number | null
          frequency: string
          lastUpdated: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          projectId: string
          name: string
          description?: string | null
          category: string
          targetValue?: number | null
          currentValue?: number | null
          unit?: string | null
          baseline?: number | null
          frequency?: string
          lastUpdated?: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          projectId?: string
          name?: string
          description?: string | null
          category?: string
          targetValue?: number | null
          currentValue?: number | null
          unit?: string | null
          baseline?: number | null
          frequency?: string
          lastUpdated?: string
          createdAt?: string
          updatedAt?: string
        }
      }
    }
  }
}