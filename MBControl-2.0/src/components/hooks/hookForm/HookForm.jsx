
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import { useForm } from '../../../utilities/hook/useForm'
import { ModelsTable } from '../../Atoms/Tables/ModelsTable'
import { petitions } from '../../../services/api/petitions'
import './hookForm.css'

const formData = {
    email: '',
    password: ''
}

export const HookForm = ({ firstInput, secondInput, firstButtonText, secondButtonText, bodyForm, route, setAuth,sessionName }) => {

    const { email, password, onInputChange } = useForm(formData)
    const{postObject} = petitions()

    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);

    const handleChangeEmail = () => {
        setChecked1(!checked1);
    };
    const handleChangeWhatsapp = () => {
        setChecked2(!checked2);
    };
    const navigate = useNavigate()
    const onSubmit = (e) => {
        e.preventDefault()
        let userData = {
            email: email,
            password: password
        }
        
        postObject("/user/login",userData,setAuth)
        
    }
    return (
        <form onSubmit={onSubmit} className='formStyle'>
            <div className='inputContainer'>
                <label htmlFor={firstInput}>{firstInput === 'email' ? 'Correo:' : ''}</label>
                <input
                    name='email'
                    value={email}
                    onChange={onInputChange}
                    type={firstInput}
                    id={firstInput}
                    placeholder={firstInput === 'email' ? 'correo@correo.com' : 'Nombre'}

                />
            </div>
            {bodyForm !== 'promoter' && secondInput !== '' &&
                <div className='inputContainer'>
                    <label htmlFor={secondInput}>{secondInput === 'password' ? 'Contraseña:' : ''}</label>
                    <input
                        name='password'
                        value={password}
                        onChange={onInputChange}
                        type={secondInput}
                        id={secondInput}
                        placeholder={secondInput === 'password' ? '********' : 'RFC'} />
                    {/* <img src="../../../assets/images/hide.png" alt="lock"/> */}
                </div>
            }
            {bodyForm === 'promoter' ?
                <div className='tableInputClientContainer'>
                    < ModelsTable />
                    <TextField
                        select
                        sx={{ width: '50%', marginTop: '10px' }}
                    >
                    </TextField>
                    <TextField
                        select
                        sx={{ width: '50%', marginTop: '10px' }}
                    >
                    </TextField>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                        <input type='number' placeholder='teléfono'></input>
                        <input type='email' placeholder='email'></input>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px', }}>
                        <div style={{fontFamily:'sans-serif',color:'gray', fontSize:'20px'}}>
                            <span>Método de contacto:</span>
                        </div>
                        <div style={{width:'70%',height:'20px', display: 'flex', flexDirection: 'row',justifyContent:'space-around'}}>
                            <div style={{display:'flex', flexDirection:'row'}}>
                            <input type="checkbox" value={false || checked1} onChange={handleChangeEmail} style={{width:'20px', height:'20px',margin:'0'}}/>
                            <span style={{fontFamily:'sans-serif',color:'gray', fontSize:'18px'}}>Email</span>
                            </div>
                            <div style={{display:'flex', flexDirection:'row'}}>
                            <input type="checkbox" value={false || checked2} onChange={handleChangeWhatsapp} style={{width:'20px', height:'20px',margin:'0'}}/>
                            <span style={{fontFamily:'sans-serif',color:'gray', fontSize:'18px'}}>WhatsApp</span>
                            </div>
                        </div>                        
                    </div>
                </div>
                : bodyForm === 'client' &&
                <div className='tableInputClientContainer'>
                    {/* checkbox */}
                    < ModelsTable />
                    <div className='selectContainer'>
                        <TextField
                            select
                            sx={{ width: '50%' }}
                        >

                        </TextField>
                    </div>
                </div>
            }
            {
                firstInput === 'email' && secondInput !== '' &&
                <a href='./forgot'>¿Olvidaste tu contraseña?</a>
            }
            <div className='buttonContainer'>
                {
                    bodyForm !== '' &&
                    <button
                        style={{ backgroundColor: 'white', border: 'solid 1px', color: 'gray', fontSize: '18px' }}
                    >
                        {secondButtonText}
                    </button>
                }
                <button onClick={onSubmit} type='submit'>{firstButtonText}</button>
            </div>

        </form>
    )
}
