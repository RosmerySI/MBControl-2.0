import React, { useEffect, useState } from 'react'
import { DataTables } from '../../../components/Atoms/Tables/DataTables'
import { petitions } from '../../../services/api/petitions'

export const IncomeProviders = () => {
  const [object, setObject] = useState()

  const { getObject } = petitions()

  useEffect(() => {
    getObject('/providerInCome', setObject)
  }, [])

  let updatedIncomeProvider = []
  object?.forEach(item => {
    let element =
    {
      id: item.id,
      name: item.name,
      invoiceAmount: item.invoiceAmount + ' ' + '%',
      noInvoiceAmount: item.noInvoiceAmount + ' ' + '%',
      invoiceTotal: item.invoiceTotal === false ? 'Parcial' : 'Total',
      noInvoiceTotal: item.noInvoiceTotal === false ? 'Parcial' : 'Total'
    }
    updatedIncomeProvider.push(element)
  })
 
  let columnFields = [
    
    {
      field: 'name',
      headerName: 'Proveedor',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 200,
      

  },
 
  
  {
      field: 'invoiceAmount',
      headerName: 'Costo Facturacion',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 220,

  },

  {
      field: 'noInvoiceAmount',
      headerName: 'Costo sin Factura',
      type: 'string',
      width: 220,
  },
 
  {
      field: 'invoiceTotal',
      headerName: 'Total/Parcial Facturacion',
      type: 'string',
      width: 265,
  },
 
  {
      field: 'noInvoiceTotal',
      headerName: 'Total/Parcial Sin Factura',
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
  //                                 (cellvalues.row.isLocked === true) ? 'El provedor de ingreso ha sido activado.' : 'El provedor de ingreso ha sido desactivado.',
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
      buttonRoute={'/newincomeprovider'}
      object={updatedIncomeProvider}
      columnFields={columnFields}
      buttonText={'Nuevo Proveedor Ingreso'}
    />
  )
}