import React, { useEffect } from 'react'
import logoutIcon from '../../../assets/images/logout.png'
import './headBar.css'

export const HeadBar = ({setAuth,user,sessionName}) => {
  const onLogout = () => {
    localStorage.clear();
    setAuth(false)
  }

  
  return (
    <div className='headBarFather'>
      <h2>MB Control</h2>      
      <div className='headBarContainer'>
        <div className='sessionNameContainer'>
          <h1>{sessionName}</h1>
        </div>
        <div className='authUserFather'>
          <div className='authUser'>
            <p>{user.name}-</p>
            <p>{user.role}</p>
            <div className='logoutContainer'>
              <img src={logoutIcon} onClick={onLogout} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
