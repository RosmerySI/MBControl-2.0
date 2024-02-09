import React from 'react'
import { Button, InputAdornment, TextField } from '@mui/material'
import { NumberFormatPercent } from '../NumberFormat/NumberFormat'

export const ColumnsProviderOutCome = (
    formData,
    toggleModels,
    handleToggleModelChange,
    handleInputChange
) => {

    let columnsProviders = [
        {
            field: 'name',
            headerName: ' Productos',
            type: 'string',
            width: 160,
        },
        {
            field: 'Costo',
            disableColumnMenu: true,
            sortable: false,
            width: 120,
            renderCell: (cellvalues) => {
                return (
                    <TextField
                        name={cellvalues.row.name}
                        value={formData[cellvalues?.row.name]||0                           }
                        onChange={handleInputChange}
                        sx={{
                            width: '200px', padding: '0px',
                            '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { padding: 0 }
                        }}
                        InputProps={{
                            inputComponent: NumberFormatPercent,
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                    />
                )
            }
        },
        {
            field: 'Total / SubTotal',
            disableColumnMenu: true,
            sortable: false,
            width: 200,
            renderCell: (cellvalues) => {
                return (
                    <Button
                        style={{
                            backgroundColor: "white",
                            boxShadow: 'none',
                            minWidth: '100px',
                            padding: 0,
                        }}
                        variant='contained'
                        name={cellvalues.row.name}
                        onClick={()=>{handleToggleModelChange(cellvalues.row.name)}}
                    >                    
                        <p style={{color:'black'}}>{toggleModels&&toggleModels[cellvalues?.row?.name]===true?'Total':'SubTot'}</p>
                    </Button>
                )
            }
        },
    ]
    return { columnsProviders }
}
