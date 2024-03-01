import React,{ useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import Login from "../pages/auth/Login"
import PrivateRoutes from "./PrivateRoutes"
import NotFound from '../components/utils/NotFound'
import ValidLicense from "../pages/licenses/ValidLicense"
import Setting from "../pages/Setting"
import { fetchRefreshedToken } from "../features/Auth/refreshTokenSlice"
import { logOut } from "../features/Auth/loginSlice"
import CreateLicense from "../pages/licenses/create/CreateLicense"
import EditLicense from "../pages/licenses/edit/EditLicense"
import InvalidLicenses from "../pages/licenses/InvalidLicenses"
import ForgotPassword from '../pages/auth/ForgotPassword'
import ChangePassword from "../pages/auth/ChangePassword"
import LinkSent from '../pages/auth/LinkSent'
import ValidLicenseDetail from "../pages/licenses/detail/ValidLicenseDetail"
import InvalidLicenseDetail from "../pages/licenses/detail/InvalidLicenseDetail"


const AppRouters = () => {

  const dispatch = useDispatch()
  let authData = JSON.parse(localStorage.getItem('licenseAppAuth'))

  const tokenRefresh = async ()=>{
    const loginTime = authData.loginTime
    const expirationTime = loginTime + 3500
    const currentTime = Math.floor(Date.now() / 1000)
    const timeUntilExpiration = await expirationTime - currentTime
    if(authData && timeUntilExpiration > 0){
      setTimeout(()=>{
        dispatch(fetchRefreshedToken())
      },timeUntilExpiration * 1000)
    }else if(timeUntilExpiration < -5){
      dispatch(logOut())
    }
  }

  useEffect(()=>{
    if(authData){
      tokenRefresh()
    }
  },[authData])
  
  return (
    <BrowserRouter>
        <Routes>
          {/* auth route */}
          <Route path='/login' Component={Login} />
          <Route path="/forgot-password" Component={ForgotPassword}/>
          <Route path="/reset-password/:oneTimeToken" Component={ChangePassword}/>
          <Route path="/sent-link" Component={LinkSent}></Route>
          <Route path="/*" Component={NotFound}/>
          <Route Component={PrivateRoutes}>
            <Route path={'/'} Component={ValidLicense}></Route>
            <Route path={'/valid-licenses'} Component={ValidLicense}></Route>
            <Route path={'/invalid-licenses'} Component={InvalidLicenses}></Route>
            <Route path={'/setting'} Component={Setting}></Route>
            <Route path={"/create"} Component={CreateLicense}></Route>
            <Route path={"/edit/:id"} Component={EditLicense}></Route>
            <Route path="/valid-license-detail/:id" Component={ValidLicenseDetail}></Route>
            <Route path="/invalid-license-detail/:id" Component={InvalidLicenseDetail}></Route>
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouters