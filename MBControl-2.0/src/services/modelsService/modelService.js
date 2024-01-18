import mbControlApi from "../api/mbControlApi";
import { manageError } from "../../utilities/manageError/manageError";


export const getModels = async (setModels) => {
    
    try {
      const  data = await mbControlApi.get("/model");
      setModels(data)
    } catch (error) {
      let status = error.response.status;
      let variable = error.response.data;
      manageError(status, variable);
    }
    
    
}