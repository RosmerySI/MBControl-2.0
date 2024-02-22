import { Button, InputAdornment, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

export const ModelsTable= ({rows,columns}) => { 
 
  return (
      
    <DataGrid           
      rows={rows}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      getRowId={(row) => row.name}
      sx={{height:'350px', 
      '& .MuiTablePagination-root css-rtrcn9-MuiTablePagination-root':{minHeight:'0px'}}}
    />
    
    
  )
}
