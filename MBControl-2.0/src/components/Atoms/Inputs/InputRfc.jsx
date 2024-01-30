import { CheckBox } from '@mui/icons-material'
import { TextField } from '@mui/material'
import React from 'react'
import { InputCheckBox } from './InputCheckBox'

export const InputRfc = ({rfc,checkedRfc,rfcValid,onInputChange,handleChangeRfc}) => {
    return (
        <div className='inputRfcContainer'>
            <TextField
                variant='standard'
                className='textFieldInput'
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
                    '& .css-1x51dt5-MuiInputBase-input-MuiInput-input': { height: '40px' }
                }}>

            </TextField>
            <InputCheckBox checkedValue={checkedRfc}  handleChangeValue={handleChangeRfc} text={checkedRfc ? 'Física' : 'Moral'}/>
            {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
                <input className='checkbox' type="checkbox" value={false || checkedRfc} onChange={handleChangeRfc} />
                <span style={{ height: '130%', display: 'flex', alignItems: 'center', color: 'gray', fontFamily: 'sans-serif' }}>
                    {checkedRfc ? 'Física' : 'Moral'}
                </span>
            </div> */}

        </div>
    )
}
