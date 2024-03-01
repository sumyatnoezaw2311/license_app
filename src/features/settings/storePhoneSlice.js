import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL, HEADERS } from '../../config/config'
import { ShowToast } from "../../components/utils/ShowToast";


export const storePhone = createAsyncThunk(
    'settings/storePhone',
    async (storeData)=>{
        try{
            const response = await Axios.post(
                `${BASE_URL}/settings/phones/store`,
                storeData,
                {
                    headers: HEADERS()
                }
            )
            const data = response.data
            ShowToast('success','Successfully created')
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


const storePhoneSlice = createSlice({
    name: "storePhone",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(storePhone.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(storePhone.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(storePhone.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default storePhoneSlice.reducer