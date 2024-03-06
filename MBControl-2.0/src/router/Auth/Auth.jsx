import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HeadBar } from '../../components/Molecules/HeadBar/HeadBar';
import { SideBar } from '../../components/Molecules/SideBar/SideBar';
import { HomeAdmin } from '../../pages/Auth/Home/HomeAdmin';
import { NewClient } from '../../pages/Auth/Client/NewClient/NewClient';
import { NewOperation } from '../../pages/Auth/Operation/NewOperation/NewOperation';
import { Clients } from '../../pages/Auth/Client/Clients/Clients';
import { Operations } from '../../pages/Auth/Operation/Operations/Operations';
import { Promoters } from '../../pages/Auth/Promoter/Promoters/Promoters';
import { NewUser } from '../../pages/Auth/User/NewUser/NewUser';
import { Users } from '../../pages/Auth/User/Users/Users';
import { NewCompany } from '../../pages/Auth/Company/NewCompany/NewCompany';
import { Companies } from '../../pages/Auth/Company/Companies/Companies';
import { Invoices } from '../../pages/Auth/Invoice/Invoices/Invoices';
import { NewInvoice } from '../../pages/Auth/Invoice/NewInvoice/NewInvoice';
import { HomeLink } from '../../pages/Auth/Home/HomeLink';
import { CalcComision } from '../../pages/Auth/Calculator/CalcComision/CalcComision';
import { CalcReturn } from '../../pages/Auth/Calculator/CalcReturn/CalcReturn';
import { NewPromoter } from '../../pages/Auth/Promoter/NewPromoter/NewPromoter';
import { IncomeProviders } from '../../pages/Auth/IncomeProviders/IncomeProviders';
import { OutcomeProviders } from '../../pages/Auth/OutcomeProvider/OutcomeProviders';
import { NewIncomeProvider } from '../../pages/Auth/IncomeProviders/NewIncomeProvider';
import { NewOutComeProvider } from '../../pages/Auth/OutcomeProvider/NewOutComeProvider';
import { userInfo } from '../../utilities/userInfo/userInfo';
import { PieOperation } from '../../pages/Auth/Graphics/PieOperation';
import { SubOperations } from '../../pages/Auth/Operation/SubOperations/SubOperations';
import './auth.css'

export const Auth = ({ setAuth }) => {

  const [user, setUser] = useState({})

  const [editUserRole, setEditUserRole] = useState([])
  const [editCompany, setEditCompany] = useState()

  const { useremail, userrole, username } = userInfo()

  let localStorageSesssionName = localStorage.getItem('sessionName');

  const initialSessionName = localStorageSesssionName ? localStorageSesssionName
    : userrole.includes('Admin') ? 'Catálogo' : '¿Qué quieres hacer?';

  const [sessionName, setSessionName] = useState(initialSessionName);

  useEffect(() => {
    localStorage.setItem('sessionName', sessionName);
  }, [sessionName]);

  useEffect(() => {
    const userToken = {
      name: username,
      email: useremail,
      role: userrole
    }
    setUser(userToken)
  }, [])
  
  return (
    <>
      <HeadBar setAuth={setAuth} user={user} sessionName={sessionName} />
      <div className='sideBarBodyContainer' >
        <SideBar roles={userrole} sessionName={sessionName} setSessionName={setSessionName} />
        {
          userrole?.includes('Admin') ?
            <Routes>
              <Route path="/homeadmin" element={<HomeAdmin setSessionName={setSessionName} />} />
              <Route path="/newclient/:clientId" element={<NewClient />} />
              <Route path="/newclient" element={<NewClient setSessionName={setSessionName} />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/newoperation" element={<NewOperation setSessionName={setSessionName} />} />                        
              <Route path="/operations" element={<Operations />} />
              <Route path="/suboperations" element={<SubOperations setSessionName={setSessionName} />} />
              <Route path="/pieOperation" element={<PieOperation setSessionName={setSessionName}/>} />
              <Route path="/newpromoter" element={<NewPromoter setSessionName={setSessionName} sessionName={sessionName} />} />
              <Route path="/promoters" element={<Promoters />} />
              <Route path="/newuser" element={<NewUser setSessionName={setSessionName} editUserRole={editUserRole} />} />
              <Route path="/users" element={<Users setEditUserRole={setEditUserRole} />} />
              <Route path="/newcompany" element={<NewCompany setSessionName={setSessionName} editCompany={editCompany}/>} />
              <Route path="/companies" element={<Companies setEditCompany={setEditCompany} />} />
              <Route path="/newinvoice" element={<NewInvoice setSessionName={setSessionName} />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/incomeproviders" element={<IncomeProviders />} />
              <Route path="/newincomeprovider" element={<NewIncomeProvider setSessionName={setSessionName} />} />
              <Route path="/outcomeproviders" element={<OutcomeProviders />} />
              <Route path="/newoutcomeprovider" element={<NewOutComeProvider setSessionName={setSessionName} />} />
              <Route path="/calccomision" element={<CalcComision />} />
              <Route path="/calcreturn" element={<CalcReturn />} />
              <Route path="/*" element={<Navigate to="/homeadmin" />} />
            </Routes>

            :
            <Routes>
              <Route path="/homelink" element={<HomeLink user={user} setSessionName={setSessionName} />} />
              <Route path="/newclient" element={<NewClient />} />
              <Route path="/calccomision" element={<CalcComision />} />
              <Route path="/calcreturn" element={<CalcReturn />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/newoperation" element={<NewOperation />} />
              <Route path="/operations" element={<Operations />} />
              <Route path="/suboperations" element={<SubOperations/>} />
              <Route path="/pieOperation" element={<PieOperation setSessionName={setSessionName}/>} />
              <Route path="/newpromoter" element={<NewPromoter sessionName={sessionName} />} />
              <Route path="/promoters" element={<Promoters />} />
              <Route path="/newinvoice" element={<NewInvoice />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/incomeproviders" element={<IncomeProviders />} />
              <Route path="/newincomeprovider" element={<NewIncomeProvider />} />
              <Route path="/outcomeproviders" element={<OutcomeProviders />} />
              <Route path="/newoutcomeprovider" element={<NewOutComeProvider />} />
              <Route path="/*" element={<Navigate to="/homelink" />} />
            </Routes>

        }
      </div>
    </>
  )
}
