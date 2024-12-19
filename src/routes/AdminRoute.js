// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
//
// const AdminRoute = ({ children }) => {
//     const { authstate } = useAuth();
//     const { isauthenticated, user } = authstate;
//
//
//     if (!isauthenticated || user?.role !== 'admin') {
//         return <Navigate to="/login" replace />;
//     }
//
//     return children;
// };
//
// export default AdminRoute;
