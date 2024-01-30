import React from 'react'
import '../Guest/styleGuest.css'
import { InputEmail } from '../../components/Atoms/Inputs/InputEmail'
import { InputPassword } from '../../components/Atoms/Inputs/InputPassword'
import { useForm } from '../../utilities/hook/useForm'
import { SubmitButton } from '../../components/Atoms/Button/SubmitButton'
const initialValue = {
  email: '',
  password: '', 
}
export const Login = ({ setAuth }) => {
  const emailForm = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordForm = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040.,*!?¿¡/#$%&)])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
  const formValidations = {
    email: [(value) => value?.match(emailForm), 'El correo debe contener @ y terminar en .com'],
    password: [(value) => value?.match(passwordForm), 'Mayusula-minuscula-caracter especial-minimo 8 caracteres'],
  }

  const { email, password, emailValid, passwordValid, onInputChange } = useForm(initialValue, formValidations)
  return (
    <div className='guest'>
      <div className='guestContainer'>
        <h1>Hola Bienvenido de Vuelta</h1>
        <div className='loginFormContainer'>
          <InputEmail email={email} emailValid={emailValid} onInputChange={onInputChange} labelText={'Correo:'}/>
          <InputPassword password={password} passwordValid={passwordValid} onInputChange={onInputChange} />
          <a href='./forgot'>¿Olvidaste tu contraseña?</a>
          <SubmitButton data={{email,password}} firstButtonText={'Iniciar Sesión'} setAuth={setAuth} route={'user/login'}/>         
        </div>
      </div>
    </div>
  )
}
