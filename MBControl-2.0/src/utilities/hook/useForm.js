
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations={} ) => {


   
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({})
    
    useEffect(() => {
        createValidators();  
     
    }, [formState])
   

    const isFormValid = useMemo(() =>{
    //se barre cada una de las propiedades(email, password, etc)
    // del formValidation mediante el formValue y ver si tiene
    // el valor de null. Si lo tiene es porque no hay error y si 
    //no hay error se puede submit
      for( const formValue of Object.keys(formValidation)){
        if( formValidation[formValue] !== null) return false;
        }
      return true;
    },[formValidation])//el useMemo se ejecuta cada vez que cambien el 
    //formValidation y lo que hace es memorizar el valor que 
    //retorna la funcion
  
    const onInputChange = ({ target }) => {
        
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
        
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        
        const formCheckedValues = {};
        //formField es la property
        for (const formField of Object.keys( formValidations )) {
            
            //desestructurar la funcion y el errorMessage que
            //que vienen del formValidations basado en el formField
            //lo que segnifica que va a pasar por cada una de las 
            //properties del formField(displayName password e email)
            const [ fn, errorMessage] = formValidations[formField];

            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues );
        
    }
    

    return {
        ...formState,
        formState,
        ...formValidation,
        isFormValid,

        onInputChange,        
        onResetForm,       
        
    }
}