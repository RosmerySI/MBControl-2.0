import Swal from 'sweetalert2'

export const manageError = (status, variable) => {
    switch (status) {
      case 400:
        return condicionalVariable(variable);
      case 403:
        return Swal.fire("No está autorizado para realizar esta operación");
      case 404:
        return Swal.fire("No se encuentra la información requerida");
      case 500:
        return Swal.fire("Error de Servidor");
    }
  };