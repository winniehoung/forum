//context to manage auth state

import { createContext, useContext, useState } from 'react'
const AuthContext = createContext();

export const AuthProvider=({children})=>{
    const [authstate,setauthstate]=useState({
        isauthenticated:false,
        user:null,
    });

    const login = (credentials) => {
        //api call
        // e.preventDefault();
        if (credentials.username === 'win' && credentials.password === 'letmein') {
            setauthstate({
                isauthenticated:true,
                user:credentials,
            });
        } else {
            alert('invalid credentials');
        }
    };
    const logout=()=>{
        setauthstate({
            isauthenticated:false,
            user:null,
        });
    }
    return(
        <AuthContext.Provider value={{authstate,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};

// export const useAuth = () => useContext(AuthContext);
export const useAuth=()=>useContext(AuthContext);

