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

    const onPosts=()=>{
        setactivetab('Posts');
        navigate('/home');
    }
    const onUsers=()=>{
        setactivetab('Users');
        navigate('/users');
    }
    const onTab=(tab,path)=>{
        setactivetab(tab);
        navigate(path);
    }
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
                            <a onClick={()=>onTab('Home','/home')} className={activetab==='Home'?'activetab':''}>Home</a>
                            <a onClick={()=>onTab('Profile','/profile')} className={activetab==='Profile'?'activetab':''}>Profile</a>
                            <a onClick={()=>onTab('Contact Us','/contactus')} className={activetab==='Contact Us'?'activetab':''}>Contact Us</a>
                        </>
                    )
                }
                <a onClick={onLogout} className='navright'>Logout</a>

            </nav>
        </>
    )
}
export default Nav;