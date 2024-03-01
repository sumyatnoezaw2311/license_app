import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL, HEADERS } from '../../config/config'
import { ShowToast } from '../../components/utils/ShowToast'

export const deleteLic = createAsyncThunk(
    'license/deleteLic',
    async ({licId,show})=>{
        try{
            const response = await Axios.delete(
                `${BASE_URL}/licenses/delete/${licId}`,
                {
                    headers: HEADERS()
                }
            )
            const data = response.data
            show && ShowToast('success','Successfully deleted')
            return data
        }catch(error){
            if(error.response.status === 401){
                localStorage.removeItem('licenseAppAuth')
                ShowToast('error',"Please login again")
            }else{
                show && ShowToast('error','Something went wrong')
            }
            throw new Error(error)
        }
    }
)


const deleteLicSlice = createSlice({
    name: "deleteLic",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(deleteLic.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(deleteLic.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(deleteLic.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default deleteLicSlice.reducer