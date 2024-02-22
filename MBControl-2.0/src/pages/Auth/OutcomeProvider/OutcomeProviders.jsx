import React, { useEffect, useState } from 'react'
import { DataTables } from '../../../components/Atoms/Tables/DataTables'
import { petitions } from '../../../services/api/petitions'
import { ColumnsTables } from '../../../components/Atoms/Columns/ColumnsTables'

export const OutcomeProviders = () => {
  const [object, setObject] = useState()

  const { getObject } = petitions()

  useEffect(() => {
    getObject('/providerOutCome', setObject)
  }, [])


  let updatedOutcomeProvider = []
  object?.forEach(item => {
    let modelName = ''
    let totalCharge = ''
    let charge = ''
    item.providerOutComeModels?.forEach(model => {
      modelName += model.modelName + '/ '
      charge += model.charge + '%/ '
      totalCharge += model.isTotal ? 'Total/' : 'Parcial/'

    })
    let element =
    {
      id: item.id,
      charge: charge,
      name: item.name,
      isTotal: totalCharge,
      models: modelName
    }
    updatedOutcomeProvider.push(element)


  })

  let columnsName = [
    {field:'name',headerName:'Proveedor',description:'',width:170},
    {field:'charge',headerName:'Costos',description:'',width:220},
    {field:'isTotal',headerName:'Total/Parcial',description:'',width:320},
    {field:'models',headerName:'Modelos',description:'',width:500},   
  ]

  let route = '/outcomeProvider'

  const { columnsTables } = ColumnsTables(
    columnsName,
    route
  )

  return (
    <DataTables
      buttonRoute={'/newoutcomeprovider'}
      object={updatedOutcomeProvider}
      columnFields={columnsTables}
      buttonText={'Nuevo Proveedor Egreso'}
    />
  )
}