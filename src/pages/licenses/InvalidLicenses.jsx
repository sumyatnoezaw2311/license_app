import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/utils/Breadcrumb'
import Table from "../../components/licenses/Table"
import * as Icons from "react-icons/fa";
import Nav from '../../components/utils/Nav';
import FilterFunctions from '../../components/filters/FilterFunctions';
import Pagination from '../../components/pagination/Pagination';
import CopyRight from '../../components/utils/CopyRight';

const InvalidLicenses = () => {
    return (
    <>
      <Nav></Nav>
      <div className='col-12 p-3 border-0 bg-white'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <div>
          <h4 className='text-start fw-bold'>Total Invalid Licenses</h4>
          <Breadcrumb prev={""}></Breadcrumb>
        </div>
        <div className='d-flex justify-content-between'>
          <div className='d-flex'>
            <FilterFunctions/>
          </div>
        </div>
      </div>
      <div className="row px-2">
        <Table></Table>
        <div className='w-100 d-flex align-items-center justify-content-end mt-2 user-select-none'>
          <Pagination/>
        </div>
      </div>
      <CopyRight/>
        {/* <div className='position-fixed bottom-0 end-0 pe-3 pb-5 mb-2'>
          <a href='#' className='btn btn-dark rounded-3 text-white'>
            <Icons.FaArrowUp></Icons.FaArrowUp>
          </a>
        </div> */}
      </div>
    </>
  )
}

export default InvalidLicenses