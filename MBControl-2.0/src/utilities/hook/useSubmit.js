import { petitions } from "../../services/api/petitions.js";
import { modalError } from "../modals/modals.js";

export const useSubmit=(route,setAuth,data,navigate,rows,setObject)=>{
  const { postObject, putObject } = petitions();
  
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
    if(data.client.client!==''&&data.company.company!==''&&data.invoice.invoice!==''
    &&data.amount.amount!==''){
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
        clientId:data.client.client,
        userEmail:data.useremail,
        companyId:data.company.company,
        invoiceIds:!data.toggleInvoice?data.invoice.invoice:[],
        totalOperation:parseFloat(data.amount.amount),
        isTotalRetorno:data.toggleTotal,
        models:modelsOperation,
        folio:data.folio,
        isParent:data.parent?true:false,
        parentOperationId:data.id?data.id:'',
        factura:''        
      };
      console.log(dataOperation)
      dataOperation.isParent?               
      putObject(`operation/${dataOperation.parentOperationId}`, dataOperation,
      '/operations','La operación se editó con éxito')
      :
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
  }else if(route==='user/newUserRequest'){
    console.log(data,rows)
    let rolesId=[] 
    rows?.forEach(item=>{
      data?.role?.role?.forEach(element=>{
        if(item.name===element){
          rolesId.push(item.id)
        }
      })
    })      
    if(data.email!==''&&data.email!==undefined&&data.role.role.length!==0){
      const dataNewUser = {
        email:data.email,
        rolesId:rolesId,            
      };
      
      postObject(route, dataNewUser, setAuth, navigate,setObject);
    } else {
      modalError(
      "Revisa nombre, teléfono, email. Escoge G3 y enlace. Marca algún Método de Contacto.");
    }
  }else if(route==='user/modifyRoles'){
         
    if(data.role.role.length!==0){
      const dataModifyUser = {
        email:data.email,
        rolesName:data.role.role            
      };
         
      postObject(route, dataModifyUser, setAuth, navigate,setObject);
    } else {
      modalError(
      "Revisa nombre, teléfono, email. Escoge G3 y enlace. Marca algún Método de Contacto.");
    }
  }else if(route==='company'){
           
    if(data.name!==''&&data.name!==undefined){
      const dataNewCompany = {
        name:data.name,
                   
      };
      rows?
      putObject(route,dataNewCompany,'/companies','La empresa se editó con éxito'):
      postObject(route, dataNewCompany, setAuth, navigate,setObject);
    } else {
      modalError(
      "Revisa nombre, teléfono, email. Escoge G3 y enlace. Marca algún Método de Contacto.");
    }
  }
};
