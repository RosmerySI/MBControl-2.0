import React from 'react'

export const InputCheckBox = ({ checkedValue, handleChangeValue, text }) => {
    return (

        <div style={{ display: 'flex', flexDirection: 'row',alignItems:'center' }}>
            <input type="checkbox" value={false || checkedValue} onChange={handleChangeValue} style={{ width: '20px', height: '20px', margin: '0' }} />
            <span style={{ fontFamily: 'sans-serif', color: 'gray', fontSize: '18px' }}>{text}</span>
        </div>

    )
}
