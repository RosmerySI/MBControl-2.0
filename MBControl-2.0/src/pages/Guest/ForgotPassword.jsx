import React from 'react'
import { HookForm } from '../../components/hooks/hookForm/hookForm'
import '../Guest/styleGuest.css'

export const ForgotPassword = () => {
  return (
    <div className='guest'>
    <div className='guestContainer'>
      <h1>Recupera tu contraseña</h1>
      <p>Ingrese el email asociado a su cuenta, se enviará un link para establecer su nueva contraseña.</p>
      <HookForm firstInput={'email'} firstButtonText={'Enviar'}/>
    </div>
    </div>
  )
}
