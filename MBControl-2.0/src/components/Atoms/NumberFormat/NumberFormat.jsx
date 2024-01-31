import React from 'react'
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';



   function NumberFormatCustom(props){
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
      }
      NumberFormatCustom.propTypes = {
        inputRef: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
      
      };
      export default NumberFormatCustom