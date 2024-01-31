import React, { useEffect, useState } from 'react'
import { DataTables } from '../../../../components/Atoms/Tables/DataTables'
import { petitions } from '../../../../services/api/petitions'
import { Box, Button, Modal } from '@mui/material'

import edit from '../../../../assets/images/edit.png'
import list from '../../../../assets/images/lista.png'
import { useNavigate } from 'react-router-dom';
import { ModelsTable } from '../../../../components/Atoms/Tables/ModelsTable';
import { userInfo } from '../../../../utilities/userInfo/userInfo'



export const Promoters = () => {
  const [object, setObject] = useState()
  const [promoter, setPromoter] = useState()


  const { getObject } = petitions()
  const { userroles } = userInfo()

  useEffect(() => {
    getObject('/promoter', setObject)
  }, [])

  const promoterModelsColumns =[
    {
        field: 'name',
        headerName: 'Modelos',            
        sortable: true,
        width: 100,

    },
   
    {
        field: 'value',
        headerName: 'Comision',            
        sortable: true,
        width: 100,

    },
    {
        field: 'comercialCost',
        headerName: 'Costo Comercial',            
        sortable: true,
        width: 100,

    },
    {
        field: 'isPercent',
        headerName: 'Porciento',           
        sortable: true,
        width: 100,

    },
]
  const models=promoter?.models

    let objectModelsPromotores=[]
    models?.forEach(model=>{
        let models={
            name:model.name,
            value:model.value,
            comercialCost:model.comercialCost,
            isPercent:model.isPercent?'%':'Piso',
            
        }
        objectModelsPromotores.push(models)
    })  
       
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  
  let updatedPromoters = []
  object?.forEach(item => {
    let element = {
      contactByEmail: item.contactByEmail ? 'Si' : 'No',
      contactByPhone: item.contactByPhone ? 'Si' : 'No',
      email: item.email,
      id: item.id,
      name: item.name,
      userName: item.userName,
      phone: item.phone,
      g3Name: item.g3Name
    }
    updatedPromoters.push(element)
  })

  let columnFields = [
    {
      field: 'name',
      headerName: 'Promotor',
      description: 'Nombre del Promotor',
      sortable: true,
      width: 150,

    },
    {
      field: 'g3Name',
      headerName: 'G3',
      description: 'G3',
      sortable: true,
      width: 150,

    },
    {
      field: 'enlace',
      headerName: 'Enlace',
      description: 'Enlace asignado al Promotor',
      sortable: true,
      width: 150,

    },
    {
      field: 'userName',
      headerName: 'Admin/Enlace',
      description: 'Nombre de Usuario',
      sortable: true,
      width: 170,

    },
    {
      field: 'email',
      headerName: 'Email',
      description: 'Email',
      sortable: true,
      width: 270,

    },
    { field: 'contactByEmail', headerName: 'Email', width: 120 },
    { field: 'contactByPhone', headerName: 'WhatsApp', width: 150 },

    { field: 'phone', headerName: 'Teléfono', width: 150 },

    {
      field: 'Modelos',
      disableColumnMenu: true,
      sortable: false,
      width: 120,
      renderCell: (cellvalues) => {
        return (
          <>
            <Button
              style={{ backgroundColor: "white", boxShadow: 'none' }}
              variant='contained'
              color='primary'
              onClick={async (event) => {
                handleClickModelos(event, cellvalues);
              }}
            >
              <img style={{width:'30px',height:'25px',margin:'0px'}} src={list} />
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 450,
                height: 400,
                bgcolor: 'background.paper',
                borderRadius: '20px',
                boxShadow: 24,
                p: 4,
              }}>
                <ModelsTable
                rows={objectModelsPromotores}
                columns={promoterModelsColumns}
                />
              </Box>
            </Modal>
          </>
        )
      }

    },
    {
      field: (userroles==='Admin')&&'Editar',      
      disableColumnMenu: true,
      sortable: false,
      width: 70,
      renderCell: (cellvalues) => {
        return (
          //(userroles==='Admin')&&
          <Button
            style={{
              backgroundColor: "white",
              boxShadow: 'none',

            }}
            variant='contained'
            color='primary'
            onClick={(event) => {
              handleClickEditar(event, cellvalues);
            }}
          >
            <img style={{width:'30px',height:'25px',margin:'0px'}} src={edit} />
          </Button>

        )
      }

    },
    // {
    //     field: 'Desactivar/Activar',
    //     disableColumnMenu: true,
    //     sortable: false,
    //     width: 170,
    //     renderCell: (cellvalues) => {

    //         return (
    //             <Button
    //                 style={{
    //                     backgroundColor: "white",
    //                     boxShadow: 'none',
    //                 }}
    //                 variant='contained'
    //                 color={(cellvalues.row.isLocked === true) ? 'success' : 'error'}
    //                 onClick={(event) => {

    //                     Swal.fire({
    //                         title: 'Estás seguro?',
    //                         text: (cellvalues.row.isLocked === true) ? "¿Quires activar a este promotor?" : "¿Quires desactivar a este promotor?",
    //                         icon: 'warning',
    //                         showCancelButton: true,
    //                         confirmButtonColor: '#3085d6',
    //                         cancelButtonColor: '#d33',
    //                         confirmButtonText: (cellvalues.row.isLocked === true) ? "Si, actívalo!" : "Si, desactívalo!",
    //                     }).then((result) => {
    //                         if (result.isConfirmed) {
    //                             (cellvalues.row.isLocked === true) ?
    //                             handleClickActivar(event, cellvalues)
    //                             :
    //                             handleClickDesactivar(event, cellvalues)
    //                             Swal.fire(
    //                                 (cellvalues.row.isLocked === true) ? "Activado!" : "Desctivado!",
    //                                 (cellvalues.row.isLocked === true) ? 'El promotor ha sido activado.' : 'El promotor ha sido desactivado.',
    //                                 'success'
    //                             )
    //                         } 
    //                     })
    //                 }}
    //             >
    //                 {(cellvalues.row.isLocked === true) ?
    //                     <img style={{width:'30px',height:'25px',margin:'0px'}} src={edit}/>
    //                     :
    //                     <img style={{width:'30px',height:'25px',margin:'0px'}} src={edit}/>
    //                 }
    //             </Button>
    //         )
    //     }
    // },

  ]
  
  const handleClickModelos =async(event, cellvalues) => {
    const promotorId = cellvalues.row.id; 
    await getObject(`/promoter/${promotorId}`,setPromoter);
    setOpen(true);    
}

  const navigate=useNavigate()
  const handleClickEditar = (event, cellvalues) =>{
    const promoterId = cellvalues.row.id
    navigate(`/newpromoter/?promoterId:${promoterId}`)
  }
  return (
    <DataTables
    buttonRoute={'/newpromoter'}
      object={updatedPromoters}
      columnFields={columnFields}
      buttonText={'Nuevo Promotor'}
    />
  )
}