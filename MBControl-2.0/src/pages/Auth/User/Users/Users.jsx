import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { DataTables } from '../../../../components/Atoms/Tables/DataTables'
import { petitions } from '../../../../services/api/petitions'
import { modalSuccess} from '../../../../utilities/modals/modals'
import checked from '../../../../assets/images/check.png'
import unchecked from '../../../../assets/images/uncheck.png'
import edit from '../../../../assets/images/edit.png'
import Swal from 'sweetalert2'

export const Users = () => {

    const [object, setObject] = useState()

    const { getObject,putObject } = petitions()
    let myUsersObject = []
    object?.forEach((item) => {
        const updatedUsers = {
            confirmedAt: item.confirmedAt,
            email: item.email,
            isConfirmed: item.isConfirmed,
            isLocked: item.isLocked ? 'Desactivado' : 'Activado',
            requestedAt: item.requestedAt,
            userName: item.userName,
            roles: item.roles,
        };
        myUsersObject.push(updatedUsers)
    });

    const handleClickActivar = async (event, cellvalues) => {
        try {
            const rowEmail = cellvalues.row.email;
            await putObject(`/user/unlock/${rowEmail}`);
            getObject('/user', setObject)
        } catch (error) {
            console.error("Error al activar usuario:", error);
        }
    };

    const handleClickDesactivar = async (event, cellvalues) => {
        try {
            const rowEmail = cellvalues.row.email;
            await putObject(`/user/lock/${rowEmail}`);
            getObject('/user', setObject)
        } catch (error) {
            console.error("Error al desactivar usuario:", error);
        }
    };

    useEffect(() => {
        getObject('/user', setObject)
    }, [])

    const navigate = useNavigate()
    const handleClickEditar = (event,cellvalues) => {
        const email=cellvalues.row.email
        const role=cellvalues.row.roles
        //
        navigate('/newuser')
    }

    let columnFields = [
        {
            field: 'userName',
            headerName: 'Nombre',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 150,
        },
        {
            field: 'email',
            headerName: 'Email',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 270,
        },
        {
            field: 'roles',
            headerName: 'Rol',
            type: 'string',
            width: 165,
        },
        {
            field: 'isLocked',
            headerName: 'Estatus',
            type: 'string',
            width: 150,
        },
        { field: 'requestedAt', headerName: 'Atrequerido', width: 220 },
        { field: 'confirmedAt', headerName: 'Atconfirmado', width: 220 },
        {
            field: 'Editar',
            disableColumnMenu: true,
            sortable: false,
            width: 70,
            renderCell: (cellvalues) => {
                return (
                    (cellvalues.row.roles !== null) &&

                    <Button
                        style={{
                            backgroundColor: "white",
                            boxShadow: 'none',
                        }}
                        variant='contained'
                        color='primary'
                        onClick={(event) => {
                            handleClickEditar(event, cellvalues);
                        }}
                    >
                        <img style={{ width: '30px', height: '25px', margin: '0px' }} src={edit} />
                    </Button>

                )
            }

        },

        {
            field: 'Desactivado/Activado',
            disableColumnMenu: true,
            sortable: false,
            width: 170,
            renderCell: (cellvalues) => {
                return (
                    (cellvalues.row.roles !== null) &&
                    <Button
                        style={{
                            backgroundColor: "white",
                            boxShadow: 'none',
                        }}
                        variant='contained'
                        color={(cellvalues.row.isLocked === 'Desactivado') ? 'success' : 'error'}
                        onClick={(event) => {

                            Swal.fire({
                                title: 'Estás seguro?',
                                text: (cellvalues.row.isLocked === 'Desactivado') ? "Quires activar a este usuario?" : "Quires desactivar a este usuario?",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: (cellvalues.row.isLocked === 'Desactivado') ? "Si, actívalo!" : "Si, desactívalo!",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    (cellvalues.row.isLocked === 'Desactivado') ?
                                        handleClickActivar(event, cellvalues)
                                        :
                                        handleClickDesactivar(event, cellvalues)
                                    modalSuccess(
                                        (cellvalues.row.isLocked === 'Desactivado') ? "Activado!" : "Desctivado!",
                                        (cellvalues.row.isLocked === 'Desactivado') ? 'El usuario ha sido activado.' : 'El usuario ha sido desactivado.',
                                        'success'
                                    )
                                }
                            })
                        }}
                    >
                        {
                            (cellvalues.row.isLocked === 'Desactivado') ?
                                <img style={{ width: '30px', height: '25px', margin: '0px' }} src={checked} />
                                :
                                <img style={{ width: '30px', height: '25px', margin: '0px' }} src={unchecked} />
                        }
                    </Button>
                )
            }
        },


    ]
    return (
        <DataTables
            buttonRoute={'/newuser'}
            object={myUsersObject}
            columnFields={columnFields}
            buttonText={'Nuevo Usuario'}
        />
    )
}