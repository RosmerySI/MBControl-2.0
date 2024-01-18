import * as React from 'react';
//import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button, Box, Modal } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { petitions } from '../../../services/api/petitions';

//import { useStoreCliente } from "../../../hooks/useStore/useStoreCliente"
//import { useStorePromotor } from "../../../hooks/useStore/useStorePromotor"
import { jwtDecode } from "jwt-decode";
import './tablesPages.css'
import { useEffect } from 'react';
import { useState } from 'react';
let token = ''
let roles = []
token = localStorage.getItem('token');
if (token) {
  const decoded = jwtDecode(token);
  roles = decoded.Roles
}

export const DataTables = ({ route, columnFields, buttonText }) => {

  const [object, setObject] = useState()

  const { getObject } = petitions()



  useEffect(() => {
    getObject(route, setObject)
  }, [])



  // const  {dataClient, getClient, modelosCliente, editClient, modelsCliente,activateClient,disactivateClient} =  useStoreCliente();
  // const  {getPromotores} = useStorePromotor();
  // useEffect(() => {
  //   getClient()
  //   getPromotores() 
  // }, []);

  //const clientObject = dataClient?.dataClient
  //const modelsClient= modelsCliente?.modelsCliente?.models

  // let obejectModelsCliente=[]
  // modelsClient?.forEach(model=>{
  //   let models={
  //     name:model.name,
  //     value:model.value,
  //     hasIva:model.hasIva?'Con IVA':'Sin IVA',
  //   }
  //   obejectModelsCliente.push(models)
  // })

  // const [open, setOpen] = React.useState(false);
  // const handleClose = () => setOpen(false); 

  // const modelsColumnsClient =[
  //     {
  //         field: 'name',
  //         headerName: 'Modelos',            
  //         sortable: true,
  //         width: 100,

  //     },

  //     {
  //         field: 'value',
  //         headerName: 'Valor',            
  //         sortable: true,
  //         width: 100,

  //     },
  //     {
  //         field: 'hasIva',
  //         headerName: 'IVA',           
  //         sortable: true,
  //         width: 100,

  //     },
  // ]
  let columns = []
  columnFields?.forEach(element => {
    let createdColumn = {
      field: element.field,
      headerName: element.headerName,
      description: element.description,
      sortable: true,
      width: 150,
    }
    columns.push(createdColumn)
  })
 
  // const columns = [
  //   {
  //     field: columnFields.firstColumn.field,
  //     headerName: columnFields.firstColumn.headerName,
  //     description: columnFields.firstColumn.description,
  //     sortable: true,
  //     width: 150,

  //   },
  //   {
  //     field: columnFields.secondColumn.field && columnFields.secondColumn.field,
  //     headerName: columnFields.secondColumn.headerName,
  //     description: columnFields.secondColumn.description,
  //     sortable: true,
  //     width: 150,

  //   },
  //   {
  //     field: columnFields.thirdColumn.field,
  //     headerName: columnFields.thirdColumn.headerName,
  //     description: columnFields.thirdColumn.description,
  //     sortable: true,
  //     width: 150,

  //   },
  //   {
  //     field: columnFields.fourthColumn.field,
  //     headerName: columnFields.fourthColumn.headerName,
  //     description: columnFields.fourthColumn.description,
  //     sortable: true,
  //     width: 150,

  //   },
  //   {
  //     field: columnFields.fifthColumn.field,
  //     headerName: columnFields.fifthColumn.headerName,
  //     description: columnFields.fifthColumn.description,
  //     sortable: true,
  //     width: 150,

  //   },

    // {
    //     field: 'Modelos',
    //     disableColumnMenu: true,
    //     sortable: false,
    //     width: 80,
    //     renderCell: (cellvalues) => {
    //         return (
    //             <div>
    //                 <Button
    //                     style={{ backgroundColor: "white", boxShadow: 'none' }}
    //                     variant='contained'
    //                     color='primary'
    //                     onClick={(event) => {
    //                         handleClickModelos(event, cellvalues);
    //                     }}
    //                 >
    //                     <img className="usuarioPage_usuarioContainer_unchecked" src="../../../../img/lista.png" />
    //                 </Button>

    //                 <Modal
    //                     open={open}
    //                     onClose={handleClose}
    //                     aria-labelledby="modal-modal-title"
    //                     aria-describedby="modal-modal-description"

    //                 >
    //                     <Box sx={{
    //                         position: 'absolute',
    //                         top: '50%',
    //                         left: '50%',
    //                         transform: 'translate(-50%, -50%)',
    //                         width: 350,
    //                         height: 260,
    //                         bgcolor: 'background.paper',                                
    //                         borderRadius: '20px',
    //                         boxShadow: 24,
    //                         p: 4,


    //                     }}>
    //                         <div style={{ height: 270, width: '100%' }}>
    //                             {
    //                                 obejectModelsCliente &&
    //                                     <DataGrid
    //                                         rows={obejectModelsCliente}
    //                                         columns={modelsColumnsClient}
    //                                         pageSize={10}
    //                                         rowsPerPageOptions={[10]}
    //                                         getRowId={(row) => row.name}                                              
    //                                         sx={{opacity:2}}
    //                                     />

    //                             }
    //                         </div>
    //                     </Box>
    //                 </Modal>
    //             </div>
    //         )
    //     }

    // },        
    // {   field: (roles==='Admin')&&'Editar', 
    //     disableColumnMenu:true,
    //     sortable: false,
    //     width: 100,
    //     renderCell: (cellvalues)=>{
    //         return(

    //             (roles==='Admin')&&

    //             <Button
    //             style={{

    //                 backgroundColor: "white",
    //                 boxShadow:'none',

    //                 }}
    //                 variant='contained'
    //                 color='primary'
    //                 onClick={(event)=>{
    //                 handleClickEditar(event, cellvalues);

    //                 }}
    //             >
    //                 <img className="usuarioPage_usuarioContainer_unchecked" src="../../../../img/edit.png" />
    //             </Button>


    //         )
    //     }  

    // },
    // {
    //     field: 'Activar/Desactivar',
    //     disableColumnMenu: true,
    //     sortable: false,
    //     width: 150,
    //     renderCell: (cellvalues) => {

    //         return (
    //             <Button
    //                 style={{
    //                     backgroundColor: "white",
    //                     boxShadow: 'none',
    //                     marginLeft:'20px'
    //                 }}
    //                 variant='contained'
    //                 color={(cellvalues.row.isLocked === true) ? 'success' : 'error'}
    //                 onClick={(event) => {

    //                     Swal.fire({
    //                         title: 'Estás segur@?',
    //                         text: (cellvalues.row.isLocked === true) ? "¿Quires activar el cliente?" : "¿Quires desactivar el cliente?",
    //                         icon: 'warning',
    //                         showCancelButton: true,
    //                         confirmButtonColor: '#3085d6',
    //                         cancelButtonColor: '#d33',
    //                         confirmButtonText: (cellvalues.row.isLocked === true) ? "Si, actívalo!" : "Si, desactívalo!",
    //                     }).then((result) => {
    //                         if (result.isConfirmed) {
    //                             (cellvalues.row.isLocked === true) ?
    //                                 handleClickActivar(event, cellvalues)
    //                                 :
    //                                 handleClickDesactivar(event, cellvalues)
    //                             Swal.fire(
    //                                 (cellvalues.row.isLocked === true) ? "Activado!" : "Desctivado!",
    //                                 (cellvalues.row.isLocked === true) ? 'El cliente ha sido activado.' : 'El cliente ha sido desactivado.',
    //                                 'success'
    //                             )
    //                         } 
    //                     })
    //                 }}
    //             >
    //                 {(cellvalues.row.isLocked === true) ?
    //                     <img className="usuarioPage_usuarioContainer_unchecked" src="../../../../img/check.png" />
    //                     :
    //                     <img className="usuarioPage_usuarioContainer_unchecked" src="../../../../img/uncheck.png" />
    //                 }
    //             </Button>
    //         )
    //     }
    // },
  

  // const handleClickModelos= async(event, cellvalues)=>{
  // const clienteId = cellvalues.row.id;
  // await modelosCliente(clienteId);
  // setOpen(true); 
  // }
  // const navigate=useNavigate()

  // const handleClickEditar=async(event, cellvalues)=>{
  //     const clienteId = cellvalues.row.id;        
  //     await editClient(clienteId);
  //     navigate('/editcliente')  
  // }
  // const handleClickActivar=(event, cellvalues)=>{
  //     const rowvalue = cellvalues.row.name;

  //     activateClient (rowvalue);
  // }     
  // const handleClickDesactivar=(event, cellvalues)=>{
  //     const rowvalue = cellvalues.row.name;

  //     disactivateClient (rowvalue);
  // }     

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
        >{buttonText}
        </Button>
      </div>
      <div className='tableContainer'>
        {
          object &&
          <DataGrid
            rows={object}
            columns={columns}
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
            }}
          />
        }
      </div>
    </div>

  )
}
