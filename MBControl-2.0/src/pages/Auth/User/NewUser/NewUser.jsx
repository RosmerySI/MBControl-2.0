import React from 'react'
import { InputText } from '../../../../components/Atoms/Inputs/InputText'
import { InputSelect } from '../../../../components/Atoms/Inputs/InputSelect'
import '../../newStyle.css'

export const NewUser = () => {
  return (
    <div className='newContainer'>
      <div className='newPageContainer'>
         <InputText/>
         <InputSelect/>
      </div>
    </div>
  )
}
