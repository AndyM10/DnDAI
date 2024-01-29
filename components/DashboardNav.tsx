import { Bars3Icon } from '@heroicons/react/20/solid'
import { SignOut } from './SignOut'
interface DashBoardNavProps {
  title: string
}

const DashBoardNav = async ({ title }: DashBoardNavProps) => {

  return (
    <header className="col-span-12 flex items-center gap-2 lg:gap-4">
      <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button lg:hidden">
        <Bars3Icon className="w-5 h-5" />
      </label>
      <div className="grow">
        <h1 className="lg:text-2xl lg:font-light">{title}</h1>
      </div>
      <div className="dropdown-end dropdown z-10">
        <div tabIndex={0} className="avatar btn btn-circle btn-ghost">
          <div className="w-10 rounded-full">
            <img src="https://picsum.photos/80/80?5" />
          </div>
        </div>
        <ul tabIndex={0} className="menu dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow-2xl">
          <li><SignOut /></li>
        </ul>
      </div>
    </header>

  )
}

export default DashBoardNav 
