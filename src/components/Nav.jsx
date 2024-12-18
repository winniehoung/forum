import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import './nav.css';
import { useEffect, useState } from "react";

// todo: fix double click problem, state not updating immediately
function Nav() {

    const { authstate,logout } = useAuth();
    const navigate=useNavigate();
    const [activetab,setactivetab]=useState(authstate.user.isadmin?'Posts':'Home');

    const onLogout=()=>{
        logout(navigate);
    }
    const onHome=()=>{
        setactivetab('Home');
        navigate('/home');
    }
    const onProfile=()=>{
        setactivetab('Profile');
        navigate('/profile');
    }
    const onPosts=()=>{
        setactivetab('Posts');
        navigate('/home');
    }
    const onUsers=()=>{
        setactivetab('Users');
        navigate('/users');
    }
    useEffect(()=>{},[activetab]);
    return (
        <>
            <h1 onClick={onHome} className="heading">ChatPad</h1>
            <nav className="nav">
                {
                    authstate.user.isadmin ? (
                        <>
                            <a onClick={onPosts} className={activetab==='Posts'?'activetab':''}>Posts</a>
                            <a onClick={onUsers} className={activetab==='Users'?'activetab':''}>Users</a>
                            <a href="/messages">Messages</a>

                        </>
                    ) : (
                        <>
                            <a onClick={onHome} className={activetab==='Home'?'activetab':''}>Home</a>
                            <a onClick={onProfile} className={activetab==='Profile'?'activetab':''}>Profile</a>
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