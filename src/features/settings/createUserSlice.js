import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL, HEADERS } from '../../config/config'
import { ShowToast } from "../../components/utils/ShowToast";

export const storeUser = createAsyncThunk(
    'settings/storeUser',
    async (storeData)=>{
        try{
            const response = await Axios.post(
                `${BASE_URL}/settings/users/store`,
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


const storeUserSlice = createSlice({
    name: "storeUser",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(storeUser.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(storeUser.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(storeUser.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default storeUserSlice.reducer