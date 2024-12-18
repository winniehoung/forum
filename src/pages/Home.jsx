import { Navigate, useNavigate } from 'react-router-dom';
import Table from "../components/Table";
import { useAuth } from "../contexts/AuthContext";
import './home.css';
import Nav from '../components/Nav';
import { useState } from 'react';

function Home() {
    const { authstate } = useAuth();
    // const navigate=useNavigate();
    const [activetab, setactivetab] = useState('All');
    // const [activetabdata, setactivetabdata] = useState(data);
    // if (!authstate.isauthenticated) {
    //     return <Navigate to="/" />
    // }

    // const setTabData = () => {
    //     switch (activetab) {
    //         case 'All':setactivetabdata(data);break;
    //         case 'Deleted':setactivetabdata(data);break;
    //         default: setactivetabdata(data);break;
    //     }
    // }

    // useEffect(() => {
    //     setTabData();
    // }, [activetab]);

    const headers = ['Title', 'Author', 'Date'];
    const data = [
        ['Easy Bread Pudding Recipe', 'win', '2024-12-15'],
        ['Zwilling Chopsticks', 'win', '2024-12-33'],
        ['Staub Macaroon Dinnerware', 'seabass', '2000-12-12'],
        ['Holiday Treats', 'seabass', '2020-12-12'],
    ];
    // status: ban, unban
    const adminheaders=['Title','Author','Date','Status'];
    const admindata=[
        ['Easy Bread Pudding Recipe', 'win', '2024-12-15','Active'],
        ['Zwilling Chopsticks', 'win', '2024-12-33','Inactive'],
        ['Staub Macaroon Dinnerware', 'seabass', '2000-12-12','Active'],
        ['Holiday Treats', 'seabass', '2020-12-12','Inactive'],
    ];

    const tabs=['All', 'Deleted'];
    return (
        <div className="container">
            <Nav/>
            <main className="main">

            
                <div className="table">
                    {
                        authstate.user.isadmin&&<div className='tabs'>
                            {tabs.map((tab, idx)=><a key={idx} onClick={()=>setactivetab(tab)} className={`tab ${activetab === tab ? 'activetab' : ''}`}>{tab}</a>)}
                        </div>
                    }

                    <Table headers={authstate.user.isadmin?adminheaders:headers} initdata={authstate.user.isadmin?admindata:data} isadmin={authstate.user.isadmin} />
                </div>
             
                
                <div className="stats">
                    <h3>Welcome, {authstate.user.username}</h3>
                </div>
            </main>
        </div>
    )

}
// Home.defaultProps = {
//     isadmin: false,
// }
export default Home;