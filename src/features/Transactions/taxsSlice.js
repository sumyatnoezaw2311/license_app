import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL, HEADERS } from '../../config/config'
import { ShowToast } from "../../components/utils/ShowToast";

export const fetchTaxs = createAsyncThunk(
    'transactions/taxs',
    async (goodId)=>{
        try{
            const response = await Axios.get(
                `${BASE_URL}/licenses/transactions/index?good_id=${goodId}`,
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
                ShowToast('error','Something went wrong')
            }
            throw new Error(error)
        }
    }
)


const taxsSlice = createSlice({
    name: "taxs",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchTaxs.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(fetchTaxs.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(fetchTaxs.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default taxsSlice.reducer