import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL, HEADERS } from '../../config/config'
import { ShowToast } from "../../components/utils/ShowToast";


export const createLicense = createAsyncThunk(
    'licenses/createLicense',
    async (storeData)=>{
        try{
            const response = await Axios.post(
                `${BASE_URL}/licenses/store`,
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
                ShowToast('error',"Something went wrong")
            }
            throw new Error(error)
        }
    }
)


const createLicenseSlice = createSlice({
    name: "createLicense",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(createLicense.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(createLicense.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(createLicense.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default createLicenseSlice.reducer