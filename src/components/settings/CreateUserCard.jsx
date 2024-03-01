import React,{createRef, useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { FaUserCog } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { storeUser } from '../../features/settings/createUserSlice';
import { fetchAllSettings } from '../../features/settings/allSettingSlice'


const CreateUserCard = () => {

    const dispatch = useDispatch()
    const { loading: settingsLoading, data: settingsData, error: settingsError } = useSelector(state=> state.allSettings)

    const fetchData = async ()=>{
        await dispatch(fetchAllSettings())
    }

    const userSchema = yup.object().shape({
        name: yup.string().required("Username is required!"),
        email: yup.string().email("Email is invalid!").required('Email is required')
        .test('unique', 'Email must be unique!', function (value) {
            const existingEmails = settingsData?.data?.all_users.map((user) => user.email);
            return !existingEmails || existingEmails.indexOf(value) === -1;
        }),
        password: yup.string().min(6,"Password must have at least 6 characters.").required(),
        is_admin: yup.number().required("Role must be selected!")
    })

    const { register,handleSubmit,formState: {errors},reset } = useForm({
        resolver : yupResolver(userSchema),
    })
    
    const onSubmit = async (data)=>{
        reset()
        await dispatch(storeUser(data))
        fetchData()
    }

    useEffect(()=>{
        fetchData()
    },[])

  return (
        <>
            <div className='col-12 col-lg-6 col-xl-4 mt-3'>
                <div className='card p-3 shadow-sm' style={{"minHeight":"350px"}}>
                    <div className='d-flex align-items-start position-sticky top-0'>
                        <FaUserCog className='fs-4'></FaUserCog>
                        <h5 className='card-title fw-bold ms-2'>Create User Account</h5>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className='card-body p-0'>
                        <div className="row mt-3">
                            <label htmlFor="username" className="col-sm-4 col-form-label fw-bold fs-16">Username</label>
                            <div className="col-sm-8">
                                <input {...register('name')} type="text" className="form-control" id="username"/>
                                <small className='text-danger'>{errors.name?.message}</small>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <label htmlFor="email" className="col-sm-4 col-form-label fw-bold fs-16">Email</label>
                            <div className="col-sm-8">
                                <input {...register('email')} type="text" className="form-control" id="email"/>
                                <small className='text-danger'>{errors.email?.message}</small>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <label htmlFor="password" className="col-sm-4 col-form-label fw-bold fs-16">Password</label>
                            <div className="col-sm-8">
                                <input type="password" {...register('password')} className="form-control" id="inputPassword"/>
                                <small className='text-danger'>{errors.password?.message}</small>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <label htmlFor="password" className="col-sm-4 col-form-label fw-bold fs-16">Type Of User</label>
                            <div className="col-sm-8">
                                <div className='d-flex justify-content-between'>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" value={"1"} {...register("is_admin")} id="flexRadioDefault1"/>
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Admin
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" value={"0"} {...register("is_admin")} id="flexRadioDefault2" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            Normal User
                                        </label>
                                    </div>
                                </div>
                                <small className='text-danger'>{errors.is_admin?.message}</small>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-8 d-flex justify-content-between ms-auto">
                            <button className='btn btn-primary text-white w-100'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>

  )
}

export default CreateUserCard