import React from 'react'
import { DataTables } from '../../../../components/Atoms/Tables/DataTables'

export const Companies = () => {
  let columnFields=[
    {
      field:'name',
      headerName:'Empresa',
      description:'Nombre de la Empresa'
    },  

  ]
  return (    
    <DataTables
    route={'/company'}
    columnFields={columnFields}
    buttonText={'Nueva Empresa'}
    />     
  )
}