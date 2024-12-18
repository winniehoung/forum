//main component, set up routing with react-router-dom
//import routes from pages/ and include in Switch component
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import { AuthProvider } from './contexts/AuthContext';
import MessageManagement from "./pages/MessageManagement";
import AdminRoute from "./routes/AdminRoute";


function App() {
  return (
    <AuthProvider>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
            <Route path="/messages" element={<MessageManagement />} />
          {/*<Route*/}
          {/*    path="/messages"*/}
          {/*    element={*/}
          {/*      <AdminRoute>*/}
          {/*        <MessageManagement />*/}
          {/*      </AdminRoute>*/}
          {/*    }*/}
          {/*/>*/}

        </Routes>
      </BrowserRouter>
    </AuthProvider>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Forum
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
