import React, { useEffect, useState } from 'react'
import { Button, InputAdornment, TextField } from '@mui/material';
import { petitions } from '../../../../services/api/petitions'
import { useForm } from '../../../../utilities/hook/useForm';
import { InputText } from '../../../../components/Atoms/Inputs/InputText';
import { ModelsTable } from '../../../../components/Atoms/Tables/ModelsTable';
import { InputSelect } from '../../../../components/Atoms/Inputs/InputSelect';
import { InputEmail } from '../../../../components/Atoms/Inputs/InputEmail';
import { SubmitButton } from '../../../../components/Atoms/Button/SubmitButton';
import { InputCheckBox } from '../../../../components/Atoms/Inputs/InputCheckBox';
import { userInfo } from '../../../../utilities/userInfo/userInfo';
import { ColumnsPromoter } from '../../../../components/Atoms/Columns/ColumnsPromoter';
import '../../newStyle.css';

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
  const [toggleModelsPromoter, setToggleModelsPromoter] = useState()
  const [comisionPromoter, setComisionPromoter] = useState({})
  const [comercialCost, setComercialCost] = useState({})
  const [dataTable, setDataTable] = useState({})
  const [checkedEmail, setCheckedEmail] = useState(false);
  const [checkedWhatsapp, setCheckedWhatsapp] = useState(false);

  const { getObject } = petitions()

  const { useremail,userrole,username } = userInfo()

  const emailForm = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const phoneForm = /^\d{10}$/;

  const formValidations = {
    name: [(value) => value?.length >= 2, 'El nombre de 2 o más caracteres es obligatorio'],
    phone: [(value) => value?.match(phoneForm), 'Solo diez dígitos'],
    email: [(value) => value?.match(emailForm), 'contener @ y terminar en .com'],
  }
  const{name,g3,link,phone,email,nameValid,phoneValid,emailValid,onInputChange}=useForm(initialValue, formValidations)

  const settingInitialValues = async () => {
    await getObject('/model', setModels)
    await getObject('/G3', setG3)
    await getObject('/user', setLinks)
    let comisionPromoterCopy = { ...comisionPromoter }
    let comercialCostCopy = { ...comercialCost }
    let toggleModelsPromoterCopy = { ...toggleModelsPromoter }
    models?.forEach(element => {
      comisionPromoterCopy[`model${element.name}`] = 0
      comercialCostCopy[`comercialCost${element.name}`] = 0
      toggleModelsPromoterCopy[element.name] = false
    });
    setComisionPromoter(comisionPromoterCopy)
    setComercialCost(comercialCostCopy)
    setToggleModelsPromoter(toggleModelsPromoterCopy)
    setDataTable({
      comisionPromoter: comisionPromoterCopy,
      comercialCost: comercialCostCopy,
      toggleModelsPromoter: toggleModelsPromoterCopy,
      userEmail: useremail,
    })
  }

  useEffect(() => {
    settingInitialValues()
  }, [])  

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

  const onToggleModelsPromoter = (name) => {
    let toggleModelsPromoterCopy = { ...toggleModelsPromoter }
    toggleModelsPromoterCopy[name] = !toggleModelsPromoterCopy[name]
    setToggleModelsPromoter(toggleModelsPromoterCopy)
    setDataTable({
      comisionPromoter: comisionPromoter,
      comercialCost: comercialCost,
      toggleModelsPromoter: toggleModelsPromoterCopy,
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
      comisionPromoter: {
        ...comisionPromoter,
        [name]: value
      },
      comercialCost: comercialCost,
      toggleModelsPromoter: toggleModelsPromoter,
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
      comisionPromoter: comisionPromoter,
      toggleModelsPromoter: toggleModelsPromoter,
      userEmail: useremail,
    })
  }
  
  const handleChangeEmail = () => {
    setCheckedEmail(!checkedEmail);
  };
  const handleChangeWhatsapp = () => {
    setCheckedWhatsapp(!checkedWhatsapp);
  };

  const {columnsPromoter} = ColumnsPromoter(
    comercialCost,
    onComercialCostInputChange,
    comisionPromoter,
    onComisionPromoterInputChange,
    toggleModelsPromoter,
    onToggleModelsPromoter
  )  
  return (
    <div className='newContainer'>
      <div className='newPageContainer'>
        {
          models !== undefined && G3 !== undefined && links !== undefined &&
          <div className='formStyle'>
            <InputText 
            placeholder={'Nombre'} 
            name={name} 
            phone={undefined} 
            invoiceNumber={undefined} 
            amount={undefined}
            nameValid={nameValid} 
            phoneValid={''} 
            onInputChange={onInputChange} />
            <ModelsTable rows={models} columns={columnsPromoter} />
            <div style={{ width: '100%', height: 'max-content', display: 'flex', 
            flexDirection: 'row', alignItems: 'center',justifyContent:'space-between'}}>
              <InputSelect 
              object={G3} 
              promoter={undefined} 
              g3={g3} 
              link={undefined} 
              client={undefined} 
              company={undefined}
              invoice={undefined}
              model={undefined} 
              onInputChange={onInputChange} 
              labelText={'G3'} />
              <InputSelect 
              object={linksObject} 
              promoter={undefined} 
              g3={undefined} 
              link={link} 
              client={undefined} 
              company={undefined}
              invoice={undefined}
              model={undefined} 
              onInputChange={onInputChange} 
              labelText={'Enlaces'}/>
            </div>
            <div 
            style={{width:'100%',height:'max-content',display:'flex',flexDirection:'row',
            justifyContent:'space-around'}}>
              <InputText 
              placeholder={'Telefono'} 
              name={undefined} 
              phone={phone} 
              invoiceNumber={undefined} 
              amount={undefined}
              invoice={undefined}
              model={undefined}
              nameValid={''} 
              phoneValid={phoneValid} 
              onInputChange={onInputChange} />
              <InputEmail 
              email={email} 
              emailValid={emailValid} 
              onInputChange={onInputChange} />
            </div>
            <div style={{width:'100%',display:'flex',flexDirection:'row'}}>
              <div style={{width:'50%',fontFamily:'sans-serif',color:'gray',fontSize:'20px'}}>
                <span>Método de contacto:</span>
              </div>
              <div style={{width:'50%',height:'20px',display:'flex',flexDirection:'row',
              justifyContent: 'space-around' }}>
                <InputCheckBox 
                checkedValue={checkedEmail} 
                handleChangeValue={handleChangeEmail} 
                text={'Email'}/>
                <InputCheckBox 
                checkedValue={checkedWhatsapp} 
                handleChangeValue={handleChangeWhatsapp} 
                text={'WhatsApp'}/>
              </div>
            </div>
            <SubmitButton 
            data={{ name, g3, link, phone, email,checkedEmail,checkedWhatsapp,dataTable }} 
            firstButtonText={'Crear'} 
            secondButtonText={'Añadir Otro'} 
            setAuth={''} 
            route={'promoter'} 
            rows={models} />
          </div>
        }
      </div>
    </div>
  )
}
