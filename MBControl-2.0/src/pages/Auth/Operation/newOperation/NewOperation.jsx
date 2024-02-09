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
  amount: '',
  invoice:[],
  model:[], 
}

export const NewOperation = () => {
  
  const [toggleInvoice, setToggleInvoice] = useState(false);
  const [toggleTotal, setToggleTotal] = useState(false);

  const [companies, setCompanies] = useState();
  const [clients, setClients] = useState();
  const [invoices, setInvoices] = useState();

  const [models, setModels] = useState();

  const [folio, setFolio] = useState()

  const [incomeProviders, setIncomeProviders] = useState();
  const [outcomeProviders, setOutcomeProviders] = useState();
  const [outcomeProviderById, setOutcomeProvidersById] = useState();
  const [incomeProvider ,  setIncomeProvider ]=useState();
  const [outcomeProvider ,  setOutcomeProvider ]=useState();

 
  const [tableProductAmount, setTableProductAmount] = useState({});

  const [dataTable, setDataTable] = useState();

  const {getObject} = petitions();
  const {useremail} = userInfo();
  const {client,company,amount,invoice,model,onInputChange}=useForm(initialValue);  
  
  useEffect(() => {
    getObject('/company', setCompanies)
    getObject('/client', setClients)
    getObject('/invoice', setInvoices)
    getObject('/model', setModels)
    getObject('/providerInCome', setIncomeProviders)
    getObject(`/operation/nextFolio/${useremail}`, setFolio)
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
      
      let tableProductAmountCopy = { ...tableProductAmount }
      let incomeProviderCopy={...incomeProvider}
      let outcomeProviderCopy={...outcomeProvider}

      models.forEach(element => {        
        tableProductAmountCopy[element.name] = 0
        incomeProviderCopy[element.name]=''      
        outcomeProviderCopy[element.name]=''
      });

      setTableProductAmount(tableProductAmountCopy)
      setIncomeProvider(incomeProviderCopy)
      setOutcomeProvider(outcomeProviderCopy)
      setDataTable({       
        return:tableProductAmountCopy,
        providerIncomeId:incomeProviderCopy,
        providerOutcomeId:outcomeProviderCopy
      })
    }
  }, [models]);
 
  const handleTableProductAmountChange=(event)=>{
      setTableProductAmount({
      ...tableProductAmount,
      [event.target.name]: event.target.value
    });
    setDataTable({
      return: {
        ...tableProductAmount,
        [event.target.name]: event.target.value
      },
      providerIncomeId:incomeProvider,
      providerOutcomeId:outcomeProvider,     
    })
  };
  const handleIncomeProviderChange=(event)=>{
    setIncomeProvider({
      ...incomeProvider,
      [event.target.name]: event.target.value
    });
    setDataTable({
     
      return:tableProductAmount,      
      providerIncomeId:{
        ...incomeProvider,
        [event.target.name]: event.target.value
      },
      providerOutcomeId:outcomeProvider,     
    })   
  };

  const handleOutcomeProviderChange = (event) => {    
    setOutcomeProvider({
      ...outcomeProvider,
      [event.target.name]: event.target.value
    });
    setDataTable({
      return:tableProductAmount,      
      providerIncomeId:incomeProvider,
      providerOutcomeId:{
        ...outcomeProvider,
        [event.target.name]: event.target.value
      },     
    })   
  };

  const getOutcomeProvider = async(myId) => {
    getObject(`/providerOutCome/models/${myId}`,setOutcomeProvidersById);
  };

  const {columns} = Columns(
    incomeProvider,
    outcomeProvider,
    tableProductAmount,
    incomeProviders,
    outcomeProviderById,
    handleTableProductAmountChange,
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
            model={undefined}
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
            model={undefined}
            onInputChange={onInputChange}
            labelText={'Empresa'} />
          <InputText
            labelText
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
              model={undefined}
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
        data={{client,company,folio,invoice,amount,toggleTotal,useremail,dataTable}} 
        firstButtonText={'Crear'} 
        secondButtonText={''} 
        setAuth={''} 
        route={'operation'}
        rows={models}/>
      </div>
    </div>
  )
}
