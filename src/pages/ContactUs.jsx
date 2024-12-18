import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import './form.css';
import './contactus.css';
import Nav from "../components/Nav";
import Message from "../components/Message";

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
        <div className="container">
            <Nav />
            <main className="main">
                <div className="table">
                    <Message/>
                </div>

                <div className="stats">
                    <h3>Welcome, {authstate.user.username}</h3>
                </div>
            </main>
        </div>
    );
}
export default ContactUs;