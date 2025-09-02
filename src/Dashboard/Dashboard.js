import React from 'react'

import { Link, Outlet, useLocation } from 'react-router-dom'
const Dashboard = () => {
    const location = useLocation();
  return (
    <div className='dashboard-container'>
        <div className='side-nav'>
            <div className='profile-container'>
                <img src={localStorage.getItem('logoUrl')} alt="profile-image"/>
                <h2>{localStorage.getItem('channelName')}</h2>
            </div>
            <div className='menu-container'>
            <Link to="/dashboard/home" className={location.pathname==="/dashboard/home"?'active-menu-link':'menu-link'}><i className="fa-solid fa-house-user"></i>Home</Link>
            <Link to="/dashboard/my-videos" className= {location.pathname==="/dashboard/my-videos"?'active-menu-link':'menu-link'}><i className="fa-solid fa-video"></i>My Videos</Link>
            <Link to="/dashboard/upload" className= {location.pathname==="/dashboard/upload"?'active-menu-link':'menu-link'}><i className="fa-solid fa-upload"></i>Upload Video</Link>
            <Link  className= {location.pathname==="/dashboard/logout"?'active-menu-link':'menu-link'}><i className="fa-solid fa-arrow-right-from-bracket"></i>Logout</Link>
        </div>
        </div>
        
        <div className='content-container'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Dashboard