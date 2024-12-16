import Table from "../components/Table";
import './home.css';

function Home({isadmin}){
    const headers=['Title','Author','Date'];
    const initdata=[
        ['Easy Bread Pudding Recipe','win','2024-12-15'],
        ['Zwilling Chopsticks','win','2024-12-33'],
        ['Staub Macaroon Dinnerware','seabass','2000-12-12'],
        ['Holiday Treats','seabass','2020-12-12'],
    ];
    return(
        <div className="container">
            <h1>ChatPad</h1>
            <nav className="nav">
                <a href="/profile">Profile</a>
                <a href="/contactus">Contact Us</a>
                <a href="/">Logout</a>
            </nav>
            <main className="main">

                <div className="table">
                    <Table headers={headers} initdata={initdata} isadmin={isadmin}/> 
                </div>
                <div className="stats">
                    <h3>Stats</h3>
                </div>
            </main>
        </div>
    )

}
export default Home;