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
import { Columns } from '../../../../components/Atoms/Columns/Columns';
import { userInfo } from '../../../../utilities/userInfo/userInfo';

const initialValue = {
  client: '',
  amount: '',
  model: []
}

export const CalcComision = () => {
  const [toggleReal, setToggleReal] = useState(false);
  const [clients, setClients] = useState()
  const [checkedInvoice, setCheckedInvoice] = useState(false)
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
  const [formData, setFormData] = useState({})

  const { client, amount, model, onInputChange } = useForm(initialValue)


  const { getObject } = petitions()
  
  const {useremail} =userInfo()
  
  useEffect(() => {
    if (models) {
      let formDataCopy = { ...formData }
      let incomeProviderCopy = { ...incomeProvider }
      let outcomeProviderCopy = { ...outcomeProvider }
      models.forEach(element => {
        formDataCopy[element.name] = 0
        formDataCopy['modelId'] = element.id
        incomeProviderCopy[element.name] = ''
        outcomeProviderCopy[element.name] = ''
      });
      setFormData(formDataCopy)
      setIncomeProvider(incomeProviderCopy)
      setOutcomeProvider(outcomeProviderCopy)
    }
  }, [models]);
  useEffect(() => {
    getObject('/client', setClients)
    getObject('/model', setModels)
    getObject('/providerInCome', setIncomeProviders)
   
    let comisionPromoterCopy = { ...comisionPromoter }
    let comisionClientCopy = { ...comisionClient }
    let comercialCostCopy = { ...comercialCost }
    let toggleModelsPromoterCopy = { ...toggleModelsPromoter }
    let toggleModelsClientCopy = { ...toggleModelsClient }
    models?.forEach(element => {
      comisionPromoterCopy[`model${element.name}`] = 0
      comisionClientCopy[`model${element.name}`] = 0
      comercialCostCopy[`comercialCost${element.name}`] = 0
      toggleModelsPromoterCopy[element.name] = false
      toggleModelsClientCopy[element.name] = false
    });
    setComisionPromoter(comisionPromoterCopy)
    setComisionPromoter(comisionClientCopy)
    setComercialCost(comercialCostCopy)
    setToggleModelsPromoter(toggleModelsPromoterCopy)
    setToggleModelsPromoter(toggleModelsClientCopy)
    setDataTablePromoter({
      comision: comisionPromoterCopy,
      comercialCost: comercialCostCopy,
      toggleModelsPromoter: toggleModelsPromoterCopy,
      userEmail: useremail,
    })
    setDataTableClient({
      comision: comisionClientCopy,
      toggleModelsPromoter: toggleModelsClientCopy,
      userEmail: useremail,
    })
  }, [])
  const onToggleModelsPromoter = (name) => {
    let toggleModelsPromoterCopy = { ...toggleModelsPromoter }
    toggleModelsPromoterCopy[name] = !toggleModelsPromoterCopy[name]
    setToggleModelsPromoter(toggleModelsPromoterCopy)
    setDataTable({
      comision: comisionPromoter,
      comercialCost: comercialCost,
      toggleModels: toggleModelsPromoterCopy,
      userEmail: useremail,
    })
  }
  const onToggleModelsClient = (name) => {
    let toggleModelsClientCopy = { ...toggleModelsClient }
    toggleModelsClientCopy[name] = !toggleModelsClientCopy[name]
    setToggleModelsClient(toggleModelsClientCopy)
    setDataTable({
      comision: comisionClient,
      comercialCost: comercialCost,
      toggleModels: toggleModelsClientCopy,
      userEmail: useremail,
    })
  }
  const onComisionPromoterInputChange = ({ target }) => {

    const { name, value } = target;

    setComisionPromoter({
      ...comisionPromoter,
      [name]: value
    });
    setDataTable({
      comision: {
        ...comisionPromoter,
        [name]: value
      },
      comercialCost: comercialCost,
      toggleModels: toggleModelsPromoter,
      userEmail: useremail,
    })
  }
  const onComisionClientInputChange = ({ target }) => {

    const { name, value } = target;

    setComisionClient({
      ...comisionClient,
      [name]: value
    });
    setDataTable({
      comision: {
        ...comisionClient,
        [name]: value
      },
      comercialCost: comercialCost,
      toggleModels: toggleModelsClient,
      userEmail: useremail,
    })
  }
  const onComercialCostInputChange = ({ target }) => {
    const { name, value } = target;
    setComercialCost({
      ...comercialCost,
      [name]: value
    });
    setDataTable({
      comercialCost: {
        ...comercialCost,
        [name]: value
      },
      comision: comision,
      toggleModelsPromoter: toggleModelsPromoter,
      userEmail: useremail,
    })
  }
  const getOutcomeProvider = async (myId) => {
    //const modelIndex=models?.findIndex(item=>item.id==myId)
    getObject(`/providerOutCome/models/${myId}`, setOutcomeProvidersById)
  };  
  const handleIncomeProviderChange = event => {
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
  const handleToggleRealChange = () => {
    setToggleReal(!toggleReal);
  }
  const handleChangeCheckedInvoice = () => {
    setCheckedInvoice(!toggleReal);
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
  const { columns } = Columns(
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
  return (
    <div className='newCalc'>
      <div className='newCalcContainer'>
        <div style={{ width: '100%', height: '70px', display: 'flex', flexDirection: 'row' }}>
          <div style={{ marginTop: '5px' }}>
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
          <div style={{ width: '40%', marginTop: '2px' }}>
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
          </div>
          <div>
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <InputCheckBox
              checkedValue={checkedInvoice}
              handleChangeValue={handleChangeCheckedInvoice}
              text={'Factura'} />
          </div>
        </div>
        {models &&
          <div style={{ width: '100%', height: 'max-content', display: 'flex', flexDirection: 'row' }}>
            <div>
              <h2>Promotor</h2>
              <ModelsTable rows={models} columns={columnsPromoter} />
            </div>
            <div>
              <h2>Cliente</h2>
              <ModelsTable rows={models} columns={columnsClient} />
            </div>
          </div>
        }
        <div style={{ width: '80%', marginTop: '40px' }}>
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
        </div>
        <div>
          {modelProvider && <ModelsTable rows={modelProvider} columns={columns} />}
        </div>
        <div style={{ width: '80%', display: 'flex', justifyContent: 'center' }}>
          <SubmitButton
            data={{ client, amount, model }}
            firstButtonText={'Calcular'}
            secondButtonText={''}
            setAuth={''}
            route={''}
            rows={models} />
        </div>
      </div>
    </div>
  )
}
