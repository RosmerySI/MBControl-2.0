import React, { useState } from 'react'
import './toggle.css'

export const Toggle = ({
    toggleInvoice, 
    toggleTotal,
    toggleReal,
    handleToggleInvoiceChange,
    handleToggleTotalChange, 
    handleToggleRealChange,
    firstValue,
    secondValue}) => {   
    return (
    <div className="toggle-container" 
    onClick={handleToggleInvoiceChange?handleToggleInvoiceChange:
    handleToggleTotalChange?handleToggleTotalChange:handleToggleRealChange}>               
        <div className={`toggle-btn ${toggleInvoice?!toggleInvoice?'disable':'':
            toggleTotal?!toggleTotal?'disable':'':!toggleReal?'disable':''}`}>
            {toggleInvoice?toggleInvoice?secondValue: firstValue:
            toggleTotal?toggleTotal?secondValue: firstValue:
            toggleReal?secondValue: firstValue}
        </div>
    </div>
  )
}