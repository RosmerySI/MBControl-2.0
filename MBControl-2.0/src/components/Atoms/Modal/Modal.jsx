import { Box, Button, Modal } from '@mui/material'
import React from 'react'

export const ModalOperation = ({open,handleClose,handleNewOperation,handleInvoice}) => {
  return (
    <div >
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%, -50%)',
        width:500,height:400,bgcolor:'background.paper',borderRadius:'20px',boxShadow:24,p:4,
        display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
          <Button
            onClick={handleNewOperation}
            style={{height:'150px', width:'150px',borderRadius:'50%',color:'#4d4d4d',
            fontFamily:'sans-serif',fontWeight:'30',fontSize:'16px',textTransform:'none',
            backgroundColor:'lightgray'}}>
            <div >
              <p>Retorno </p>
            </div>
          </Button>         
          <Button 
            onClick={handleInvoice}
            style={{height:'150px', width:'150px',borderRadius:'50%',color:'#4d4d4d',
            fontFamily:'sans-serif',fontWeight:'30',fontSize:'16px',textTransform:'none',
            backgroundColor:'lightgray'}}>
            <div >
              <p >Asignar Factura</p>
            </div>
          </Button> 
        </Box>
      </Modal>
      </div>
  )
}
