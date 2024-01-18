import axios from 'axios';
//import { getEnvVariables } from '../helpers/getEnvVariables';


//const { VITE_API_URL } = getEnvVariables()




const mbControlApi = axios.create({
    baseURL: 'https://mb-control.azurewebsites.net'
});


mbControlApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    
    return config;
})


export default mbControlApi;