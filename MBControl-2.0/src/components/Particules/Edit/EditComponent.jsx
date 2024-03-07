import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import edit from '../../../assets/images/edit.png'
import { petitions } from '../../../services/api/petitions';

export const EditComponent = (cellvalues, route, setEdit) => {
   
    const [roles, setRoles] = useState()
    const{getObject}=petitions()
    useEffect(() => {
        getObject('rol', setRoles)
    }, [])

    let toEditUserRolesId = []
 
    roles?.forEach(item => {
        cellvalues.row.roles?.forEach(element => {
            if (item.name === element) {
                toEditUserRolesId.push(item.name)                
            }           
        })
    })
   
    const navigate = useNavigate()

    const handleClickEdit = () => {
        const email = cellvalues.row.email
        const role = cellvalues.row.roles
        const id = cellvalues.row.id
        const name= cellvalues.row.name
        //const clientId = cellvalues.row.id;        
        //navigate(`/newclient/${clientId}`)
        // const promoterId = cellvalues.row.id
        // navigate(`/newpromoter/?promoterId:${promoterId}`) 
        // const operationId = cellvalues.row.id;
        // navigate(`/newoperation/?operationId:${operationId}`) 
        if (role) {
            navigate(`${route}?email=${email}`)
            setEdit(toEditUserRolesId)
        } else {
            
            switch (route) {
                case '/newcompany':
                    navigate(route)
                    setEdit(name)   
                break;
                case `/newoperation/?idedit=${id}`:
                    navigate(route)   
                break;
                case '/newclient':
                    navigate(`/newclient/?id=${id}`)
                default:
                    
                    break;
            }
            
        }
    }
    return (
        <Button
            style={{ backgroundColor: "white", boxShadow: 'none' }}
            variant='contained'
            color='primary'
            onClick={handleClickEdit}>
            <img style={{ width: '30px', height: '25px', margin: '0px' }} src={edit} />
        </Button>
    )
}
