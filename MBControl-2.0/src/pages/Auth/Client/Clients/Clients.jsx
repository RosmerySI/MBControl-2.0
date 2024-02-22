import React, { useEffect, useState } from 'react';
import { DataTables } from '../../../../components/Atoms/Tables/DataTables';
import { ColumnsTables } from '../../../../components/Atoms/Columns/ColumnsTables';
import { petitions } from '../../../../services/api/petitions';


export const Clients = () => {

    const [object, setObject] = useState() 
    
    const { getObject } = petitions()

    useEffect(() => {
        getObject('/client', setObject)        
    }, []) 
   
    let columnsName = [
        {field:'name',headerName:'Cliente',description:'',width:150},
        {field:'g3Name',headerName:'G3',description:'',width:120},
        {field:'userName',headerName:'Admin/Enlace',description:'',width:190},
        {field:'promoterName',headerName:'Promotor',description:'',width:160},
        {field:'rfc',headerName:'RFC',description:'',width:150},       
    ]
    
    let route='/newclient'
    
    const { columnsTables} = ColumnsTables(
        columnsName,
        route                            
    )

    return (
        <DataTables
            buttonRoute={'/newClient'}
            object={object}
            columnFields={columnsTables}
            buttonText={'Nuevo Cliente'}
        />
    )
}
