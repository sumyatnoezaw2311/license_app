import React,{ useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './nav.module.css'
import { logOut } from '../../features/Auth/loginSlice'
import { useDispatch } from 'react-redux'
import ToConfirm from './ToConfirm'

const Nav = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ showAlert,setShowAlert ] = useState(false)
    const path = useLocation().pathname;
    const authData = JSON.parse(localStorage.getItem('licenseAppAuth'))

    const handleCancel = ()=>{
        setShowAlert(false)
    }

    const handleConfirm = ()=>{
        dispatch(logOut())
        navigate('/login')
    }


    const handleLogout = ()=>{
        setShowAlert(true)
    }


  return (
        <>
                {
                    showAlert &&
                    <ToConfirm title={'Are you sure?'} text={"You want to logout?"} confirmFun={handleConfirm} cancelFun={handleCancel}/>
                }
                <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom p-0 mb-2 position-sticky top-0 z-1">
                    <div className="container-fluid bg-white">
                        <Link className="navbar-brand d-flex align-items-center" to={"/"}>
                            <div className={styles.brandLogo}></div>
                            <div className='brand-name ms-2'>
                                <h5 className='mb-0 fw-bold text-primary'>{"Standard Family".toUpperCase()}</h5>
                                <p className='mb-0 text-start text-primary'>Trading Co.,Ltd.</p>
                            </div>
                        </Link>
                        <div className="collapse navbar-collapse mt-auto" id="navbarSupportedContent">
                            <ul className="navbar-nav m-auto mb-lg-0">
                                <li className="nav-item mx-2">
                                    <Link to={"/"} className="nav-link text-primary fw-bold mb-3" aria-current="page">{"Valid Licenses".toUpperCase()}</Link>
                                    <div className={`${styles.navSlider} bg-primary ${path ==="/" ? "w-75" : "w-25 opacity-0"}`}></div>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to={"/invalid-licenses"} className="nav-link text-primary fw-bold mb-3">{"Invalid Licenses".toUpperCase()}</Link>
                                    <div className={`${styles.navSlider} bg-primary ${path ==="/invalid-licenses" ? "w-75" : "w-25 opacity-0"}`}></div>
                                </li>
                                {
                                    Number(authData.role) === 1 &&
                                    <li className="nav-item mx-2">
                                        <Link to={"/setting"} className="nav-link text-primary fw-bold mb-3">{"Setting".toUpperCase()}</Link>
                                        <div className={`${styles.navSlider} bg-primary ${path ==="/setting" ? "w-75" : "w-25 opacity-0"}`}></div>
                                    </li>
                                }
                            </ul>
                        </div>
                        <div className='d-flex align-items-center me-3'>
                            <div className="dropdown me-2">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {authData.name}
                                </button>
                                <ul className="dropdown-menu">
                                    <li onClick={()=>{ handleLogout() }} className='dropdown-item'>Logout</li>
                                </ul>
                            </div>
                            <div className={`${styles.avatar} me-2`}></div>
                        </div>
                    </div>
                </nav>
        </>
  )
}

export default Nav