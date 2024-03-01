import React, { useState } from 'react'
import { FaUserCircle,FaSignOutAlt } from 'react-icons/fa'
import { logOut } from '../../features/Auth/loginSlice'
import { useDispatch } from 'react-redux'
import ToConfirm from '../utils/ToConfirm'

const AccountCard = () => {

  const dispatch = useDispatch()
  const [ showAlert,setShowAlert ] = useState(false)
  const authData = JSON.parse(localStorage.getItem('licenseAppAuth'))

  const handleCancel = ()=>{
    setShowAlert(false)
  }

  const handleConfirm = ()=>{
    dispatch(logOut())
    window.location.reload()
    setShowAlert(false)
  }

  const handleLogout = ()=>{
    setShowAlert(true)
  }

  return (
          <div className='col-12 col-lg-6 col-xl-4 mt-3'>
              {
                showAlert &&
                <ToConfirm title={'Are you sure?'} text={"You want to logout?"} confirmFun={handleConfirm} cancelFun={handleCancel}/>
              }
              <div className='card p-3 shadow-sm' style={{"height":"350px"}}>
                  <div className='card-body d-flex flex-column justify-content-center'> 
                    <div className='row d-flex justify-content-center align-items-center'>
                      <div className='col-12 mb-5'>
                        <div className='d-flex justify-content-center align-items-center'>
                          <FaUserCircle style={{"fontSize":"24px"}}></FaUserCircle>
                          <h5 className='card-title fw-bold mb-0 text-nowrap mx-3'>Create User Account</h5>
                          <span className="badge rounded-pill text-bg-success text-white ms-2">Admin</span>
                          {/* { authUser.is_admin == 1 ? 
                            <span className="badge rounded-pill text-bg-success text-white ms-2">Admin</span>:
                            <span className="badge rounded-pill text-bg-primary text-white ms-2">User</span>
                          } */}
                        </div>
                      </div>
                      <div className='col-12 px-3'>
                        <table className='table table-borderless w-100 mb-0'>
                          <tbody>
                            <tr>
                              <td className='fw-bold'>
                                <p>Username</p>
                              </td>
                              <td>
                                <p className='fw-bold'>:</p>
                              </td>
                              <td className='text-end'>
                                <p>{authData?.name}</p>
                              </td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>
                                <p>Email</p>
                              </td>
                              <td>
                                <p className='fw-bold'>:</p>
                              </td>
                              <td className='text-end'>
                                <p>{authData?.email}</p>
                              </td>
                            </tr>
                            <tr>
                              <td className='fw-bold' colSpan={3}>
                                <button onClick={()=>{ handleLogout() }} className='btn btn-primary text-white w-100 mx-auto'>
                                  <FaSignOutAlt className='fs-5 me-2'></FaSignOutAlt>
                                    Logout
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
  )
}

export default AccountCard