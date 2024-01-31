import { jwtDecode } from "jwt-decode";
 
 export const userInfo = () => {
    let useremail
    let userrole
    let username
    let token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      useremail = decoded.email
      userrole = decoded.Roles
      username = decoded.name  
    }
    return {
      useremail,
      userrole,
      username
    }    
 }
 