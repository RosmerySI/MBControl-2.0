import React, { useEffect, useState } from 'react'
import { DataTables } from '../../../../components/Atoms/Tables/DataTables'
import { petitions } from '../../../../services/api/petitions'

export const Invoices = () => {
  const [object, setObject] = useState()

  const { getObject } = petitions()

  useEffect(() => {
    getObject('/invoice', setObject)
  }, [])

  let updatedInvoice =[]
   
  object?.forEach(item => {     
      let element ={
        id: item.id,
        userEmail: item.userEmail,
        number: item.number,
        remainingAmount:'$'+ ' ' +item.remainingAmount,
        totalAmount:'$'+ ' ' +item.totalAmount,
        createdAt:item.createdAt,
        updatedAt:item.updatedAt,
        company:item.company.name,
      }
    updatedInvoice.push(element)
  })

  let columnFields=[
    {
      field: 'number',
      headerName: 'Número',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 150,


  },
  {
      field: 'company',
      headerName: 'Empresa',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 150,


  },

  {
      field: 'totalAmount',
      headerName: 'Total',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 270,

  },

  {
      field: 'remainingAmount',
      headerName: 'Remanente',
      type: 'string',
      width: 165,
  },
  {
      field: 'userEmail',
      headerName: 'Usuario',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 300,


  },
  { field: 'createdAt', headerName: 'Creado', width: 220 },
  { field: 'updatedAt', headerName: 'Actualizado', width: 220 },
  ]
  return (    
    <DataTables
    buttonRoute={'/newinvoice'}
    object={updatedInvoice}
    columnFields={columnFields}
    buttonText={'Nueva Factura'}
    />    
  )
}