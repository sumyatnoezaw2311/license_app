import React,{ useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import styles from './phNumsTable.module.css';
import { FaRegTrashAlt } from 'react-icons/fa'
import { fetchAllSettings } from '../../features/settings/allSettingSlice';
import { deletePhone } from '../../features/settings/deletePhoneSlice';
import ToConfirmDel from '../utils/ToConfirmDel';

const PhNumberTable = () => {

    const dispatch = useDispatch()
    const [ idToDel,setIdToDel ] = useState(null)
    const [ showAlert,setShowAlert ] = useState(false)
    const { loading: settingsLoading, data: settingsData, error: settingsError } = useSelector(state=> state.allSettings)
  
    const fetchData = async ()=>{
      await dispatch(fetchAllSettings())
    }

    const handleCancel = ()=>{
        setIdToDel(null)
        setShowAlert(false)
    }

    const handleConfirm = async ()=>{
        await dispatch(deletePhone(idToDel))
        fetchData()
        setIdToDel(null)
        setShowAlert(false)
    }

    const handleDelete = async (phoneId)=>{
        setShowAlert(true)
        setIdToDel(phoneId)
    }
  
    useEffect(()=>{
      fetchData()
    },[])


  return (
    <>
        {
          showAlert &&
          <ToConfirmDel title={"Are you sure?"} text={"You want to delete this phone number."} confirmFun={handleConfirm} cancelFun={handleCancel}></ToConfirmDel>
        }
        {
            settingsData && settingsData?.data?.phones?.length > 0 ?
            <table className={`w-100 table border mt-3 ${styles.phNumberTable}`}>
                <tbody>
                    {
                        settingsData.data.phones &&
                        settingsData.data.phones.map((phone,i)=>{
                            return <tr key={i}>
                                        <td className='fs-16 ps-3'>{phone.phone_number}</td>
                                        <td className='text-center'>
                                            <FaRegTrashAlt onClick={()=> handleDelete(phone.id)} className={`fs-20 text-danger ${styles.trash}`}></FaRegTrashAlt>
                                        </td>
                                    </tr>
                        })
                    }
                </tbody>
            </table>
            :
            <div className="alert alert-warning mt-3 text-center" role="alert">
                There is no record!
            </div>
            }
    </>
  )
}

export default PhNumberTable