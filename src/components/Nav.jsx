import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Nav() {

    const { authstate,logout } = useAuth();
    const navigate=useNavigate;
    const onLogout=()=>{
        logout(navigate);
    }
    const onHome=()=>{
        navigate('/home');
    }
    return (
        <>
            <h1 onClick={onHome}>ChatPad</h1>
            <nav className="nav">
                {
                    authstate.user.isadmin ? (
                        <>
                            <a href="/posts">Posts</a>
                            <a href="/users">Users</a>
                            <a href="/messages">Messages</a>

                        </>
                    ) : (
                        <>
                            <a href="/profile">Profile</a>
                            <a href="/contactus">Contact Us</a>
                        </>
                    )
                }
                <a onClick={onLogout} className='navright'>Logout</a>

            </nav>
        </>
    )
}
export default Nav;