import React,{ useEffect } from 'react'
import { format } from 'date-fns'
import { useDispatch,useSelector } from 'react-redux';
import { useForm,Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import DatePicker from "react-datepicker";
import { fetchTaxs } from '../../../features/Transactions/taxsSlice';
import { useState } from 'react';
import { createTax } from '../../../features/Transactions/createTaxSlice';

const CreateTransModal = ({goodId}) => {

    const dispatch = useDispatch()
    const [ idDate,setIdDate ] = useState(null)
    const [ licenseBalance,setLicenseBalance ] = useState(null)
    const { loading: singleLicenseLoading, data: singleLicense, error: singleLicenseError } = useSelector(state=> state.singleLicense)

    const transactionSchema = yup.object().shape({
        transaction_id: yup.string().required("Transaction id is required!"),
        id_date: yup.date().typeError("Id date must be a date!").required("Id date is required!"),
        quantity: yup.number().typeError("Quantity must be a number!").min(1).max(licenseBalance).positive("Quantity is invalid").required("Quantity is required!")
    });
  
    const fetchData = async ()=>{
      await dispatch(fetchTaxs(goodId))
    }    

    const { control,register,handleSubmit,reset,formState: {errors}} = useForm({
        resolver : yupResolver(transactionSchema),
    })
    
    const onSubmit = async (data)=>{
        const transData = {
            transaction_id: data.transaction_id,
            good_id: goodId,
            id_date: format(new Date(data.id_date),'yyyy-MM-dd'),
            quantity: data.quantity
        }
        await dispatch(createTax(transData));
        reset()
        fetchData()
    }

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        if(singleLicense && singleLicense.data){
            const good = singleLicense.data.good.find(g=> g.id === goodId)
            setLicenseBalance(good?.license_balance)
        }
    },[singleLicense,goodId])

  return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Create New Tax</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                    <form onSubmit={ handleSubmit(onSubmit) } className="modal-body">
                        <div className='d-flex align-items-center my-3'>
                            <label className='text-nowrap mx-3'>Id No:</label>
                            <div className='w-75 ms-auto'>
                                <input {...register('transaction_id')} className='form-control'></input>
                                <small className='text-danger w-75'>{errors.transaction_id?.message}</small>
                            </div>
                        </div>
                        <div className='d-flex align-items-center my-3'>
                            <label className='text-nowrap mx-3'>Id Date:</label>
                            <div className='w-75 ms-auto'>
                            <Controller
                                name='id_date'
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                    autoComplete='off'
                                    dateFormat='yyyy-MM-dd'
                                    selected={idDate}
                                    onChange={(date) => {
                                        setIdDate(date);
                                        field.onChange(date);
                                    }}
                                    isClearable
                                    className='form-control'
                                    />
                                )}
                                />
                                <small className='text-danger'>{errors.id_date?.message}</small>
                            </div>
                        </div>
                        <div className='d-flex align-items-center my-3'>
                            <label className='text-nowrap mx-3'>Id Qty:</label>
                            <div className='w-75 ms-auto'>
                                <input {...register('quantity')} className='form-control'></input>
                                <small className='text-danger'>{errors.quantity?.message}</small>
                            </div>
                        </div>
                        <div className='mt-4 mb-3 d-flex align-items-center justify-content-end'>
                            <button onClick={()=>{ reset(); setIdDate(null); }} type="button" className="btn btn-outline-dark me-2" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary text-white" data-bs-dismiss="modal">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default CreateTransModal