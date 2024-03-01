import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL, HEADERS } from '../../config/config'
import { ShowToast } from '../../components/utils/ShowToast'


export const fetchAllLicenses = createAsyncThunk(
    'licenses/allLicenses',
    async ({ type,pageNo, query, startDate, endDate })=>{
        try{
            let urlParam = "";
            if (!query && !startDate && !endDate) {
                urlParam = `licenses?type=${type}&page=${pageNo}`;
            } else if (query && !startDate && !endDate) {
                urlParam = `licenses/${type}-search?query=${query}&page=${pageNo}`;
            } else if( startDate && endDate) {
                if (!query) {
                    urlParam = `licenses/${type}-search-between?start_date=${startDate}&end_date=${endDate}&page=${pageNo}`;
                } else if (query) {
                    urlParam = `licenses/${type}-search-between?query=${query}&start_date=${startDate}&end_date=${endDate}&page=${pageNo}`;
                }
            }
            const response = await Axios.get(
                `${BASE_URL}/${urlParam}`,
                {
                    headers: HEADERS()
                }
            )
            const data = response.data
            return data
        }catch(error){
            if(error.response.status === 401){
                localStorage.removeItem('licenseAppAuth')
                ShowToast('error',"Please login again")
            }else{
                ShowToast('error',"Something went wrong")
            }
            throw new Error(error)
        }
    }
)


const allLicensesSlice = createSlice({
    name: "allLicenses",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllLicenses.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(fetchAllLicenses.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(fetchAllLicenses.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default allLicensesSlice.reducer