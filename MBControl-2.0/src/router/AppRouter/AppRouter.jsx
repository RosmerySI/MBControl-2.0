import { BrowserRouter } from "react-router-dom";
import { Guest } from "../Guest/Guest";
import { Auth } from "../Auth/Auth";
import { useEffect, useState } from "react";





export const AppRouter = () => {
  
    const [auth, setAuth] = useState(false)
    useEffect(() => {
        
        localStorage.getItem('token')&& setAuth(true);

    }, [])
    

    return (
        <>

            <BrowserRouter>
                {
                auth?
                <Auth  setAuth={setAuth}/>
                    
                :       
                <Guest setAuth={setAuth} />
                }
            </BrowserRouter>

        </>
    )
}




