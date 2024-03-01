import React, { createRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt,FaRegEnvelope,FaKey } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { useDispatch,useSelector } from 'react-redux';
import { login } from '../../features/Auth/loginSlice';
import styles from './forms.module.css'
import { SyncLoader } from 'react-spinners'

const Login = () => {

    const formRef = createRef();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, data, error } = useSelector(state=> state.login)
    const logInSchema = yup.object().shape({
        email: yup.string().email("Email is invalid!").required('Email is required!'),
        password: yup.string().min(6,"Password must have at least 6 characters.").required("Password is required!"),
    })

    const { register,handleSubmit,formState: {errors}} = useForm({
        resolver : yupResolver(logInSchema),
    })

    const onSubmit = async (data)=>{
        await dispatch(login(data))
        navigate('/')
    }


  return (
    <>
        <div className='w-100 vh-100 d-flex align-items-center justify-content-center'>
            <div className='col-12 col-md-4'>
                <div className={`card position-relative rounded-4 border-0 ${styles.mycard}`}>
                    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}  className='card-body p-5'>
                        <div className={`${styles.userCircle} d-flex align-items-center justify-content-center bg-primary rounded-circle`}>
                        <FaUserAlt className={`${styles.userIcon}`}></FaUserAlt>
                        </div>
                        <h4 className='text-center my-3'>USER LOGIN</h4>
                        <div className={`form-floating position-relative my-2 ${styles.customFormPadding}`}>
                            <div className={`${styles.iconBox} bg-primary rounded d-flex align-items-center justify-content-center`}>
                                <FaRegEnvelope className='text-light'></FaRegEnvelope>
                            </div>
                            <input {...register('email')} type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <small className='text-danger'>{errors.email?.message}</small>
                        <div className={`form-floating position-relative my-2 ${styles.customFormPadding}`}>
                            <div className={`${styles.iconBox} bg-primary rounded d-flex align-items-center justify-content-center`}>
                                <FaKey className='text-light'></FaKey>
                            </div>
                            <input {...register('password')} name='password' type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <small className='text-danger'>{errors.password?.message}</small>
                        <button type='submit' disabled={loading} className='btn btn-primary w-100 my-3 py-2 text-white'>
                            {
                                loading ?
                                <SyncLoader color='#ffff' size={10}/> : <span>Login</span>
                            }
                        </button>
                        <div className='w-100 text-center'>
                        <Link to={"/forgot-password"} className='text-primary'>
                            <small>Forgot password ?</small>
                        </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>   
    </>
  )
}

export default Login