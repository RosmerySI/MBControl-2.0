import React from 'react'
import { HookForm } from '../../components/hooks/hookForm/hookForm'
import '../Guest/styleGuest.css'

export const Login = ({setAuth}) => {  
  return (
    <div className='guest'>
    <div className='guestContainer'>
      <h1 style={{marginBottom:'20px'}}>Hola Bienvenido de Vuelta</h1>
      <div className='loginFormContainer'>
      <HookForm 
        firstInput={'email'}
        secondInput={'password'}
        firstButtonText={'Iniciar Sesión'}
        secondButtonText={''}
        bodyForm={''}
        route={'/homelink'}
        setAuth={setAuth}
        sessionName={''}
        
      />
      </div>
    </div>
    </div>
  )
}
