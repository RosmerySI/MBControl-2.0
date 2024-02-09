import React, { useEffect, useState } from 'react'
import { DataTables } from '../../../../components/Atoms/Tables/DataTables'
import { petitions } from '../../../../services/api/petitions'
import { Button } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import edit from '../../../../assets/images/edit.png'
import list from '../../../../assets/images/lista.png'
import graphic from '../../../../assets/images/show.png'

export const Operations = () => {

  const [object, setObject] = useState()

  const { getObject } = petitions()

  const [params] = useSearchParams();
  const email = params.get('email');
  const startDate = params.get('startDate');
  const endDate = params.get('endDate');
     
  useEffect(() => {   
    getObject(startDate?
    `/operation?email=${email?email:''}&startDate=${startDate?startDate:''}
    &endDate=${endDate?endDate:''}`:
    '/operation', setObject)  
  }, [])

  const [openCrear, setOpenCrear] = React.useState(false);
  const handleOpenCrear = () => setOpenCrear(true);
  const handleCloseCrear = () => setOpenCrear(false);

  //edit
  // const [params] = useSearchParams();
  // const email = params.get('email');
  // const startDate = params.get('startDate');
  // const endDate = params.get('endDate');
  // useEffect(() => {
  //   getOperaciones(email, startDate, endDate)
  //   getFolio(userEmail)
  //   setSessionName('Operaciones')  
  // }, []);

    let counter = 0
  let updatedOperation = []
 
  object?.forEach(item => {
    let element =
    {
      clientId: item.clientId,
      clientName: item.clientName,
      comisionPromoter: '$' + ' ' + item.comisionPromoter,
      comisionTotal: '$' + ' ' + item.comisionTotal,
      comisionUtilidadMB: '$' + ' ' + item.comisionUtilidadMB,
      companyId: item.companyId,
      companyName: item.companyName,
      completed: item.userName === 'Totales' ? item.completed ? 'Completado' : 'En curso' : '',
      createdAt: item.userName !== 'Totales' ? item.createdAt : 'Totales',
      updatedAt: item.userName !== 'Totales' ? item.updatedAt : '',
      excedente: '$' + ' ' + item.excedente,
      factura: item.invoice,
      folio: item.userName !== 'Totales' ? item.folio : '',
      id: item.id,
      isTotalRetorno: item.userName !== 'Totales' ? item.isTotalRetorno ? 'Total' : 'Parcial' : '',
      iva: '$' + ' ' + item.iva,
      promoterId: item.promoterId,
      promoterName: item.promoterName,
      retornoTotalCliente: '$' + ' ' + item.models[0]?.retorno,
      subTotalOperacion: '$' + ' ' + item.subTotalOperacion,
      totalOperacion: '$' + ' ' + item.totalOperacion,
      costoProviderOutcome: '$' + ' ' + item.costoProviderOutcome,
      costoProviderIncome: '$' + ' ' + item.costoProviderIncome,
      realCost: '$' + ' ' + item.costoProviderOutcome + item.costoProviderIncome,
      concentradora: '$' + ' ' + (item.comisionTotal - (item.costoProviderOutcome + item.costoProviderIncome)),
      userName: item.userName !== 'Totales' ? item.userName : '',
      product: item.models[0]?.name,
      providerIncome: item.models[0]?.providerIncomeName,
      clientPercent: item.models[0]?.clientPercent + ' ' + '%',
      comercialCostPercent: item.models[0]?.comercialCostPercent + ' ' + '%',
      providerIncomePercent: item.models[0]?.providerIncomePercent + ' ' + '%',
      providerOutcomePercent: item.models[0]?.providerOutcomePercent + ' ' + '%',
      providerOutcomeName: item.models[0]?.providerOutcomeName,
      ADR: item.userName !== 'Totales' ? item.models[0]?.name === 'ADR' ? '$' + ' ' + item.models[0]?.retorno : '$' + ' ' + 0 : '',
      CUCA: item.userName !== 'Totales' ? item.models[0]?.name === 'CUCA' ? '$' + ' ' + item.models[0]?.retorno : '$' + ' ' + 0 : '',
      Finpulso: item.userName !== 'Totales' ? item.models[0]?.name === 'Finpulso' ? '$' + ' ' + item.models[0]?.retorno : '$' + ' ' + 0 : '',
      Monedero: item.userName !== 'Totales' ? item.models[0]?.name === 'Monedero' ? '$' + ' ' + item.models[0]?.retorno : '$' + ' ' + 0 : '',
      Asimilado: item.userName !== 'Totales' ? item.models[0]?.name === 'Asimilado' ? '$' + ' ' + item.models[0]?.retorno : '$' + ' ' + 0 : '',
      Efectivo: item.userName !== 'Totales' ? item.models[0]?.name === 'Efectivo' ? '$' + ' ' + item.models[0]?.retorno : '$' + ' ' + 0 : '',
      TranferEx: item.userName !== 'Totales' ? item.models[0]?.name === 'TranferEx' ? '$' + ' ' + item.models[0]?.retorno : '$' + ' ' + 0 : '',
      CONSAR: item.userName !== 'Totales' ? item.models[0]?.name === 'CONSAR' ? '$' + ' ' + item.models[0]?.retorno : '$' + ' ' + 0 : '',
      SINDICATO: item.userName !== 'Totales' ? item.models[0]?.name === 'SINDICATO' ? '$' + ' ' + item.models[0]?.retorno : '$' + ' ' + 0 : '',
      TransferSim: item.userName !== 'Totales' ? item.models[0]?.name === 'TransferSim' ? '$' + ' ' + item.models[0]?.retorno : '$' + ' ' + 0 : '',
      comercialCost: '$' + ' ' + item.comercialCost,
      g3Name: item.g3Name,
      position: counter
    }
    updatedOperation.push(element)
    counter++
  }); 

  // const handleClickGraphic = (event, cellvalues) => {
  //   const operationId = cellvalues.row.id;
  //   navigate(`/pieOperation/?operationId=${operationId}`)
  
  // }
  let positionTotal = updatedOperation && updatedOperation.length - 1

  let values = [
    object && object[positionTotal]?.retornoTotalCliente,
    object && object[positionTotal]?.excedente,
    object && object[positionTotal]?.comisionPromoter,
    object && object[positionTotal]?.costoProviderIncome,
    object && object[positionTotal]?.costoProviderOutcome,
    object && object[positionTotal]?.comisionUtilidadMB,
  ]


  const mydata = {
    labels: ['Retorno', 'Excedente', 'Comisión Promotor', 'Costo Proveedor Ingreso', 'Costo Proveedor Egreso',
      ' Comision Market'],

    datasets: [
      {
        label: 'Monto',
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const columnFields = [
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
              <div style={{ background: cellvalues.completed ? '#2e7d32' : '#d32f2f', padding: '10px', borderRadius: '10px', color: '#ffff' }}>
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
            // onClick={async (event) => {
            //   handleClickGraphic(event, cellvalues, cellvalues.row.position);
            // }}
          >
            <img style={{width:'30px',height:'25px',margin:'0px'}} src={graphic} />
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
          (cellvalues.row.createdAt !== 'Totales') &&
          <>
            {
              cellvalues.row.clientName !== 'Totales' &&
              <div >
                <Button
                  style={{ backgroundColor: "white", boxShadow: 'none' }}
                  variant='contained'
                  color='primary'
                  // onClick={(event) => {
                  //   handleClickSubOperaciones(event, cellvalues);
                  // }}
                >
                  <img style={{width:'30px',height:'25px',margin:'0px'}} src={list} />
                </Button>                
              </div>
            }
          </>
        )
      }
    },
    {
      field: 'Editar',
      disableColumnMenu: true,
      sortable: false,
      width: 90,
      renderCell: (cellvalues) => {
        return (
          <>
            {
              (cellvalues.row.createdAt !== 'Totales') &&
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
                <img style={{width:'30px',height:'25px',margin:'0px'}} src={edit}/>
              </Button>
            }
          </>

        )
      }
    },
    {
      field: 'Suboperación',
      disableColumnMenu: true,
      sortable: false,
      width: 150,
      renderCell: (cellvalues) => {
        return (
          <>
            {
              (cellvalues.row.createdAt !== 'Totales') &&
              <Button
                variant='contained'
                color={!cellvalues.row.status ? 'error' : 'success'}
                onClick={(event) => {
                  if (!cellvalues.row.status) {
                    navigate(`/retorno/${cellvalues.row.id}`)
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

  const navigate = useNavigate()

  // const handleRetorno = (e) => {
  //   e.preventDefault();
  //   navigate('/retorno')
  // }

  // const handleAsignarFactura = (e) => {
  //   e.preventDefault();
  //   navigate('/asignarfactura')

  // }

  // const handleClickSubOperaciones = async (event, cellvalues) => {
  //   const parentOperationId = cellvalues.row.id;
  //   navigate(`/suboperations/?parentOperationId=${parentOperationId}`);
  // }

  const handleClickEditar = async (event, cellvalues) => {
    const operationId = cellvalues.row.id;
    navigate(`/newoperation/?operationId:${operationId}`)
  }


  const canvases = document.querySelectorAll('canvas');

  canvases.forEach(canvas => {
    const ctx = canvas.getContext('2d');
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  });
  return (    
    <DataTables
    buttonRoute={'/newoperation'}
    object={updatedOperation}
    columnFields={columnFields}
    buttonText={'Nueva Operación'}
    />    
  )
}