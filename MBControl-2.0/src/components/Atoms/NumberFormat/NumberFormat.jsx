import React from 'react'
import { NumericFormat } from 'react-number-format';

export const NumberFormatPercent=(props)=>{
  const { inputRef, onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      decimalScale={2}
      isAllowed={(values) => {
        const { floatValue } = values;
        if (!floatValue) return true
        return floatValue < 100;
      }}
    />
  );
};
export const NumberFormatMoney=(props)=>{
  const { inputRef, onChange, ...other } = props;
  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="$"
    />
  );
}


