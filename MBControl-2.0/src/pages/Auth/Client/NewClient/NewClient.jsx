import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InputText } from '../../../../components/Atoms/Inputs/InputText';
import { InputRfc } from '../../../../components/Atoms/Inputs/InputRfc';
import { ModelsTable } from '../../../../components/Atoms/Tables/ModelsTable';
import { InputSelect } from '../../../../components/Atoms/Inputs/InputSelect';
import { SubmitButton } from '../../../../components/Atoms/Button/SubmitButton';
import NumberFormatCustom from '../../../../components/Atoms/NumberFormat/NumberFormat';
import { userInfo } from '../../../../utilities/userInfo/userInfo';
import { useForm } from '../../../../utilities/hook/useForm';
import { petitions } from '../../../../services/api/petitions';
import { Button, InputAdornment, TextField } from '@mui/material';
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
 
  const [toggleModels, setToggleModels] = useState()
  const [formData, setFormData] = useState({}) 
  const [dataTable, setDataTable] = useState({}) 
  const [clientToEdit, setClientToEdit] = useState() 
    
  const { getObject } = petitions()
  
  const settingInitialValues = async() =>{
    
    if(clientId){
      await getObject(`/client/${clientId}`, setClientToEdit)
      
    }else{
      await getObject('/model', setModels)
      await  getObject('/promoter',setPromoters)
      let formDataCopy = { ...formData }
      let toggleModelsCopy = { ...toggleModels }
      models?.forEach(element => {
        formDataCopy[`model${element.name}`] = 0
        toggleModelsCopy[element.name] = false
      });
      setFormData(formDataCopy)
      setToggleModels(toggleModelsCopy)
      setDataTable({
        formData: formDataCopy,
        toggleModels: toggleModelsCopy,
        useremail:useremail,      
      })  
    }
    
  }
 
  useEffect(() => {
    settingInitialValues()   
  }, [])  
  const [checkedRfc, setCheckedRfc] = useState(false);
  const handleChangeRfc = () => {setCheckedRfc(!checkedRfc)};
  const rfcMoral = /^[A-ZÑ&]{3}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])(?:[A-Z\d]{3})/;
  const rfcFisica = /^[A-ZÑ&]{4}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])(?:[A-Z\d]{3})/;
  const formValidations = {
    name: [(value) => value?.length >= 2, 'El nombre de 2 o más caracteres es obligatorio'],
    rfc: checkedRfc === false ? [(value) => value?.match(rfcMoral), 'El rfc debe tener el formato correcto y tener 12 caracteres'] : [(value) => value?.match(rfcFisica), 'El rfc debe tener el formato correcto y tener 13 caracteres'],
  }
const { name, rfc,promoter, nameValid, rfcValid, onInputChange } = useForm(initialValue, formValidations)

const { useremail } = userInfo()
  
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
 
  const onToggleModels = (name) => {
    let toggleModelsCopy = { ...toggleModels }
    toggleModelsCopy[name] = !toggleModelsCopy[name]
    setToggleModels(toggleModelsCopy)
    setDataTable({
      formData: formData,
      toggleModels: toggleModelsCopy,
      useremail:useremail,      
    })
  }
  const onComisionInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value
    });
    setDataTable({
      formData:{
        ...formData,
        [name]: value
      },
      toggleModels: toggleModels,
      useremail:useremail,      
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
      field: 'Comisión',
      disableColumnMenu: true,
      sortable: false,
      width: 150,
      renderCell: (cellvalues) => {
        return (
          <TextField
            name={`model${cellvalues.row.name}`}
            value={formData[`model${cellvalues.row.name}`]||0}
            onChange={onComisionInputChange}
            autoComplete="off"
            sx={{ width:'180px', padding:'0px','& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':{padding:0}}}
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
      field: 'Sub-Total/Total',
      disableColumnMenu: true,
      sortable: false,
      width: 140,      
      renderCell: (cellvalues) => {       
        return (                
          <Button variant='contained'name={cellvalues.row.name}
            style={{ 
              backgroundColor: "white",
              boxShadow: 'none',
              width: '180px',
              padding: 0,
              display: 'flex',
              justifyContent: 'center'
            }}           
            onClick={()=>{onToggleModels(cellvalues.row.name)}}
          >          
          <p style={{color:'gray'}}>
          {toggleModels&&
          toggleModels[cellvalues.row.name] === true?'Sub-Total':'Total'
          }</p>
          </Button>                  
        )        
      }       
    },
  ]

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
      <ModelsTable rows={models} columns={columns}/>
      <InputSelect 
      object={promoters} 
      promoter={promoter} 
      g3={undefined} 
      link={undefined}
      client={undefined} 
      company={undefined}
      invoice={undefined}
      model={undefined} 
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
