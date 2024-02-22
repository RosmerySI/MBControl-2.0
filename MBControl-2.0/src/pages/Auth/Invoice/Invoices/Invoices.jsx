import React, { useEffect, useState } from 'react'
import { DataTables } from '../../../../components/Atoms/Tables/DataTables'
import { petitions } from '../../../../services/api/petitions'
import { ColumnsTables } from '../../../../components/Atoms/Columns/ColumnsTables'

export const Invoices = () => {

  const [object, setObject] = useState()

  const { getObject } = petitions()

  useEffect(() => {
    getObject('/invoice', setObject)
  }, [])

  let updatedInvoice =[]
   
  object?.forEach(item => {
    const dateUTCCreated = new Date(item.createdAt);
        const dateLocalCreated = dateUTCCreated.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        const dateUTCUpdated = new Date(item.updatedAt);
        const dateLocalUpdated = dateUTCUpdated.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });     
      let element ={
        id: item.id,
        userEmail: item.userEmail,
        number: item.number,
        remainingAmount:'$'+ ' ' +item.remainingAmount,
        totalAmount:'$'+ ' ' +item.totalAmount,
        createdAt:dateLocalCreated,
        updatedAt:dateLocalUpdated,
        company:item.company.name,
      }
    updatedInvoice.push(element)
  })

  let columnsName = [
    {field:'number',headerName:'Número',description:'',width:150},
    {field:'company',headerName:'Empresa',description:'',width:160},
    {field:'totalAmount',headerName:'Total',description:'',width:130},
    {field:'remainingAmount',headerName:'Remanente',description:'',width:180},
    {field:'userEmail',headerName:'Usuario',description:'',width:260}, 
    {field:'createdAt',headerName:'Creado',description:'',width:195},
    {field:'updatedAt',headerName:'Actualizado',description:'',width:200}      
  ]

  let route='/invoice'

  const { columnsTables } = ColumnsTables(
    columnsName,        
    route             
  )

  return (    
    <DataTables
    buttonRoute={'/newinvoice'}
    object={updatedInvoice}
    columnFields={columnsTables}
    buttonText={'Nueva Factura'}
    />    
  )
}