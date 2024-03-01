import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL, HEADERS } from '../../config/config'
import { ShowToast } from "../../components/utils/ShowToast";


export const updateTax = createAsyncThunk(
    'taxs/updateTax',
    async ({taxId,updateData})=>{
        try{
            const response = await Axios.put(
                `${BASE_URL}/licenses/transactions/update/${taxId}`,
                updateData,
                {
                    headers: HEADERS()
                }
            )
            const data = response.data
            ShowToast('success','Successfully updated')
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


const updateTaxSlice = createSlice({
    name: "updateTax",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(updateTax.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(updateTax.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(updateTax.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default updateTaxSlice.reducer