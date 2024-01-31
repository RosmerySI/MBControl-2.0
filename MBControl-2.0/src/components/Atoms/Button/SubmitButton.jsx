import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSubmit } from '../../../utilities/hook/useSubmit'
import '../../styleForm.css'

export const SubmitButton = ({data,firstButtonText,secondButtonText,setAuth,route,rows}) => {

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault() 
      
    useSubmit(route,setAuth,data,navigate,rows)
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
    </div>
  )
}
