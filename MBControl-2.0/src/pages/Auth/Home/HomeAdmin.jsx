import React from 'react'
import { Operations } from '../../../components/Atoms/Operations/operations/Operations'
import { LinkCarousel } from '../../../components/Atoms/Carousel/Carousel'
import client from '../../../assets/images/user.png'
import operation from '../../../assets/images/cross.png'
import promoter from '../../../assets/images/astronaut.png'
import './home.CSS'

export const HomeAdmin = ({setSessionName}) => {
  return (
    <div className='home'>
      <div className='homeContainer'>
        <Operations
          label={'Operaciones'}
          first={client}
          firstText={'Nuevo Cliente'}
          firstRoute={'/newclient'}
          second={operation}
          secondText={'Nueva Operación'}
          secondRoute={'/newoperation'}
          third={promoter}
          thirdText={'Nuevo Promotor'}
          thirdRoute={'/newpromoter'}
          setSessionName={setSessionName}
          />
        
        <LinkCarousel />
        <div className='buttonHomeContainer'>
          <button>REPORTE</button>
        </div>
      </div>

    </div>
  )
}
