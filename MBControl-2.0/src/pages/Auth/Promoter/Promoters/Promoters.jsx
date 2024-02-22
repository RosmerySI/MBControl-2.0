import React, { useEffect, useState } from 'react'
import { DataTables } from '../../../../components/Atoms/Tables/DataTables'
import { petitions } from '../../../../services/api/petitions'
import { ColumnsTables } from '../../../../components/Atoms/Columns/ColumnsTables'



export const Promoters = () => {

  const [object, setObject] = useState()

  const { getObject } = petitions()
  
  useEffect(() => {
    getObject('/promoter', setObject)
  }, [])
    
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

  let columnsName = [
    {field:'name',headerName:'Promotor',description: 'Nombre del Promotor',width:160},
    {field:'g3Name',headerName:'G3',description: 'G3',width:120},
    {field:'enlace',headerName:'Enlace',description:'Enlace asignado al Promotor',width:150},
    {field:'userName',headerName:'Admin/Enlace',description: 'Nombre de Usuario',width:190},
    {field:'email',headerName:'Email',description:'Email',width:250},
    {field:'contactByEmail',headerName:'Email',description:'Si se puede contactar por email',width:140},
    {field:'contactByPhone',headerName:'WhatsApp',description:'Si se puede contactar por WhatsApp',width:170},
    {field:'phone',headerName:'Teléfono',description:'Si se puede contactar por WhatsApp',width:160},       
  ]

  let route='/newpromoter'

  const { columnsTables } = ColumnsTables(
    columnsName,  
    route                
  )
  
  return (
    <DataTables
      buttonRoute={'/newpromoter'}
      object={updatedPromoters}
      columnFields={columnsTables}
      buttonText={'Nuevo Promotor'}
    />
  )
}