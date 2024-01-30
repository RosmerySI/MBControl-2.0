import React, { useEffect, useState } from 'react'
import { DataTables } from '../../../../components/Atoms/Tables/DataTables'
import { petitions } from '../../../../services/api/petitions'
import edit from '../../../../assets/images/edit.png'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
export const Companies = () => {

  const [object, setObject] = useState()

  const { getObject } = petitions()

  useEffect(() => {
    getObject('/company', setObject)
  }, [])
  const navigate = useNavigate()
  const handleClickEditar = (event, cellvalues) => {
    const rowvalue = cellvalues.row.name;
    navigate('/newcompany')
    //editCompany(rowvalue);
  }

  let columnFields = [
    {
      field: 'name',
      headerName: 'Nombre',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 500,

    },
    // {
    //     field: 'enlace',
    //     headerName: 'Enlace',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: true,
    //     width: 200,

    // },
    {
      field: 'Editar',
      disableColumnMenu: true,
      sortable: false,
      width: 70,
      renderCell: (cellvalues) => {
        return (
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
            <img style={{ width: '30px', height: '25px', marginLeft: '0px' }} src={edit} />
          </Button>

        )
      }

    },

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
    //                         text: (cellvalues.row.isLocked === true) ? "¿Quires activar esta empresa?" : "¿Quires desactivar esta empresa?",
    //                         icon: 'warning',
    //                         showCancelButton: true,
    //                         confirmButtonColor: '#3085d6',
    //                         cancelButtonColor: '#d33',
    //                         confirmButtonText: (cellvalues.row.isLocked === true) ? "Si, actívala!" : "Si, desactívala!",
    //                     }).then((result) => {
    //                         if (result.isConfirmed) {
    //                             (cellvalues.row.isLocked === true) ?
    //                                 handleClickActivar(event, cellvalues)
    //                                 :
    //                                 handleClickDesactivar(event, cellvalues)
    //                             Swal.fire(
    //                                 (cellvalues.row.isLocked === true) ? "Activado!" : "Desctivado!",
    //                                 (cellvalues.row.isLocked === true) ? 'La empresa ha sido activada.' : 'La empresa ha sido desactivada.',
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


  ]
  return (
    <DataTables
      buttonRoute={'/newcompany'}
      object={object}
      columnFields={columnFields}
      buttonText={'Nueva Empresa'}
    />
  )
}