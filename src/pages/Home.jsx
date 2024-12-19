// import { Navigate, useNavigate } from 'react-router-dom';
import Table from "../components/Table";
import { useAuth } from "../contexts/AuthContext";
import './home.css';
import Nav from '../components/Nav';
import { useEffect, useState } from 'react';
import { fetchPosts } from "../services/postService";

function Home() {
    const { authstate } = useAuth();
    // deleted or all posts
    const [activetab, setactivetab] = useState('All');
    const [activetabdata, setactivetabdata] = useState([]);

    // retrieve data from service
    const [data,setdata]=useState([]);
    const [admindata,setadmindata]=useState([]);
    useEffect(()=>{
        const getPosts=async()=>{
            const {data,admindata}=await fetchPosts();
            setdata(data);
            setadmindata(admindata);
        };
        getPosts();
    },[]);
    // for admin home page: all and list of deleted posts
    const setTabData = () => {
        switch (activetab) {
            case 'All':setactivetabdata(data);break;
            case 'Deleted':setactivetabdata(deleteddata);break;
            default: setactivetabdata(data);break;
        }
    }
    useEffect(() => {
        setTabData();
    }, [activetab]);


    // admin tabs: for deleted posts
    const deleteddata=[
        [1,'Easy Bread Pudding Recipe', 'win', '2024-12-15'],
        [2,'Zwilling Chopsticks', 'win', '2024-12-33',],
        [3,'Staub Macaroon Dinnerware', 'seabass', '2000-12-12'],
    ];
    // admin data and user data
    const headers = ['ID','Title', 'Author', 'Date'];
    // const data = [
    //     [1,'Easy Bread Pudding Recipe', 'win', '2024-12-15'],
    //     [2,'Zwilling Chopsticks', 'win', '2024-12-33'],
    //     [3,'Staub Macaroon Dinnerware', 'seabass', '2000-12-12'],
    //     [4,'Holiday Treats', 'seabass', '2020-12-12'],
    // ];
    // status: ban, unban
    const adminheaders=['ID','Title','Author','Date','Status'];
    // const admindata=[
    //     [1,'Easy Bread Pudding Recipe', 'win', '2024-12-15','Active'],
    //     [2,'Zwilling Chopsticks', 'win', '2024-12-33','Inactive'],
    //     [3,'Staub Macaroon Dinnerware', 'seabass', '2000-12-12','Active'],
    //     [4,'Holiday Treats', 'seabass', '2020-12-12','Inactive'],
    // ];

    const tabs=['All', 'Deleted'];
    return (
        <div className="container">
            <Nav/>
            <main className="main">

            
                <div className="table">
                    {
                        authstate.user.isadmin&&<div className='tabs'>
                            {tabs.map((tab, idx)=><a key={idx} onClick={()=>{setactivetab(tab);setTabData()}} className={`tab ${activetab === tab ? 'activetab' : ''}`}>{tab}</a>)}
                        </div>
                    }

                    <Table headers={authstate.user.isadmin?activetab==='All'?adminheaders:headers:headers} initdata={authstate.user.isadmin?activetab==='All'?admindata:deleteddata:data} isadmin={authstate.user.isadmin} />
                </div>
             
                
                <div className="stats">
                    <h3>Welcome, {authstate.user.username}</h3>
                </div>
            </main>
        </div>
    )

}

export default Home;