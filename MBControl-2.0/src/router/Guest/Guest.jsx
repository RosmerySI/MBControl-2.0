import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../../pages/Guest/Login'
import { ForgotPassword } from '../../pages/Guest/ForgotPassword'

export const Guest = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/forgot" element={<ForgotPassword/>} />        
        <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
