import React, { useEffect, useState } from 'react'
import { InputSelect } from '../../../../components/Atoms/Inputs/InputSelect'
import { SubmitButton } from '../../../../components/Atoms/Button/SubmitButton'
import '../../newStyle.css'
import { petitions } from '../../../../services/api/petitions'
import { InputEmail } from '../../../../components/Atoms/Inputs/InputEmail'
import { useForm } from '../../../../utilities/hook/useForm'
const initialValue = {
  email: '',
  role: []
}
export const NewUser = () => {

  const [roles, setRoles] = useState()
  
  
  const{getObject}=petitions()
  
  const emailForm = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  const formValidations = {
    email: [(value) => value?.match(emailForm), 'contenido@contenido.com'],
  }

  const{email,emailValid,role,onInputChange}=useForm(initialValue,formValidations)
 
  useEffect(() => {
    getObject('rol',setRoles)
  }, [])

  return (
    <div className='newCalc'>
      <div className='newCalcContainer'>
        <div style={{width:'70%',display:'flex',flexDirection:'column',marginTop:'50px'}}>
          <label htmlFor="">Correo:</label>
         <InputEmail
           email={email} 
           emailValid={emailValid} 
           onInputChange={onInputChange} />
        </div>
        <div style={{width:'70%',display:'flex',flexDirection:'column',marginTop:'50px'}}>
         {/* <label htmlFor="">Rol:</label> */}
         <InputSelect 
         object={roles}
         promoter={undefined}
         g3={undefined}
         link={undefined}
         client={undefined}
         company={undefined}
         invoice={undefined}
         model={undefined}
         role={role}
         onInputChange={onInputChange}
         labelText={'Roles'}/>
         </div>
         <div style={{width:'70%',display:'flex',justifyContent:'center',marginTop:'50px'}}>
         <SubmitButton
         data={{email,role}}
         firstButtonText={'Añadir'}
         secondButtonText={''}
         setAuth={''}
         route={'user/newUserRequest'}
         rows={''}
         />
         </div>
      </div>
    </div>
  )
}
