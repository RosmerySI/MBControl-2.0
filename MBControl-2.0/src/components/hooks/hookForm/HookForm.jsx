
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ModelsTable } from '../../Atoms/DataTable/ModelsTable/ModelsTable'
import './hookForm.css'


export const HookForm = ({firstInput,secondInput,buttonText, bodyForm,route}) => {
    const navigate=useNavigate()
    const onSubmit = (e) =>{
        e.preventDefault()          
        navigate(route)
    } 
  return (
    <form onSubmit={onSubmit} className='formStyle'>
        <div className='inputContainer'>
        <label htmlFor={firstInput}>{firstInput==='email'?'Correo:':''}</label>
        <input type={firstInput} id={firstInput} placeholder={firstInput==='email'&&'correo@correo.com'}/>
        </div>        
        {bodyForm!=='promoter'&& secondInput!==undefined&&
            <div className='inputContainer'>
            <label htmlFor={secondInput}>{secondInput==='password'?'Contraseña:':''}</label>
            <input type={secondInput} id={secondInput} placeholder='********' />
            {/* <img src="../../../assets/images/hide.png" alt="lock"/> */}
            </div>
        }        
        {bodyForm==='promoter'?
            <div>
                < ModelsTable/>
                <input type='select'></input>
                <input type='select'></input>                    
                <input type='number'></input>
                <input type='email'></input>
                {/* checkbox */}
                <button>{buttonText}</button>
            </div>
        :bodyForm==='client'&&
            <div>
                {/* checkbox */}
                < ModelsTable/>
                <input type='select'></input>
                <button>{buttonText}</button>
            </div>
        }
        {
            firstInput==='email'&& secondInput!==undefined&&
            <a href='./forgot'>¿Olvidaste tu contraseña?</a>
        }
        <button type='submit'>{buttonText}</button>
    
    
    </form>
  )
}
