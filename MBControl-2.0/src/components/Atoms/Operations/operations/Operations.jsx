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
      img={client}
      text={'Nuevo Cliente'} 
      route={'/newclient'}   
      />
      <SingleOperation      
      img={operation}                 
      text={'Nueva Operación'}
      route={'/newoperation'}   
      />
      <SingleOperation
      img={astronaut}               
      text={'Nuevo Promotor'}
      route={'/newpromoter'}   
      />
    </div>
    </div>
  )
}
