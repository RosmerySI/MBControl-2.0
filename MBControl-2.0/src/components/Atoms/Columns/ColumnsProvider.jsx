import React from 'react'
import { Button, InputAdornment, TextField } from '@mui/material'
import { NumberFormatPercent } from '../NumberFormat/NumberFormat'

export const ColumnsProvider = (
    formData,
    toggleInvoiceTotal,
    toggleNotInvoiceTotal,
    setToggleInvoiceTotal,
    setToggleNotInvoiceTotal,
    handleInputChange
) => {

    let columnsProviders = [
        {
            field: 'name',
            headerName: ' Facturación',
            type: 'string',
            width: 160,
        },
        {
            field: 'Costo',
            disableColumnMenu: true,
            sortable: false,
            width: 120,
            renderCell: (cellvalues) => {
                return (
                    <TextField
                        name={
                            cellvalues?.row?.name === 'Factura' ? 'invoiceAmount' : 'notInvoiceAmount'
                        }
                        value={
                            cellvalues?.row?.name === 'Factura' ?
                                formData.invoiceAmount || 0 :
                                formData.notInvoiceAmount || 0}
                        onChange={handleInputChange}
                        sx={{
                            width: '200px', padding: '0px',
                            '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { padding: 0 }
                        }}
                        InputProps={{
                            inputComponent: NumberFormatPercent,
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                    />
                )
            }
        },
        {
            field: 'Total / SubTotal',
            disableColumnMenu: true,
            sortable: false,
            width: 200,
            renderCell: (cellvalues) => {
                return (
                    <Button
                        style={{ backgroundColor: "white", boxShadow: 'none', minWidth: '100px', padding: 0 }}
                        variant='contained'
                        name={cellvalues.row.name === 'Factura' ? 'toggleInvoiceTotal' : 'toggleNotInvoiceTotal'}
                        onClick={() => {
                            if (cellvalues.row.name === 'Factura') {                                
                                let toggleInvoiceTotalCopy = { ...toggleInvoiceTotal }
                                toggleInvoiceTotalCopy.toggleInvoiceTotal = !toggleInvoiceTotalCopy.toggleInvoiceTotal
                                setToggleInvoiceTotal(toggleInvoiceTotalCopy)
                            } else {                            
                                let toggleNotInvoiceTotalCopy = { ...toggleNotInvoiceTotal }
                                toggleNotInvoiceTotalCopy.toggleNotInvoiceTotal= !toggleNotInvoiceTotalCopy.toggleNotInvoiceTotal
                                setToggleNotInvoiceTotal(toggleNotInvoiceTotalCopy)
                            }

                        }}
                    >
                        {cellvalues.row.name === 'Factura' ?
                            <p style={{color:'black'}}>{toggleInvoiceTotal?.toggleInvoiceTotal===true?'Total':'SubTotal'}</p>
                        :
                            <p style={{color:'black'}}>{toggleNotInvoiceTotal?.toggleNotInvoiceTotal===true?'Total':'SubTotal'}</p>
                        }
                    </Button>
                )
            }
        },
    ]
    return { columnsProviders }
}
