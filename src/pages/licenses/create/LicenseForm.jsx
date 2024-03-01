import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'
import Breadcrumb from '../../../components/utils/Breadcrumb';
import DatePicker from 'react-datepicker';
import { useForm,Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import DangerAlert  from '../../../components/utils/DangerAlert'
import { createLicense } from '../../../features/licenses/createLicenseSlice';

const licenseSchema = yup.object().shape({
  company_name: yup.string().required('Company name is required!'),
  license_no: yup.string().required('License no is required!'),
  license_start_date: yup.string().required('License start date is required!'),
  license_expired_date: yup.string().required('License expired date is required!'),
  license_invalid_date: yup.string().required('License invalid date is required!'),
});

const LicenseForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ showAlert,setShowAlert ] = useState(false)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [invalidDate, setInvalidDate] = useState(null);

  const items = useSelector(state=> state.items)
  const { control,register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(licenseSchema),
  });

  const handleCancel = ()=>{
    reset()
    navigate(-1)
  }

  const handleConfirm = ()=>{
    setShowAlert(false)
  }

  const addNewLicense = async (data) => {
    if(items.items.length > 0){
      const licenseData = {
        company_name: data.company_name,
        license_no: data.license_no,
        license_start_date: format(new Date(data.license_start_date), 'yyyy-MM-dd'),
        license_expired_date: format(new Date(data.license_expired_date), 'yyyy-MM-dd'),
        license_invalid_date: format(new Date(data.license_invalid_date), 'yyyy-MM-dd'),
        good: items.items
      };
      await dispatch(createLicense(licenseData));
      navigate('/')
    }else{
      setShowAlert(true)
    }
  };

  return (
    <form onSubmit={handleSubmit(addNewLicense)} className='col-12 p-3 border-0 bg-white createContainer'>
      {
        showAlert &&
        <DangerAlert title={"Sorry"} text={"You can't create a license without items."} confirmFun={handleConfirm}></DangerAlert>
      }
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <div>
          <h3 className='text-start fw-bold'>Total Valid Licenses</h3>
          <Breadcrumb prev={"valid-licenses"}></Breadcrumb>
        </div>
        <div className='d-flex justify-content-end'>
          <button type='button' onClick={()=>{ handleCancel()}} className='btn btn-outline-dark btn-lg px-4 me-2'>Cancel</button>
          <button type='submit' className='btn btn-primary text-white btn-lg px-4'>Create License</button>
        </div>
      </div>
      <div className="row">
        <div className='col-12 col-md-4 col-lg-3'>
          <div className=''>
            <label className='fw-bold mb-3'>Company Name</label>
            <input {...register('company_name')} className='form-control' autoComplete='off' />
            <small className='text-danger'>{errors.company_name?.message}</small>
          </div>
        </div>
        <div className='col-12 col-md-4 col-lg-3'>
          <div className=''>
            <label className='fw-bold mb-3'>License No</label>
            <input {...register('license_no')} className='form-control' autoComplete='off' />
            <small className='text-danger'>{errors.license_no?.message}</small>
          </div>
        </div>
        <div className='col-12 col-md-4 col-lg-2'>
          <div className=''>
            <label className='fw-bold mb-3'>License Start Date:</label>
            <Controller
              name='license_start_date'
              control={control}
              render={({ field }) => (
                <DatePicker
                  autoComplete='off'
                  dateFormat='yyyy-MM-dd'
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    field.onChange(date);
                  }}
                  isClearable
                  className='form-control'
                />
              )}
            />
            <small className='text-danger'>{errors.license_start_date?.message}</small>
          </div>
        </div>
        <div className='col-12 col-md-4 col-lg-2'>
          <div className=''>
            <label className='fw-bold mb-3'>License Expired Date:</label>
            <Controller
              name='license_expired_date'
              control={control}
              render={({ field }) => (
                <DatePicker
                  autoComplete='off'
                  dateFormat='yyyy-MM-dd'
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                    field.onChange(date);
                  }}
                  isClearable
                  className='form-control'
                />
              )}
            />
            <small className='text-danger'>{errors.license_expired_date?.message}</small>
          </div>
        </div>
        <div className='col-12 col-md-4 col-lg-2'>
          <div className=''>
            <label className='fw-bold mb-3'>License Invalid Date:</label>
            <Controller
              name='license_invalid_date'
              control={control}
              render={({ field }) => (
                <DatePicker
                  autoComplete='off'
                  dateFormat='yyyy-MM-dd'
                  selected={invalidDate}
                  onChange={(date) => {
                    setInvalidDate(date);
                    field.onChange(date);
                  }}
                  isClearable
                  className='form-control'
                />
              )}
            />
            <small className='text-danger'>{errors.license_invalid_date?.message}</small>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LicenseForm;
