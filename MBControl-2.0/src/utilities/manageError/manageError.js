import Swal from 'sweetalert2'
const conditionalVariable=(variable)=>{
  if(variable===''){
    Swal.fire('Se produjo un error')
  }else{
    Swal.fire(variable)
  }
 }

export const manageError = (status, variable) => {
    switch (status) {
      case 400:
        return conditionalVariable(variable);
      case 403:
        return Swal.fire("No está autorizado para realizar esta operación");
      case 404:
        return Swal.fire("No se encuentra la información requerida");
      case 500:
        return Swal.fire("Error de Servidor");
    }
  };