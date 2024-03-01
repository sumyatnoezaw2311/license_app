import React,{ useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import DetailDOfGood from '../../../components/licenses/DetailDOfGood'
import TaxTable from '../../../components/licenses/Transaction/TaxTable'
import Breadcrumb from '../../../components/utils/Breadcrumb'
import styles from '../detail/detail.module.css'
import Nav from '../../../components/utils/Nav';
import { fetchSingleLicense } from '../../../features/licenses/getSingleLicenseSlice';
import Loading from '../../../components/utils/Loading'


const InValidLicenseDetail = () => {

  const id = useParams().id;
  const dispatch = useDispatch()
  const [ goodId,setGoodId ] = useState(null)
  const { loading: singleLicenseLoading, data: singleLicense, error: singleLicenseError } = useSelector(state=> state.singleLicense)

  const fetchData = async ()=>{
    await dispatch(fetchSingleLicense(id))
  }

  const handleClick = (clickedId)=>{
    setGoodId(clickedId)
  }

  useEffect(()=>{
    fetchData()
  },[])

  useEffect(()=>{
    setGoodId(singleLicense?.data?.good[0].id)
  },[singleLicense])

  return (
    <>
        {
          singleLicenseLoading &&
          <Loading/>
        }
        <Nav></Nav>
        <div className='col-12 p-3 border-0 bg-white'>
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <h4 className='text-start fw-bold'>Total Valid Licenses</h4>
              <Breadcrumb prev={"valid-licenses"}></Breadcrumb>
            </div>
          </div>
            <table className='table table-borderless w-25'>
              <tbody>
                <tr>
                  <td className={styles.heading}>License No</td>
                  <td className={styles.heading}>:</td>
                  <td className={`${styles.heading} text-primary`}>{singleLicense?.data?.license_no}</td>
                </tr>
                <tr>
                  <td className={`${styles.heading} text-nowrap`}>Company Name</td>
                  <td className={styles.heading}>:</td>
                  <td className={`${styles.heading} text-primary`}>{singleLicense?.data?.company_name}</td>
                </tr>
                <tr>
                  <td className={styles.heading}>License Date</td>
                  <td className={styles.heading}>:</td>
                  <td className={`${styles.heading} text-primary`}>{singleLicense?.data?.license_start_date}</td>
                </tr>
                <tr>
                  <td className={styles.heading}>Expired Date</td>
                  <td className={styles.heading}>:</td>
                  <td className={`${styles.heading} text-primary`}>{singleLicense?.data?.license_expired_date}</td>
                </tr>
                <tr>
                  <td className={styles.heading}>Invalid Date</td>
                  <td className={styles.heading}>:</td>
                  <td className={`${styles.heading} text-primary`}>{singleLicense?.data?.license_invalid_date}</td>
                </tr>
              </tbody>
            </table>
            {/* detail for description of goods */}
            <div className='bg-secondary h-100 mx-2 d-flex'>
              <div className='p-0'>
                <nav className="nav flex-column bg-white h-100">
                    {
                      singleLicense?.data?.good &&
                      singleLicense?.data?.good.map((el,i)=>
                        <span onClick={()=> handleClick(el.id)} key={i} className={`nav-link text-black my-2 text-nowrap border-start border-2 ${ goodId === el.id ? "border-primary": "border-white" }`}>Description {i+1}</span>
                      )
                    }
                </nav>
              </div>
              <div className={`table-responsive ${styles.detailsDOfGood}`}>
                <DetailDOfGood goodId={goodId}></DetailDOfGood>
                {
                  goodId &&
                  <TaxTable goodId={goodId}></TaxTable>
                }

              </div>
            </div>
          </div>
        </>
  )
}

export default InValidLicenseDetail