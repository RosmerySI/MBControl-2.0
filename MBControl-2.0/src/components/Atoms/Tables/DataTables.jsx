import * as React from 'react';
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import { DataGrid,GridToolbar} from "@mui/x-data-grid"
import { PieGraphic } from '../Graphic/PieGraphic';
import './tablesPages.css'

export const DataTables = ({ buttonRoute, object, columnFields, buttonText, pie}) => {

  const navigate = useNavigate()
  const onNavigate = () => {
    navigate(buttonRoute)
  }

  return (
    <div className='tablePageContainer' >
      <div className='tableButtonContainer' >
        <Button
          sx={{width:'max-content',height:'100%',background:'#765ae2',color:'white',
            "&:hover":{border:"1px solid #765ae2",color:'gray',background:'white'},
          }}
          onClick={onNavigate}
        >{buttonText}
        </Button>
      </div>
      <div className='tableContainer'>
        {object &&
          <DataGrid
            rows={object}
            columns={columnFields}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row.id ? row.id : row.email?row.email:row.clientId}           
            slots={pie&&{ toolbar: GridToolbar }}
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
              '& .MuiTablePagination-root css-rtrcn9-MuiTablePagination-root': { minHeight: '0px' }
            }}
          />
        }
      </div>      
      {object&&pie&&<PieGraphic object={object}/>}    
    </div>
  )
}
