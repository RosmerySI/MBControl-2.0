import React, { useEffect, useState } from 'react'
import { InputSelect } from '../../../../components/Atoms/Inputs/InputSelect'
import { SubmitButton } from '../../../../components/Atoms/Button/SubmitButton'
import { petitions } from '../../../../services/api/petitions'
import { InputEmail } from '../../../../components/Atoms/Inputs/InputEmail'
import { useForm } from '../../../../utilities/hook/useForm'
import { useLocation } from 'react-router-dom'
import '../../newStyle.css'

export const NewUser = ({setSessionName, editUserRole }) => {

  const [roles, setRoles] = useState()

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paramsEmail = searchParams.get('email')

  const { getObject } = petitions()

  useEffect(() => {
    getObject('rol', setRoles)
    paramsEmail?
    setSessionName('Editar Usuario'):
    setSessionName('Nuevo Usuario')
  }, [])
 
  const [role, setRole] = useState({
    role: paramsEmail ? editUserRole: []
    
  })

  const onRoleChange = (event) => {
    setRole(({
      ...role,
      [event.target.name]: event.target.value
    }))
  }

  const initialValue = {
    email: paramsEmail ? paramsEmail : '',
  }

  const emailForm = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const formValidations = {
    email: [(value) => value?.match(emailForm), 'contenido@contenido.com'],
  }

  const { email, emailValid, onInputChange } = useForm(initialValue, formValidations)

  return (
    <div className='newCalc'>
      <div className='newCalcContainer'>
        <div style={{ width: '70%', display: 'flex', flexDirection: 'column', marginTop: '50px' }}>
          <InputEmail
            email={email}
            emailValid={emailValid}
            onInputChange={onInputChange}
            labelText={paramsEmail?'Correo':''} />
        </div>
        <div style={{ width: '70%', display: 'flex', flexDirection: 'column', marginTop: '50px' }}>
          <InputSelect
            object={roles}
            promoter={undefined}
            g3={undefined}
            link={undefined}
            client={undefined}
            company={undefined}
            invoice={undefined}
            model={undefined}
            role={role.role}
            onInputChange={onRoleChange}
            labelText={'Roles'} />
        </div>
        <div style={{ width: '70%', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <SubmitButton
            data={{email,role}}
            firstButtonText={'Añadir'}
            secondButtonText={''}
            setAuth={''}
            route={paramsEmail ? 'user/modifyRoles' : 'user/newUserRequest'}
            rows={roles}
          />
        </div>
      </div>
    </div>
  )
}
