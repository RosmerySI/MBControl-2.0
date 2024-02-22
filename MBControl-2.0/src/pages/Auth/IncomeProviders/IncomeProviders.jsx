import React, { useEffect, useState } from 'react'
import { DataTables } from '../../../components/Atoms/Tables/DataTables'
import { petitions } from '../../../services/api/petitions'
import { ColumnsTables } from '../../../components/Atoms/Columns/ColumnsTables'

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

  let columnsName = [
    {field:'name',headerName:'Proveedor',width:200},
    { field:'invoiceAmount',headerName:'Costo Facturacion',description:'',width:250},
    { field:'noInvoiceAmount',headerName:'Costo sin Factura',description:'',width:250},
    { field:'invoiceTotal',headerName:'Total/Parcial Facturacion',description:'',width:300},
    { field:'noInvoiceTotal',headerName:'Total/Parcial Sin Factura',description:'',width:300},
  ]

  let route = '/incomeProvider'

  const { columnsTables } = ColumnsTables(
    columnsName,
    route
  )
  
  return (
    <DataTables
      buttonRoute={'/newincomeprovider'}
      object={updatedIncomeProvider}
      columnFields={columnsTables}
      buttonText={'Nuevo Proveedor Ingreso'}
    />
  )
}