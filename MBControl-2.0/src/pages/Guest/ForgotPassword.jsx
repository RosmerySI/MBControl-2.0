import React from 'react'
import { InputEmail } from '../../components/Atoms/Inputs/InputEmail'
import { SubmitButton } from '../../components/Atoms/Button/SubmitButton'
import { useForm } from '../../utilities/hook/useForm'
import '../Guest/styleGuest.css'

const initialValue = {
  email: '',
}
export const ForgotPassword = () => {
  const emailForm = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  const formValidations = {
    email: [(value) => value?.match(emailForm), 'contener @ y terminar en .com']
  }
  const {email,emailValid, onInputChange } = useForm(initialValue, formValidations)
  return (
    <div className='guest'>
    <div className='guestContainer'>
    <div className='loginFormContainer'>
      <h1>Recupera tu contraseña</h1>
      <p>Teclee el email asociado a su cuenta, se enviará un link para establecer su nueva contraseña.</p>
      <div className='inputContainer'>
      <InputEmail email={email} emailValid={emailValid} onInputChange={onInputChange}/>
      </div>
      <SubmitButton data={{ email}} firstButtonText={'Enviar'} secondButtonText={'Regresar'} setAuth={''} route={'login'} rows={''}/>
    </div>
    </div>
    </div>
  )
}
