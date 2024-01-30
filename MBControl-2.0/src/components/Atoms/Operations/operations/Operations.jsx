import React from 'react'
import {  SingleOperation } from '../singleOperation/SingleOperation'
import './operations.css'


export const Operations=({label,first,firstText,firstRoute,second,secondText,secondRoute,third, thirdText, thirdRoute, 
  setSessionName 
  }) => {
  return (
    <div className='operations'>
      <div className='spamOperacionesContainer'>
        <span>{label}</span>
      </div> 
    <div className='operationsContainer'> 
      <SingleOperation       
      img={first}
      text={firstText} 
      route={firstRoute}
      setSessionName={setSessionName}   
      />
      <SingleOperation      
      img={second}                 
      text={secondText}
      route={secondRoute}
      setSessionName={setSessionName}   
      />
      <SingleOperation
      img={third}               
      text={thirdText}
      route={thirdRoute} 
      setSessionName={setSessionName}  
      />
    </div>
    </div>
  )
}
