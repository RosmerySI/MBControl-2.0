import React from 'react'
import { DataTables } from '../../../../components/Atoms/Tables/DataTables'

export const Promoters = () => {
  let columnFields=[
    {
      field:'name',
      headerName:'Promotor',
      description:'Promotor'
    },
    {
      field:'g3Name',
      headerName:'G3',
      description:'G3'
    }, 
    {
      field:'link',
      headerName:'Enlace',
      description:'Enlace'
    },
    {
      field:'userName',
      headerName:'Admin/Enlace',
      description:'Admin/Enlace'
    },     
    {
      field:'email',
      headerName:'Email',
      description:'Email'
    }, 
    {
      field:'contactByEmail',
      headerName:'Email',
      description:'Email'
    }, 
    {
      field:'phone',
      headerName:'Teléfono',
      description:'WhatsApp'
    }, 
    {
      field:'contactByPhone',
      headerName:'WhatsApp',
      description:'WhatsApp'
    }, 

  ]
  return (    
    <DataTables
    route={'/promoter'}
    columnFields={columnFields}
    buttonText={'Nuevo Promotor'}
    />    
  )
}