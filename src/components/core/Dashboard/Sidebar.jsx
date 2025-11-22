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
      <div>
        
      </div>
    </div>
  )
}

export default Sidebar
