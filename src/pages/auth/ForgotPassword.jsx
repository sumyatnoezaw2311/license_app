import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './forms.module.css'
import { FaUserAlt,FaRegEnvelope } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { forgotPassword } from '../../features/Auth/forgotPasswordSlice';
import { SyncLoader } from 'react-spinners'

const ForgotPassword = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const forgotPasswordLoading = useSelector(state=> state.forgotPassword.loading)
    const verifyEmailSchema = yup.object().shape({
        email: yup.string().email("Email is invalid!").required('Email is required!'),
    })

    const { register,handleSubmit,formState: {errors}} = useForm({
        resolver : yupResolver(verifyEmailSchema),
    })

    const onSubmit = async (data)=>{
       await dispatch(forgotPassword(data));
       navigate('/sent-link')
    }

  return (
        <>
            <div className='w-100 vh-100 d-flex align-items-center justify-content-center'>
                <div className='col-12 col-md-6 col-lg-4'>
                    <form onSubmit={handleSubmit(onSubmit)} className={`card position-relative rounded-4 border-0 ${styles.mycard}`}>
                        <div className='card-body p-5'>
                            <div className={`${styles.userCircle} d-flex align-items-center justify-content-center bg-primary rounded-circle`}>
                                <FaUserAlt className={`${styles.userIcon}`}></FaUserAlt>
                            </div>
                            <h4 className='text-center my-3 text-uppercase'>forgot password</h4>
                            <div className={`form-floating position-relative my-2 ${styles.customFormPadding}`}>
                                <div className={`${styles.iconBox} bg-primary rounded d-flex align-items-center justify-content-center`}>
                                    <FaRegEnvelope className='text-light'></FaRegEnvelope>
                                </div>
                                <input {...register('email')} name='email' type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <small className='text-danger'>{errors.email?.message}</small>
                            <button type='submit' disabled={forgotPasswordLoading} className='btn btn-primary w-100 my-3 py-2 text-white'>
                                {
                                    forgotPasswordLoading ?
                                    <SyncLoader color='#ffff' size={10}/> : <span>Submit</span>
                                }
                            </button>
                            <div className='w-100 text-center'>
                            <Link to={"/login"} className='text-primary'>
                                <small>Back to Login?</small>
                            </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>  
        </>
  )
}

export default ForgotPassword