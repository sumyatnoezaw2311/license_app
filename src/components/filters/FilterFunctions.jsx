import React,{ useState,useEffect } from 'react'
import { format, set } from 'date-fns'
import { useLocation,useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { debounce } from 'lodash';

const FilterFunctions = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [ currentPageNo,setCurrentPageNo ] = useState(1);

    const refresh = ()=>{
      setStartDate(null)
      setEndDate(null)
      setSearchText('')
    }

    useEffect(() => {
        const params = new URLSearchParams();
        if (searchText) params.set('query', searchText);
        if (startDate) params.set('start_date', format(new Date(startDate),'yyyy-MM-dd'));
        if (endDate) params.set('end_date', format(new Date(endDate),'yyyy-MM-dd'));
        if(currentPageNo) params.set('page', currentPageNo)
        navigate(`?${params.toString()}`);
      }, [searchText, startDate, endDate, currentPageNo]);
    
      useEffect(() => {
          const params = new URLSearchParams(location.search);
          const startDateParam = params.get('start_date');
          const endDateParam = params.get('end_date')
          const pageNo = params.get('page')
          setSearchText(params.get('query') || '');
          setStartDate(startDateParam ? new Date(startDateParam) : null);
          setEndDate(endDateParam ? new Date(endDateParam) : null);
          setCurrentPageNo(pageNo ? pageNo : 1 )
      },[]);
  return (
        <div className='d-flex align-items-center'>
            <div className='me-2'>
                <DatePicker className='form-control border-primary' showYearDropdown dateFormat="yyyy-MM-dd" isClearable placeholderText='Start Date' selected={startDate} onChange={(date) => { setStartDate(date)}} />
            </div>
            <div className='me-2'>
                <DatePicker className='form-control border-primary' showYearDropdown dateFormat="yyyy-MM-dd" isClearable placeholderText='End Date' selected={endDate} onChange={(date) => { setEndDate(date)}} />
            </div>
            <input
                  defaultValue={searchText}
                  aria-label="Search"
                  type="search"
                  onChange={debounce((e) => {
                    setSearchText(e.target.value);
                  },1000)}
                  className="border-primary form-control me-2 w-50"
                  placeholder='License-no, company name and description'
            ></input>
            <button className='btn btn-outline-primary me-2' onClick={()=>{ refresh() }}>Reset</button>
        </div>
  )
}

export default FilterFunctions