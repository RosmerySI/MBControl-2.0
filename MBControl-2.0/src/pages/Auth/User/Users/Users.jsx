import React, { useEffect, useState } from 'react'
import { ColumnsTables } from '../../../../components/Atoms/Columns/ColumnsTables'
import { DataTables } from '../../../../components/Atoms/Tables/DataTables'
import { petitions } from '../../../../services/api/petitions'

export const Users = () => {

    const [object, setObject] = useState()

    const { getObject} = petitions()

    useEffect(() => {
        getObject('/user', setObject)    
    }, [])

    let userObject = []
    object?.forEach((item) => {
        const dateUTCRequested = new Date(item.requestedAt);
        const dateLocalRequested = dateUTCRequested.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        const dateUTCConfirmed = new Date(item.confirmedAt);
        const dateLocalConfirmed = dateUTCConfirmed.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        let element = {
            confirmedAt: dateLocalConfirmed,
            email: item.email,
            isConfirmed: item.isConfirmed,
            isLocked: item.isLocked ? 'Desactivado' : 'Activado',
            requestedAt: dateLocalRequested,
            userName: item.userName,
            roles: item.roles,
        }
        userObject.push(element)
    });

    let columnsName = [
        {field:'userName',headerName:'Nombre',description:'',width:150},
        {field:'email',headerName:'Email',description:'',width:250},
        {field:'roles',headerName:'Rol',description:'',width:120},
        {field:'isLocked',headerName:'Estatus',description:'',width:150},
        {field:'requestedAt', headerName:'Atrequerido',description:'',width:200},
        {field:'confirmedAt', headerName:'Atconfirmado',description:'',width:200},
    ]
    
    let route='/newuser'
    
    const { columnsTables } = ColumnsTables(
        columnsName,        
        route,
        setObject,                
    )

    return (
        <DataTables
            buttonRoute={'/newuser'}
            object={userObject}
            columnFields={columnsTables}
            buttonText={'Nuevo Usuario'}
        />
    )
}