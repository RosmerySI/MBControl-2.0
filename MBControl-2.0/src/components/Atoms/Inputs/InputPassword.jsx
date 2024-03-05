import { TextField } from '@mui/material'
import React from 'react'

export const InputPassword = ({password,passwordValid,onInputChange}) => {
  return (
    <div className='inputContainer'>
            <label>Contraseña:</label>
            <TextField
              variant='standard'
              className='textFieldInput'
              type={'password'}
              placeholder={'••••••••'}
              name={'password'}
              value={password}
              onChange={onInputChange}
              error={!!passwordValid}
              helperText={!!passwordValid}
              InputProps={{ disableUnderline: true }}
              sx={{
                '& .css-1d1r5q-MuiFormHelperText-root': { marginLeft: '50px' },
                '& .css-1x51dt5-MuiInputBase-input-MuiInput-input': {
                height: '40px', width:'90%', marginLeft:'30px' }
              }}>
              {/* <img src="../../../assets/images/hide.png" alt="lock" /> */}
            </TextField>
          </div>
  )
}
