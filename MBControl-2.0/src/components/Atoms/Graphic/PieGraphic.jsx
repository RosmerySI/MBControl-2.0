import React from 'react'
import{Chart as ChartJS,ArcElement,Tooltip,Legend,Title,CategoryScale,LinearScale,BarElement} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const PieGraphic = ({object}) => {
  
  let positionTotal = object && object.length - 1

  let values = [
    parseFloat((object && object[positionTotal]?.retornoTotalCliente)?.slice(2)),
    parseFloat((object && object[positionTotal]?.excedente)?.slice(2)),
    parseFloat((object && object[positionTotal]?.comisionPromoter)?.slice(2)),
    parseFloat((object && object[positionTotal]?.costoProviderIncome)?.slice(2)),
    parseFloat((object && object[positionTotal]?.costoProviderOutcome)?.slice(2)),
    parseFloat((object && object[positionTotal]?.comisionUtilidadMB)?.slice(2)),  
  ]
 
  const mydata = {
    labels: ['Retorno','Excedente','Comisión Promotor','Costo Proveedor Ingreso',
    'Costo Proveedor Egreso',' Comision Market'],
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

  const canvases = document.querySelectorAll('canvas');

  canvases.forEach(canvas => {
    const ctx = canvas.getContext('2d');
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  });

  return (
    <div style={{width:'40%'}} >
    <Pie data={mydata} style={{width:'200px',height:'500px'}}/> 
    </div>
  )
}
