import React from 'react'
import { ListItemText, MenuItem, TextField } from '@mui/material'

export const InputSelect=({object,promoter,g3,link,client,company,onInputChange,labelText})=>{
   
    return (
        <div className='selectContainer'>
            <TextField  
                select 
                label={labelText}
                name={promoter!==undefined?'promoter':                    
                      g3!==undefined?'g3':
                      link!==undefined?'link':
                      client!==undefined?'client':'company'
                    }
                value={promoter!==undefined?promoter:                    
                       g3!==undefined?g3:
                       link!==undefined?link:
                       client!==undefined?client:company}
                onChange={onInputChange}
                sx={{ width: '80%' }}>
                {
                    object?.map((selected) => (
                        <MenuItem key={selected.id?selected.id:selected.email} value={selected.id?selected.id:selected.email}>
                            <ListItemText sx={{ width: { sm: 50 }, display: 'inline-block' }}
                                primary={selected.name} />
                        </MenuItem>
                    ))
                }
            </TextField>
        </div>
    )
}
