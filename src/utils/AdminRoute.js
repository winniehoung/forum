import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AdminRoute({children}){
    const {authstate}=useAuth();
    if(authstate.user && authstate.user.isadmin){
        return children;
    }
    return <Navigate to="/"/>;
}
export default AdminRoute;