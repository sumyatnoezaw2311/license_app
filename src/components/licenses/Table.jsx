import React,{Fragment,useEffect,useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './table.module.css';
import { useDispatch, useSelector } from 'react-redux';
import DofGoodModal from '../modals/DofGoodModal';
import { fetchAllLicenses } from '../../features/licenses/licensesSlice';
import RenewModal from '../modals/RenewModal'
import { fetchSingleLicense } from '../../features/licenses/getSingleLicenseSlice';
import { deleteLic } from '../../features/licenses/deleteLicenseSlice'
import Loading from '../../components/utils/Loading'
import ToConfirmDel from '../utils/ToConfirmDel';

const Table = () => {
    
    const dispatch = useDispatch()
    const [ renewId, setRenewId ] = useState(null)
    const location = useLocation()
    const path = location.pathname
    const authData = JSON.parse(localStorage.getItem('licenseAppAuth'))
    const [dofGoodForModal, setDOfGood] = useState("");
    const [ showAlert,setShowAlert ] = useState(false)
    const [ idToDel,setIdToDel ] = useState(null)
    const { loading: licenseLoading, data: allLicenses, error: licenseError } = useSelector(state=> state.allLicenses)
    const tableHeaders = [
        "#",
        "license no",
        "company name",
        "license start date",
        "license expired date",
        "license invalid date",
        "hs code",
        "maccs code",
        "no",
        "description of goods",
        "price",
        "quantity",
        "unit",
        "actions",
      ];

      const fetchData = async () => {
        const params = new URLSearchParams(location.search);
        const page = params.get('page')
        const keyword = params.get('query')
        const startDate = params.get('start_date')
        const endDate = params.get('end_date')
        if(startDate && !endDate || !startDate && endDate){
            return;
        }
        path !== '/invalid-licenses' ?
        await dispatch(fetchAllLicenses({type: "valid",startDate: startDate, endDate: endDate, query: keyword, pageNo: page ? page: 1}))
        :
        await dispatch(fetchAllLicenses({type: "invalid",startDate: startDate, endDate: endDate, query: keyword, pageNo: page ? page: 1}))
      };

      const fetchOldData = async (id) => {
        await dispatch(fetchSingleLicense(id));
      };
      const seemore = (content) => {
        setDOfGood(content);
      };

      const handleRenew = async (id) => {
        setRenewId(id);
        await fetchOldData(id)
      };

      const handleDelete = async (id) => {
        setIdToDel(id)
        setShowAlert(true)
      };

      const handleCancel = ()=>{
        setShowAlert(false)
        setIdToDel(null)
      }

      const handleConfirm = async ()=>{
        setShowAlert(false)
        await dispatch(deleteLic({licId: idToDel, show: true}))
        setIdToDel(null)
        await fetchData()
      }
        

      useEffect(() => {
        fetchData();
      }, [location.search]);

      useEffect(()=>{
        if(allLicenses && allLicenses.data){
            const licWithoutGood = allLicenses.data.find(lic=> lic.good.length <= 0) || null
            if(licWithoutGood){
                dispatch(deleteLic({licId: licWithoutGood?.id, show: false}))
            }
        }
      },[allLicenses])

  
return <div className="table-responsive">
            {
                licenseLoading &&
                <Loading/>
            }
            {
                showAlert &&
                <ToConfirmDel title={"Are you sure?"} text={"You want to delete this license."} confirmFun={handleConfirm} cancelFun={handleCancel}></ToConfirmDel>
            }
            <RenewModal toRenewId={renewId}/>
            <DofGoodModal content={dofGoodForModal}/>                
            <table className={`table table-hover`}>
                <thead className="align-top">
                    <tr>
                    {
                        tableHeaders.map((el,index)=>{
                        return <th key={index} className={`text-center bg-secondary ${index === 0 ? styles.firstHead : ""} ${index === 11 ? styles.lastHead : ""}`}>{el.toUpperCase()}</th>
                        })
                    }
                    </tr>
                </thead>
                <tbody className='align-middle'>
                    {
                        (allLicenses && allLicenses?.data?.length > 0) ?
                        allLicenses.data.map((el,i)=>{
                            return <Fragment key={i}>
                                    <tr>
                                        <td className='text-center'>
                                            { i+1 }
                                        </td>
                                        <td className='text-center'>{el.license_no}</td>
                                        <td className='text-center'>{el.company_name}</td>
                                        <td className='text-center text-nowrap'>{el.license_start_date}</td>
                                        <td className='text-center text-nowrap'>{el.license_expired_date}</td>
                                        <td className='text-center text-nowrap'>{el.license_invalid_date}</td>
                                        {
                                            el.good.length > 0 &&
                                                <Fragment>
                                                    <td className='text-center'>{el.good[0].hs_code}</td>
                                                    <td className='text-center'>{el.good[0].maccs_code}</td>
                                                    <td className='text-center'>1</td>
                                                    <td>
                                                        {el.good[0].name.substring(0,100)}...
                                                        <a
                                                        className='text-primary text-decoration-none'
                                                        data-bs-target="#exampleModalToggle"
                                                        data-bs-toggle="modal"
                                                        onClick={()=>{
                                                            seemore(el.good[0].name)
                                                        }}
                                                        >see more</a>
                                                    </td>
                                                    <td className='text-center'>{el.good[0].price}</td>
                                                    <td className='text-center'>{el.good[0].license_balance}</td>
                                                    <td className='text-center'>{el.good[0].unit}</td>
                                            </Fragment>
                                        }
                                                    <td className='text-nowrap'>
                                                        {
                                                            (Number(authData.role) === 1 && path !== '/invalid-licenses') &&
                                                            <button
                                                            onClick={()=>{
                                                                handleRenew(el.id)
                                                            }}
                                                            className='btn btn-success btn-sm text-white me-2'
                                                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                            >Renew</button>
                                                        }
                                                        <Link to={path.includes('/invalid-licenses') ? `/invalid-license-detail/${el.id}` : `/valid-license-detail/${el.id}`} className='btn btn-dark btn-sm text-white me-2'>Details</Link>
                                                        {
                                                            Number(authData.role) === 1 &&
                                                            <>
                                                                {
                                                                    (path !== '/invalid-licenses') &&
                                                                    <Link to={`/edit/${el.id}`} className='btn btn-warning btn-sm text-white me-2'>Edit</Link>
                                                                }
                                                                <button onClick={()=>handleDelete(el.id)} className='btn btn-danger btn-sm text-white'>Delete</button>
                                                            </>
                                                            
                                                        }
                                                    </td>
                                    </tr>
                                    {
                                        el.good.length > 1 &&
                                        el.good.slice(1).map((eachGood,i)=>{
                                            return <tr key={i}>
                                                        <td className='text-center' colSpan={6}></td>
                                                        <td className='text-center'>{eachGood.hs_code}</td>
                                                        <td className='text-center'>{eachGood.maccs_code}</td>
                                                        <td className='text-center'>{i+2}</td>
                                                        {
                                                            eachGood.name.length > 100 ?
                                                            <td>
                                                                {eachGood.name.substring(0,100)}...
                                                                <a
                                                                className='text-primary text-decoration-none text-nowrap'
                                                                data-bs-target="#exampleModalToggle"
                                                                data-bs-toggle="modal"
                                                                onClick={()=>{
                                                                    seemore(eachGood.name)
                                                                }}
                                                                >see more</a>
                                                            </td>:
                                                            <td>
                                                                {eachGood.name}
                                                            </td>
                                                        }
                                                        <td className='text-center'>{eachGood.price}</td>
                                                        <td className='text-center'>{eachGood.quantity}</td>
                                                        <td className='text-center'>{eachGood.unit}</td>
                                                        <td></td>
                                                    </tr>
                                        })
                                    }
                                </Fragment>
                        })
                        :
                        <tr>
                            <td colSpan={14} className='p-0 border-0'>
                                <div className="alert alert-warning text-center mb-0" role="alert">
                                    {
                                        path === '/invalid-licenses' ? "There is no record for invalid licenses!" : "There is no record for valid licenses!"
                                    }
                                </div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
}

export default Table