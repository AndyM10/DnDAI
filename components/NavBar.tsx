const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/">DnD.AI</a>
      </div>
      <div className="flex-none">
        <a role="button" className="btn btn-primary" href="/login">Sign In</a>
      </div>
    </div>
  )
}

export default NavBar
