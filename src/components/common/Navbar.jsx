import React from 'react'
import { Link } from 'react-router-dom';
import logo from "../../assets/Logo/Logo-Full-Light.png"


const Navbar = () => {
  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

        <Link to='/'>
        <img src={logo} alt="studynotionLogo"
        width={160}
        height={42}
        loading='lazy' />
        </Link>

      </div>
    </div>
  )
}

export default Navbar
