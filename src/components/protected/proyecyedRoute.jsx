
import { Navigate } from "react-router-dom"
import { useAuth } from "context/userContext";
// import {usseEffect} from "react" 
export const ProtectedRoute =({children})=>{
    const isLogin = localStorage.getItem('isLogin');
    const {isLoggedInd}=useAuth()
    
    if (!isLogin) {
        return <Navigate to="/auth/login" />;
    }
    
    
    return children
}