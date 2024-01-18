import React from 'react'
import { DataTables } from '../../../../components/Atoms/Tables/DataTables'

export const Clients = () => {
  let columnFields=[
    {
      field:'name',
      headerName:'Cliente',
      description:'Cliente'
    },
    {
      field:'g3Name',
      headerName:'G3',
      description:'G3'
    }, 
    {
      field:'userName',
      headerName:'Admin/Enlace',
      description:'Admin/Enlace'
    }, 
    {
      field:'promoterName',
      headerName:'Promotor',
      description:'Promotor'
    }, 
    {
      field:'rfc',
      headerName:'RFC',
      description:'RFC'
    }, 

  ]
  return (    
    <DataTables
    route={'/client'}
    columnFields={columnFields}
    buttonText={'Nuevo Cliente'}
    />    
  )
}
