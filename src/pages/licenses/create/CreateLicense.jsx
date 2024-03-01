import React,{ useEffect } from 'react'
import { useDispatch } from 'react-redux';
import Nav from '../../../components/utils/Nav'
import ItemsTable from './ItemsTable'
import LicenseForm from './LicenseForm';
import AddItem from './AddItem';
import { resetItem } from '../../../features/licenses/items/itemsSlice';


const CreateLicense = () => {

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(resetItem())
  },[])

return (
    <>
      <Nav></Nav>
      <LicenseForm/>
      <ItemsTable/>
      <AddItem/>
    </>

  )
}
export default CreateLicense