import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL, HEADERS } from '../../config/config'
import { ShowToast } from "../../components/utils/ShowToast";

export const renewLicense = createAsyncThunk(
    'licenses/renewLicense',
    async ({licenseId,renewDate})=>{
        try{
            const response = await Axios.put(
                `${BASE_URL}/licenses/renew/${licenseId}`,
                {
                    license_expired_date: renewDate
                },
                {
                    headers: HEADERS()
                }
            )
            const data = response.data
            ShowToast('success','Successfully renewed')
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


const renewLicenseSlice = createSlice({
    name: "renewLicense",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(renewLicense.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(renewLicense.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(renewLicense.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default renewLicenseSlice.reducer