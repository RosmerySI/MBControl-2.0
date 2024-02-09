import React from 'react'
import { ListItemText, MenuItem, TextField } from '@mui/material'

export const InputSelect=({object,promoter,g3,link,client,company,invoice,model,onInputChange,labelText})=>{
   
    return (
        <div className={labelText==='Productos'?'selectProductContainer':'selectContainer'}>
            <TextField  
                select 
                label={labelText}
                name={promoter!==undefined?'promoter':                    
                      g3!==undefined?'g3':
                      link!==undefined?'link':
                      client!==undefined?'client':
                      company!==undefined?'company':
                      invoice!==undefined?'invoice':
                      model!==undefined?'model':'model'
                    }
                value={promoter!==undefined?promoter:                    
                       g3!==undefined?g3:
                       link!==undefined?link:
                       client!==undefined?client:
                       company!==undefined?company:
                       invoice!==undefined?invoice:
                       model!==undefined&&model}
                onChange={onInputChange}
                SelectProps={{multiple:model?true:invoice?true:false}}
                sx={{ width: '100%' }}>
                {
                object?.map((selected) => (
                    <MenuItem key={selected.id?selected.id:selected.email} value={selected.id?selected.id:selected.email}>
                        <ListItemText sx={{ width: { sm: 50 }, display: 'inline-block' }}
                            primary={selected.name?selected.name:`${selected.number}-$${selected.remainingAmount}`} />
                    </MenuItem>
                ))
                }
            </TextField>
        </div>
    )
}
