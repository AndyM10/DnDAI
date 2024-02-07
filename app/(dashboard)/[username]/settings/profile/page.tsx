'use client'

import { browserClient } from "@/lib/browserClient";
import { UserData } from "@/lib/types/UserData";
import { useEffect, useState } from "react";
import AvatarWidget from "@/components/AvatarWidget";
import { Tables } from "@/lib/database";

type User = Tables<'profiles'>

export default function Page() {
  const { supabase } = browserClient()
  const [user, setUser] = useState<User>()

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser()
      if (error) console.error(error)
      if (!data.user) throw new Error('No user found')

      const { data: userData, error: userError } = await supabase.from('profiles').select('*').eq('id', data.user.id)
      if (userError) console.error(userError)
      if (!userData) throw new Error('No user profile found')

      setUser(userData[0] as UserData)

    }
    fetchUser()
  }, [])

  async function updateProfile(avatar_url: string) {
    // Update the user profile
    //
    console.log('UPDATING PROFILE', avatar_url)

    const updates = {
      ...user,
      updated_at: new Date().toString(),
      avatar_url
    } as User

    console.log('UPDATES', updates)

    const { data, error } = await supabase.from('profiles').upsert(updates)
    console.log('DATA', data)
    if (error) {
      alert('Error updating profile')
    } else {
      setUser(updates)
    }
  }

  return (
    <div className="col-span-12 justify-center">
      <div className="bg-base-100 p-2 rounded shadow-black">
        <h1 className="text-3xl font-light">Profile</h1>
        <p className="text-sm">Update your profile information</p>
        <div className="divider"></div>
        {user &&
          <AvatarWidget supabase={supabase} user={user} onUpload={(url: string) => updateProfile(url)} />
        }

      </div>
    </div>
  );
}
