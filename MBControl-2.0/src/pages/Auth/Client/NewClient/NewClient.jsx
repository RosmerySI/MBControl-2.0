import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InputText } from '../../../../components/Atoms/Inputs/InputText';
import { InputRfc } from '../../../../components/Atoms/Inputs/InputRfc';
import { ModelsTable } from '../../../../components/Atoms/Tables/ModelsTable';
import { InputSelect } from '../../../../components/Atoms/Inputs/InputSelect';
import { SubmitButton } from '../../../../components/Atoms/Button/SubmitButton';
import { userInfo } from '../../../../utilities/userInfo/userInfo';
import { useForm } from '../../../../utilities/hook/useForm';
import { petitions } from '../../../../services/api/petitions';
import { ColumnsClient } from '../../../../components/Atoms/Columns/ColumnsClient';
import '../../newStyle.css';

const initialValue = {
  name: '',
  rfc: '',
  promoter:'', 
}
export const NewClient = () => {

  const { clientId } = useParams()  

  const [models, setModels] = useState()
  const [promoters, setPromoters] = useState() 
  const [comisionClient, setComisionClient] = useState({})
  const [toggleModelsClient, setToggleModelsClient] = useState()
  const [dataTable, setDataTable] = useState({}) 
  const [checkedRfc, setCheckedRfc] = useState(false);

  const handleChangeRfc = () => {setCheckedRfc(!checkedRfc)};
  const rfcMoral = /^[A-ZÑ&]{3}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])(?:[A-Z\d]{3})/;
  const rfcFisica = /^[A-ZÑ&]{4}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])(?:[A-Z\d]{3})/;
  
  const formValidations = {
    name: [(value) => value?.length >= 2, 'El nombre de 2 o más caracteres es obligatorio'],
    rfc: checkedRfc === false ? [(value) => value?.match(rfcMoral), 'El rfc debe tener el formato correcto y tener 12 caracteres'] : [(value) => value?.match(rfcFisica), 'El rfc debe tener el formato correcto y tener 13 caracteres'],
  }
  const {name,rfc,promoter,nameValid,rfcValid,onInputChange}=useForm(initialValue,formValidations)

  const { useremail } = userInfo()
    
  const { getObject } = petitions()
  
  const settingInitialValues = async() =>{
    
    if(clientId){
      await getObject(`/client/${clientId}`, setClientToEdit)
      
    }else{
      await getObject('/model', setModels)
      await  getObject('/promoter',setPromoters)
      let comisionClientCopy = { ...comisionClient }      
      let toggleModelsClientCopy = { ...toggleModelsClient }
      models?.forEach(element => {
      comisionClientCopy[`model${element.name}`] = 0      
      toggleModelsClientCopy[element.name] = false
      });
      setComisionClient(comisionClientCopy)    
      setToggleModelsClient(toggleModelsClientCopy)
      setDataTable({
      comisionClient: comisionClientCopy,      
      toggleModelsClient: toggleModelsClientCopy,
      userEmail: useremail,
    }) 
    }
  }
 
  useEffect(() => {
    settingInitialValues()   
  }, [])
  
  let promotersObject = []
  promoters?.forEach(item => {
    let element = [
      {
        name: item.name,
        id: item.id,
      }
    ]
    promotersObject.push(element)
  });
 
  const onToggleModelsClient = (name) => {
    let toggleModelsClientCopy = { ...toggleModelsClient }
    toggleModelsClientCopy[name] = !toggleModelsClientCopy[name]
    setToggleModelsClient(toggleModelsClientCopy)
    setDataTable({
      comision: comisionClient,
      toggleModelsClient: toggleModelsClientCopy,
      useremail:useremail,      
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
      toggleModelsClient: toggleModelsClient,
      useremail:useremail,      
    })
  }
  
  const { columnsClient } = ColumnsClient(
    comisionClient,
    onComisionClientInputChange,
    onToggleModelsClient,
    toggleModelsClient
  )

  return (
  <div className='newContainer'>
    <div className='newPageContainer'>
    {       
      models !== undefined&&promoters!==undefined&&
      <div  className='formStyle'>
      <InputText 
      placeholder={'Nombre'} 
      name={name} 
      phone={undefined} 
      invoiceNumber={undefined} 
      amount={undefined}
      nameValid={nameValid} 
      phoneValid={''} 
      onInputChange={onInputChange}/>
      <InputRfc 
      rfc={rfc} 
      checkedRfc={checkedRfc} 
      rfcValid={rfcValid} 
      onInputChange={onInputChange} 
      handleChangeRfc={handleChangeRfc}/>
      <div style={{width:'60%'}}>  
      <ModelsTable rows={models} columns={columnsClient}/>
      </div>  
      <InputSelect 
      object={promoters} 
      promoter={promoter} 
      g3={undefined} 
      link={undefined}
      client={undefined} 
      company={undefined}
      invoice={undefined}
      model={undefined} 
      role={undefined} 
      onInputChange={onInputChange} 
      labelText={'Promotores'}/>
      <SubmitButton 
      data={{name,rfc,dataTable,promoter}} 
      firstButtonText={'Crear'} 
      secondButtonText={'Añadir Otro'} 
      setAuth={''} 
      route={'client'}
      rows={models}/>
      </div>       
    }
    </div>
  </div>
)
}
