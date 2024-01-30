import React, { useEffect, useState } from 'react'
import { Button, InputAdornment, TextField } from '@mui/material';
import { petitions } from '../../../../services/api/petitions'
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';
import '../../newStyle.css'
import { useForm } from '../../../../utilities/hook/useForm';
import { InputText } from '../../../../components/Atoms/Inputs/InputText';
import { ModelsTable } from '../../../../components/Atoms/Tables/ModelsTable';
import { InputSelect } from '../../../../components/Atoms/Inputs/InputSelect';
import { InputEmail } from '../../../../components/Atoms/Inputs/InputEmail';
import { SubmitButton } from '../../../../components/Atoms/Button/SubmitButton';
import { InputCheckBox } from '../../../../components/Atoms/Inputs/InputCheckBox';


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

      decimalScale={2}
      isAllowed={(values) => {
        const { floatValue } = values;
        if (!floatValue) return true
        return floatValue < 100;
      }}



    />
  );
}
NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,

};
const initialValue = {
  name: '',
  rfc: '',
  g3: '',
  link: '',
  phone: '',
  email: '',
}

export const NewPromoter = () => {

  const [models, setModels] = useState()
  const [G3, setG3] = useState()
  const [links, setLinks] = useState()
  const [toggleModels, setToggleModels] = useState()
  const [comision, setComision] = useState({})
  const [comercialCost, setComercialCost] = useState({})
  const [dataTable, setDataTable] = useState({})
  const [checkedEmail, setCheckedEmail] = useState(false);
  const [checkedWhatsapp, setCheckedWhatsapp] = useState(false);

  const handleChangeEmail = () => {
    setCheckedEmail(!checkedEmail);
  };
  const handleChangeWhatsapp = () => {
    setCheckedWhatsapp(!checkedWhatsapp);
  };

  const { getObject } = petitions()

  let useremail
  let userrole
  let username
  let token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    useremail = decoded.email
    userrole = decoded.Roles
    username = decoded.name

  }

  const settingInitialValues = async () => {
    await getObject('/model', setModels)
    await getObject('/G3', setG3)
    await getObject('/user', setLinks)
    let comisionCopy = { ...comision }
    let comercialCostCopy = { ...comercialCost }
    let toggleModelsCopy = { ...toggleModels }
    models?.forEach(element => {
      comisionCopy[`model${element.name}`] = 0
      comercialCostCopy[`comercialCost${element.name}`] = 0
      toggleModelsCopy[element.name] = false
    });
    setComision(comisionCopy)
    setComercialCost(comercialCostCopy)
    setToggleModels(toggleModelsCopy)
    setDataTable({
      comision: comisionCopy,
      comercialCost: comercialCostCopy,
      toggleModels: toggleModelsCopy,
      userEmail: useremail,
    })

  }
  useEffect(() => {
    settingInitialValues()
  }, [])
  const emailForm = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const phoneForm = /^\d{10}$/;
  const formValidations = {
    name: [(value) => value?.length >= 2, 'El nombre de 2 o más caracteres es obligatorio'],
    phone: [(value) => value?.match(phoneForm), 'Solo diez dígitos'],
    email: [(value) => value?.match(emailForm), 'contener @ y terminar en .com'],

  }
  const { name, g3, link, phone, email, nameValid, phoneValid, emailValid, onInputChange } = useForm(initialValue, formValidations)

  let linksObject=[]
  if (userrole !== 'Enlace') {
    links?.forEach(item => {
      if (item.roles !== null) {

        let element = 
          {
            name: item.userName,
            email: item.email,
          }
        

        linksObject.push(element)
      }
    })
  } else {
    let element = [
      {
        name: username,
        email: useremail
      },
    ]
    linksObject.push(element)
  }

  const onToggleModels = (name) => {
    let toggleModelsCopy = { ...toggleModels }
    toggleModelsCopy[name] = !toggleModelsCopy[name]
    setToggleModels(toggleModelsCopy)
    setDataTable({
      comision: comision,
      comercialCost: comercialCost,
      toggleModels: toggleModelsCopy,
      userEmail: useremail,
    })
  }
  const onComisionInputChange = ({ target }) => {

    const { name, value } = target;

    setComision({
      ...comision,
      [name]: value
    });
    setDataTable({
      comision: {
        ...comision,
        [name]: value
      },
      comercialCost: comercialCost,
      toggleModels: toggleModels,
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
      toggleModels: toggleModels,
      userEmail: useremail,
    })
  }

  let columns = [
    {
      field: 'name',
      headerName: 'Productos',
      type: 'string',
      width: 150,
    },
    {
      field: 'Costo Comercial',
      disableColumnMenu: true,
      sortable: false,
      width: 150,
      renderCell: (cellvalues) => {
        return (
          <TextField
            name={`comercialCost${cellvalues.row.name}`}
            value={comercialCost[`comercialCost${cellvalues.row.name}`] || 0}
            onChange={onComercialCostInputChange}
            autoComplete='off'
            sx={{ width: '180px', padding: '0px', '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { padding: 0 } }}
            InputProps={{
              inputComponent: NumberFormatCustom,
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}>
          </TextField>
        )
      }
    },
    {
      field: 'Comisión',
      disableColumnMenu: true,
      sortable: false,
      width: 150,
      renderCell: (cellvalues) => {
        return (
          <TextField
            name={`model${cellvalues.row.name}`}
            value={comision[`model${cellvalues.row.name}`] || 0}
            onChange={onComisionInputChange}
            autoComplete='off'
            sx={{ width: '180px', padding: '0px', '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { padding: 0 } }}
            InputProps={{
              inputComponent: NumberFormatCustom,
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          >
          </TextField>
        )
      }
    },
    {
      field: 'Piso / %',
      disableColumnMenu: true,
      sortable: false,
      width: 100,
      renderCell: (cellvalues) => {
        return (
          <Button
            style={{
              backgroundColor: "white",
              boxShadow: 'none',
              width: '10px',
              padding: 0,
            }}
            variant='contained'
            name={cellvalues.row.name}
            onClick={() => onToggleModels(cellvalues.row.name)}>
            <p style={{ color: 'gray' }}>
              {toggleModels && toggleModels[cellvalues.row.name] === true ? 'Piso' : '%'}
            </p>
          </Button>
        )
      }
    },
  ]
  return (
    <div className='newContainer'>
      <div className='newPageContainer'>
        {
          models !== undefined && G3 !== undefined && links !== undefined &&
          <div className='formStyle'>
            <InputText placeholder={'Nombre'} name={name} phone={undefined} invoiceNumber={undefined} amount={undefined}
            nameValid={nameValid} phoneValid={''} onInputChange={onInputChange} />
            <ModelsTable rows={models} columns={columns} />
            <div style={{ width: '100%', height: 'max-content', display: 'flex', 
            flexDirection: 'row', alignItems: 'center',justifyContent:'space-between'}}>
              <InputSelect object={G3} promoter={undefined} g3={g3} link={undefined} client={undefined} 
              company={undefined} onInputChange={onInputChange} labelText={'G3'} />
              <InputSelect object={linksObject} promoter={undefined} g3={undefined} link={link} 
              client={undefined} company={undefined} onInputChange={onInputChange} labelText={'Enlaces'}/>
            </div>
            <div style={{ width: '100%', height: 'max-content', display: 'flex', flexDirection: 'row' }}>
              <InputText placeholder={'Telefono'} name={undefined} phone={phone} invoiceNumber={undefined} amount={undefined}
              nameValid={''} phoneValid={phoneValid} onInputChange={onInputChange} />
              <InputEmail email={email} emailValid={emailValid} onInputChange={onInputChange} />
            </div>
            <div style={{width:'100%',display:'flex',flexDirection:'row'}}>
              <div style={{width:'50%',fontFamily:'sans-serif',color:'gray',fontSize:'20px'}}>
                <span>Método de contacto:</span>
              </div>
              <div style={{width:'50%',height:'20px',display:'flex',flexDirection:'row',
              justifyContent: 'space-around' }}>
                <InputCheckBox 
                checkedValue={checkedEmail} 
                handleChangeValue={handleChangeEmail} text={'Email'}/>
                <InputCheckBox 
                checkedValue={checkedWhatsapp} 
                handleChangeValue={handleChangeWhatsapp} text={'WhatsApp'}/>
              </div>
            </div>
            <SubmitButton data={{ name, g3, link, phone, email,checkedEmail,checkedWhatsapp,dataTable }} firstButtonText={'Crear'} secondButtonText={'Añadir Otro'} setAuth={''} route={'promoter'} rows={models} />
          </div>
        }
      </div>
    </div>
  )
}
