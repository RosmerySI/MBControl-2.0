import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTables } from '../../../../components/Atoms/Tables/DataTables';
import { ModelsTable } from '../../../../components/Atoms/Tables/ModelsTable';
import { Box, Button, Modal } from '@mui/material';
import { petitions } from '../../../../services/api/petitions';
import { userInfo } from '../../../../utilities/userInfo/userInfo';
import edit from '../../../../assets/images/edit.png';
import list from '../../../../assets/images/lista.png';


export const Clients = () => {
    const [object, setObject] = useState()
    
    const [client, setClient] = useState()

    const { getObject } = petitions()

    const {userrole} = userInfo()

    useEffect(() => {
        getObject('/client', setObject)        
    }, [])

    const navigate=useNavigate()
    const handleClickEditar=async(event, cellvalues)=>{
        const clientId = cellvalues.row.id;        
        navigate(`/newclient/${clientId}`)  
    } 

    const modelsClient= client?.models
    
    let objectModelsCliente=[]
    modelsClient?.forEach(model=>{
        let models={
            name:model.name,
            value:model.value,
            hasIva:model.hasIva?'Con IVA':'Sin IVA',
        }
        objectModelsCliente.push(models)
    })
    const handleClickModelos= async(event, cellvalues)=>{
        const clientId = cellvalues.row.id;
        await getObject(`/client/${clientId}`,setClient);
        setOpen(true); 
    }
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false); 
    
    const modelsColumnsClient =[
        {
            field: 'name',
            headerName: 'Modelos',            
            sortable: true,
            width: 100,

        },
       
        {
            field: 'value',
            headerName: 'Valor',            
            sortable: true,
            width: 100,

        },
        {
            field: 'hasIva',
            headerName: 'IVA',           
            sortable: true,
            width: 100,

        },
    ]
    let columnFields = [
        {
            field: 'name',
            headerName: 'Cliente',
            description: 'Cliente',
            sortable: true,
            width: 150,

        },
        {
            field: 'g3Name',
            headerName: 'G3',
            description: 'G3',
            sortable: true,
            width: 150,

        },
        {
            field: 'userName',
            headerName: 'Admin/Enlace',
            description: 'Admin/Enlace',
            sortable: true,
            width: 200,

        },
        {
            field: 'promoterName',
            headerName: 'Promotor',
            description: 'Promotor',
            sortable: true,
            width: 200,

        },

        {
            field: 'rfc',
            headerName: 'RFC',
            description: 'RFC',
            sortable: true,
            width: 150,

        },
        {
            field: 'Modelos',
            disableColumnMenu: true,
            sortable: false,
            width: 80,
            renderCell: (cellvalues) => {
                return (
                    <div>
                        <Button
                            style={{ backgroundColor: "white", boxShadow: 'none' }}
                            variant='contained'
                            color='primary'
                            onClick={(event) => {
                                handleClickModelos(event, cellvalues);
                            }}
                        >
                            <img style={{width:'30px',height:'25px',margin:'0px'}} src={list} />
                        </Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 350,
                                height: 350,
                                bgcolor: 'background.paper',
                                borderRadius: '20px',
                                boxShadow: 24,
                                p: 4,
                            }}>
                            <ModelsTable
                            rows={objectModelsCliente}
                            columns={modelsColumnsClient}/>                      
                              
                            </Box>
                        </Modal>
                    </div>
                )
            }

        },
        {
            field: (userrole === 'Admin') && 'Editar',
            disableColumnMenu: true,
            sortable: false,
            width: 100,
            renderCell: (cellvalues) => {
                return (

                    (userrole === 'Admin') &&

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
                        <img style={{width:'30px',height:'25px',margin:'0px'}} src={edit} />
                    </Button>


                )
            }

        },
        // {
        //     field: 'Activar/Desactivar',
        //     disableColumnMenu: true,
        //     sortable: false,
        //     width: 150,
        //     renderCell: (cellvalues) => {

        //         return (
        //             <Button
        //                 style={{
        //                     backgroundColor: "white",
        //                     boxShadow: 'none',
        //                     marginLeft:'20px'
        //                 }}
        //                 variant='contained'
        //                 color={(cellvalues.row.isLocked === true) ? 'success' : 'error'}
        //                 onClick={(event) => {

        //                     Swal.fire({
        //                         title: 'Estás segur@?',
        //                         text: (cellvalues.row.isLocked === true) ? "¿Quires activar el cliente?" : "¿Quires desactivar el cliente?",
        //                         icon: 'warning',
        //                         showCancelButton: true,
        //                         confirmButtonColor: '#3085d6',
        //                         cancelButtonColor: '#d33',
        //                         confirmButtonText: (cellvalues.row.isLocked === true) ? "Si, actívalo!" : "Si, desactívalo!",
        //                     }).then((result) => {
        //                         if (result.isConfirmed) {
        //                             (cellvalues.row.isLocked === true) ?
        //                                 handleClickActivar(event, cellvalues)
        //                                 :
        //                                 handleClickDesactivar(event, cellvalues)
        //                             Swal.fire(
        //                                 (cellvalues.row.isLocked === true) ? "Activado!" : "Desctivado!",
        //                                 (cellvalues.row.isLocked === true) ? 'El cliente ha sido activado.' : 'El cliente ha sido desactivado.',
        //                                 'success'
        //                             )
        //                         } 
        //                     })
        //                 }}
        //             >
        //                 {(cellvalues.row.isLocked === true) ?
        //                     <img className="usuarioPage_usuarioContainer_unchecked" src="../../../../img/check.png" />
        //                     :
        //                     <img className="usuarioPage_usuarioContainer_unchecked" src="../../../../img/uncheck.png" />
        //                 }
        //             </Button>
        //         )
        //     }
        // },
    ]
    return (
        <DataTables
            buttonRoute={'/newClient'}
            object={object}
            columnFields={columnFields}
            buttonText={'Nuevo Cliente'}
        />
    )
}
