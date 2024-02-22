import React, { useEffect, useState } from 'react'
import { InputCheckBox } from '../../../../components/Atoms/Inputs/InputCheckBox'
import { Toggle } from '../../../../components/Atoms/Toggle/Toggle';
import { InputSelect } from '../../../../components/Atoms/Inputs/InputSelect';
import { InputText } from '../../../../components/Atoms/Inputs/InputText';
import { useForm } from '../../../../utilities/hook/useForm';
import { petitions } from '../../../../services/api/petitions';
import { ModelsTable } from '../../../../components/Atoms/Tables/ModelsTable';
import { SubmitButton } from '../../../../components/Atoms/Button/SubmitButton';
import { ColumnsClient } from '../../../../components/Atoms/Columns/ColumnsClient';
import { ColumnsPromoter } from '../../../../components/Atoms/Columns/ColumnsPromoter';
import { ColumnsOperation } from '../../../../components/Atoms/Columns/ColumnsOperation';
import { userInfo } from '../../../../utilities/userInfo/userInfo';

const initialValue = {
  client: '',
  amount: '',
  model: []
}

export const CalcComision = () => {

  const [toggleReal, setToggleReal] = useState(false);
  const [clients, setClients] = useState()
  const [toggleInvoice, setToggleInvoice] = useState(false);
  const [models, setModels] = useState()
  const [incomeProviders, setIncomeProviders] = useState()
  const [incomeProvider, setIncomeProvider] = useState()
  const [outcomeProvider, setOutcomeProvider] = useState()
  const [outcomeProviderById, setOutcomeProvidersById] = useState()

  const [toggleModelsPromoter, setToggleModelsPromoter] = useState()
  const [toggleModelsClient, setToggleModelsClient] = useState()
 
  const [comisionPromoter, setComisionPromoter] = useState({})
  const [comisionClient, setComisionClient] = useState({})
  const [comercialCost, setComercialCost] = useState({})

  const [dataTablePromoter, setDataTablePromoter] = useState({})
  const [dataTableClient, setDataTableClient] = useState({})

  const [dataTableProviders, setDataTableProviders] = useState({})
  const [tableProductAmount, setTableProductAmount] = useState({})
  
  const { client, amount, model, onInputChange } = useForm(initialValue)

  const { getObject } = petitions()

  const { useremail } = userInfo()
  
  useEffect(() => {
    getObject('/client', setClients)
    getObject('/model', setModels)
    getObject('/providerInCome', setIncomeProviders)
  }, [])

  useEffect(() => {
    if (models) {
      
      let comisionPromoterCopy = { ...comisionPromoter }
      let comisionClientCopy = { ...comisionClient }
      let comercialCostCopy = { ...comercialCost }
      let toggleModelsPromoterCopy = { ...toggleModelsPromoter }
      let toggleModelsClientCopy = { ...toggleModelsClient }
      let tableProductAmountCopy = { ...tableProductAmount }
      let incomeProviderCopy = { ...incomeProvider }
      let outcomeProviderCopy = { ...outcomeProvider }

      models.forEach(element => {        
        tableProductAmountCopy[element.name] = 0
        incomeProviderCopy[element.name] = ''
        outcomeProviderCopy[element.name] = ''        
        comisionPromoterCopy[element.name] = 0        
        comisionClientCopy[element.name] = 0
        comercialCostCopy[element.name] = 0
        toggleModelsPromoterCopy[element.name] = true
        toggleModelsClientCopy[element.name] = false
      });
     
      setComisionPromoter(comisionPromoterCopy)      
      setComisionClient(comisionClientCopy)
      setComercialCost(comercialCostCopy)
      setToggleModelsPromoter(toggleModelsPromoterCopy)
      setToggleModelsClient(toggleModelsClientCopy)      
      setTableProductAmount(tableProductAmountCopy)
      setIncomeProvider(incomeProviderCopy)
      setOutcomeProvider(outcomeProviderCopy)      
      setDataTablePromoter({        
        value:comisionPromoterCopy,       
        comercialCost:comercialCostCopy,
        toggleModels:toggleModelsPromoterCopy        
      })
      setDataTableClient({        
        value: comisionClientCopy,
        toggleModels: toggleModelsClientCopy        
      })
      setDataTableProviders({    
        return: tableProductAmountCopy,
        providerIncomeId: incomeProviderCopy,
        providerOutcomeId: outcomeProviderCopy
      })
    }
  }, [models]);

  const onToggleModelsPromoter = (name) => {
    let toggleModelsPromoterCopy = { ...toggleModelsPromoter }
    toggleModelsPromoterCopy[name] = !toggleModelsPromoterCopy[name]
    setToggleModelsPromoter(toggleModelsPromoterCopy)
    setDataTablePromoter({
      value: comisionPromoter,
      comercialCost: comercialCost,
      toggleModels: toggleModelsPromoterCopy      
    })
  }
  const onToggleModelsClient = (name) => {
    let toggleModelsClientCopy = { ...toggleModelsClient }
    toggleModelsClientCopy[name] = !toggleModelsClientCopy[name]
    setToggleModelsClient(toggleModelsClientCopy)
    setDataTableClient({
      value: comisionClient,
      toggleModels: toggleModelsClientCopy    
    })
  }
  const onComisionPromoterInputChange = ({ target }) => {
    const { name, value } = target;
    setComisionPromoter({
      ...comisionPromoter,
      [name]: value
    });
    setDataTablePromoter({
      value: {
        ...comisionPromoter,
        [name]: value
      },
      comercialCost: comercialCost,
      toggleModels: toggleModelsPromoter,
    })
  }
  const onComisionClientInputChange = ({ target }) => {
    const { name, value } = target;
    setComisionClient({
      ...comisionClient,
      [name]: value
    });
    setDataTableClient({
      value: {
        ...comisionClient,
        [name]: value
      },     
      toggleModels: toggleModelsClient,
    })
  }
  const onComercialCostInputChange = ({ target }) => {
    const { name, value } = target;
    setComercialCost({
      ...comercialCost,
      [name]: value
    });
    setDataTablePromoter({
      comercialCost: {
        ...comercialCost,
        [name]: value
      },
      value: comisionPromoter,
      toggleModelsPromoter: toggleModelsPromoter,     
    })
  }
  const getOutcomeProvider = async (myId) => {
    //const modelIndex=models?.findIndex(item=>item.id==myId)
    getObject(`/providerOutCome/models/${myId}`, setOutcomeProvidersById)
  };
  const handleIncomeProviderChange = event => {
    setIncomeProvider({
      ...incomeProvider,
      [event.target.name]: event.target.value
    });
    setDataTableProviders({    
      return: tableProductAmount,
      providerIncomeId: ({
        ...incomeProvider,
        [event.target.name]: event.target.value
      }),
      providerOutcomeId: outcomeProvider
    })
  };
  const handleOutcomeProviderChange = (event) => {
    setOutcomeProvider({
      ...outcomeProvider,
      [event.target.name]: event.target.value
    });
    setDataTableProviders({    
      return: tableProductAmount,
      providerIncomeId:incomeProvider, 
      providerOutcomeId: ({
        ...outcomeProvider,
        [event.target.name]: event.target.value
      }),
    })
  };
  const handleTableProductAmountChange = (event) => {
    setTableProductAmount({
      ...tableProductAmount,
      [event.target.name]: event.target.value
    });
    setDataTableProviders({    
      return: ({
        ...tableProductAmount,
        [event.target.name]: event.target.value
      }),
      providerIncomeId:incomeProvider, 
      providerOutcomeId:outcomeProvider
    })
  };
  const handleToggleRealChange = () => {
    setToggleReal(!toggleReal);
  }
  const handleToggleInvoiceChange = () => {
    setToggleInvoice(!toggleInvoice);
  }
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

  const { columnsPromoter } = ColumnsPromoter(
    comercialCost,
    onComercialCostInputChange,
    comisionPromoter,
    onComisionPromoterInputChange,
    toggleModelsPromoter,
    onToggleModelsPromoter
  )

  const { columnsClient } = ColumnsClient(
    comisionClient,
    onComisionClientInputChange,
    onToggleModelsClient,
    toggleModelsClient
  )
  const { columns } = ColumnsOperation(
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
  return (
    <div className='newCalc'>
      <div className='newCalcContainer'>
        <div 
        style={{width:'100%',
        height:'70px',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around' }}>
          <div style={{width:'20%',marginTop:'3px'}}>
            <Toggle
              toggleInvoice={''}
              toggleTotal={''}
              toggleReal={toggleReal}
              handleToggleInvoiceChange={''}
              handleToggleTotalChange={''}
              handleToggleRealChange={handleToggleRealChange}
              firstValue={'Real'}
              secondValue={'Virtual'} />
          </div>
          <div style={{ width:'20%', marginTop: '2px' }}>
            <InputSelect
              object={clients}
              promoter={undefined}
              g3={undefined}
              link={undefined}
              client={client}
              company={undefined}
              invoice={undefined}
              model={undefined}
              role={undefined}
              onInputChange={onInputChange}
              labelText={'Cliente'} />
          </div>
          <div style={{ width:'20%'}}>
            <InputText
              placeholder={'Total'}
              name={undefined}
              phone={undefined}
              invoiceNumber={undefined}
              amount={amount}
              folio={undefined}
              nameValid={''}
              phoneValid={''}
              onInputChange={onInputChange} />
          </div>
          <div style={{width:'20%',height: '44px',marginTop:'3px'}}>
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
        </div>
        {models &&
          <div style={{width:'100%',height:'max-content',display:'flex',flexDirection:'row',justifyContent:'center' }}>
            <div>
              <h2 className='h2'>Promotor</h2>
              <ModelsTable rows={models} columns={columnsPromoter} />
            </div>
            <div>
              <h2 className='h2'>Cliente</h2>
              <ModelsTable rows={models} columns={columnsClient} />
            </div>
          </div>
        }
        <div style={{ width: '92%',height:'35px', marginTop: '40px' }}>
          <InputSelect
            object={models}
            promoter={undefined}
            g3={undefined}
            link={undefined}
            client={undefined}
            company={undefined}
            invoice={undefined}
            model={model}
            role={undefined}
            onInputChange={onInputChange}
            labelText={'Productos'} />
        </div>
        <div style={{width:'76%',height:'fit-content', marginTop: '10px' }}>
          {modelProvider && <ModelsTable rows={modelProvider} columns={columns} />}
        </div>
        <div style={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
          <SubmitButton
            data={{amount,toggleInvoice,dataTableClient,dataTablePromoter,dataTableProviders}}
            firstButtonText={'Calcular'}
            secondButtonText={''}
            setAuth={''}
            route={'operation/calculator'}
            rows={models} 
            />
        </div>
      </div>
    </div>
  )
}
