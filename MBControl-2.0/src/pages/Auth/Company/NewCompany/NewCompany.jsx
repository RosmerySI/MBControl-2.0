import React from 'react'
import { InputText } from '../../../../components/Atoms/Inputs/InputText'
import { SubmitButton } from '../../../../components/Atoms/Button/SubmitButton'
import '../../newStyle.css'


export const NewCompany = () => {
  return (
    <div className='newContainer'>
    <div className='newPageContainer'>
    <InputText/> 
    <SubmitButton/>  
    </div>
  </div>
  )
}
