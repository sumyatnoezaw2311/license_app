import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL, HEADERS } from '../../config/config'
import { ShowToast } from "../../components/utils/ShowToast";


export const deleteTax = createAsyncThunk(
    'transactions/deleteTax',
    async (taxId)=>{
        try{
            const response = await Axios.delete(
                `${BASE_URL}/licenses/transactions/delete/${taxId}`,
                {
                    headers: HEADERS()
                }
            )
            const data = response.data
            ShowToast('success','Successfully deleted')
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


const deleteTaxSlice = createSlice({
    name: "deleteTax",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(deleteTax.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(deleteTax.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(deleteTax.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default deleteTaxSlice.reducer