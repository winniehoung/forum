import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import './nav.css';

function Nav() {

    const { authstate,logout } = useAuth();
    const navigate=useNavigate();
    const onLogout=()=>{
        logout(navigate);
    }
    const onHome=()=>{
        navigate('/home');
    }
    const onProfile=()=>{
        navigate('/profile');
    }
    return (
        <>
            <h1 onClick={onHome} className="heading">ChatPad</h1>
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
                            <a onClick={onProfile}>Profile</a>
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