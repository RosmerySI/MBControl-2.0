import React from 'react'
import { Box, Modal } from '@mui/material'
import { InputText } from '../Inputs/InputText'
import './modal.css'
export const ModalCalculator = ({ open, handleClose,data }) => {
  
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    height: 400,
                    bgcolor: 'background.paper',
                    borderRadius: '20px',
                    boxShadow: 24,
                    p: 4,
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center'

                }}>
                    <div className='modalCalculator'>
                    <InputText
                    placeholder={''}
                    name={undefined}
                    phone={undefined}
                    invoiceNumber={undefined}
                    amount={undefined}
                    folio={undefined}
                    nameValid={''}
                    phoneValid={''}
                    onInputChange={''}
                    provider={undefined}
                    label={'Total de Operacion'}
                    totalOperation={data?.totalOperacion}
                    iva={undefined}
                    subTotalOperation={undefined}
                    clientTotalReturn={undefined}
                    comisionPromoter={undefined}
                    marketUtility={undefined}
                    clientAmount={undefined}
                    />
                    <InputText
                    placeholder={''}
                    name={undefined}
                    phone={undefined}
                    invoiceNumber={undefined}
                    amount={undefined}
                    folio={undefined}
                    nameValid={''}
                    phoneValid={''}
                    onInputChange={''}
                    provider={undefined}
                    label={'IVA'}
                    totalOperation={undefined}
                    iva={data?.iva}
                    subTotalOperation={undefined}
                    clientTotalReturn={undefined}
                    comisionPromoter={undefined}
                    marketUtility={undefined}
                    clientAmount={undefined}/>
                    </div>
                    <div className='modalCalculator'>
                    <InputText
                    placeholder={''}
                    name={undefined}
                    phone={undefined}
                    invoiceNumber={undefined}
                    amount={undefined}
                    folio={undefined}
                    nameValid={''}
                    phoneValid={''}
                    onInputChange={''}
                    provider={undefined}
                    label={'SubTotal de Operacion'}
                    totalOperation={undefined}
                    iva={undefined}
                    subTotalOperation={data?.subTotalOperacion}
                    clientTotalReturn={undefined}
                    comisionPromoter={undefined}
                    marketUtility={undefined}
                    clientAmount={undefined}/>
                    <InputText
                    placeholder={''}
                    name={undefined}
                    phone={undefined}
                    invoiceNumber={undefined}
                    amount={undefined}
                    folio={undefined}
                    nameValid={''}
                    phoneValid={''}
                    onInputChange={''}
                    provider={undefined}
                    label={'Retorno Total'}
                    totalOperation={undefined}
                    iva={undefined}
                    subTotalOperation={undefined}
                    clientTotalReturn={data?.retornoTotalCliente}
                    comisionPromoter={undefined}
                    marketUtility={undefined}
                    clientAmount={undefined}/>
                    </div>
                    <div className='modalCalculator'>
                    <InputText
                    placeholder={''}
                    name={undefined}
                    phone={undefined}
                    invoiceNumber={undefined}
                    amount={undefined}
                    folio={undefined}
                    nameValid={''}
                    phoneValid={''}
                    onInputChange={''}
                    provider={undefined}
                    label={'Comision del Promotor'}
                    totalOperation={undefined}
                    iva={undefined}
                    subTotalOperation={undefined}
                    clientTotalReturn={undefined}
                    comisionPromoter={data?.comisionPromoter}
                    marketUtility={undefined}
                    clientAmount={undefined}/>
                    <InputText
                    placeholder={''}
                    name={undefined}
                    phone={undefined}
                    invoiceNumber={undefined}
                    amount={undefined}
                    folio={undefined}
                    nameValid={''}
                    phoneValid={''}
                    onInputChange={''}
                    provider={undefined}
                    label={'Utilidad Market'}
                    totalOperation={undefined}
                    iva={undefined}
                    subTotalOperation={undefined}
                    clientTotalReturn={undefined}
                    comisionPromoter={undefined}
                    marketUtility={data?.comisionUtilidadMB}
                    clientAmount={undefined}/>
                    </div>
                    <div style={{width:'50%'}}>
                    <InputText
                    placeholder={''}
                    name={undefined}
                    phone={undefined}
                    invoiceNumber={undefined}
                    amount={undefined}
                    folio={undefined}
                    nameValid={''}
                    phoneValid={''}
                    onInputChange={''}
                    provider={undefined}
                    label={'Saldo del Cliente'}
                    totalOperation={undefined}
                    iva={undefined}
                    subTotalOperation={undefined}
                    clientTotalReturn={undefined}
                    comisionPromoter={undefined}
                    marketUtility={undefined}
                    clientAmount={data?.excedente}/>                    
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
