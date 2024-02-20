import React from 'react';
import { ListItemText, MenuItem, TextField } from '@mui/material';
import { NumberFormatMoney } from '../NumberFormat/NumberFormat';




export const ColumnsOperation = (
  incomeProvider,
  outcomeProvider,
  tableProductAmount,
  incomeProviders,
  outcomeProviderById,
  handleTableProductAmountChange,
  handleIncomeProviderChange,
  handleOutcomeProviderChange,
  getOutcomeProvider) => {
  const limitCharacter = 11;
  let columns = [
    {
      field: 'name',
      headerName: 'Productos',
      type: 'string',
      width: 150,
    },
    {
      field: 'Monto',
      disableColumnMenu: true,
      sortable: false,
      width: 150,
      renderCell: (cellvalues) => {

        return (
          <TextField
            name={cellvalues.row.name}
            value={tableProductAmount[cellvalues.row.name]}
            onChange={handleTableProductAmountChange}
            autoComplete="off"
            sx={{
              width: '180px', padding: '0px',
              '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { padding: 0 }
            }}
            InputProps={{ inputComponent: NumberFormatMoney}}
            inputProps={{ maxlength: limitCharacter }}
          />
        )
      }
    },
    {
      field: 'Proveedor Ingreso',
      disableColumnMenu: true,
      sortable: false,
      width: 230,
      renderCell: (cellvalues) => {
        return (
          <TextField
            select
            name={cellvalues.row.name}
            variant="outlined"
            className='container_input_email'
            value={incomeProvider[cellvalues.row.name]}
            onChange={handleIncomeProviderChange}
            sx={{
              width: { sm: 200 }, height: { sm: 60 }, backgroundColor: 'rgb(232, 228, 228);',
              boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }
            }}>
            {incomeProviders?.map((test) => (
              <MenuItem key={test.id} value={test.id}>
                <ListItemText sx={{ width: { sm: 50 }, display: 'inline-block' }}
                  primary={test.name} />
              </MenuItem>
            ))}
          </TextField>
        )
      }
    },
    {
      field: 'Proveedor Egreso',
      disableColumnMenu: true,
      sortable: false,
      width: 230,
      renderCell: (cellvalues) => {
        return (
          <TextField
            select
            name={cellvalues.row.name}
            variant="outlined"
            className='container_input_email'
            value={outcomeProvider[cellvalues.row.name]}
            onChange={handleOutcomeProviderChange}
            onFocus={() => { getOutcomeProvider(cellvalues.row.id) }}
            sx={{
              width:{ sm: 200 },backgroundColor:'rgb(232, 228, 228);',
              boxShadow: 'none', '.MuiOutlinedInput-notchedOutline':{border:0}
            }}>
            {
              outcomeProviderById?.map((test) => (
                // outcomeProviderById[models.findIndex(item=>item.id==cellvalues.row.id)]?.map((test) => (
                <MenuItem key={test.id} value={test.id} >
                  <ListItemText
                    sx={{ width: { sm: 50 }, display: 'inline-block' }}
                    primary={test.name} />
                </MenuItem>
              ))}
          </TextField>
        )
      }
    },
  ]
  return {
    columns
  }
}
