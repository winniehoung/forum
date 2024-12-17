import { Navigate, useNavigate } from 'react-router-dom';
import Table from "../components/Table";
import { useAuth } from "../contexts/AuthContext";
import './home.css';

// todo: remove isadmin
function Home({ isadmin }) {
    const { authstate,logout } = useAuth();
    const navigate=useNavigate();
    if (!authstate.isauthenticated) {
        return <Navigate to="/" />
    }

    const headers = ['Title', 'Author', 'Date'];
    const initdata = [
        ['Easy Bread Pudding Recipe', 'win', '2024-12-15'],
        ['Zwilling Chopsticks', 'win', '2024-12-33'],
        ['Staub Macaroon Dinnerware', 'seabass', '2000-12-12'],
        ['Holiday Treats', 'seabass', '2020-12-12'],
    ];
    const onLogout=()=>{
        logout(navigate);
    }
    const onHome=()=>{
        navigate('/home');
    }
    return (
        <div className="container">
            <h1 onClick={onHome}>ChatPad</h1>
            <nav className="nav">
                {
                    isadmin ? (
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
            <main className="main">

                <div className="table">
                    <Table headers={headers} initdata={initdata} isadmin={isadmin} />
                </div>
                <div className="stats">
                    <h3>Welcome, {authstate.user.username}</h3>
                </div>
            </main>
        </div>
    )

}
Home.defaultProps = {
    isadmin: false,
}
export default Home;