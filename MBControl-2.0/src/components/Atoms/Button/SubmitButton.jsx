import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSubmit } from '../../../utilities/hook/useSubmit'
import '../../styleForm.css'

export const SubmitButton = ({data,firstButtonText,secondButtonText,setAuth,route,rows}) => {

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault() 
    console.log(route,setAuth,data,navigate,rows)      
    //useSubmit(route,setAuth,data,navigate,rows)
  }
  return (
    <div className='buttonContainer'>
    {
    secondButtonText&&
    <button style={{backgroundColor:'white',borderStyle:'solid', borderWidth:'0.2px', fontSize:'16px'}} 
    onClick={handleSubmit} type='submit'>{secondButtonText}</button>
    }
    <button onClick={handleSubmit} type='submit'>{firstButtonText}</button>
    </div>
  )
}
