import React from 'react'
import * as Icons from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux'
import { removeItem } from '../../../features/licenses/items/itemsSlice'


const ItemsTable = () => {

    const dispatch = useDispatch()
    const items = useSelector(state=> state.items)

    const handleDelete = (delId)=>{
        dispatch(removeItem(delId))
    }

    return (
        <div className='col-12 table-responsive p-0 px-3' style={{ maxHeight: "300px",overflow: "scroll" }}>
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
                        items.items.length <= 0 ?
                        <tr>
                            <td colSpan={14} className='p-0 border-0'>
                                <div className="alert alert-warning text-center mb-0" role="alert">
                                    There is no record for items!
                                </div>
                            </td>
                        </tr>
                        :
                        items.items.map((item,index)=>{
                            return  <tr key={index}>
                                        <td className='text-start' style={{ fontSize: "14px" }}>{item.name}</td>
                                        <td className='text-center' style={{ fontSize: "14px" }}>{item.hs_code}</td>
                                        <td className='text-center' style={{ fontSize: "14px" }}>{item.maccs_code}</td>
                                        <td className='text-center' style={{ fontSize: "14px" }}>{item.price}</td>
                                        <td className='text-center' style={{ fontSize: "14px" }}>{item.quantity}</td>
                                        <td className='text-center' style={{ fontSize: "14px" }}>{item.unit}</td>
                                        <td className='text-center text-danger' style={{ fontSize: "16px", cursor: "pointer" }}>
                                            <span onClick={()=>handleDelete(item.id)}><Icons.FaTrash/></span>
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