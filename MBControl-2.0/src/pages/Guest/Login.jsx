import React from 'react'
import '../Guest/styleGuest.css'
import { HookForm } from '../../components/hooks/hookForm/hookForm'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate=useNavigate()
  return (
    <div className='guest'>
    <div className='guestContainer'>
      <h1>Hola Bienvenido de Vuelta</h1>
      <HookForm 
        firstInput={'email'}
        secondInput={'password'}
        buttonText={'Iniciar Sesión'}
        route={'/homeadmin'}
        navigate={navigate}
      />
    </div>
    </div>
  )
}
