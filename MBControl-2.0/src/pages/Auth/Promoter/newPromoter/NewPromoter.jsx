import React from 'react'
import { HookForm } from '../../../../components/hooks/hookForm/hookForm'
import './newPromoter.css'
export const NewPromoter = ({sessionName}) => {
  return (
    <div className='newPromoter'>
      <div className='newPromoterContainer'>
      <HookForm firstInput={'text'} secondInput={''} firstButtonText={'Añadir'} secondButtonText={'Añadir otro'} bodyForm={'promoter'} route={'/promoters'} setAuth={''} sessionName={sessionName}/>
      </div>
    </div>
  )
}
