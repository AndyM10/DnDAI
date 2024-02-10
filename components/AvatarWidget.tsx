import Image from 'next/image'
import { Database } from "@/lib/database"
import { UserData } from "@/lib/types/UserData"
import { SupabaseClient } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

export default function AvatarWidget({ supabase, user, onUpload }: {
  supabase: SupabaseClient<Database>,
  user: UserData
  onUpload: (url: string) => void
}) {

  const [loading, setLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    if (user.avatar_url) getAvatar(user.avatar_url)
  }, [user.avatar_url])

  async function uploadAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      setLoading(true)
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      if (e.target.files[0].size > 1000000) {
        throw new Error('Image size must be less than 1mb')
      }

      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()!
      const filePath = `${user.id}/avatar.${fileExt}`

      const { error } = await supabase.storage.from('avatars').upload(filePath, file, {
        upsert: true
      })
      if (error) throw error
      onUpload(filePath)

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function getAvatar(path: string) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) throw error
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-light">Avatar</h2>
      <div className="avatar">
        <div className="w-48 rounded">
          {avatarUrl ?
            <Image src={avatarUrl} width={48} height={48} alt='Profile Pic' /> :
            <div className="skeleton w-48 h-48"></div>
          }
        </div>
      </div>
      {loading ?
        <span className="loading loading-infinity loading-lg"></span> :
        <input className="file-input file-input-md my-2" onChange={(e) => uploadAvatar(e)} type="file" disabled={loading} />
      }
    </div>
  )
}
