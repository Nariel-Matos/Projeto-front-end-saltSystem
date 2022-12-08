import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from '../pages/login'
import Cadastro from '../pages/cadastro';
import App from '../App';


function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = localStorage.getItem("token")
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function VerifyLoginUser({ redirectTo }) {
    const isAuthenticated = localStorage.getItem("token")
    return isAuthenticated ? <Navigate to={redirectTo} /> : <Outlet />;
}

function Routers() {

    return (
        <Routes>
            <Route element={<VerifyLoginUser redirectTo='/main' />}>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                
            
            </Route>


            <Route element={<ProtectedRoutes redirectTo='/login' />}>
                <Route exact path="/main" element={<App />} >
                 
                </Route>
            </Route>

           
        </Routes>
    )
}

export default Routers;