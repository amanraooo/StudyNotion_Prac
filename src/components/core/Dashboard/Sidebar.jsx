import React from 'react'
import { useSelector } from 'react-redux';
import { sidebarLinks } from './../../../data/dashboard-links';
import { logout } from '../../../services/operations/authAPI';

const Sidebar = () => {

    const {loading: authLoading}= useSelector((state)=> state.auth);
    const {user, loading : profileLoading}= useSelector((state)=> state.profile);

    if(profileLoading || authLoading){
        return (
            <div className='mt-10'>
                Loading...
            </div>
        )
    }
  return (
    <div>
      <div className="flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc[100vh-3.5rem]] bg-richblack-800 py-10">
    <div className='flex flex-col'>
    {
        sidebarLinks.map((link,index)=>{
            if(link.type && user?.accountType !== link.type) return null;
            return (
                <SidebarLink />
            )

        })
    }
    </div>
      </div>
    </div>
  )
}

export default Sidebar
