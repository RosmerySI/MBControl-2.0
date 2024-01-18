import React, { useEffect } from 'react'
import { HookForm } from '../../../../components/hooks/hookForm/hookForm'
import { getModels } from '../../../../services/modelsService/modelService'
import './newClient.css'

export const NewClient = (models, setModels) => {
  
  useEffect(() => {
    getModels(setModels)
  }, [])
  
  return (
    <div className='newClient'>
      <div className='newClientContainer'>
      <HookForm 
        firstInput={'text'} 
        secondInput={'text'} 
        firstButtonText={'Añadir'}
        secondButtonText={'Añadir otro'} 
        bodyForm={'client'} 
        route={'/clients'}/>
      </div>
    </div>
  )
}
