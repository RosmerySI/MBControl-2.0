import React, { useEffect, useState } from 'react';
import { Toggle } from '../../../../components/Atoms/Toggle/Toggle';
import { InputSelect } from '../../../../components/Atoms/Inputs/InputSelect';
import { InputText } from '../../../../components/Atoms/Inputs/InputText';
import { useForm } from '../../../../utilities/hook/useForm';
import { petitions } from '../../../../services/api/petitions';
import { ModelsTable } from '../../../../components/Atoms/Tables/ModelsTable';
import { SubmitButton } from '../../../../components/Atoms/Button/SubmitButton';
import { Columns } from '../../../../components/Atoms/Columns/Columns';
import { userInfo } from '../../../../utilities/userInfo/userInfo';

const initialValue = {
  client: '',
  company: '',
  folio: '',
  invoice: '',
  amount: '',
  model:[], 
}

export const NewOperation = () => {
  
  const [toggleInvoice, setToggleInvoice] = useState(false);
  const [toggleTotal, setToggleTotal] = useState(false);
  const [companies, setCompanies] = useState()
  const [clients, setClients] = useState()
  const [invoices, setInvoices] = useState()
  const [models, setModels] = useState()
  const [incomeProviders, setIncomeProviders] = useState()
  const [outcomeProviders, setOutcomeProviders] = useState()
  const [outcomeProviderById, setOutcomeProvidersById] = useState()
  const [incomeProvider ,  setIncomeProvider ]=useState()
  const [outcomeProvider ,  setOutcomeProvider ]=useState()
  const [formData, setFormData] = useState({})

  const {getObject} = petitions()
  const {useremail} = userInfo()
  const {client,company,folio,invoice,amount,model,onInputChange}=useForm(initialValue)  

  useEffect(() => {
    getObject('/company', setCompanies)
    getObject('/client', setClients)
    getObject('/invoice', setInvoices)
    getObject('/model', setModels)
    getObject('/providerInCome', setIncomeProviders)
    getObject('/providerOutCome', setOutcomeProviders)
  }, [])

  let modelProvider = []
  model?.forEach(element => {
    models?.forEach(item => {
      if (element === item.id) {
        let model = {
          name: item.name,
          id: item.id
        }
        modelProvider.push(model)
      }
    })
  })  
  
  useEffect(() => {
    if (models) {
      let formDataCopy = { ...formData }
      let incomeProviderCopy={...incomeProvider}
      let outcomeProviderCopy={...outcomeProvider}
      models.forEach(element => {
        formDataCopy[element.name] = 0
        formDataCopy['modelId'] = element.id
        incomeProviderCopy[element.name]=''      
        outcomeProviderCopy[element.name]=''
      });
      setFormData(formDataCopy)
      setIncomeProvider(incomeProviderCopy)
      setOutcomeProvider(outcomeProviderCopy)
    }
  }, [models]);

  const handleIncomeProviderChange=event=>{
    setIncomeProvider(formState => ({
      ...formState,
      [event.target.name]: event.target.value
    }));
  };

  const handleOutcomeProviderChange = (event) => {    
    setOutcomeProvider(formState => ({
      ...formState,
      [event.target.name]: event.target.value
    }));
   
  };

  const getOutcomeProvider = async(myId) => {
 
    //const modelIndex=models?.findIndex(item=>item.id==myId)
     getObject(`/providerOutCome/models/${myId}`,setOutcomeProvidersById) 
    
    ;
  };

  const {columns} = Columns(
    incomeProvider,
    outcomeProvider,
    formData,
    incomeProviders,
    outcomeProviderById,
    onInputChange,
    handleIncomeProviderChange,
    handleOutcomeProviderChange,
    getOutcomeProvider
  )
  const handleToggleInvoiceChange = () => {
    setToggleInvoice(!toggleInvoice);
  }
  const handleToggleTotalChange = () => {
    setToggleTotal(!toggleTotal);
  }
  
  return (
    <div className='newContainerOperation'>
      <div className='newOperationContainer'>
        <div>
        <Toggle
          toggleInvoice={toggleInvoice}
          toggleTotal={''}
          toggleReal={''}
          handleToggleInvoiceChange={handleToggleInvoiceChange}
          handleToggleTotalChange={''}
          handleToggleRealChange={''}
          firstValue={'Con Factura'}
          secondValue={'Sin Factura'} />
        </div>
        <div style={{width:'100%',height:'70px',display:'flex',flexDirection:'row'}}>
          <InputSelect
            object={clients}
            promoter={undefined}
            g3={undefined}
            link={undefined}
            client={client}
            company={undefined}
            invoice={undefined}
            onInputChange={onInputChange}
            labelText={'Cliente'} />
          <InputSelect
            object={companies}
            promoter={undefined}
            g3={undefined}
            link={undefined}
            client={undefined}
            company={company}
            invoice={undefined}
            onInputChange={onInputChange}
            labelText={'Empresa'} />
          <InputText
            placeholder={'Folio'}
            name={undefined}
            phone={undefined}
            invoiceNumber={undefined}
            amount={undefined}
            folio={folio}
            nameValid={''}
            phoneValid={''}
            onInputChange={onInputChange} />
          {
            !toggleInvoice &&
            <InputSelect
              object={invoices}
              promoter={undefined}
              g3={undefined}
              link={undefined}
              client={undefined}
              company={undefined}
              invoice={invoice}
              onInputChange={onInputChange}
              labelText={'Factura'} />
          }
        </div>
        <div>
          <InputText
            placeholder={'MontoComprobante'}
            name={undefined}
            phone={undefined}
            invoiceNumber={undefined}
            amount={amount}
            folio={undefined}
            nameValid={''}
            phoneValid={''}
            onInputChange={onInputChange} />
        </div>
        <div>
        <Toggle
          toggleInvoice={''}
          toggleTotal={toggleTotal}
          toggleReal={''}
          handleToggleInvoiceChange={''}
          handleToggleTotalChange={handleToggleTotalChange}
          handleToggleRealChange={''}
          firstValue={'Parcial'}
          secondValue={'Total'} />
        </div>
        <InputSelect
          object={models}
          promoter={undefined}
          g3={undefined}
          link={undefined}
          client={undefined}
          company={undefined}
          invoice={undefined}
          model={model}
          onInputChange={onInputChange}
          labelText={'Productos'} />
        {modelProvider&&columns&&<ModelsTable rows={modelProvider} columns={columns}/>}      
        <SubmitButton 
        data={{client,company,folio,invoice,amount,toggleTotal,model,formData}} 
        firstButtonText={'Crear'} 
        secondButtonText={''} 
        setAuth={''} 
        route={'operation'}
        rows={models}/>
      </div>
    </div>
  )
}
