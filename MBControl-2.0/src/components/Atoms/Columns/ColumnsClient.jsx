import { Button, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import NumberFormatCustom from '../NumberFormat/NumberFormat'


export const ColumnsClient = (
    comisionClient,
    onComisionClientInputChange,
    onToggleModelsClient,
    toggleModelsClient
) => {
    
    let columnsClient = [
        {
          field: 'name',
          headerName: 'Productos',
          type: 'string',
          width: 150,
        },
        {
          field: 'Comisión',
          disableColumnMenu: true,
          sortable: false,
          width: 150,
          renderCell: (cellvalues) => {
            return (
              <TextField
                name={`model${cellvalues.row.name}`}
                value={comisionClient[`model${cellvalues.row.name}`] || 0}
                onChange={onComisionClientInputChange}
                autoComplete="off"
                sx={{ width: '180px', padding: '0px', '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { padding: 0 } }}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
              >
              </TextField>
            )
          }
        },
        {
          field: 'Sub-Total/Total',
          disableColumnMenu: true,
          sortable: false,
          width: 140,
          renderCell: (cellvalues) => {
            return (
              <Button
                variant='contained'
                name={cellvalues.row.name}
                style={{
                  backgroundColor: "white",
                  boxShadow: 'none',
                  width: '180px',
                  padding: 0,
                  display: 'flex',
                  justifyContent: 'center'
                }}
                onClick={() => { onToggleModelsClient(cellvalues.row.name) }}
              >
                <p style={{ color: 'gray' }}>
                  {toggleModelsClient &&
                    toggleModelsClient[cellvalues.row.name] === true ? 'Sub-Total' : 'Total'
                  }</p>
              </Button>
            )
          }
        },
      ]
    return {columnsClient}
}
