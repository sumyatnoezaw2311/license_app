import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    singleItem: [],
    editId: null,
}

const itemsSlice = createSlice({
    name: 'items',
    initialState: initialState,
    reducers: {
        // item အသစ်ထည့်
        addItem: (state,action)=>{
            state.items.push(action.payload)
            state.items = state.items.reverse()
            return state
        },
        //items array တစ်ခုလုံးအစားထိုးပြောင်းပစ်တာ
        replaceItems: (state,action)=>{
            state.items = action.payload
            return state
        },
        replaceItem: (state,action)=>{
            const newItemsArr = state.items.map((item)=>
                item.id === action.payload.itemId ? {id: action.payload.itemId,...action.payload.replaceData} : item
            )
            state.items = newItemsArr
            return state
        }
        ,
        //item ဖျက်တာ
        removeItem: (state,action)=>{
            const removedItems = state.items.filter(item=> item.id !== action.payload)
            state.items = removedItems
            return state
        },
        //item တစ်ခုချင်းကို id နဲ့ပြန်ခေါ်တာ
        getItem: (state,action)=>{
            const singleItem = state.items.filter(item=> item.id === action.payload)
            state.singleItem = singleItem
            state.editId = null
            return state
        },
        //ခေါ်ထားတဲ့ item တစ်ခုချင်းကို empty array ပြန်လုပ်တာ 
        resetSingleItem: (state)=>{
            state.singleItem = []
            return state
        },
        //items array တစ်ခုလုံးကို empty array ပြန်လုပ်တာ
        resetItem: (state)=>{
            state.items = []
            state.singleItem = []
            state.editId = null
            return state
        },
        //edit လုပ်မယ့် item ရဲ့ id ကိုရယူတာ
        getIdToEdit: (state,action)=>{
            state.editId = action.payload
            return state
        }
    }
})


export const { addItem,removeItem,getItem, replaceItem,resetSingleItem,resetItem, replaceItems, getIdToEdit } = itemsSlice.actions

export default itemsSlice.reducer