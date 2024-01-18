import React from 'react'
import { DataTables } from '../../../../components/Atoms/Tables/DataTables'

export const Users = () => {
  let columnFields=[
    {
      field:'userName',
      headerName:'Nombre',
      description:'Nombre'
    },
    {
      field:'email',
      headerName:'Email',
      description:'Email'
    }, 
    {
      field:'roles',
      headerName:'Rol',
      description:'Rol'
    },
    {
      field:'isConfirmed',
      headerName:'Estatus',
      description:'Estatus'
    },     
    {
      field:'requestedAt',
      headerName:'Requerido',
      description:'Email'
    }, 
    {
      field:'confirmedAt',
      headerName:'Confirmado',
      description:'Email'
    }, 
  

  ]
  return (    
    <DataTables
    route={'/user'}
    columnFields={columnFields}
    buttonText={'Nuevo Usuario'}
    />    
  )
}