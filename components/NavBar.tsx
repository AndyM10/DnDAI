const NavBar = async () => {
  return (
    <>
      <div className="navbar bg-base-100 border border-black">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl">DnDAi</a>
        </div>
        <div className="navbar-end">
          <a className="btn btn-primary" href="/login">Login</a>
        </div>
      </div >
    </>
  )
}

export default NavBar
