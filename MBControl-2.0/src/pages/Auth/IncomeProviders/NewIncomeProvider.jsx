import React, { useEffect, useState } from 'react'
import { InputText } from '../../../components/Atoms/Inputs/InputText'
import { SubmitButton } from '../../../components/Atoms/Button/SubmitButton'
import { ModelsTable } from '../../../components/Atoms/Tables/ModelsTable'
import { useForm } from '../../../utilities/hook/useForm'
import { ColumnsIncomeProvider } from '../../../components/Atoms/Columns/ColumnsIncomeProvider'

const initialValue = {
  name: ''
}
export const NewIncomeProvider = ({setSessionName}) => {

  const [formData, setFormData] = useState({})
  const [toggleInvoiceTotal, setToggleInvoiceTotal] = useState()
  const [toggleNotInvoiceTotal, setToggleNotInvoiceTotal] = useState()

  useEffect(() => {
    setSessionName('Nuevo Proveedor Ingreso')
    let formDataCopy = { ...formData }
    let toggleInvoiceTotalCopy = { ...toggleInvoiceTotal }
    let toggleNotInvoiceTotalCopy = { ...toggleNotInvoiceTotal }

    formDataCopy['invoiceAmount'] = 0
    formDataCopy['notInvoiceAmount'] = 0
    toggleInvoiceTotalCopy['toggleInvoiceTotal'] = false
    toggleNotInvoiceTotalCopy['toggleNotInvoiceTotal'] = false

    setFormData(formDataCopy)
    setToggleInvoiceTotal(toggleInvoiceTotalCopy)
    setToggleNotInvoiceTotal(toggleNotInvoiceTotalCopy)
  }, []);

  const formValidations = {
    name: [(value) => value?.length >= 2, 'El nombre de 2 o más caracteres es obligatorio'],
  }

  const { name, nameValid, onInputChange } = useForm(initialValue, formValidations)

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const facturas = [{ name: 'Factura' }, { name: 'Sin Factura' }]

  const { columnsProviders } = ColumnsIncomeProvider(
    formData,
    toggleInvoiceTotal,
    toggleNotInvoiceTotal,
    setToggleInvoiceTotal,
    setToggleNotInvoiceTotal,
    handleInputChange
  )

  return (
    <div className='newProvider'>
      <div className='newProviderContainer'>
        <div style={{ width: '55%', marginBottom: '20px' }}>
          <InputText
            onInputChange={onInputChange}
            placeholder={''}
            name={name}
            nameValid={nameValid}
            phone={undefined}
            phoneValid={''}
            invoiceNumber={undefined}
            amount={undefined}
            folio={undefined}          
          />
        </div>
        <div style={{ width: '55%', marginBottom: '20px' }}>
          <ModelsTable rows={facturas} columns={columnsProviders} />
        </div>
        <div style={{ width: '55%', display: 'flex', justifyContent: 'center' }}>
          <SubmitButton
            data={{name,formData,toggleInvoiceTotal,toggleNotInvoiceTotal }}
            firstButtonText={'Añadir'}
            secondButtonText={'Añadir otro'}
            setAuth={''}
            route={'providerInCome'}
            rows={''}
          />
        </div>
      </div>
    </div>
  )
}
