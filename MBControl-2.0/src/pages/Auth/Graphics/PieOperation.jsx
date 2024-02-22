import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { petitions } from '../../../services/api/petitions';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const PieOperation = () => {

  const [params] = useSearchParams();
  const operationId = params.get('operationId');

  const [object, setObject] = useState()
  
  const {getObject} = petitions()
  
  useEffect(() => {
    getObject(`/operation/${operationId}`,setObject)
  }, [])

  let myLabels = ['Retorno', 'Excedente', 'Comisión Promotor', 'Costo Proveedor Ingreso', 'Costo Proveedor Egreso',
    ' Comision Market']

  let value = [
    object?.retornoTotalCliente,
    object?.excedente,
    object?.comisiónPromotor,
    object?.costoProviderIncome,
    object?.costoProviderOutcome,
    object?.comisionUtilidadMB
  ]
  let data
  data = {
    labels: myLabels,
    datasets: [
      {
        label: 'Monto',
        data: value,
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
  let modelsNameArray = []
  let modelsRetornoArray = []
  let modelsPromotorArray = []
  let modelsProvEgArray = []
  let modelsProvIngArray = []
  let modelsUtilidadArray = []

  object?.models?.forEach(model => {
    let modelName = model.name + ' - Retorno: $' + model.retorno
    let modelPromotor = model.promoterComision
    let modelProvEg = model.costoProviderOutcome
    let modelProvIng = model.costoProviderIncome
    let modelUtilidad = model.marketComision

    modelsNameArray.push(modelName)
    modelsPromotorArray.push(modelPromotor)
    modelsProvEgArray.push(modelProvEg)
    modelsProvIngArray.push(modelProvIng)
    modelsUtilidadArray.push(modelUtilidad)

  });

  let clientName = object?.clientName

  const options = {
    responsive: true,
    plugins: {
      legend:{position:'top'},
      title:{display:true,text:clientName}
    }
  };

  //const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const labels = modelsNameArray;
  const dataBar = {
    labels,
    datasets: [

      {
        label: 'Comisión Promotor',
        data: labels.map(() => modelsPromotorArray),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Costo Proveedor Egreso',
        data: labels.map(() => modelsProvEgArray),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
      {
        label: 'Costo Proveedor Ingreso',
        data: labels.map(() => modelsProvIngArray),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Utilidad Market',
        data: labels.map(() => modelsUtilidadArray),
        backgroundColor: 'red',
      },
    ],
  };
  return (
    <>
      <div style={{width:'25%',marginTop:'100px'}}>
        <Pie data={data}/>
      </div>
      <div style={{width:'40%',height:'70%',marginTop:'100px'}}>
        <Bar options={options} data={dataBar} />
      </div>
    </>
  )
}
