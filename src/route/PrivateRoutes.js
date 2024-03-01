import { Navigate,Outlet } from 'react-router-dom'


const PrivateRoutes = ()=>{
    let auth = Boolean(localStorage.getItem('licenseAppAuth'));

    return  (
        auth ? <Outlet/> : <Navigate to={'/login'}/>
    )
}

export default PrivateRoutes