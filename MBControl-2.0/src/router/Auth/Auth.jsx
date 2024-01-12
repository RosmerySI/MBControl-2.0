import React from 'react'
import { HomeAdmin } from '../../pages/Auth/Home/HomeAdmin/HomeAdmin'
import { HeadBar } from '../../components/Molecules/HeadBar/HeadBar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SideBar } from '../../components/Molecules/SideBar/SideBar'
import './auth.css'

export const Auth = () => {
  return (
    <>    
    <HeadBar/>
    <div className='sideBarBodyContainer'>
    <SideBar/>   
    <Routes>
        <Route path="/homeadmin" element={<HomeAdmin/>} />
        <Route path="/*" element={<Navigate to="/homeadmin" />} />
    </Routes>
    </div>
    </>
  )
}
