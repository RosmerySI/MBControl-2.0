import { TextField } from '@mui/material'
import React from 'react'

export const InputText = ({placeholder,name,phone,invoiceNumber,amount,folio,nameValid,phoneValid,onInputChange}) => {
    
    return (
        <div className='inputNameContainer'>
            <TextField
                variant='standard'
                className='textInput'
                type='text'
                placeholder={placeholder}
                name={name!==undefined?'name':
                      phone!==undefined?'phone':
                      invoiceNumber!==undefined?'invoiceNumber':
                      amount!==undefined?'amount':'folio'}
                value={name!==undefined?name:
                       phone!==undefined?phone:
                       invoiceNumber!==undefined?invoiceNumber:
                       amount!==undefined?amount:folio}
                autoComplete={'new-password'}
                onChange={onInputChange}
                error={!!nameValid?!!nameValid:phoneValid}
                helperText={nameValid?nameValid:phoneValid}
                InputProps={{disableUnderline:true}}
                sx={{
                    '& .css-1d1r5q-MuiFormHelperText-root': { marginLeft: '50px' },
                    '& .css-1x51dt5-MuiInputBase-input-MuiInput-input': { height: '30px' }
                }} />
        </div>
    )
}
