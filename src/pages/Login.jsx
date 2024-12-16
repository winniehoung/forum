import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './form.css';


function Login() {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();
    const login = (e) => {
        //api call
        e.preventDefault();
        if (username === 'win' && password === 'letmein') {
            navigate('/home');
        } else {
            alert('invalid credentials');
        }
    };
    return (
        <div className="formcontainer">
            <form onSubmit={login} className="card">
                <h3>Login</h3>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={username} onChange={(e) => setusername(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setpassword(e.target.value)} required />
                </div>
                <div className="button">
                    <button type="submit">Login</button>
                    <div className="links">
                        <a href="#">Forgot Password?</a>
                        <a href="/register">Register</a>
                        <a href="#">Contact Us</a>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Login;