import React from 'react'
import { Operations } from '../../../components/Atoms/Operations/operations/Operations'
import client from '../../../assets/images/user.png'
import operation from '../../../assets/images/cross.png'
import promoter from '../../../assets/images/astronaut.png'
import calccomision from '../../../assets/images/calculadora.png'
import calcreturn from '../../../assets/images/carrito.png'
import directory from '../../../assets/images/directorio.png'
import './home.css'

export const HomeLink = ({ user,setSessionName }) => {
  
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
        {
          user.role!=='Admin' &&
          <Operations
            label={''}
            first={calccomision}
            firstText={'Calculadora de Comisión'}
            firstRoute={'/calccomision'}
            second={calcreturn}
            secondText={'Calculadora de Retorno'}
            secondRoute={'/calcreturn'}
            third={directory}
            thirdText={'Directorio'}
            thirdRoute={'/clients'}
            setSessionName={setSessionName}
          />
        }
      </div>
    </div>
  )
}
