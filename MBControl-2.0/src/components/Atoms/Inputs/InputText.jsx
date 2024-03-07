import { TextField } from '@mui/material'
import React from 'react'
import { NumberFormatMoney } from '../NumberFormat/NumberFormat'

export const InputText = ({
    onInputChange,
    placeholder,
    name,
    nameValid,
    phone,
    phoneValid,
    invoiceNumber,
    amount,
    folio,  
    provider,
    label,
    totalOperation,
    iva,
    subTotalOperation,
    clientTotalReturn,
    comisionPromoter,
    marketUtility,
    clientAmount}) => {
    return (
        <div className='inputNameContainer'>
           {folio&&<label style={{fontSize:'10px',margin:'0px'}}>Folio</label>}
            <TextField
                label={label==='Folio'?'':label}
                variant='standard'
                className='textInput'
                type='text'
                placeholder={placeholder}
                name={name!==undefined?'name':
                      phone!==undefined?'phone':
                      invoiceNumber!==undefined?'invoiceNumber':
                      amount!==undefined?'amount':
                      folio!==undefined?'folio':
                      provider!==undefined?'provider':
                      totalOperation!==undefined?'totalOperation':
                      iva!==undefined?'iva':
                      subTotalOperation!==undefined?'subTotalOperation':
                      clientTotalReturn!==undefined?'clientTotalReturn':
                      comisionPromoter!==undefined?'comisionPromoter':
                      marketUtility!==undefined?'marketUtility':'clientAmount'
                    }
                value={name!==undefined?name:
                       phone!==undefined?phone:
                       invoiceNumber!==undefined?invoiceNumber:
                       amount!==undefined?amount:
                       folio!==undefined?folio:
                       provider!==undefined?provider:
                       totalOperation!==undefined?totalOperation:
                       iva!==undefined?iva:
                       subTotalOperation!==undefined?subTotalOperation:
                       clientTotalReturn!==undefined?clientTotalReturn:
                       comisionPromoter!==undefined?comisionPromoter:
                       marketUtility!==undefined?marketUtility:clientAmount                   
                    }
                autoComplete={'new-password'}
                onChange={onInputChange}
                error={!!nameValid?!!nameValid:phoneValid}
                helperText={nameValid?nameValid:phoneValid}
                InputProps={{disableUnderline:true, readOnly:label?true:false,
                     inputComponent:amount&& NumberFormatMoney}}
                
                sx={{
                    '& .css-1d1r5q-MuiFormHelperText-root': { marginLeft: '50px' },
                    '& .css-1x51dt5-MuiInputBase-input-MuiInput-input': { height: '30px' }
                }} />
        </div>
    )
}
