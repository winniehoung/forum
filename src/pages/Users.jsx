import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Table from "../components/Table";
import Nav from "../components/Nav";
import { fetchUsers } from "../services/userService";
import { useEffect, useState } from "react";

function Users() {
    const { authstate } = useAuth();
    // const navigate=useNavigate();

    const [userdata,setuserdata]=useState([]);
    useEffect(()=>{
        const getPosts=async()=>{
            const {userdata}=await fetchUsers();
            setuserdata(userdata);
        };
        getPosts();
        console.log(userdata);
    },[]);

    if (!authstate.isauthenticated) {
        return <Navigate to="/" />
    }

    const headers = ['ID','First Name','Last Name','Email','Registered','Type','Status'];


    return (
        <div className="container">
            <Nav/>
            <main className="main">

                <div className="table">
                    <Table headers={headers} initdata={userdata} isadmin={authstate.user.isadmin} />
                </div>
                {/* <div className="stats">
                    <h3>Welcome, {authstate.user.username}</h3>
                </div> */}
            </main>
        </div>
    )

}
// Home.defaultProps = {
//     isadmin: false,
// }
export default Users;