import React, { useEffect, useState } from 'react'
import { petitions } from '../../../../services/api/petitions'
import { InputSelect } from '../../../../components/Atoms/Inputs/InputSelect'
import { InputText } from '../../../../components/Atoms/Inputs/InputText'
import { useForm } from '../../../../utilities/hook/useForm'
import { SubmitButton } from '../../../../components/Atoms/Button/SubmitButton'
import { jwtDecode } from 'jwt-decode'
import '../../newStyle.css'

const initialValue = {
  client: '',
  company: '',
  invoiceNumber: '',
  amount: '',  
}
export const NewInvoice = () => {

  const [companies, setCompanies] = useState()
  const [clients, setClients] = useState()
  
  
  const {getObject} = petitions()

  const { client,company, invoiceNumber, amount, onInputChange } = useForm(initialValue)

  useEffect(() => {
    getObject('/company',setCompanies)
    getObject('/client',setClients)
  }, [])
  let token = ''
  let useremail = ''
  token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    useremail = decoded.email  
  }
  
  return (
    <div className='newContainer'>
    <div className='newPageContainer'>
    <div style={{width:'60%', display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
    <InputSelect 
      object={clients} 
      promoter={undefined} 
      g3={undefined} 
      link={undefined} 
      client={client} 
      company={undefined} 
      onInputChange={onInputChange} 
      labelText={'Cliente'}/>
    <InputSelect 
      object={companies} 
      promoter={undefined} 
      g3={undefined} 
      link={undefined} 
      client={undefined} 
      company={company} 
      onInputChange={onInputChange} 
      labelText={'Empresa'}/>
    <InputText 
      placeholder={'Número de Factura'} 
      name={undefined} 
      phone={undefined} 
      invoiceNumber={invoiceNumber} 
      amount={undefined} 
      nameValid={''} 
      phoneValid={''} 
      onInputChange={onInputChange}/>
    <InputText 
      placeholder={'Monto'} 
      name={undefined} 
      phone={undefined} 
      invoiceNumber={undefined} 
      amount={amount} 
      nameValid={''} 
      phoneValid={''}
      onInputChange={onInputChange}/>
    <SubmitButton 
      data={{ client, company, invoiceNumber, amount,useremail}}
      firstButtonText={'Crear'} 
      secondButtonText={''} 
      setAuth={''} 
      route={'invoice'}
      rows={''}/>
    </div>
    </div>
  </div>
  )
}
