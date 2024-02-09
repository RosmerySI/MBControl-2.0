import { TextField } from '@mui/material'
import React from 'react'

export const InputEmail = ({email,emailValid,onInputChange,labelText}) => {
    return (
        <div className={labelText?'inputContainer':'inputNameContainer'}>
            {
            labelText&&
            <label>{labelText}</label>
            }
            <TextField
                variant='standard'
                className={labelText?'textFieldInput':'textInput'}
                type='email'
                placeholder={'correo@correo.com'}
                name={'email'}
                value={email}
                autoComplete='on'
                onChange={onInputChange}
                error={emailValid}
                helperText={emailValid}
                InputProps={{disableUnderline: true }}
                sx={{
                    '& .css-1d1r5q-MuiFormHelperText-root': { marginLeft: '10px' },
                    '& .css-1x51dt5-MuiInputBase-input-MuiInput-input': { height: '30px' }
                }} />
        </div>
    )
}
