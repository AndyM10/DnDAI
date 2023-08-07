
import { Database } from "@/lib/database"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const supabase = createServerComponentClient<Database>({
  cookies
})

export default function Page() {

  return (
    <div className="flex flex-col items-center">
      <div>

        <h1 className="label text-3xl">Settings</h1>
      </div>
    </div>
  )
}
