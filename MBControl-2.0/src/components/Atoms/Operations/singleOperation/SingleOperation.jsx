import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalOperation } from '../../Modal/ModalOperation';
import './singleOperation.css'


export const SingleOperation = ({text, img,route,setSessionName}) => {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleNewOperation= (e) => {
    e.preventDefault();
    navigate('/newoperation')
    
  }
  
  const handleInvoice = (e) => {
    e.preventDefault();
    navigate('/newinvoice')
   
  }
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
          onClick={text==='Nueva Operación'?handleOpen:onNavigate}                 
        />          
        <ModalOperation 
        open={open} 
        handleClose={handleClose} 
        handleNewOperation={handleNewOperation} 
        handleInvoice={handleInvoice}/>        
        </div>
      <div className='spamContainer'>
        <span>{text}</span> 
      </div>      
    </div>
  )
}