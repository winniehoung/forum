import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import './form.css';
import './contactus.css';
import Nav from "../components/Nav";

function ContactUs() {

    const navigate = useNavigate();

    const { authstate } = useAuth();
    const [subject, setsubject] = useState('');
    const [email, setemail] = useState(authstate.user.username);
    const [msg, setmsg] = useState('');
    const onSend = (e) => {
        e.preventDefault();

        // api call - send message
        navigate('/home');

    }
    return (
        <div className="contactuscontainer">
            <Nav />
            <div className="formcontainer">

                <form onSubmit={onSend} className="card">
                    <h3>Contact Us</h3>
                    <div>
                        <label htmlFor="subject">Subject</label>
                        <input type="text" value={subject} onChange={(e) => setsubject(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" value={email} onChange={(e) => setemail(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="msg">Message</label>
                        <input type="textarea" value={msg} onChange={(e) => setmsg(e.target.value)} required />
                    </div>

                    <div className="button">
                        <button type="submit">Login</button>
                        <div className="links">
                            {authstate.isauthenticated && <a href="#">Return Home</a>}
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}
export default ContactUs;