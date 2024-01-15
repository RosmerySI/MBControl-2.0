import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HeadBar } from '../../components/Molecules/HeadBar/HeadBar'
import { SideBar } from '../../components/Molecules/SideBar/SideBar'
import { HomeAdmin } from '../../pages/Auth/Home/HomeAdmin/HomeAdmin'
import { NewClient } from '../../pages/Auth/Client/NewClient/NewClient'
import { NewOperation } from '../../pages/Auth/Operation/newOperation/NewOperation'
import { NewPromoter } from '../../pages/Auth/Promoter/newPromoter/NewPromoter'
import './auth.css'

export const Auth = () => {
  return (
    <>    
    <HeadBar/>
    <div className='sideBarBodyContainer'>
    <SideBar/>   
    <Routes>
        <Route path="/homeadmin" element={<HomeAdmin/>} />
        <Route path="/newclient" element={<NewClient/>} />
        <Route path="/newoperation" element={<NewOperation/>} />
        <Route path="/newpromoter" element={<NewPromoter/>} />
        <Route path="/*" element={<Navigate to="/homeadmin" />} />
    </Routes>
    </div>
    </>
  )
}
