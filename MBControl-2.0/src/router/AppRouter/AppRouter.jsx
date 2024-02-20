import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Auth } from "../Auth/Auth";
import { Guest } from "../Guest/Guest";

export const AppRouter = () => {
  
    const token = localStorage.getItem('token');

    const [auth, setAuth] = useState(token ? true : false);

    useEffect(() => {
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiracion = payload.exp * 1000;
            const fechaActual = new Date().getTime();
            if (fechaActual > expiracion) {
                localStorage.removeItem('token');
                setAuth(false);
            }
        }
    }, [token]);    

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




