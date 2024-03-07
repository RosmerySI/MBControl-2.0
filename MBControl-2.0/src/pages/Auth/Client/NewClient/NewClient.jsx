import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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

export const NewClient = ({ setSessionName }) => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id')

  const [models, setModels] = useState()
  const [promoters, setPromoters] = useState()
  const [comision, setComisionClient] = useState({})
  const [toggleModels, setToggleModelsClient] = useState()
  const [dataTable, setDataTable] = useState({})
  const [checkedRfc, setCheckedRfc] = useState(false);

  const handleChangeRfc = () => { setCheckedRfc(!checkedRfc) };
  
  const [clientEdit, setClientEdit] = useState()
  
  const { useremail } = userInfo()

  const { getObject } = petitions()

  const [initialValue, setInitialValue] = useState(undefined)
  
  useEffect(() => {
    getObject('/model', setModels);
    getObject('/promoter', setPromoters);
    if (id) {
      getObject(`/client/${id}`, setClientEdit);
      setSessionName('Editar Cliente');
    } else {
      setSessionName('Nuevo Cliente');
    }
  }, []);

  useEffect(() => {
    if (clientEdit) {
      console.log('clientEdit', clientEdit)
      setInitialValue({
        name: clientEdit.name,
        rfc: clientEdit.rfc,
        promoter: clientEdit.promoterId,
      })
      let comisionCopy = { ...comision }
      let toggleModelsCopy = { ...toggleModels }
      clientEdit.models.forEach(element => {
        comisionCopy[element.name] = element.value;
        toggleModelsCopy[element.name] = element.hasIva;
      });
      setComisionClient(comisionCopy);
      setToggleModelsClient(toggleModelsCopy);
      setDataTable({
        comision: comisionCopy,
        toggleModels: toggleModelsCopy,
        useremail: useremail,
      });
    } else {
      setInitialValue({        
        name: '',
        rfc: '',
        promoter: '',        
      })
      if (models) {
        let comisionCopy = {...comision};
        let toggleModelsCopy = {...toggleModels };
        models.forEach(element => {
          comisionCopy[element.name] = 0;
          toggleModelsCopy[element.name] = false;
        });
        setComisionClient(comisionCopy);
        setToggleModelsClient(toggleModelsCopy);
        setDataTable({
          comision: comisionCopy,
          toggleModels: toggleModelsCopy,
          useremail: useremail,
        });
      }
    }
  }, [clientEdit])

  const rfcMoral = /^[A-ZÑ&]{3}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])(?:[A-Z\d]{3})/;
  const rfcFisica = /^[A-ZÑ&]{4}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])(?:[A-Z\d]{3})/;

  const formValidations = {
    name: [(value) => value?.length >= 2, 'El nombre de 2 o más caracteres es obligatorio'],
    rfc: checkedRfc === false ? [(value) => value?.match(rfcMoral), 'El rfc debe tener el formato correcto y tener 12 caracteres'] : [(value) => value?.match(rfcFisica), 'El rfc debe tener el formato correcto y tener 13 caracteres'],
  }

  const { name, rfc, promoter, nameValid, rfcValid, onInputChange } = useForm(initialValue,formValidations);

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
    let toggleModelsCopy = { ...toggleModels }
    toggleModelsCopy[name] = !toggleModelsCopy[name]
    setToggleModelsClient(toggleModelsCopy)
    setDataTable({
      comision: comision,
      toggleModels: toggleModelsCopy,
      useremail: useremail,
    })
  }
  const onComisionClientInputChange = ({ target }) => {
    const { name, value } = target;
    setComisionClient({
      ...comision,
      [name]: value
    });
    setDataTable({
      comision: {
        ...comision,
        [name]: value
      },
      toggleModels: toggleModels,
      useremail: useremail,
    })
  }

  const { columnsClient } = ColumnsClient(
    comision,
    onComisionClientInputChange,
    onToggleModelsClient,
    toggleModels
  )
  return (
    <div className='newContainer'>
      <div className='newPageContainer'>
        {
          models !== undefined && promoters !== undefined &&
          <div className='formStyle'>
            <InputText
              onInputChange={onInputChange}
              placeholder={'Nombre'}
              name={name !== undefined ? name : ''}
              nameValid={nameValid}
              phone={undefined}
              phoneValid={''}
              invoiceNumber={undefined}
              amount={undefined}
            />
            <InputRfc
              rfc={rfc !== undefined ? rfc : ''}
              checkedRfc={checkedRfc}
              rfcValid={rfcValid}
              onInputChange={onInputChange}
              handleChangeRfc={handleChangeRfc} />
            <div style={{ width: '60%' }}>
              <ModelsTable rows={models} columns={columnsClient} />
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
              labelText={'Promotores'} />
            <SubmitButton
              data={{ name, rfc, dataTable, promoter,clientEdit}}
              firstButtonText={clientEdit?'Editar':'Crear'}
              secondButtonText={clientEdit?'':'Añadir Otro'}
              setAuth={''}
              route={'client'}
              rows={models} />
          </div>
        }
      </div>
    </div>
  )
}
