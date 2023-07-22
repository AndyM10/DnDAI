import { Database } from "@/lib/database"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import SignOutButton from "./SignOutButton"

const NavBar = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies
  })

  const { data: { session } } = await supabase.auth.getSession()
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        {session ?
          <a className="btn btn-ghost normal-case text-xl" href={`/${session.user.user_metadata.username}`}>DnD.AI</a> :
          <a className="btn btn-ghost normal-case text-xl" href="/">DnD.AI</a>
        }
      </div>
      <div className="flex-none">
        {session ?
          <SignOutButton /> :
          <a role="button" className="btn btn-primary" href="/login">Sign In</a>
        }
      </div>
    </div>
  )
}

export default NavBar
