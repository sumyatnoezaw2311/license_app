import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import Breadcrumb from '../../../components/utils/Breadcrumb';
import { updateLicense } from '../../../features/licenses/updateLicenseSlice';
import Loading from '../../../components/utils/Loading'
import DangerAlert from '../../../components/utils/DangerAlert'

const licenseSchema = yup.object().shape({
  company_name: yup.string().required('Company name is required!'),
  license_no: yup.string().required('License no is required!'),
  license_start_date: yup.date().required('License start date is required!'),
  license_expired_date: yup.date().required('License expired date is required!'),
  license_invalid_date: yup.date().required('License invalid date is required!'),
});


const LicenseForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [ showAlert,setShowAlert ] = useState(false)
  const loading = useSelector(state=> state.updateLic.loading)
  const [formValues, setFormValues] = useState({
    company_name: '',
    license_no: '',
    license_start_date: null,
    license_expired_date: null,
    license_invalid_date: null,
  });

  const { control, register ,handleSubmit, formState, reset, setValue } = useForm({
    resolver: yupResolver(licenseSchema),
  });

  const { errors } = formState;

  const singleLicData = useSelector((state) => state.singleLicense.data.data);
  const singleLicLoading = useSelector((state) => state.singleLicense.loading);
  const items = useSelector((state) => state.items.items);

  useEffect(() => {
    if (singleLicData) {
      setFormValues(singleLicData);
      setValue('company_name',singleLicData.company_name)
      setValue('license_no',singleLicData.license_no)
      setValue('license_start_date',singleLicData.license_start_date)
      setValue('license_expired_date',singleLicData.license_expired_date)
      setValue('license_invalid_date',singleLicData.license_invalid_date)
    }
  }, [singleLicData]);

  const handleCancel = ()=>{
    reset(formValues);
    navigate(-1)
  }

  const handleConfirm = ()=>{
    setShowAlert(false)
  }

  const updateLic = async (data) => {
    const itemsToUpdate = [
      ...items.filter((item) => typeof item.id === 'number').map(({created_at,updated_at,...item})=> item),
      ...items.filter((item) => typeof item.id !== 'number').map(({ id, ...item }) => item),
    ];

    const updateData = {
      ...data,
      license_start_date: format(new Date(data.license_start_date), 'yyyy-MM-dd'),
      license_expired_date: format(new Date(data.license_expired_date), 'yyyy-MM-dd'),
      license_invalid_date: format(new Date(data.license_invalid_date), 'yyyy-MM-dd'),
      good: itemsToUpdate,
    };
    if(itemsToUpdate.length > 0){
      await dispatch(updateLicense({ licenseId: Number(id),updateData: { ...updateData, id: Number(id)}}));
      navigate(-1);
    }else{
      setShowAlert(true)
    }
  };

  return (
    <form onSubmit={handleSubmit(updateLic)} className='col-12 p-3 border-0 bg-white createContainer'>
      {
        (singleLicLoading || loading) &&
        <Loading/>
      }
      {
        showAlert &&
        <DangerAlert title={"Sorry"} text={"You can't update a license without items."} confirmFun={handleConfirm}></DangerAlert>
      }
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <div>
          <h3 className='text-start fw-bold'>Total Valid Licenses</h3>
          <Breadcrumb prev={"valid-licenses"}></Breadcrumb>
        </div>
        <div className='d-flex justify-content-end'>
          <button type='button' onClick={()=> handleCancel()} className='btn btn-outline-dark btn-lg px-4 me-2'>Cancel</button>
          <button type='submit' className='btn btn-primary text-white btn-lg px-4'>Update License</button>
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
        {['license_start_date', 'license_expired_date', 'license_invalid_date'].map((fieldName) => (
          <div key={fieldName} className='col-12 col-md-4 col-lg-2'>
            <div className=''>
              <label className='fw-bold mb-3'>{fieldName === 'license_start_date'
                ? 'License Start Date:'
                : fieldName === 'license_expired_date'
                ? 'License Expired Date:'
                : 'License Invalid Date:'}
              </label>
              <Controller
                name={fieldName}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    autoComplete='off'
                    dateFormat='yyyy-MM-dd'
                    selected={new Date(formValues[fieldName])}
                    onChange={(date) => {
                      setFormValues({ ...formValues, [fieldName]: date });
                      field.onChange(date);
                    }}
                    isClearable
                    className='form-control'
                  />
                )}
              />
              <small className='text-danger'>{errors[fieldName]?.message}</small>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};


export default LicenseForm;
