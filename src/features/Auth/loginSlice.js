import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL } from '../../config/config'
import { ShowToast } from "../../components/utils/ShowToast";


export const login = createAsyncThunk(
    'auth/login',
    async (loginData)=>{
        try{
            const response = await Axios.post(
                `${BASE_URL}/auth/login`,
                loginData,
                {
                    headers: {
                        "Content-Type": "application/json",
                      },
                }
            )
            const data = response.data
            const authData = {
                'token': data.access_token,
                'loginTime': Math.floor(Date.now()/1000),
                'role': data.user.is_admin,
                'name': data.user.name,
                'email': data.user.email, 
            }
            localStorage.setItem("licenseAppAuth",JSON.stringify(authData));
            ShowToast('success','Login Successful')
            return data
        }catch(error){
            if(error.response.status === 401){
                ShowToast('error','Missing Email or Password')
            }else{
                ShowToast('error','Something went wrong')
            }
            throw new Error(error)
        }
    }
)


const loginSlice = createSlice({
    name: "login",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {
        logOut: (state)=>{
            state.loading = false;
            state.data = [];
            state.error = null
            localStorage.removeItem('licenseAppAuth')
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(login.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(login.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(login.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export const { logOut } = loginSlice.actions

export default loginSlice.reducer