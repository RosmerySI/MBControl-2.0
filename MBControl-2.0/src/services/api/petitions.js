import React from 'react'
import mbControlApi from './mbControlApi';
import { manageError } from '../../utilities/manageError/manageError';


export const petitions = () => {
    const getObject = async (route, setObject) => {
        
        try {
          const { data } = await mbControlApi.get(route);
          setObject(data)
        } catch (error) {
          let status = error.response.status;
          let variable = error.response.data;
          manageError(status, variable);
        }
    };
    const postObject = async (route, form,setAuth) => {
    try {
        const { data } = await mbControlApi.post(route, form);
        localStorage.setItem("token", data.token);
        localStorage.setItem("token-init-date", new Date().getTime());     
        setAuth(true)          
      } catch (error) {
        let status = error.response?.status;
        let variable = error.response?.data;
        manageError(status, variable);
      }
    }
  return {
    getObject,
    postObject
  }
}
