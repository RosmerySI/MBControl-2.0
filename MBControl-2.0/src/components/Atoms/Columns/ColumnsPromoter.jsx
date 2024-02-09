import React from 'react'
import { NumberFormatPercent } from '../NumberFormat/NumberFormat';
import { Button, InputAdornment, TextField } from '@mui/material';

export const ColumnsPromoter = (
    comercialCost,
    onComercialCostInputChange,
    comisionPromoter,
    onComisionPromoterInputChange,
    toggleModelsPromoter,
    onToggleModelsPromoter
) => {
    const limitCharacter = 11;
    let columnsPromoter = [
        {
          field: 'name',
          headerName: 'Productos',
          type: 'string',
          width: 150,
        },
        {
          field: 'Costo Comercial',
          disableColumnMenu: true,
          sortable: false,
          width: 150,
          renderCell: (cellvalues) => {
            return (
              <TextField
                name={cellvalues.row.name}
                value={comercialCost[cellvalues.row.name] || 0}
                onChange={onComercialCostInputChange}
                autoComplete='off'
                sx={{ width: '180px', padding: '0px', '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { padding: 0 } }}
                InputProps={{
                  inputComponent: NumberFormatPercent,
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}>
              </TextField>
            )
          }
        },
        {
          field: 'Comisión',
          disableColumnMenu: true,
          sortable: false,
          width: 150,
          renderCell: (cellvalues) => {
            return (
              <TextField
                name={cellvalues.row.name}
                value={comisionPromoter[cellvalues.row.name]||0}
                onChange={onComisionPromoterInputChange}
                autoComplete='off'
                sx={{ width: '180px', padding: '0px', '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { padding: 0 } }}
                InputProps={{
                  inputComponent: NumberFormatPercent,
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
              >
              </TextField>
            )
          }
        },
        {
          field: 'Piso / %',
          disableColumnMenu: true,
          sortable: false,
          width: 100,
          renderCell: (cellvalues) => {
            return (
              <Button
                style={{
                  backgroundColor: "white",
                  boxShadow: 'none',
                  width: '10px',
                  padding: 0,
                }}
                variant='contained'
                name={cellvalues.row.name}
                onClick={() => onToggleModelsPromoter(cellvalues.row.name)}>
                <p style={{ color: 'gray' }}>
                  {toggleModelsPromoter && toggleModelsPromoter[cellvalues.row.name] === false ? 'Piso' : '%'}
                </p>
              </Button>
            )
          }
        },
      ]
  return {
    columnsPromoter
    }
  
}
