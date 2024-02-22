import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import edit from '../../../assets/images/edit.png'

export const EditComponent = (cellvalues,route) => {

    const navigate = useNavigate()

    const handleClickEdit = () => {
        const email = cellvalues.row.email
        const role = cellvalues.row.roles
        const id = cellvalues.row.id
        //const clientId = cellvalues.row.id;        
        //navigate(`/newclient/${clientId}`)
        // const promoterId = cellvalues.row.id
        // navigate(`/newpromoter/?promoterId:${promoterId}`) 
        // const operationId = cellvalues.row.id;
        // navigate(`/newoperation/?operationId:${operationId}`) 
        navigate(route)
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
