import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Table from "../components/Table";
import Nav from "../components/Nav";
import logo from '../logo.svg';
import './home.css';
import './profile.css';
function Profile() {

    const { authstate } = useAuth();
    // const navigate=useNavigate();

    if (!authstate.isauthenticated) {
        return <Navigate to="/" />
    }

    const tabs = ['Published', 'Drafts', 'Hidden', 'Archived'];
    const headers = ['Title', 'Date', 'Status', '\u{1F4E6}'];
    const initdata = [
        ['Easy Bread Pudding Recipe', '2024-12-15', 'Active', '\u{1F4E6}'],
        ['Zwilling Chopsticks', '2024-12-33', 'Active', '\u{1F4E6}'],
        ['Staub Macaroon Dinnerware', '2000-12-12', 'Inactive', '\u{1F4E6}'],
        ['Holiday Treats', '2020-12-12', 'Inactive', '\u{1F4E6}'],
    ];

    return (
        <div className="container">
            <Nav />
            <main className="main">
                <div className="table">
                    <div className="tabs">
                        {tabs.map((tab, index) => (
                            <a key={index} className="tab">{tab}</a>
                        ))}
                    </div>
                    <Table headers={headers} initdata={initdata} isadmin={authstate.user.isadmin} />
                </div>
                <div className="stats">
                    <div className="userinfo">
                        <img src={logo} className="App-logo" alt="logo" />

                        <div className="userdetail">
                            <h3>{authstate.user.username}</h3>
                            <p>2024-12-12</p>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="topposts">
                        <p>Popular Posts</p>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default Profile;