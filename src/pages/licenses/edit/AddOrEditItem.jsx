import React, { useEffect,useState } from 'react'
import { nanoid } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addItem,getItem, resetSingleItem,replaceItem } from '../../../features/licenses/items/itemsSlice';


const itemSchema = yup.object().shape({
    name: yup.string().required('Description of goods is required'),
    hs_code: yup.string().required('HS Code is required'),
    maccs_code: yup.string().required('MACCS Code is required'),
    price: yup.number().typeError("Please fill a valid price value").positive("Please fill a valid price value").required('Price is required'),
    quantity: yup.number().typeError('Please fill a valid quantity').positive('Please fill a valid quantity').required('Quantity is required'),
    unit: yup.string().required('Please select a unit')
})

const AddOrEditItem = () => {

    const dispatch = useDispatch()
    const [ editPage, setEditPage ] = useState(false)
    const [ idToEdit,setIdToEdit ] = useState(null)
    const items = useSelector(state=> state.items)
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(itemSchema),
    });

    const addOrUpdate = async (data)=>{
        if(idToEdit){
            await dispatch(replaceItem({itemId: idToEdit, replaceData: data}))
        }else{
            await dispatch(addItem({...{id: nanoid()}, ...data}));
        }
        reset()
        setIdToEdit(null)
    }

    const getSingleItemFromState = async(id)=>{
        await dispatch(getItem(id))
    }

    const addCancel = ()=>{
        reset()
    }

    const updateCancel = ()=>{
        reset()
        setEditPage(false)
    }

    useEffect(()=>{
        if(items?.editId){
           getSingleItemFromState(items.editId)
        }else if(items?.singleItem?.length > 0){
            setEditPage(true)
            const oldData = items.singleItem[0]
            setIdToEdit(oldData.id)
            setValue('name',oldData.name)
            setValue('hs_code',oldData.hs_code)
            setValue('maccs_code',oldData.maccs_code)
            setValue('price',oldData.price)
            setValue('quantity',oldData.quantity)
            setValue('unit',oldData.unit)
            dispatch(resetSingleItem())
        }
    },[items])


  return (
            <form onSubmit={handleSubmit(addOrUpdate)} className='dOfGood row p-0 px-3 bg-secondary'>
                <h4 className='fw-bold my-3 text-primary'>{editPage ? "Edit Your Item" : "Add New Items"}</h4>
                <div className='col-12 col-lg-6'>
                    <label className='fw-bold mb-3'>Description Of Goods</label>
                    <textarea {...register('name')} autoComplete='off' rows={5} className='form-control'></textarea>
                    <small className='text-danger mt-3'>{errors.name?.message}</small>
                </div>
                <div className='col-12 col-md-6 p-0 d-flex flex-column justify-content-around'>
                    <div className='row p-0'>
                        <div className='col-12 col-lg-6'>
                            <label className='fw-bold mb-3'>HS Code</label>
                            <input {...register('hs_code')} autoComplete='off' className='form-control'></input>
                            <small className='text-danger mt-3'>{errors.hs_code?.message}</small>
                        </div>
                        <div className='col-12 col-lg-6'>
                            <label className='fw-bold mb-3 text-nowrap'>MACCS Code</label>
                            <input {...register('maccs_code')} autoComplete='off' className='form-control'></input>
                            <small className='text-danger mt-3'>{errors.maccs_code?.message}</small>
                        </div>
                    </div>
                    <div className='row p-0 mt-3'>
                        <div className='col-12 col-lg-4'>
                            <label className='fw-bold mb-3'>Price</label>
                            <input {...register('price')} step={"any"} autoComplete='off' className='form-control' type='number'></input>
                            <small className='text-danger mt-3'>{errors.price?.message}</small>
                        </div>
                        <div className='col-12 col-lg-4'>
                            <label className='fw-bold mb-3 text-nowrap'>Quantity</label>
                            <input {...register('quantity')} step={"any"} autoComplete='off' type='number' className='form-control'></input>
                            <small className='text-danger mt-3'>{errors.quantity?.message}</small>
                        </div>
                        <div className='col-12 col-lg-4'>
                            <label className='fw-bold mb-3'>Units</label>
                            <select {...register('unit')} className="form-select" aria-label="select example">
                                <option value="KG">KG</option>
                                <option value="U">U</option>
                                <option value="PR">PR</option>
                            </select>
                            <small className='text-danger mt-3'>{errors.unit?.message}</small>
                        </div>
                    </div>
                </div>
                {
                    editPage ?
                    <div className='mt-3 mb-5 d-flex justify-content-end align-items-center'>
                        <button onClick={()=> updateCancel()} type='button' className={`btn btn-danger text-white rounded-0 px-4`}>Cancel</button>
                        <button type='submit' className={`btn btn-success text-white rounded-0 px-4`}>Update</button>
                    </div>
                    :
                    <div className='mt-3 mb-5 d-flex justify-content-end align-items-center'>
                        <button onClick={()=> addCancel()} type='button' className={`btn btn-danger text-white rounded-0 px-4`}>Cancel</button>
                        <button type='submit' className={`btn btn-success text-white rounded-0 px-4`}>Add Item</button>
                    </div>
                }
            </form>
  )
}

export default AddOrEditItem