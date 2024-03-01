import React, { useEffect, useState } from 'react'
import styles from './taxTable.module.css'
import { FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaxs } from '../../../features/Transactions/taxsSlice';
import { deleteTax } from '../../../features/Transactions/deleteTaxSlice'
import CreateTransModal from '../../licenses/Transaction/CreateTransModal'
import EditTransModal from './EditTransModal';
import Loading from '../../utils/Loading';
import { useLocation } from 'react-router-dom';
import ToConfirmDel from '../../utils/ToConfirmDel';

const TaxTable = ({ goodId }) => {

  const dispatch = useDispatch()
  const location = useLocation()
  const path = location.pathname
  const [ toEditId,setToEditId ] = useState(null)
  const [ idToDel,setIdToDel ] = useState(null)
  const [ showAlert,setShowAlert ] = useState(false)
  const authData = JSON.parse(localStorage.getItem('licenseAppAuth'))
  const { loading: taxsLoading, data: taxs, error: taxsError } = useSelector(state=> state.taxs)

  const fetchData = async ()=>{
    await dispatch(fetchTaxs(goodId))
  }

  const handleEdit = (taxId)=>{
    setToEditId(taxId)
  }

  const handleCancel = ()=>{
    setShowAlert(false)
    setIdToDel(null)
  }

  const handleConfirm = async ()=>{
    setShowAlert(false)
    await dispatch(deleteTax(idToDel))
    setIdToDel(null)
    fetchData()
  }

  const handleDelete = async (taxId)=>{
    setShowAlert(true)
    setIdToDel(taxId)
  }
 
  useEffect(()=>{
    fetchData()
  },[goodId])

  return (
            <div className='px-3 py-1 table-responsive'>
              {
                taxsLoading &&
                <Loading/>
              }
              {
                  showAlert &&
                  <ToConfirmDel title={"Are you sure?"} text={"You want to delete this tax."} confirmFun={handleConfirm} cancelFun={handleCancel}></ToConfirmDel>
              }
              <CreateTransModal goodId={goodId}/>
              <EditTransModal goodId={goodId} taxId={toEditId}/>
              <div className='w-100 d-flex align-items-center justify-content-between mb-3'>
                  <h5 className='fw-bold mb-0'>Tax List</h5>
                  {
                    (Number(authData.role) === 1 && path.includes('/valid-license')) &&
                    <button className='btn btn-primary text-white d-flex align-items-center' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                      <FaPlusCircle className='me-2'></FaPlusCircle>
                      Create Tax
                    </button>
                  }
              </div>
              <table className='table'>
                <thead className='align-middle'>
                    <tr>
                      <th className={`bg-info py-3 text-center ${styles.firstHead}`}>#</th>
                      <th className='bg-info py-3 text-center'>ID NO</th>
                      <th className='bg-info py-3 text-center'>ID DATE</th>
                      <th className='bg-info py-3 text-center'>ID QTY</th>
                      {
                       ( Number(authData.role) === 1 && path.includes('/valid-license')) &&
                        <th className={`bg-info py-3 text-center ${styles.lastHead}`}>ACTIONS</th>
                      }
                    </tr>
                </thead>
                <tbody>
                  {
                    taxs?.data?.length > 0 ?
                    taxs.data.map((el,i)=>{
                      return  <tr key={i}>
                            <td className='text-center'>{i+1}</td>
                            <td className='text-center'>{el.transaction_id}</td>
                            <td className='text-center'>{el.id_date}</td>
                            <td className='text-center'>{el.quantity}</td>
                            {
                              (Number(authData.role) && path.includes('/valid-license'))== 1 &&
                              <td className='text-center'>
                                <button className='btn btn-warning btn-sm text-white me-2' data-bs-toggle="modal" data-bs-target="#editModal" onClick={()=> handleEdit(el.id)}>Edit</button>
                                <button className='btn btn-danger btn-sm text-white' onClick={()=> handleDelete(el.id)}>Delete</button>
                              </td>
                            }
                          </tr>
                    })
                    :
                    <tr>
                      <td colSpan={14} className='p-0 border-0'>
                          <div className="alert alert-warning text-center mb-0" role="alert">
                              There is no record for valid licenses!
                          </div>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
  )
}

export default TaxTable