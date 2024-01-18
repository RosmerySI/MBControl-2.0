import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HeadBar } from '../../components/Molecules/HeadBar/HeadBar'
import { SideBar } from '../../components/Molecules/SideBar/SideBar'
import { HomeAdmin } from '../../pages/Auth/Home/HomeAdmin'
import { NewClient } from '../../pages/Auth/Client/NewClient/NewClient'
import { NewOperation } from '../../pages/Auth/Operation/newOperation/NewOperation'

import { Clients } from '../../pages/Auth/Client/Clients/Clients'
import { Operations } from '../../pages/Auth/Operation/Operations/Operations'
import { Promoters } from '../../pages/Auth/Promoter/Promoters/Promoters'
import { NewUser } from '../../pages/Auth/User/NewUser/NewUser'
import { Users } from '../../pages/Auth/User/Users/Users'
import { NewCompany } from '../../pages/Auth/Company/NewCompany/NewCompany'
import { Companies } from '../../pages/Auth/Company/Companies/Companies'
import { Invoices } from '../../pages/Auth/Invoice/Invoices/Invoices'
import { NewInvoice } from '../../pages/Auth/Invoice/NewInvoice/NewInvoice'
import { HomeLink } from '../../pages/Auth/Home/HomeLink'
import { CalcComision } from '../../pages/Auth/Calculator/CalcComision/CalcComision'
import { CalcReturn } from '../../pages/Auth/Calculator/CalcReturn/CalcReturn'
import { jwtDecode } from "jwt-decode"
import './auth.css'
import { NewPromoter } from '../../pages/Auth/Promoter/NewPromoter/NewPromoter'
import { IncomeProviders } from '../../pages/Auth/IncomeProviders/IncomeProviders'
import { OutcomeProviders } from '../../pages/Auth/OutcomeProvider/OutcomeProviders'


export const Auth = ({setAuth}) => {
  let token = ''
  let roles = []
  token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    roles = decoded.Roles
  }
  const [user, setUser] = useState({})
  const [sessionName, setSessionName] = useState()
  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);

    const userToken = {
      name: decoded.name,
      email: decoded.email,
      role: decoded.Roles
    }
    setUser(userToken)
    userToken.role.includes('Admin') ? setSessionName('Administrador') : setSessionName('¿Qué quieres hacer?')

  }, [])
  const [models, setModels] = useState()
  return (
    <>
      <HeadBar setAuth={setAuth} user={user} sessionName={sessionName}/>
      <div className='sideBarBodyContainer' >
        <SideBar roles={roles} sessionName={sessionName} setSessionName={setSessionName}/>
        {
          roles.includes('Admin')
            ?
            
              <Routes>
                <Route path="/homeadmin" element={<HomeAdmin setSessionName={setSessionName} />} />
                <Route path="/newclient" element={<NewClient models={models} setModels={setModels} />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/newoperation" element={<NewOperation />} />
                <Route path="/operations" element={<Operations />} />
                <Route path="/newpromoter" element={<NewPromoter sessionName={sessionName} />} />
                <Route path="/promoters" element={<Promoters  />} />
                <Route path="/newuser" element={<NewUser />} />
                <Route path="/users" element={<Users />} />
                <Route path="/newcompany" element={<NewCompany />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/newinvoice" element={<NewInvoice />} />
                <Route path="/invoices" element={<Invoices />} />              
                <Route path="/incomeproviders" element={<IncomeProviders />} />              
                <Route path="/outcomeproviders" element={<OutcomeProviders />} />              
                <Route path="/*" element={<Navigate to="/homeadmin" />} />
              </Routes>
            
            :
            <Routes>
            <Route path="/homelink" element={<HomeLink  user={user} setSessionName={setSessionName}/>} />
            <Route path="/newclient" element={<NewClient models={models} setModels={setModels} />} />
            <Route path="/calccomision" element={<CalcComision models={models} setModels={setModels} />} />
            <Route path="/calcreturn" element={<CalcReturn models={models} setModels={setModels} />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/newoperation" element={<NewOperation />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/newpromoter" element={<NewPromoter sessionName={sessionName} />} />
            <Route path="/promoters" element={<Promoters />} />            
            <Route path="/newinvoice" element={<NewInvoice />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/incomeproviders" element={<IncomeProviders />} />              
            <Route path="/outcomeproviders" element={<OutcomeProviders />} /> 
            <Route path="/*" element={<Navigate to="/homelink" />} />
            </Routes>

          }
    </div>
    </>
  )
}
