import React, { useEffect, useState } from 'react'
import { ListItemText, MenuItem, TextField } from '@mui/material';
import { Toggle } from '../../../../components/Atoms/Toggle/Toggle'
import { InputSelect } from '../../../../components/Atoms/Inputs/InputSelect';
import { InputText } from '../../../../components/Atoms/Inputs/InputText';
import { useForm } from '../../../../utilities/hook/useForm';
import { petitions } from '../../../../services/api/petitions';
import { ModelsTable } from '../../../../components/Atoms/Tables/ModelsTable';
import { SubmitButton } from '../../../../components/Atoms/Button/SubmitButton';
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';

const initialValue = {
  client: '',
  company: '',
  folio: '',
  invoice: '',
  amount: '',
  model:[], 
}
function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      decimalScale={2}
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
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

  const {getObject} = petitions()

  const {client,company,folio,invoice,amount,model,onInputChange}=useForm(initialValue)
  
  
  
  const [formData, setFormData] = useState({
  })

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
  const [incomeProvider ,  setIncomeProvider ]=useState()
  const [outcomeProvider ,  setOutcomeProvider ]=useState()
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
  const limitCharacter = 11;
  let columns = [
    {
      field: 'name',
      headerName: 'Productos',
      type: 'string',
      width: 150,
    },
    {
      field: 'Monto',
      disableColumnMenu: true,
      sortable: false,
      width: 150,
      renderCell: (cellvalues) => {        

        return (
          <TextField
            name={cellvalues.row.name}
            value={formData[cellvalues.row.name]}
            onChange={onInputChange}
            autoComplete="off"
            sx={{width:'180px',padding:'0px',
            '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { padding: 0 }}}
            InputProps={{inputComponent:NumberFormatCustom}}
            inputProps={{maxlength:limitCharacter}}
          />
        )
      }
    },
    {
      field: 'Proveedor Ingreso',
      disableColumnMenu: true,
      sortable: false,
      width: 230,
      renderCell: (cellvalues) => {
        return (
          <TextField          
          select
          name={cellvalues.row.name}
          variant="outlined"
          className='container_input_email'
          value={incomeProvider[cellvalues.row.name]}
          onChange={ handleIncomeProviderChange}     
          sx={{width:{sm:200},height:{sm:60},backgroundColor:'rgb(185, 181, 181)',     
          boxShadow:'none','.MuiOutlinedInput-notchedOutline':{border:0}}}>
          {incomeProviders?.map((test) => (
            <MenuItem key={test.id} value={test.id}>
              <ListItemText sx={{width:{sm:50},display:'inline-block'}}
                primary={test.name}/>
            </MenuItem>
          ))}
        </TextField>
        )
      }
    },
    {
      field: 'Proveedor Egreso',
      disableColumnMenu: true,
      sortable: false,
      width: 230,
      renderCell: (cellvalues) => {
        return (          
          <TextField                   
          select
          name={cellvalues.row.name}
          variant="outlined"
          className='container_input_email'
          value={outcomeProvider[cellvalues.row.name]}
          onChange={handleOutcomeProviderChange}
          onFocus={()=>{getOutcomeProvider(cellvalues.row.id)}}    
          sx={{width:{sm:200},backgroundColor:'rgb(185, 181, 181)',  
            boxShadow:'none','.MuiOutlinedInput-notchedOutline':{border:0}
          }}>
          {       
            outcomeProviderById?.map((test) => (
            // outcomeProviderById[models.findIndex(item=>item.id==cellvalues.row.id)]?.map((test) => (
            <MenuItem key={test.id} value={test.id} >
              <ListItemText
                sx={{width:{sm:50},display:'inline-block'}}
                primary={test.name} />
            </MenuItem>
          ))}
        </TextField>        
        )
      }
    },    
  ]


  let token
  let useremail
  token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    useremail = decoded.email
  }

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
        {modelProvider&&<ModelsTable rows={modelProvider} columns={columns}/>}      
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
