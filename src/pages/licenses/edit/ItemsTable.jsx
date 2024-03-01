import React, { useEffect, useState } from 'react'
import * as Icons from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { replaceItems,removeItem,getIdToEdit } from '../../../features/licenses/items/itemsSlice'
import { deleteGood } from '../../../features/licenses/deleteGood'
import ToConfirmDel from '../../../components/utils/ToConfirmDel'

const ItemsTable = () => {

  const dispatch = useDispatch()
  const [ itemsState,setItemsState ] = useState([])
  const [ idToDel,setIdToDel ] = useState(null)
  const [ showAlert,setShowAlert ] = useState(false)
  const { loading: singleLicLoading, data: singleLicData, error: singleLicError } = useSelector(state=> state.singleLicense)
  const items = useSelector(state=> state.items)

  useEffect(()=>{
    if(singleLicData && singleLicData.data){
      dispatch(replaceItems(singleLicData.data.good))
    }
  },[singleLicData])

  const handleEdit = (editId)=>{
    dispatch(getIdToEdit(editId));
  }

  const handleDelete = (delId)=>{
    setIdToDel(delId)
    setShowAlert(true)
  }

  const handleConfirm = ()=>{
    if(typeof idToDel === 'number'){
      dispatch(removeItem(idToDel))
      dispatch(deleteGood(idToDel))
    }else{
      dispatch(removeItem(idToDel))
    }
    setIdToDel(null)
    setShowAlert(false)
  }
  
  const handleCancel = ()=>{
    setShowAlert(false)
    setIdToDel(null)
  }

  useEffect(()=>{
    setItemsState(items)
  },[items])


  return (
          <div className='col-12 table-responsive p-0 px-3' style={{ maxHeight: "300px",overflow: "scroll" }}>
            {
              showAlert &&
              <ToConfirmDel title={"Are you sure?"} text={"You want to delete this item."} confirmFun={handleConfirm} cancelFun={handleCancel}></ToConfirmDel>
            }
            <h4 className='fw-bold my-3 text-primary'>Items List</h4>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th className='text-start bg-secondary' style={{ fontSize: "16px" }}>Description of goods</th>
                        <th className='text-center bg-secondary' style={{ fontSize: "16px" }}>HS Code</th>
                        <th className='text-center bg-secondary' style={{ fontSize: "16px" }}>MACCS Code</th>
                        <th className='text-center bg-secondary' style={{ fontSize: "16px" }}>Price</th>
                        <th className='text-center bg-secondary' style={{ fontSize: "16px" }}>Quantity</th>
                        <th className='text-center bg-secondary' style={{ fontSize: "16px" }}>Unit</th>
                        <th className='text-center bg-secondary' style={{ fontSize: "16px" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        itemsState?.items?.length <= 0 ?
                        <tr>
                            <td colSpan={14} className='p-0 border-0'>
                                <div className="alert alert-warning text-center mb-0" role="alert">
                                    There is no record for items!
                                </div>
                            </td>
                        </tr>
                        :
                        itemsState?.items?.map((item,index)=>{
                            return  <tr key={index}>
                                        <td className='text-start' style={{ fontSize: "14px" }}>{item.name}</td>
                                        <td className='text-center' style={{ fontSize: "14px" }}>{item.hs_code}</td>
                                        <td className='text-center' style={{ fontSize: "14px" }}>{item.maccs_code}</td>
                                        <td className='text-center' style={{ fontSize: "14px" }}>{item.price}</td>
                                        <td className='text-center' style={{ fontSize: "14px" }}>{item.quantity}</td>
                                        <td className='text-center' style={{ fontSize: "14px" }}>{item.unit}</td>
                                        <td className='text-center' style={{ fontSize: "16px", cursor: "pointer" }}>
                                            <span onClick={()=> handleEdit(item.id)}>
                                              <Icons.FaEdit className='text-warning me-3'/>
                                            </span>
                                            <span onClick={()=>handleDelete(item.id)}>
                                              {/* {
                                                typeof item.id === 'number' && <Icons.FaEdit className='text-warning me-3'/>
                                              } */}
                                              <Icons.FaTrash className='text-danger'/>
                                            </span>
                                        </td>
                                    </tr>
                        })
                    }
                </tbody>
            </table>
          </div>
  )
}

export default ItemsTable