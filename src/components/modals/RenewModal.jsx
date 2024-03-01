import React,{useState,useEffect} from 'react'
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux'
import { useForm,Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker'
import { renewLicense } from '../../features/licenses/renewLicenseSlice'
import { fetchAllLicenses } from '../../features/licenses/licensesSlice';
import { useLocation } from 'react-router-dom';

const renewDateSchema = yup.object().shape({
    license_expired_date: yup.string().required('License expired date is required!'),
  });
const RenewModal = ({toRenewId}) => {

    const dispatch = useDispatch()
    const location = useLocation()
    const { loading: singleLicenseLoading, data: singleLicense, error: singleLicenseError } = useSelector(state=> state.singleLicense)
    const [ endDate,setEndDate ] = useState(null)

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(renewDateSchema),
    });

    const fetchData = async () => {
        const params = new URLSearchParams(location.search);
        const page = params.get('page')
        const keyword = params.get('query')
        const startDate = params.get('start_date')
        const endDate = params.get('end_date')
        if(startDate && !endDate || !startDate && endDate){
            return;
        }
        await dispatch(fetchAllLicenses({type: "valid",startDate: startDate, endDate: endDate, searchText: keyword, pageNo: page}))
    };

    const handleRenew = async (data)=>{
        const renewDate = format(new Date(data.license_expired_date),'yyyy-MM-dd')
        await dispatch(renewLicense({licenseId: toRenewId,renewDate: renewDate}))
        await fetchData()
    }

    useEffect(()=>{
        if(singleLicense && singleLicense.data){
            setEndDate(new Date(singleLicense.data.license_expired_date))
        }
    },[singleLicense])

  return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <form onSubmit={handleSubmit(handleRenew)} className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Renew License</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body d-flex align-items-center justify-content-between">
                    <label>Expired Date :</label>
                    <div className='w-75'>
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
                <div className="modal-footer border-0">
                    <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary text-light" data-bs-dismiss="modal">Save changes</button>
                </div>
            </form>
        </div>
        </div>
  )
}

  


export default RenewModal