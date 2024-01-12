import { BrowserRouter } from "react-router-dom";
import { Guest } from "../Guest/Guest";
import { Auth } from "../Auth/Auth";




export const AppRouter = () => {
  


    return (
        <>

            <BrowserRouter>

               
                <Auth/>
                    
                        
                {/* <Guest /> */}
                
            </BrowserRouter>

        </>
    )
}




