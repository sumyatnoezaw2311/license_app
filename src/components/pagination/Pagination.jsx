import React,{ useEffect,useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as Icons from 'react-icons/fa'
import ReactPaginate from 'react-paginate'

const Pagination = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [ pageCount,setPageCount ] = useState(1)
    const [ currentPageNo,setCurrentPageNo ] = useState(1);
    const { loading: allLicenseLoading, data: allLicenses, error: allLicensesError } = useSelector(state => state.allLicenses);

    const updateURL = (pageNo) => {
        const params = new URLSearchParams(location.search);
        params.set('page', pageNo);
        navigate(`?${params.toString()}`);
    };
    
    const handlePageClick = (selected) => {
      const pageNo = selected.selected + 1;
      setCurrentPageNo(pageNo);
      updateURL(pageNo);
    };
  
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const pageNo = params.get('page');
      setCurrentPageNo(pageNo);
    }, [location.search]);
  
    useEffect(()=>{
      if(allLicenses){
        const total = allLicenses.meta?.total
        const perPage = allLicenses.meta?.per_page
        if(total >= 0 && perPage >= 0){
          setPageCount(Math.ceil( total / perPage ));
        }
      }
    },[allLicenses])
  
  return (
    <ReactPaginate
        containerClassName='pagination'
        pageClassName='page-item'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        pageLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakLabel="..."
        nextLabel= {<Icons.FaChevronRight/>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel= {<Icons.FaChevronLeft/>}
        renderOnZeroPageCount={null}
        forcePage={currentPageNo - 1}
        activeLinkClassName='bg-primary text-light'
    />
  )
}

export default Pagination