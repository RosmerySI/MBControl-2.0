import * as React from 'react';
import './singleOperation.css'

export const SingleOperation = ({text, imgLink}) => {
  
  return (
    <div className='singleOperationContainer'>      
      <div className={text!=='Nuevo Cliente'?'imageContainer':'imageContainerClient'}>
        <img 
          className={text!=='Nuevo Cliente'?'image':'imageClient'} 
          src={imgLink} alt=""
          style={{}}
        />
      </div>
      <div className='spamContainer'>
        <span>{text}</span> 
      </div>      
    </div>
  )
}