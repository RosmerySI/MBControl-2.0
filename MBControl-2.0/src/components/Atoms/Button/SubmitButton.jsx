import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSubmit } from '../../../utilities/hook/useSubmit'
import { ModalCalculator } from '../Modal/ModalCalculator'
import '../../styleForm.css'

export const SubmitButton = ({data,firstButtonText,secondButtonText,setAuth,route,rows}) => {

  const [dataCalculated, setDataCalculated] = useState()
  
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(data)
    route==='operation/calculator'&&setOpen(true);
    useSubmit(route,setAuth,data,navigate,rows,setDataCalculated)    
  }
  return (
    <div className='buttonContainer'>
    {
    secondButtonText&&
    <button 
    className='secondButton' 
    onClick={handleSubmit} type='submit'>{secondButtonText}</button>
    }
    <button className='button' onClick={handleSubmit} type='submit'>{firstButtonText}</button>
    <ModalCalculator 
      open={open}
      handleClose={handleClose}
      data={dataCalculated}
    />    
    </div>
  )
}
