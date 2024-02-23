import React, { useEffect, useState } from 'react';
import { Toggle } from '../../../../components/Atoms/Toggle/Toggle';
import { InputSelect } from '../../../../components/Atoms/Inputs/InputSelect';
import { InputText } from '../../../../components/Atoms/Inputs/InputText';
import { useForm } from '../../../../utilities/hook/useForm';
import { petitions } from '../../../../services/api/petitions';
import { ModelsTable } from '../../../../components/Atoms/Tables/ModelsTable';
import { SubmitButton } from '../../../../components/Atoms/Button/SubmitButton';
import { ColumnsOperation } from '../../../../components/Atoms/Columns/ColumnsOperation';
import { userInfo } from '../../../../utilities/userInfo/userInfo';
import { useLocation } from 'react-router-dom';

export const NewOperation = () => {
  
  const [toggleInvoice, setToggleInvoice] = useState(false);
  const [clients, setClients] = useState();
  const [client, setClient] = useState({
    client:''
  });
  const [companies, setCompanies] = useState();
  const [company, setCompany] = useState({
    company:''
  });
  const [folio, setFolio] = useState()
  const [invoices, setInvoices] = useState();
  const [invoice, setInvoice] = useState({
    invoice:[]
  });
  const [amount, setAmount] = useState({
    amount:''
  });
  const [toggleTotal, setToggleTotal] = useState(false);
  const [model, setModel] = useState({
    model:[]
  });
  const [models, setModels] = useState();
  const [tableProductAmount, setTableProductAmount] = useState({});
  const [incomeProviders, setIncomeProviders] = useState();
  const [outcomeProviderById, setOutcomeProvidersById] = useState();
  const [incomeProvider, setIncomeProvider] = useState();
  const [outcomeProvider, setOutcomeProvider] = useState();
  const [dataTable, setDataTable] = useState();

  const [operationData, setOperationData] = useState()

  const { onInputChange } = useForm();

  const onClientChange = (event) => {
    setClient(({
      ...client,
      [event.target.name]: event.target.value
    }))
  }
  const onCompanyChange = (event) => {
    setCompany(({
      ...company,
      [event.target.name]: event.target.value
    }))
  }
  const onInvoiceChange = (event) => {
    setInvoice(({
      ...invoice,
      [event.target.name]: event.target.value
    }))
  }
  const onAmountChange = (event) => {
    setAmount(({
      ...amount,
      [event.target.name]: event.target.value
    }))
  }
  const onModelChange = (event) => {
    setModel(({
      ...model,
      [event.target.name]: event.target.value
    }))
    
  }

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const idedit = searchParams.get('idedit');
  let myId =id?id:idedit

  let parent=idedit?true:false
 
  const { getObject } = petitions();
  const { useremail } = userInfo();

  
  useEffect(() => {
    getObject('/company', setCompanies)
    getObject('/client', setClients)
    getObject('/invoice', setInvoices)
    getObject('/model', setModels)
    getObject('/providerInCome', setIncomeProviders)
    getObject(`/operation/nextFolio/${useremail}`, setFolio)

    if (myId) {
      getObject(`/operation/${myId}`, setOperationData);
    }
  }, [])
  
  useEffect(() => {
    if (operationData && myId) {
      setClient({client:operationData.clientId})
      setCompany({company:operationData.companyId})
      setAmount({amount:operationData.excedente})

      if (operationData.invoiceIds.length) {
        let newArrayInvoice = []
        operationData.invoiceIds.map(item => {
          newArrayInvoice.push(item)
        })
        setInvoice({invoice:newArrayInvoice})
        setToggleInvoice(false)

      } else {
        setToggleInvoice(true)
      }

    }
  }, [operationData])

  let modelProvider = []

  model?.model?.forEach(element => {
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
      let incomeProviderCopy = { ...incomeProvider }
      let outcomeProviderCopy = { ...outcomeProvider }

      models.forEach(element => {
        tableProductAmountCopy[element.name] = 0
        incomeProviderCopy[element.name] = ''
        outcomeProviderCopy[element.name] = ''
      });

      setTableProductAmount(tableProductAmountCopy)
      setIncomeProvider(incomeProviderCopy)
      setOutcomeProvider(outcomeProviderCopy)
      setDataTable({
        return: tableProductAmountCopy,
        providerIncomeId: incomeProviderCopy,
        providerOutcomeId: outcomeProviderCopy
      })
    }
  }, [models]);

  const handleTableProductAmountChange = (event) => {
    setTableProductAmount({
      ...tableProductAmount,
      [event.target.name]: event.target.value
    });
    setDataTable({
      return: {
        ...tableProductAmount,
        [event.target.name]: event.target.value
      },
      providerIncomeId: incomeProvider,
      providerOutcomeId: outcomeProvider,
    })
  };
  const handleIncomeProviderChange = (event) => {
    setIncomeProvider({
      ...incomeProvider,
      [event.target.name]: event.target.value
    });
    setDataTable({
      return: tableProductAmount,
      providerIncomeId: {
        ...incomeProvider,
        [event.target.name]: event.target.value
      },
      providerOutcomeId: outcomeProvider,
    })
  };

  const handleOutcomeProviderChange = (event) => {
    setOutcomeProvider({
      ...outcomeProvider,
      [event.target.name]: event.target.value
    });
    setDataTable({
      return: tableProductAmount,
      providerIncomeId: incomeProvider,
      providerOutcomeId: {
        ...outcomeProvider,
        [event.target.name]: event.target.value
      },
    })
  };

  const getOutcomeProvider = async (myId) => {
    getObject(`/providerOutCome/models/${myId}`, setOutcomeProvidersById);
  };

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
        <div style={{ width: '100%', height: '70px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ width: '24%' }}>
            <InputSelect
              object={clients}
              promoter={undefined}
              g3={undefined}
              link={undefined}
              client={client.client}
              company={undefined}
              invoice={undefined}
              model={undefined}
              role={undefined}
              onInputChange={onClientChange}
              labelText={'Cliente'}
              parent={parent}              
            />
          </div>
          <div style={{ width: '24%' }}>
            <InputSelect
              object={companies}
              promoter={undefined}
              g3={undefined}
              link={undefined}
              client={undefined}
              company={company.company}
              invoice={undefined}
              model={undefined}
              role={undefined}
              onInputChange={onCompanyChange}
              labelText={'Empresa'} 
              parent={parent} 
              />
          </div>
          <div style={{ width: '24%' }}>
            <InputText
              onInputChange={onInputChange}
              placeholder={'Folio'}
              name={undefined}
              nameValid={''}
              phone={undefined}
              phoneValid={''}
              invoiceNumber={undefined}
              amount={undefined}
              folio={folio}
            />
          </div>
        </div>
        {
          !toggleInvoice &&
          <div style={{ width: '100%' }}>
            <InputSelect
              object={invoices}
              promoter={undefined}
              g3={undefined}
              link={undefined}
              client={undefined}
              company={undefined}
              invoice={invoice.invoice}
              model={undefined}
              role={undefined}
              onInputChange={onInvoiceChange}
              labelText={'Factura'}
              parent={parent} 
              />
          </div>
        }
        <div style={{ height: '150px' }}>
          <InputText
            onInputChange={onAmountChange}
            placeholder={'Monto Comprobante'}
            name={undefined}
            nameValid={''}            
            phone={undefined}
            phoneValid={''}
            invoiceNumber={undefined}
            amount={amount.amount}
            folio={undefined}            
            provider={''}
            label={parent?'':'Monto comprobante'}
          />
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
          model={model.model}
          role={undefined}
          onInputChange={onModelChange}
          labelText={'Productos'}
          parent={parent} 
         />
        <div style={{ width: '90%', height: 'fit-content', marginTop: '10px' }}>
          {modelProvider && columns && <ModelsTable rows={modelProvider} columns={columns} />}
        </div>
        <div style={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
          <SubmitButton
            data={{ client, company, folio, invoice, amount, toggleTotal,toggleInvoice, useremail, dataTable,myId,parent }}
            firstButtonText={'Crear'}
            secondButtonText={''}
            setAuth={''}
            route={'operation'}
            rows={models} />
        </div>
      </div>
    </div>
  )
}
