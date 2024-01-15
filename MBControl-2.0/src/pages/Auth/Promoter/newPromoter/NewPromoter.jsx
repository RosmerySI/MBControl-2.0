import React from 'react'
import { HookForm } from '../../../../components/hooks/hookForm/hookForm'
import './newPromoter.css'
export const NewPromoter = () => {
  return (
    <div className='newPromoter'>
      <div className='newPromoterContainer'>
      <HookForm firstInput={'text'}  firstButtonText={'Añadir'} route={'/homeadmin'}/>
      </div>
    </div>
  )
}
