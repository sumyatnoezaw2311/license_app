import React, { useEffect, useState } from 'react'
import styles from './table.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllSettings } from '../../features/settings/allSettingSlice'
import { deleteUser } from '../../features/settings/deleteUserSlice'
import ToConfirmDel from '../utils/ToConfirmDel'

const Table = () => {

  const dispatch = useDispatch()
  const [ showAlert,setShowAlert ] = useState(false)
  const [ idToDel,setIdToDel ] = useState(null)
  const { loading: settingsLoading, data: settingsData, error: settingsError } = useSelector(state=> state.allSettings)

  const fetchData = async ()=>{
    await dispatch(fetchAllSettings())
  }

  const handleCancel = ()=>{
    setShowAlert(false)
    setIdToDel(null)
  }

  const handleConfirm = async ()=>{
    await dispatch(deleteUser(idToDel))
    fetchData()
    setIdToDel(null)
    setShowAlert(false)
  }

  const handleDelete = async (userId)=>{
    setShowAlert(true)
    setIdToDel(userId)
  }

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <>
        {
          showAlert &&
          <ToConfirmDel title={"Are you sure?"} text={"You want to delete this user account."} confirmFun={handleConfirm} cancelFun={handleCancel}></ToConfirmDel>
        }
        <div className='col-12 mt-5'>
          <table className={`table w-100`}>
                <thead className={`text-center position-sticky top-0 ${styles.mytHead}`}>
                  <tr>
                    <th className={`bg-secondary ${styles.firstHead}`} scope="col">#</th>
                    <th className='bg-secondary' scope="col">USERNAME</th>
                    <th className='bg-secondary' scope="col">EMAIL</th>
                    <th className='bg-secondary' scope="col">ROLE</th>
                    <th className={`bg-secondary ${styles.lastHead}`} scope="col">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className={`align-middle ${styles.mytBody}`}>
                  {
                    ( settingsData && settingsData?.data?.all_users?.length > 1) ?
                    settingsData.data.all_users.filter(user=> user.id !== settingsData.data.auth_user.id)
                    .map((user,index)=>{
                      return <tr key={index}>
                                <td className='text-center'>{index+1}</td>
                                <td className='text-center'>{user.name}</td>
                                <td className='text-center'>{user.email}</td>
                                <td className='text-center'>
                                  {
                                    user.is_admin == 1 ?
                                    <span className="badge rounded-pill text-bg-success text-white">Admin</span>
                                    :
                                    <span className="badge rounded-pill text-bg-primary text-white">User</span>
                                  }
                                </td>
                                <td className='text-center'>
                                  <button onClick={()=> handleDelete(user.id)} className='btn btn-danger btn-sm text-white'>Delete</button>
                                </td>
                              </tr>
                    })
                    :
                    <tr>
                        <td colSpan={14} className='p-0 border-0'>
                            <div className="alert alert-warning text-center mb-0" role="alert">
                                There is no record for user accounts!
                            </div>
                        </td>
                    </tr>
                  }
                  {/* {
                    (allUser && allUser.length > 0) ?
                    allUser.map((el,index)=>{
                          return  <tr key={index}>
                                    <td className='text-center'>{index+1}</td>
                                    <td className='text-center'>{el.name}</td>
                                    <td className='text-center'>{el.email}</td>
                                    <td className='text-center'>
                                      {
                                        el.is_admin == 1 ?
                                        <span className="badge rounded-pill text-bg-success text-white">Admin</span>
                                        :
                                        <span className="badge rounded-pill text-bg-primary text-white">User</span>
                                      }
                                    </td>
                                    <td className='text-center'>
                                      <button onClick={()=>{ handleDelete(el.id) }} className='btn btn-danger btn-sm text-white'>Delete</button>
                                    </td>
                                  </tr>
                        })
                        :
                        <tr>
                            <td colSpan={14} className='p-0 border-0'>
                                <div className="alert alert-warning text-center mb-0" role="alert">
                                    There is no record for users!
                                </div>
                            </td>
                        </tr>
                      } */}
                </tbody>
          </table>
      </div>
    </>

  )
}

export default Table