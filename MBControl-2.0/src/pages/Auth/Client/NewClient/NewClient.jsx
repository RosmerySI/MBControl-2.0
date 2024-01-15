import React from 'react'
import { HookForm } from '../../../../components/hooks/hookForm/hookForm'
import './newClient.css'
export const NewClient = () => {
  return (
    <div className='newClient'>
      <div className='newClientContainer'>
      <HookForm firstInput={'text'} secondInput={'text'} firstButtonText={'Guardar'} route={'/homeadmin'}/>
      </div>
    </div>
  )
}
