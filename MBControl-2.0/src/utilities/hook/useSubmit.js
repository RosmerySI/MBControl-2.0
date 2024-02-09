import { petitions } from "../../services/api/petitions.js";
import { modalError } from "../modals/modals.js";

export const useSubmit=(route,setAuth,data,navigate,rows,setObject)=>{
  const { postObject } = petitions();
  
  if (route==='user/login') {
    data.email !== "" &&data.password !== ""?    
    postObject(route, data, setAuth,navigate)
    :
    modalError('Revisa correo y contraseña')
  }else if (route === "client") {
    if(data.name!==''&&data.rfc!==''&& data.selectedPromoter!==''){
      let modelsClient = [];
      rows.forEach((element) => {
        const model = {
          modelId: element.id,
          value: parseFloat(data.dataTable.formData[`model${element.name}`]) || 0,
          hasIva: data.dataTable.toggleModels[element.name] || false,
        };
        modelsClient.push(model);
      });
      const dataClient = {
        name: data.name,
        userEmail: data.dataTable.useremail,
        rfc: data.rfc,        
        promoterId: data.promoter,
        models: modelsClient,
      };      
      postObject(route, dataClient, setAuth, navigate);
    } else {
      modalError("Revisa el nombre el rfc o el promotor.");
    }
  }else if (route === "promoter") {
    if(data.name!==''&&data.phone!==''&&data.email!==''&&data.G3!==undefined&&
       data.link!==undefined&&data.checkedWhatsapp===true||data.checkedEmail===true){
      let modelsPromoter = [];
      rows.forEach((element) => {
        const model = {
          modelId: element.id,
          value: parseFloat(data.dataTable.comision[`model${element.name}`])||0,
          comercialCost:parseFloat(data.dataTable.comercialCost[`comercialCost${element.name}`])||0,
          hasPercent:data.dataTable.toggleModels[element.name] || false,
        };
        modelsPromoter.push(model);
      });
      const dataPromoter = {
        name:data.name,
        g3Id:data.g3,
        //link: promoter.link
        phone:data.phone,
        email:data.email,
        contactByEmail:data.checkedEmail,
        contactByPhone:data.checkedWhatsapp,
        userEmail:data.dataTable.userEmail,
        models: modelsPromoter,
      };
      console.log(route, dataPromoter, setAuth, navigate);
      postObject(route, dataPromoter, setAuth, navigate);
    } else {
      modalError(
        "Revisa nombre, teléfono, email. Escoge G3 y enlace. Marca algún Método de Contacto."
      );
    }
  }else if(route==='invoice'){
    
    if(data.client!==''&&data.company!==''&&data.amount!==''&&data.invoiceNumber!==''){
      
      const dataInvoice = {
        //client:data.client,
        totalAmount:parseFloat(data.amount),
        number:parseFloat(data.invoiceNumber),
        companyId:data.company,
        userEmail:data.useremail
      };
      postObject(route, dataInvoice, setAuth, navigate);
    } else {
      modalError(
        "Revisa nombre, teléfono, email. Escoge G3 y enlace. Marca algún Método de Contacto."
      );
    }
  }else if(route==='operation'){
    if(data.client!==''&&data.company!==''&&data.invoice!==''
    &&data.amount!==''){
      let modelsOperation = [];
      rows.forEach((element) => {
        const model = {
          modelId: element.id,
          retorno: parseFloat(data.dataTable.return[element.name]||0),
          providerIncomeId:data.dataTable.providerIncomeId[element.name],
          providerOutcomeId:data.dataTable.providerOutcomeId[element.name],
        };
        modelsOperation.push(model);
      });
      const dataOperation = {
        clientId:data.client,
        userEmail:data.useremail,
        companyId:data.company,
        invoiceIds:data.invoice,
        totalOperation:parseFloat(data.amount),
        isTotalRetorno:data.toggleTotal,
        models:modelsOperation,
        folio:data.folio,
        isParent:true,
        parentOperationId:'',
        factura:''        
      };      
      postObject(route, dataOperation, setAuth, navigate);
    } else {
      modalError(
      "Revisa nombre, teléfono, email. Escoge G3 y enlace. Marca algún Método de Contacto."
    );
    }
    }else if(route==='operation/calculator'){
      if(data.amount!==''){
        let modelsPromoterCalculator = [];
        rows.forEach((element) => {
          const model = {
            modelId: element.id,
            value: parseFloat(data.dataTablePromoter.value[element.name]||0),
            comercialCost: parseFloat(data.dataTablePromoter.comercialCost[element.name])||0,
            isPercent:data.dataTablePromoter.toggleModels[element.name],
          };
          modelsPromoterCalculator.push(model);
        });
        let modelsClientCalculator = [];
        rows.forEach((element) => {
          const model = {
            modelId: element.id,
            value: parseFloat(data.dataTableClient.value[element.name]||0),
            hasIva:data.dataTableClient.toggleModels[element.name],
          };
          modelsClientCalculator.push(model);
        });
        let modelsOperations = [];
        rows.forEach((element) => {
          const model = {
            modelId: element.id,
            retorno: parseFloat(data.dataTableProviders.return[element.name]||0),
            providerIncomeId:data.dataTableProviders.providerIncomeId[element.name],
            providerOutcomeId:data.dataTableProviders.providerOutcomeId[element.name],
          };
          modelsOperations.push(model);
        });
        const dataCalculator = {
          totalOperacion:parseFloat(data.amount),
          isTotalRetorno:false,
          isComisionCalculator:true,
          hasInvoice:data.checkedInvoice,
          promotersModels:modelsPromoterCalculator,
          clientsModels:modelsClientCalculator,
          operationsModels:modelsOperations                  
        };       
        postObject(route, dataCalculator, setAuth, navigate,setObject);
      } else {
        modalError(
        "Revisa nombre, teléfono, email. Escoge G3 y enlace. Marca algún Método de Contacto.");
      }
    }else if(route==='providerInCome'){
      if(data.provider!==''){
        const dataIncomeProvider = {
          name:data.name,
          invoiceAmount:parseFloat(data.formData.invoiceAmount),
          noInvoiceAmount:parseFloat(data.formData.notInvoiceAmount),
          invoiceTotal:data.toggleInvoiceTotal.toggleInvoiceTotal,
          noInvoiceTotal:data.toggleNotInvoiceTotal.toggleNotInvoiceTotal                    
      };     
      postObject(route, dataIncomeProvider, setAuth, navigate,setObject);
    } else {
      modalError(
      "Revisa nombre, teléfono, email. Escoge G3 y enlace. Marca algún Método de Contacto.");
    }
  }else if(route==='providerOutCome'){
    if(data.provider!==''){
      let modelsOutComeProvider = [];
        data.modelProvider.forEach((element) => {
          const model = {
            modelId: element.id,
            charge: parseFloat(data.formData[element.name]||0),
            isTotal:data.toggleModels[element.name],
          };
          modelsOutComeProvider.push(model);
        }); 
        const dataOutcomeProvider = {
          name:data.name,
          providerOutComeModels:modelsOutComeProvider,            
        };  
        
      postObject(route, dataOutcomeProvider, setAuth, navigate,setObject);
    } else {
      modalError(
      "Revisa nombre, teléfono, email. Escoge G3 y enlace. Marca algún Método de Contacto.");
    }
  }
};
