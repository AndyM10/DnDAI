'use client'
import { Session, User } from "@supabase/supabase-js"
import { createContext, useContext, useState } from "react";
import { browserClient } from "./browserClient";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  username: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string, full_name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const authContextDefaultValues: AuthContextType = {
  user: null,
  session: null,
  username: null,
  signIn: async () => void 0,
  signUp: async () => void 0,
  signOut: async () => void 0
}

const AuthContext = createContext<AuthContextType>(authContextDefaultValues)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [username, setUsername] = useState<string | ''>('')
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()
  const { supabase } = browserClient()

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw Error(error.message)
      if (data) {
        setUsername(data.user?.user_metadata.username)
        setUser(data.user)
        setSession(data.session)
      }
    } catch (error) {
      throw error
    }
  }

  const signUp = async (email: string, password: string, username: string, full_name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
          data: {
            username,
            full_name,
          }
        }
      })
      if (error) throw Error(error.message)
      if (data) {
        setUsername(data.user?.user_metadata.username)
        setUser(data.user)
        setSession(data.session)
      }
    } catch (error) {
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      router.push('/')

      if (error) throw Error(error.message)
      setUser(null)
      setUsername('')
      setSession(null)
    } catch (error) {
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      username,
      session,
      signIn,
      signUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )

}
