import React from 'react'
import Breadcrumb from '../components/utils/Breadcrumb'
import Nav from '../components/utils/Nav'
import CreateUserCard from '../components/settings/CreateUserCard'
import NotiCard from '../components/settings/NotiCard'
import AccountCard from '../components/settings/AccountCard'
import Table from '../components/settings/Table'
import NotFound from '../components/utils/NotFound'
import CopyRight from '../components/utils/CopyRight'

const Setting = () => {

  const authData = JSON.parse(localStorage.getItem("licenseAppAuth"));


  return (
      <>
      {
          Number(authData.role) !== 1 ?
          <NotFound/>
          :
          <>
            <Nav></Nav>
            <div className='col-12 p-3 border-0 bg-white'>
                <h4 className='text-start fw-bold'>Settings</h4>
                <Breadcrumb prev={""}></Breadcrumb>
                <div className="row">
                    <CreateUserCard></CreateUserCard>
                    <NotiCard></NotiCard>
                    <AccountCard></AccountCard>
                    <Table></Table>
                </div>
              <CopyRight/>
            </div>
          </>
        }
      </>
    )
  
}

export default Setting