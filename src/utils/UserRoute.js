import { useAuth } from "../contexts/AuthContext";
import { Navigate } from 'react-router-dom';

function UserRoute({children}){
    const {authstate}=useAuth();
    if(!authstate.user){
        return <Navigate to="/" />
    }
    return children;
}

export default UserRoute;