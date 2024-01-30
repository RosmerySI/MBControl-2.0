import React, { useEffect, useState } from 'react'
import { DataTables } from '../../../components/Atoms/Tables/DataTables'
import { petitions } from '../../../services/api/petitions'

export const OutcomeProviders = () => {
  const [object, setObject] = useState()

  const { getObject } = petitions()

  useEffect(() => {
    getObject('/providerOutCome', setObject)
  }, [])


  let updatedOutcomeProvider = []
  object?.forEach(item => {
    let modelName = ''
    let totalCharge = ''
    let charge = ''
    item.providerOutComeModels?.forEach(model => {
      modelName += model.modelName + '/ '
      charge += model.charge + '%/ '
      totalCharge += model.isTotal ? 'Total/' : 'Parcial/'

    })
    let element =
    {
      id: item.id,
      charge: charge,
      name: item.name,
      isTotal: totalCharge,
      models: modelName
    }
    updatedOutcomeProvider.push(element)


  })

  let columnFields = [
    {
      field: 'name',
      headerName: 'Proveedor',
      description: 'Nombre de Proveedores',
      sortable: true,
      width: 200,


  },

  {
      field: 'charge',
      headerName: 'Costos',
      description: 'Costos',
      sortable: true,
      width: 200,


  },

  {
      field: 'isTotal',
      headerName: 'Total/Parcial',
      type: 'string',
      width: 220,
  },

  {
      field: 'models',
      headerName: 'Modelos',
      type: 'string',
      width: 265,
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
  //                     marginLeft:'30px'
  //                 }}
  //                 variant='contained'
  //                 color={(cellvalues.row.isLocked === true) ? 'success' : 'error'}
  //                 onClick={(event) => {

  //                     Swal.fire({
  //                         title: 'Estás seguro?',
  //                         text: (cellvalues.row.isLocked === true) ? "¿Quires activar a este proveedor?" : "¿Quires desactivar a este proveedor?",
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
  //                                 (cellvalues.row.isLocked === true) ? 'El provedor de egreso ha sido activado.' : 'El provedor de egreso ha sido desactivado.',
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
      buttonRoute={'/newoutcomeprovider'}
      object={updatedOutcomeProvider}
      columnFields={columnFields}
      buttonText={'Nuevo Proveedor Egreso'}
    />
  )
}