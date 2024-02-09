import React, { useEffect, useState } from 'react'
import { ModelsTable } from '../../../components/Atoms/Tables/ModelsTable'
import { InputText } from '../../../components/Atoms/Inputs/InputText'
import { InputSelect } from '../../../components/Atoms/Inputs/InputSelect'
import { SubmitButton } from '../../../components/Atoms/Button/SubmitButton'
import { petitions } from '../../../services/api/petitions'
import { useForm } from '../../../utilities/hook/useForm'
import { ColumnsProviderOutCome } from '../../../components/Atoms/Columns/ColumnsProviderOutCome'

const initialValue = {
  name: '',
  model: [],
}

export const NewOutComeProvider = () => {

  const [models, setModels] = useState()
  const[formData, setFormData]= useState({})
  const [toggleModels ,  setToggleModels ]=useState()
  const { getObject } = petitions()

  useEffect(() => {
    getObject('/model', setModels)
  }, [])

  const formValidations = {
    name: [(value) => value?.length >= 2, 'El nombre de 2 o más caracteres es obligatorio'],
  }

  const { name, nameValid, model, onInputChange } = useForm(initialValue, formValidations)

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
    if(models){
      let formDataCopy={...formData}
      let toggleModelsCopy={...toggleModels}
      models.forEach(element => {                                                 
        formDataCopy[element.name]=0       
        toggleModelsCopy[element.name]=false      
        
      });     
      setFormData(formDataCopy)
      setToggleModels(toggleModelsCopy)
    }
  }, []);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleToggleModelChange = (name) => {
    let toggleModelCopy = { ...toggleModels}
    toggleModelCopy[name]= !toggleModelCopy[name]
    setToggleModels(toggleModelCopy)
  }
  
  const { columnsProviders } = ColumnsProviderOutCome(
    formData,
    toggleModels,
    handleToggleModelChange,
    handleInputChange
  )

  return (
    <div className='newProvider'>
      <div className='newProviderContainer'>
        <div style={{ width: '60%' }}>
          <InputText
            placeholder={''}
            name={name}
            phone={undefined}
            invoiceNumber={undefined}
            amount={undefined}
            folio={undefined}
            nameValid={nameValid}
            phoneValid={''}
            onInputChange={onInputChange}
          />
        </div>
        <div style={{ width: '60%', height: 'max-content', marginTop: '30px' }}>
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
        <div style={{ width: '60%' }}>
          {modelProvider && columnsProviders && <ModelsTable rows={modelProvider} columns={columnsProviders} />}
        </div>
        <div style={{width:'86%'}}>
          <SubmitButton
            data={{name,modelProvider,formData,toggleModels}}
            firstButtonText={'Añadir'}
            secondButtonText={'Añadir otro'}
            setAuth={''}
            route={'providerOutCome'}
            rows={models} />
        </div>
      </div>
    </div>
  )
}
