import React from 'react'
import { petitions } from '../../../services/api/petitions';
import { Button } from '@mui/material';
import { modalSuccess } from '../../../utilities/modals/modals';
import Swal from 'sweetalert2';
import check from '../../../assets/images/check.png'
import uncheck from '../../../assets/images/uncheck.png'

export const UserActivation = (cellvalues,setObject) => {

    const {getObject, putObject } = petitions()

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
    return (
        <Button
            style={{ backgroundColor: "white", boxShadow: 'none' }}
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
                    <img
                        style={{ width: '30px', height: '25px', margin: '0px' }}
                        src={check} />
                    :
                    <img
                        style={{ width: '30px', height: '25px', margin: '0px' }}
                        src={uncheck} />
            }
        </Button>
    )
}
