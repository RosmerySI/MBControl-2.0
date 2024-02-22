import { CheckBox } from '@mui/icons-material'
import { TextField } from '@mui/material'
import React from 'react'
import { InputCheckBox } from './InputCheckBox'

export const InputRfc = ({rfc,checkedRfc,rfcValid,onInputChange,handleChangeRfc}) => {
    return (
        <div className='inputRfcContainer'>
            <TextField
                variant='standard'
                className='textInput'
                type='text'
                placeholder={'RFC'}
                name={'rfc'}
                value={checkedRfc ? rfc?.slice(0, 13) : rfc?.slice(0, 12) || ''}
                onChange={onInputChange}
                error={rfcValid}
                helperText={rfcValid}
                InputProps={{ disableUnderline: true }}
                sx={{
                    '& .css-1d1r5q-MuiFormHelperText-root': { marginLeft: '50px' },
                    '& .css-1x51dt5-MuiInputBase-input-MuiInput-input': { height: '30px' }
                }}>

            </TextField>
            <div style={{width:'100px',height:'59.7px', backgroundColor:'#f2f3f7', color:'black',
            display:'flex', alignItems:'center'}}>
            <InputCheckBox checkedValue={checkedRfc}  handleChangeValue={handleChangeRfc} text={checkedRfc ? 'Física' : 'Moral'}/>
            </div>
        </div>
    )
}
