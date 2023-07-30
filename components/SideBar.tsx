import Link from 'next/link';


const SideBar = () => {
  const routes = ['Generate', 'History', 'Settings']
  return (
    <div className="drawer-side rounded-box">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
        {routes.map((route) => {
          return (
            <li>
              <Link href={`/${route.toLowerCase()}`} className='font-normal text-xl'>
                {route}
              </Link>
            </li>
          )
        })
        }
      </ul>
    </div>
  )
}

export default SideBar;
