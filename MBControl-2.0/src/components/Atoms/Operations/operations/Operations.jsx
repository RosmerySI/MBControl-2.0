import React from 'react'
import './operations.css'
import {  SingleOperation } from '../singleOperation/SingleOperation'
import client from '../../../../assets/images/user.png'
import operation from '../../../../assets/images/cross.png'
import astronaut from '../../../../assets/images/astronaut.png'
export const Operations = () => {
  return (
    <div className='operations'>
      <div className='spamOperacionesContainer'>
        <span>Operaciones</span>
      </div> 
    <div className='operationsContainer'> 
      <SingleOperation       
      imgLink={client}
      text={'Nuevo Cliente'}      
      />
      <SingleOperation      
      imgLink={operation}                 
      text={'Nueva Operación'}   
      />
      <SingleOperation
      imgLink={astronaut}               
      text={'Nuevo Promotor'}   
      />
    </div>
    </div>
  )
}
