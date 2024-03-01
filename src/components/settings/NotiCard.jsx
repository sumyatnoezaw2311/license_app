import React,{createRef,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import styles from './noticard.module.css'
import PhNumberTable from './PhNumberTable'
import { FaRegBell,FaPlusCircle } from 'react-icons/fa'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { fetchAllSettings } from '../../features/settings/allSettingSlice'
import { storePhone } from '../../features/settings/storePhoneSlice'
import Loading from '../../components/utils/Loading'


const NotiCard = () => {

    const dispatch = useDispatch()
    const { loading: settingsLoading, data: settingsData, error: settingsError } = useSelector(state=> state.allSettings)
  
    const fetchData = async ()=>{
      await dispatch(fetchAllSettings())
    }
  
    const phoneSchema = yup.object().shape({
        phone_number: yup.string()
        .required('Phone number is required!')
        .matches(/^\d{9,11}$/, 'Please enter valid phone number!')
        .test('unique', 'Phone number must be unique!', function (value) {
            const existingPhoneNumbers = settingsData?.data.phones.map((phone) => phone.phone_number);
            return !existingPhoneNumbers || existingPhoneNumbers.indexOf(value) === -1;
        }),
    })

    const { register,handleSubmit,formState: {errors},reset } = useForm({
        resolver : yupResolver(phoneSchema),
    })

    const handleAdd = async (data)=>{
        reset()
        await dispatch(storePhone(data));
        await dispatch(fetchAllSettings())
    }

    useEffect(()=>{
        fetchData()
    },[])


  return (
    <>
        {
            settingsLoading &&
            <Loading/>
        }
        <div className='col-12 col-lg-6 col-xl-4 mt-3' > 
            <div className={`card p-3 shadow-sm ${styles.noticard}`}>
                <div className='bg-white d-flex align-items-start position-sticky top-0'>
                    <FaRegBell className='fs-4'></FaRegBell>
                    <h5 className='card-title fw-bold ms-2'>Notification Management</h5>
                </div>
                <p className='my-3'>Add the phone number you want to send notification.</p>
                <div className='card-body p-0'>
                    <form onSubmit={handleSubmit(handleAdd)} className="mb-1 mt-3 d-flex justify-content-center align-items-center">
                        <input {...register("phone_number")} type="text" className="form-control me-3" id="phone_number"/>
                        <button className='btn btn-primary text-white text-nowrap'>
                            <FaPlusCircle className='fs-5 me-2'></FaPlusCircle>
                            Add
                        </button>
                    </form>
                    {errors.phone_number && <small className="text-danger">{errors.phone_number.message}</small>}
                    <PhNumberTable></PhNumberTable>
                </div>
            </div>
        </div>
    </>
  )
}

export default NotiCard