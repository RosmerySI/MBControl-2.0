import React from 'react'
import { InputText } from '../../../../components/Atoms/Inputs/InputText'
import { SubmitButton } from '../../../../components/Atoms/Button/SubmitButton'
import { useForm } from '../../../../utilities/hook/useForm'
import '../../newStyle.css'

const initialValue = {
  name: '',

}

export const NewCompany = () => {
  const formValidations = {
    name: [(value) => value?.length >= 2, 'El nombre de 2 o más caracteres es obligatorio'],
  }
  const { name, nameValid, onInputChange } = useForm(initialValue, formValidations)
  return (
    <div className='newContainer'>
      <div className='newPageContainer'>
        <div style={{width:'60%',height:'80%'}}>
        <div style={{width:'60%'}}>
        <InputText
          onInputChange={onInputChange}
          placeholder={'Nombre de la Empresa'}
          name={name}
          nameValid={nameValid}

        />
        </div>
        <div style={{width:'50%', display:'flex', justifyContent:'center'}}>
        <SubmitButton
          data={{ name}}
          firstButtonText={'Guardar'}
          secondButtonText={''}
          setAuth={''}
          route={'company'}
          rows={''} />
        </div>
        </div>
      </div>
    </div>
  )
}
