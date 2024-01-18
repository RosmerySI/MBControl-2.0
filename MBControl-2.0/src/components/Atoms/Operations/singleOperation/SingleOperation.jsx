import * as React from 'react';
import './singleOperation.css'
import { useNavigate } from 'react-router-dom';

export const SingleOperation = ({text, img,route,setSessionName}) => {
  const navigate = useNavigate()
  const onNavigate = () =>{
    setSessionName(text)  
    navigate(route)
  }
  return (
    <div className='singleOperationContainer'>      
      <div className={text!=='Nuevo Cliente'?'imageContainer':'imageContainerClient'}>
        <img 
          className={text!=='Nuevo Cliente'?'image':'imageClient'} 
          src={img} alt=""
          onClick={onNavigate}          
        />
      </div>
      <div className='spamContainer'>
        <span>{text}</span> 
      </div>      
    </div>
  )
}