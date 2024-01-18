import React from 'react'
import { DataTables } from '../../../../components/Atoms/Tables/DataTables'

export const Invoices = () => {
  let columnFields=[
    {
      field:'number',
      headerName:'Número',
      description:'Número'
    },
    {
      field:'company',
      headerName:'Empresa',
      description:'Empresa'
    }, 
    {
      field:'totalAmount',
      headerName:'Total',
      description:'Total'
    },
    {
      field:'remainingAmount',
      headerName:'Remanente',
      description:'Remanente'
    },     
    {
      field:'userEmail',
      headerName:'Usuario',
      description:'Usuario'
    }, 
    {
      field:'createdAt',
      headerName:'Creado',
      description:'Creado'
    },
    {
      field:'updatedAt',
      headerName:'Actualizado',
      description:'Actualizado'
    },
  ]
  return (    
    <DataTables
    route={'/invoice'}
    columnFields={columnFields}
    buttonText={'Nueva Factura'}
    />    
  )
}