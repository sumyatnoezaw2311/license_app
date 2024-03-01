import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { format } from 'date-fns';
import { useForm,Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { fetchTax } from '../../../features/Transactions/singleTaxSlice';
import { useDispatch, useSelector } from 'react-redux';
import { updateTax } from '../../../features/Transactions/updateTaxSlice';
import { fetchTaxs } from '../../../features/Transactions/taxsSlice';


const EditTransModal = ({ goodId, taxId }) => {

  const dispatch = useDispatch()
  const [idDate, setIdDate] = useState(null);
  const { loading: taxLoading, data: taxData, error: taxError } = useSelector(state=> state.tax)

  const transactionSchema = yup.object().shape({
    transaction_id: yup.string().required("Transaction id is required!"),
    id_date: yup.date().typeError("Id date must be a date!").required("Id date is required!"),
    quantity: yup.number().typeError("Quantity must be a number!").positive("Quantity is invalid").required("Quantity is required!")
  });

  const { control,register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(transactionSchema),
  });

  const fetchTaxsData = async ()=>{
    await dispatch(fetchTaxs(goodId))
  }

  const fetchData = async ()=>{
    await dispatch(fetchTax(taxId))
  }

  const handleEdit = async(data)=>{
    const updateData = {
      good_id: goodId,
      id_date: format(data.id_date, "yyyy-MM-dd"),
      transaction_id: data.transaction_id,
      quantity: data.quantity
    }
    await dispatch(updateTax({taxId: taxId,updateData: updateData}));
    fetchTaxsData()
  }

  useEffect(()=>{
    fetchData()
  },[taxId])

  useEffect(()=>{
    if(taxData && taxData?.data){
      setValue('id_date',taxData.data.id_date)
      setValue('transaction_id',taxData.data.transaction_id)
      setValue('quantity',taxData.data.quantity)
      setIdDate(new Date(taxData.data.id_date))
    }
  },[taxData])


  return (
      <div className="modal fade" id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Tax</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
                <form onSubmit={ handleSubmit(handleEdit) } className="modal-body">
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
                        <button type="button" className="btn btn-outline-dark me-2" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary text-white" data-bs-dismiss="modal">Create</button>
                    </div>
                </form>
            </div>
        </div>
      </div>
  )
}

export default EditTransModal;
