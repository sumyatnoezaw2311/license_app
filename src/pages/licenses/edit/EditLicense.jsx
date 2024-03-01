import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Nav from '../../../components/utils/Nav'
import LicenseForm from './LicenseForm'
import ItemsTable from './ItemsTable'
import AddOrEditItem from './AddOrEditItem'
import { fetchSingleLicense } from '../../../features/licenses/getSingleLicenseSlice'
import { useEffect } from 'react'


const EditLicense = () => {

  const id = useParams().id
  const dispatch = useDispatch()

  const fetchlicense = async()=>{
    await dispatch(fetchSingleLicense(id))
  }

  useEffect(()=>{
    fetchlicense()
  },[])
  
  return (
            <>
                <Nav></Nav>
                <LicenseForm/>
                <ItemsTable/>
                <AddOrEditItem/>
            </>
  )
}

export default EditLicense