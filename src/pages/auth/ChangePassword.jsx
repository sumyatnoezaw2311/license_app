import React,{ useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from './forms.module.css'
import { TbLockCheck,TbLock } from "react-icons/tb"
import { FaUserAlt } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { verifyToken } from '../../features/Auth/verifyTokenSlice';
import { resetPassword } from '../../features/Auth/resetPasswordSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners'


const ChangePassword = () => {

    const oneTimeToken = useParams().oneTimeToken;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const resetLoading = useSelector(state=> state.resetPassword.loading)
    const { loading: verifyLoading, data: verifyData, error: verifyError } = useSelector(state=> state.verifyToken)
    const passwordsSchema = yup.object().shape({
        password:yup.string().required("Password is required!").min(6,"Password must have at least 6 characters!"),
        confirm_password: yup.string().required("Password is required!").min(6,"Password must have at least 6 characters!").oneOf([yup.ref('password'), null], 'Confirm password must match with password!'),
    })

    const { register,handleSubmit,formState: {errors}} = useForm({
        resolver : yupResolver(passwordsSchema),
    })
    
    const checkToken = async ()=>{
        await dispatch(verifyToken(oneTimeToken))
    }

    const onSubmit = async(data)=>{
        if(verifyData && verifyData.data){
            const resetData = {
                email: verifyData.data.email,
                ...data
            }
            await dispatch(resetPassword({resetData: resetData, oneTimeToken: oneTimeToken}));
            navigate('/login')
        }
    }

    useEffect(()=>{
        checkToken()
    },[])

    useEffect(()=>{
        if(verifyError){
            navigate('/login')
        }        
    },[verifyError])

  return (
    <>
     <div className='w-100 vh-100 d-flex align-items-center justify-content-center'>
        <div className='col-12 col-md-6 col-lg-4'>
            <div className={`card position-relative rounded-4 border-0 ${styles.mycard}`}>
                <form onSubmit={handleSubmit(onSubmit)}  className='card-body p-5'>
                    <div className={`${styles.userCircle} d-flex align-items-center justify-content-center bg-primary rounded-circle`}>
                    <FaUserAlt className={`${styles.userIcon}`}></FaUserAlt>
                    </div>
                    <h4 className='text-center my-3 text-uppercase'>reset your password</h4>
                    <div className={`form-floating position-relative my-2 ${styles.customFormPadding}`}>
                        <div className={`${styles.iconBox} bg-primary rounded d-flex align-items-center justify-content-center`}>
                            <TbLock className='text-light fs-4'></TbLock>
                        </div>
                        <input {...register('password')} type="password" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                        <label htmlFor="floatingInput">New Password</label>
                    </div>
                    <small className='text-danger'>{errors.password?.message}</small>
                    <div className={`form-floating position-relative my-2 ${styles.customFormPadding}`}>
                        <div className={`${styles.iconBox} bg-primary rounded d-flex align-items-center justify-content-center`}>
                            <TbLockCheck className='text-light fs-4'></TbLockCheck>
                        </div>
                        <input {...register('confirm_password')} name='confirm_password' type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                        <label htmlFor="floatingPassword">Confirm Password</label>
                    </div>
                    <small className='text-danger'>{errors.confirm_password?.message}</small>
                        <button type='submit' disabled={resetLoading} className='btn btn-primary w-100 my-3 py-2 text-white'>
                            {
                                resetLoading ?
                                <SyncLoader color='#ffff' size={10}/> : <span>Reset Password</span>
                            }
                        </button>
                </form>
            </div>
        </div>
    </div> 
    </>  
  )
}

export default ChangePassword