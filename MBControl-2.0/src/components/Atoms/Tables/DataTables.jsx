import * as React from 'react';
import { Link, useNavigate } from "react-router-dom"
import { Button, Box, Modal } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { jwtDecode } from "jwt-decode";
import './tablesPages.css'

let token = ''
let roles = []
token = localStorage.getItem('token');
if (token) {
  const decoded = jwtDecode(token);
  roles = decoded.Roles
}

export const DataTables = ({ buttonRoute,object, columnFields, buttonText }) => {
  const navigate=useNavigate()
  const onNavigate = () =>{
    navigate(buttonRoute)
  }
  return (
    <div className='tablePageContainer' >
      <div className='tableButtonContainer' >
        <Button
          sx={{
            width: 'max-content',
            height: '100%',
            background: '#3c82f6',
            color: 'white',
            "&:hover": {
              border: "1px solid #3c82f6",
              color: 'gray',
              backgroundColor: 'white'
            },
            
          }}
          onClick={onNavigate}
        >{buttonText}
        </Button>
      </div>
      <div className='tableContainer'>
        {
          object &&
          <DataGrid
            rows={object}
            columns={columnFields}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row.id?row.id:row.email}
            sx={{
              '.MuiDataGrid-iconButtonContainer': {
                visibility: 'visible',
              },
              '.MuiDataGrid-sortIcon': {
                opacity: 'inherit !important',
              },
              '&  .MuiDataGrid-menuIcon ': {
                visibility: 'visible',
                marginRight: '20px',
              },
              '& .MuiTablePagination-root css-rtrcn9-MuiTablePagination-root':{minHeight:'0px'}
            }}
          />
        }
      </div>
    </div>

  )
}
