import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Table from "../components/Table";
import Nav from "../components/Nav";

function Users() {
    const { authstate } = useAuth();
    // const navigate=useNavigate();

    if (!authstate.isauthenticated) {
        return <Navigate to="/" />
    }

    const headers = ['ID','First Name','Last Name','Email','Registered','Type','Status'];
    const data = [
        ['1','win','houng','18whoung@gmail123211111111111111111','2021','admin','active'],
        ['2','seabass','houng','seabass@gmail','2020','user','active'],
    ];
   

    return (
        <div className="container">
            <Nav/>
            <main className="main">

                <div className="table">
                    <Table headers={headers} initdata={data} isadmin={authstate.user.isadmin} />
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