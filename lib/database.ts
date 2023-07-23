export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      images: {
        Row: {
          created_at: string | null
          id: number
          image_data: Json | null
          image_url: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          image_data?: Json | null
          image_url?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          image_data?: Json | null
          image_url?: string | null
          username?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          credits: number | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          credits?: number | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          credits?: number | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
