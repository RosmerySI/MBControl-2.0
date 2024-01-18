import { Button, InputAdornment, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

export const ModelsTable = () => {
  let models = [

    {
      id: "9e719d9e-4d22-4b7b-9f1b-16813365d661",
      name: "ADR"
    },
    {
      id: "90684452-e32c-478d-a15f-9f4b8c3bcdb6",
      name: "CUCA"
    },
    {
      id: "80044c3d-51be-4635-98b6-8d02c8c9a4ae",
      name: "Finpulso"
    },

  ]
  let columns = [
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
      // renderCell: (cellvalues) => {
      //   return (
      //     <TextField

      //       name={`costoComercial${cellvalues.row.name}`}
      //       value={formData[`costoComercial${cellvalues.row.name}`]}
      //       onChange={onMyInputChange}
      //       autoComplete='off'
      //       sx={{
      //         width: '180px', padding: '0px',
      //         '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { padding: 0 }
      //       }}
      //       InputProps={{
      //         inputComponent: NumberFormatCustom,
      //         endAdornment: <InputAdornment position="end">%</InputAdornment>,
      //       }}>

      //     </TextField>
      //   )
      // }

    },

    {
      field: 'Comisión',
      disableColumnMenu: true,
      sortable: false,
      width: 150,
      // renderCell: (cellvalues) => {


      //   return (
      //     <TextField
      //       name={`model${cellvalues.row.name}`}
      //       value={formData[`model${cellvalues.row.name}`]}
      //       onChange={onMyInputChange}
      //       autoComplete='off'
      //       sx={{
      //         width: '180px', padding: '0px',
      //         '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { padding: 0 }
      //       }}
      //       InputProps={{
      //         inputComponent: NumberFormatCustom,
      //         endAdornment: <InputAdornment position="end">%</InputAdornment>,

      //       }}
      //     >
      //     </TextField>
      //   )
      // }

    },

    {
      field: 'Piso / %',
      disableColumnMenu: true,
      sortable: false,
      width: 100,
      // renderCell: (cellvalues) => {

      //   return (
      //     <Button
      //       style={{
      //         backgroundColor: "white",
      //         boxShadow: 'none',
      //         width: '10px',
      //         padding: 0,
      //       }}
      //       variant='contained'
      //       name={cellvalues.row.name}
      //       // onClick={() => {
      //       //   let toggleModelsCopy = { ...toggleModels }
      //       //   toggleModelsCopy[cellvalues.row.name] = !toggleModelsCopy[cellvalues.row.name]
      //       //   setToggleModels(toggleModelsCopy)

      //       // }}
      //     >
      //       {/* {(toggleModels[cellvalues.row.name]) ?
      //         <h2 className="usuarioPage_usuarioContainer_unchecked">%</h2>
      //         :
      //         <p className="usuarioPage_usuarioContainer_unchecked">piso</p>
      //       } */}
      //     </Button>
      //   )


      // }
    },
  ]

  return (
    <DataGrid
      sx={{
        height:'70%',
        '& .MuiTablePagination-actions': { display: 'flex', justifyContent: 'row' },
        '& .css-rtrcn9-MuiTablePagination-root': { display: 'flex', alignItems: 'center', overflow: 'hidden', height: '40px' }
      }}
      rows={models}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      getRowId={(row) => row.id}
    />
  )
}
