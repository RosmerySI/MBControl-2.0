import React from 'react'
import { ListItemText, MenuItem, TextField } from '@mui/material'

export const InputSelect=({
    object,
    promoter,
    g3,
    link,
    client,
    company,
    invoice,
    model,
    role,
    onInputChange,
    labelText,
    parent})=>{

    return (
        <div className={labelText==='Productos'?'selectProductContainer':'selectContainer'}>
            <TextField  
                select 
                label={labelText}
                name={                    
                      promoter!==undefined?'promoter':                    
                      g3!==undefined?'g3':
                      link!==undefined?'link':
                      client!==undefined?'client':
                      company!==undefined?'company':
                      invoice!==undefined?'invoice':
                      model!==undefined?'model':'role'
                    
                    }
                value={                    
                       promoter!==undefined?promoter:                    
                       g3!==undefined?g3:
                       link!==undefined?link:
                       client!==undefined?client:
                       company!==undefined?company:
                       invoice!==undefined?invoice:
                       model!==undefined?model:role
                       ||''}
                onChange={onInputChange}
                SelectProps={{multiple:model?true:invoice?true:role?true:false}}
                inputProps={
                    { readOnly: parent ?false:true  }
                  }
                sx={{ width: '100%' ,
                '& .css-q3t2rb-MuiListItemText-root':{width: '110px'}
                }}>
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
