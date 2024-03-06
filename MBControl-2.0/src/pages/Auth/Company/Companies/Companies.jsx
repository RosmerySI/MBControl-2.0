import React, { useEffect, useState } from 'react'
import { DataTables } from '../../../../components/Atoms/Tables/DataTables'
import { petitions } from '../../../../services/api/petitions'
import { ColumnsTables } from '../../../../components/Atoms/Columns/ColumnsTables'

export const Companies = ({setEditCompany}) => {

  const [object, setObject] = useState()

  const { getObject } = petitions()

  useEffect(() => {
    getObject('/company', setObject)
  }, [])

  let columnsName = [{field: 'name',headerName: 'Nombre',description:'',width:300}]

  let route = '/newcompany'
  
  const { columnsTables } = ColumnsTables(
    columnsName,
    route,
    setObject,
    setEditCompany
  )

  return (
    <DataTables
      buttonRoute={'/newcompany'}
      object={object}
      columnFields={columnsTables}
      buttonText={'Nueva Empresa'}
    />
  )
}