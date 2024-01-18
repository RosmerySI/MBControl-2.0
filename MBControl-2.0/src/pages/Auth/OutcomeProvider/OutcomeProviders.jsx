import React from 'react'
import { DataTables } from '../../../components/Atoms/Tables/DataTables'

export const OutcomeProviders = () => {
  let columnFields=[
    {
      field:'name',
      headerName:'Proveedor',
      description:'Proveedor'
    },
    {
      field:'invoiceAmount',
      headerName:'Costo Facturación',
      description:'Costo Facturación'
    }, 
    {
      field:'noInvoiceAmount',
      headerName:'Costo sin factura',
      description:'Costo sin factura'
    }, 
    {
      field:'invoiceTotal',
      headerName:'Total/Parcial Facturación',
      description:'Total/Parcial Facturación'
    }, 
    {
      field:'noInvoiceTotal',
      headerName:'Total/Parcial sin Factura',
      description:'Total/Parcial sin Factura'
    }, 
    
  ]
  return (    
    <DataTables
    route={'/providerOutCome'}
    columnFields={columnFields}
    buttonText={'Nuevo Proveedor Egreso'}
    />    
  )
}