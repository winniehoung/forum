import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './form.css';


function Register(){
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const [firstname,setfirstname]=useState('');
    const [lastname,setlastname]=useState('');
    const [email,setemail]=useState('');

    const navigate = useNavigate();
    const register = (e) => {
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
            <form onSubmit={register} className="card">
                <h3>Register</h3>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={username} onChange={(e) => setusername(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setpassword(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="firstname">First Name</label>
                    <input type="firstname" id="firstname" value={firstname} onChange={(e) => setfirstname(e.target.value)} required />
                </div>                
                <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input type="lastname" id="lastname" value={lastname} onChange={(e) => setlastname(e.target.value)} required />
                </div>                
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setemail(e.target.value)} required />
                </div>
                <div className="button">
                    <button type="submit">Login</button>
                    <div className="links">
                        <a href="#">Contact Us</a>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default Register;