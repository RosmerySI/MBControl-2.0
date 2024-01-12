import React from 'react'
import './headBar.css'
import logout from '../../../assets/images/logout.png'
export const HeadBar = () => {
  return (
    <div className='headBarFather'>
      <h2>MB Control</h2>
      <hr />
    <div className='headBarContainer'>
        <div style={{width:'85%', display:'flex', alignItems:'center',justifyContent:'center'}}>       
        <h1>Adminstrador</h1>
        </div> 
        <div className='authUserFather'>
        <div className='authUser'>
          <p>User -</p>
          <p>Role</p>
          <div className='logoutContainer'>
          <img src={logout} alt="" />
          </div>
        </div>
        </div>
    </div>
    </div>
  )
}
