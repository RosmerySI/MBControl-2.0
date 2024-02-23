import React from 'react'
import { EditComponent } from '../../Particules/Edit/EditComponent';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material'
import list from '../../../assets/images/lista.png'
import graphic from '../../../assets/images/show.png'

export const ColumnsOperationsTable = (suboperation) => {
  
  const navigate = useNavigate()
  const handleClickGraphic = (event, cellvalues) => {
    const operationId = cellvalues.row.id;
    navigate(`/pieOperation/?operationId=${operationId}`)
  }  
  const handleClickSubOperaciones = async (event, cellvalues) => {
    const parentOperationId = cellvalues.row.id;
    navigate(`/suboperations/?parentOperationId=${parentOperationId}`);    
  }  

  const columnsOperationsTable = [
    {
      field: 'createdAt',
      headerName: 'Creado',
      description: 'Creado a',
      sortable: false,
      width: 250,
    },
    {
      field: 'g3Name',
      headerName: 'G3',
      description: 'G3',
      sortable: false,
      width: 120,
    },
    {
      field: 'promoterName',
      headerName: 'Promotor',
      description: 'Promotor',
      sortable: false,
      width: 160,
    },
    {
      field: 'clientName',
      headerName: 'Cliente',
      description: 'Cliente',
      sortable: false,
      width: 150,
    },
    {
      field: 'companyName',
      headerName: 'Empresa',
      description: 'Empresa',
      sortable: false,
      width: 160,
    },
    {
      field: 'providerIncome',
      headerName: 'Proveedor Ingreso',
      description: 'Proveedor Ingreso',
      sortable: false,
      width: 160,
    },
    {
      field: 'folio',
      headerName: 'Folio',
      description: 'Folio de Operación',
      sortable: false,
      width: 150,
    },
    {
      field: 'factura',
      headerName: 'Factura',
      description: 'Factura de la Operación',
      sortable: false,
      width: 150,
    },
    {
      field: 'subTotalOperacion',
      headerName: 'Subtotal Operaciones',
      description: 'Subtotal de Operaciones',
      sortable: false,
      width: 240,
    },
    {
      field: 'iva',
      headerName: 'IVA',
      description: 'IVA',
      sortable: false,
      width: 150,
    },
    {
      field: 'totalOperacion',
      headerName: 'Total Operaciones',
      description: 'Monto Total de la Operación',
      sortable: false,
      width: 220,
    },
    {
      field: 'product',
      headerName: 'Producto',
      description: 'Producto',
      sortable: false,
      width: 160,
    },
    {
      field: 'clientPercent',
      headerName: '% Cliente',
      description: 'Producto',
      sortable: false,
      width: 160,
    },
    {
      field: 'comisionTotal',
      headerName: 'Comisión Total',
      description: 'Total de Comision',
      sortable: false,
      width: 200,
    },
    {
      field: 'retornoTotalCliente',
      headerName: 'Retorno Total',
      description: 'Retorno Total',
      sortable: false,
      width: 200,
    },
    {
      field: 'comercialCostPercent',
      headerName: '% Costo Comercial  ',
      description: ' ',
      sortable: false,
      width: 200,
    },
    {
      field: 'comercialCost',
      headerName: 'Costo Comercial',
      description: '',
      sortable: false,
      width: 200,
    },
    {
      field: 'providerIncomePercent',
      headerName: '% Costo Proveedor Ingreso ',
      description: ' ',
      sortable: false,
      width: 200,
    },
    {
      field: 'costoProviderIncome',
      headerName: 'Costo Proveedor Ingreso',
      description: '',
      sortable: false,
      width: 200,
    },
    {
      field: 'providerOutcomeName',
      headerName: ' Proveedor Egreso ',
      description: '',
      sortable: false,
      width: 200,
    },
    {
      field: 'providerOutcomePercent',
      headerName: '% Proveedor Egreso ',
      description: '',
      sortable: false,
      width: 200,
    },
    {
      field: 'costoProviderOutcome',
      headerName: 'Costo Proveedor Egreso',
      description: '',
      sortable: false,
      width: 200,
    },
    {
      field: 'realCost',
      headerName: 'Costo Real',
      description: 'Costo',
      sortable: false,
      width: 200,
    },
    {
      field: 'comisionPromoter',
      headerName: 'Comisión Promotor',
      description: 'Comisión del Promotor',
      sortable: false,
      width: 230,
    },
    {
      field: 'concentradora',
      headerName: 'Concentradora',
      description: 'Concentradora',
      sortable: false,
      width: 230,
    },
    {
      field: 'comisionUtilidadMB',
      headerName: 'Utilidad MB',
      description: 'Utilidad de Market',
      sortable: false,
      width: 180,
    },
    {
      field: 'excedente',
      headerName: 'Saldo Cliente',
      description: 'Saldo Disponible por Retorno',
      sortable: false,
      width: 200,
    },
    {
      field: 'completed',
      headerName: 'Estatus',
      description: 'Estatus de la operación',
      sortable: false,
      width: 150,
      renderCell: (cellvalues) => {
        return (
          <>
            {
              cellvalues.row.createdAt !== 'Totales' &&
              <div 
              style={{ background: cellvalues.completed ? '#2e7d32' : '#d32f2f',
               padding: '10px', borderRadius: '10px', color: '#ffff' }}>
                {cellvalues.completed ? 'Completado' : 'En curso'}
              </div>
            }
          </>
        )
      }
    },
    {
      field: 'userName',
      headerName: 'Admin/Enlace',
      description: 'Rol del ususario',
      sortable: false,
      width: 200,
    },
    {
      field: 'updatedAt',
      headerName: 'Editado',
      description: 'Editado a',
      sortable: false,
      width: 250,
    },
    {
      field: 'isTotalRetorno',
      headerName: 'Tipo de Retorno',
      description: 'Retorno Total o Parcial',
      sortable: false,
      width: 200,
    },
    {
      field: 'ADR',
      headerName: 'ADR',
      description: 'Comisión ADR',
      sortable: false,
      width: 150,
    },
    {
      field: 'CUCA',
      headerName: 'CUCA',
      description: 'Comisión CUCA',
      sortable: false,
      width: 150,
    },
    {
      field: 'Finpulso',
      headerName: 'Finpulso',
      description: 'Comisión Finpulso',
      sortable: false,
      width: 200,
    },
    {
      field: 'Monedero',
      headerName: 'Monedero',
      description: 'Comisión Finpulso',
      sortable: false,
      width: 200,
    },
    {
      field: 'Asimilado',
      headerName: 'Asimilado',
      description: 'Comisión Finpulso',
      sortable: false,
      width: 200,
    },
    {
      field: 'Efectivo',
      headerName: 'Efectivo',
      description: 'Comisión Finpulso',
      sortable: false,
      width: 200,
    },
    {
      field: 'TranferEx',
      headerName: 'TranferEx',
      description: 'Comisión Finpulso',
      sortable: false,
      width: 200,
    },
    {
      field: 'CONSAR',
      headerName: 'CONSAR',
      description: 'Comisión Finpulso',
      sortable: false,
      width: 200,
    },
    {
      field: 'SINDICATO',
      headerName: 'SINDICATO',
      description: 'Comisión Finpulso',
      sortable: false,
      width: 200,
    },
    {
      field: 'TransferSim',
      headerName: 'TransferSim',
      description: 'Comisión Finpulso',
      sortable: false,
      width: 200,
    },
    {
      field: 'Gráfica',
      disableColumnMenu: true,
      sortable: false,
      width: 120,
      renderCell: (cellvalues) => {
        return (
          (cellvalues.row.createdAt !== 'Totales') &&
          <Button
            style={{ backgroundColor: "white", boxShadow: 'none' }}
            variant='contained'
            color='primary'
            onClick={(event)=>{handleClickGraphic(event, cellvalues)}}
          >
            <img style={{ width: '30px', height: '25px', margin: '0px' }} src={graphic} />
          </Button>
        )
      }
    },
    {
      field: 'Sub-Operaciones',
      disableColumnMenu: true,
      sortable: false,
      width: 80,
      renderCell: (cellvalues) => {
        return (
          !suboperation&&
          (cellvalues.row.createdAt !== 'Totales') &&
          <>
            {
              cellvalues.row.clientName !== 'Totales' &&
              <div >
                <Button
                  style={{ backgroundColor: "white", boxShadow: 'none' }}
                  variant='contained'
                  color='primary'
                  onClick={(event)=>{handleClickSubOperaciones(event, cellvalues)}}
                >
                  <img style={{ width: '30px', height: '25px', margin: '0px' }} src={list} />
                </Button>
              </div>
            }
          </>
        )
      }
    },
    {
      field:'Editar',
      disableColumnMenu: true,
      sortable: false,
      width: 90,
      renderCell: (cellvalues) => {
        return (!suboperation&&(cellvalues.row.createdAt !== 'Totales') &&EditComponent(cellvalues,`/newoperation?idedit=${cellvalues.row.id}`))
      }
    },
    {
      field:'Suboperación',
      disableColumnMenu: true,
      sortable: false,
      width: 150,
      renderCell: (cellvalues) => {
        return (!suboperation&&
          <>
            {
              (cellvalues.row.createdAt !== 'Totales') &&
              <Button
                variant='contained'
                color={!cellvalues.row.status ? 'error' : 'success'}
                onClick={(event) => {
                  if (!cellvalues.row.status) {
                    navigate(`/newoperation?id=${cellvalues.row.id}`)
                  }
                }}
              >
                +
              </Button>
            }
          </>
        )
      }
    },
  ];
  return {columnsOperationsTable}
}
