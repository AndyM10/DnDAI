import { Database } from "@/lib/database"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import SignOutButton from "./SignOutButton"

const NavBar = async () => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore
  })

  const { data: { session } } = await supabase.auth.getSession()
  return (
    <div className="navbar bg-base-100">
      <div className=" navbar-start">
        {session ?
          <a className="btn btn-ghost normal-case text-xl" href={`/${session.user.user_metadata.username}/generate`}>DnD.AI</a> :
          <a className="btn btn-ghost normal-case text-xl" href="/">DnD.AI</a>
        }
      </div>
      {session ?
        <div className="navbar-center">
          <label className="label label-text text-xl">Welcome {session.user.user_metadata.username}</label>
        </div>
        : null
      }
      <div className="navbar-end">
        {session ?
          <SignOutButton /> :
          <a role="button" className="btn btn-primary" href="/login">Sign In</a>
        }
      </div>
    </div>
  )
}

export default NavBar
