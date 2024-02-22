import React, { useEffect, useState } from 'react'
import { Box, Button, Modal } from '@mui/material';
import { ModelsTable } from '../../Atoms/Tables/ModelsTable';
import { petitions } from '../../../services/api/petitions';
import list from '../../../assets/images/lista.png';

export const ModelsTableSideBar = (cellvalues, route) => {

    const [models, setModelsObject] = useState([])

    const { getObject } = petitions()

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    let objectModels = []
    const handleClickModelos = async () => {
        const id = cellvalues.row.id
        await getObject(route==='/newclient'?`/client/${id}`:`/promoter/${id}`,setModelsObject);
        setOpen(true); 
    }
    
    models?.models?.forEach(model => {
        let models
        if (route === '/newclient') {
            models = {
                name: model.name,
                value: model.value,
                hasIva: model.hasIva ? 'Con IVA' : 'Sin IVA',
            }
        } else {
            models = {
                name: model.name,
                value: model.value,
                comercialCost: model.comercialCost,
                isPercent: model.isPercent ? '%' : 'Piso',
            }
        }
        objectModels.push(models)
    })

    const columnsPromoter = [
        {
            field: 'name',
            headerName: 'Modelos',
            sortable: true,
            width: 100,
        },
        {
            field: 'value',
            headerName: 'Comision',
            sortable: true,
            width: 100,
        },
        {
            field: 'comercialCost',
            headerName: 'Costo Comercial',
            sortable: true,
            width: 100,

        },
        {
            field: 'isPercent',
            headerName: 'Porciento/Piso',
            sortable: true,
            width: 120,

        },
    ]

    const columnsClient = [
        {
            field: 'name',
            headerName: 'Modelos',
            sortable: true,
            width: 100
        },
        {
            field: 'value',
            headerName: 'Valor',
            sortable: true,
            width: 100
        },
        {
            field: 'hasIva',
            headerName: 'IVA',
            sortable: true,
            width: 100
        }
    ]

    return (
        <div>
            <Button
                style={{ backgroundColor: "white", boxShadow: 'none' }}
                variant='contained'
                color='primary'
                onClick={handleClickModelos}
            >
                <img style={{ width: '30px', height: '25px', margin: '0px' }} src={list} />
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
                    width: 480,
                    height: 350,
                    bgcolor: 'background.paper',
                    borderRadius: '20px',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <ModelsTable
                        rows={objectModels}
                        columns={route === '/newclient' ? columnsClient : columnsPromoter} 
                    />
                </Box>
            </Modal>
        </div>
    )
}
