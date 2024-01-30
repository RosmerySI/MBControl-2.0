import React from "react";
import mbControlApi from "./mbControlApi";
import { manageError } from "../../utilities/manageError/manageError";

export const petitions = () => {
  const getObject = async (route, setObject) => {
    try {
      const { data } = await mbControlApi.get(route);
      setObject(data);
    } catch (error) {
      console.log("error", error);
      let status = error.response.status;
      let variable = error.response.data;
      manageError(status, variable);
    }
  };
  const postObject = async (route, form, setAuth,navigate) => {   
    try {
    const { data } = await mbControlApi.post(route, form);
    if(route==='user/login'){
    localStorage.setItem("token", data.token)
    localStorage.setItem("token-init-date", new Date().getTime());     
    setAuth(true)
    }
    if(route==='client'){
    navigate('/clients')
    }
    if(route==='promoter'){
    navigate('/promoters')
    }      
    if(route==='invoice'){
    navigate('/invoices')
    }      
    } catch (error) {
      console.log(error)
      let status = error.response?.status;
      let variable = error.response?.data;
      manageError(status, variable);
    }
  };
  const putObject = async (route) => {
    try {
      await mbControlApi.put(route);
      // Espera hasta que la operación anterior se complete antes de continuar
    } catch (error) {
      let status = error.response.status;
      let variable = error.response.data;
      console.log(status, variable);
      manageError(status, variable);
      throw error; // Re-lanza el error para que se propague a la función llamadora
    }
  };
  return {
    getObject,
    postObject,
    putObject,
  };
};
