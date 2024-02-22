import React from 'react'
import { DataTables } from '../../../../components/Atoms/Tables/DataTables'
import { ColumnsOperationsTable } from '../../../../components/Atoms/Columns/ColumnsOperationsTable';
import { OperationsObject } from '../../../../components/Particules/Operations/OperationsObject';

export const SubOperations = () => {
  
  const {updatedOperation}=OperationsObject()
  let suboperation=true
  const {columnsOperationsTable} = ColumnsOperationsTable(suboperation)

  return (
    <DataTables
      buttonRoute={'/newoperation'}
      object={updatedOperation}
      columnFields={columnsOperationsTable}
      buttonText={'Nueva Operación'}
      pie={true} 
           
    />
  )
}