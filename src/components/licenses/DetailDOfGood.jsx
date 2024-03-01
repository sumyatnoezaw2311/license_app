import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import styles from './detailDOfGood.module.css'
import { fetchSingleLicense } from '../../features/licenses/getSingleLicenseSlice'
import { useDispatch,useSelector } from 'react-redux'

const DetailDOfGood = ({goodId}) => {

    const id = useParams().id;
    const dispatch = useDispatch()
    const [ dOfGood,setDOfGood ] = useState({})
    const { loading: singleLicenseLoading, data: singleLicense, error: singleLicenseError } = useSelector(state=> state.singleLicense)

    const fetchData = async ()=>{
      await dispatch(fetchSingleLicense(id))
    }
    
    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        const good = singleLicense?.data?.good.filter(g=> g.id === goodId)
        setDOfGood(good)
    },[singleLicense,goodId])


  return (
    <>
            <table className='table table-borderless m-2'>
                <thead>
                    <tr>
                        <th className={`bg-secondary ${styles.dOfGoodTh} ${styles.otherTh}`}>Description Of Goods</th>
                        <th className={`bg-secondary text-center ${styles.otherTh}`}>Hs Code</th>
                        <th className={`bg-secondary text-center ${styles.otherTh}`}>Price</th>
                        <th className={`bg-secondary text-center ${styles.otherTh}`}>Qty</th>
                        <th className={`bg-secondary text-center ${styles.otherTh} text-nowrap`}>License Balance</th>
                        <th className={`bg-secondary text-center ${styles.otherTh}`}>Unit</th>
                    </tr>
                </thead>
                <tbody className={`${styles.mytBody}`}>
                        {
                            (dOfGood && Object.keys(dOfGood).length > 0) &&
                            <tr>
                                <td className='bg-secondary'>{dOfGood[0].name}</td>
                                <td className='bg-secondary text-center'>{dOfGood[0].hs_code}</td>
                                <td className='bg-secondary text-center'>{dOfGood[0].price}</td>
                                <td className='bg-secondary text-center'>{dOfGood[0].quantity}</td>
                                <td className='bg-secondary text-center'>{dOfGood[0].license_balance}</td>
                                <td className='bg-secondary text-center'>{dOfGood[0].unit}</td>
                            </tr>
                        }
                </tbody>
            </table>
    </>
  )
}

export default DetailDOfGood