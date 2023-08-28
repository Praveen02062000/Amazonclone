import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import{url,dealurl, numberdata,countryandState} from "./Url";
import axios from "axios";
import { db, auth } from "../Config/Firebase";
import { getDoc,setDoc,doc ,onSnapshot} from "firebase/firestore";

const users = JSON.parse(window.localStorage.getItem("users"));

// ................... createAsyncthunk function for feching data's ................................//




export const FetchProductData = createAsyncThunk("data/fetch", async ()=>{
    try {
        const data = await axios.get(url).then((res)=>{
            return res.data
        })
        return data
    }catch(err){
        console.log("error in fetching data !");
    }
})


export const SetDataLocalStorage = createAsyncThunk("SetDataLocal",async (id)=>{
    try {
        const docref = doc(db,"users",id);
        const docsnap = await getDoc(docref)
        const value = docsnap.data()
        if (docsnap.exists()){
            const data = {
                username:value.fullname,
                email:value.email,
                userId:value.userId,
                cart:value.cart,
                address:value.address
             }
            window.localStorage.setItem("users",JSON.stringify(data));
        }
    } catch (err){
        console.log("error in getting data from firestore in reducer")
    }

})

export const DealProductData = createAsyncThunk("deal/product", async ()=>{
    try {
        const dealData = await axios.get(dealurl).then((res)=>{
            return res.data
        })
        const Todaydeal = JSON.stringify(dealData);
        window.localStorage.setItem("todaydeal",Todaydeal);
        return dealData;
    }catch(err){
        console.log("error in dealtoday data fetching");
    }
})

export const MobileCodeData = createAsyncThunk("Mobile/data",async ()=>{
    try {
        const Codedata = await axios.get(numberdata).then((res)=>{
            return res.data;
        })
        return Codedata 
    }catch (err){
        console.log("error in fecting mobile code data !");
    }
})

export const CountryStateCode = createAsyncThunk("Country/state", async()=>{
    try {
        const countrydata = await axios.get(countryandState).then((res)=>{
            return res.data;
        })
        return countrydata
    } catch(err){
        console.log("error in country state fetching error !");
    }

})




const initialstore = {
    main:{
        data:[],
        load:false,
        error:false
    },
    SignUpdate:{
        status:null
    },
    TodayDeal:{
        data:[],
        load:false,
        error:false,
    },
    NumberCodeData:{
        data:[]
    },
    SingleProductData:{
        data:[]
    },CartToData:{
        data:[]
    },totalPrice:{
        price:0
    },CurrentUser:{
        user:"",
        flag:false
    },CountryState:{
        code:[]
    }
}

const Reducer = createSlice({
    name:"data",
    initialState:initialstore,
    reducers:{
        SinglePage:(state,action)=>{
            const data = state.main.data.filter((val)=>{
                return val.id === action.payload
            })
            const obj = JSON.stringify(data);
            window.localStorage.setItem("SinglePageData",obj)
            return {...state,SingleProductData:{data:data}}
        },CartAdd:(state,action)=>{
           
            
                if (state.CartToData.data.length === 0){
                    return {...state,CartToData:{data:[action.payload]}}
                }else {
                    const existingitem = state.CartToData.data.find((val)=> 
                        val.title === action.payload.title
                        )
                    if (existingitem){
                        const newData = state.CartToData.data.map((val)=>{
                            if (val.title === action.payload.title) {
                                return {...val,qtyitem:val.qtyitem + action.payload.qtyitem,totalitemprice:val.totalitemprice + action.payload.totalitemprice}
                            }else {
                                return val
                            }
                        }) 
                    
                        return {...state,CartToData:{data:newData}}
                    }else {
                        return {...state,CartToData:{data:[...state.CartToData.data,action.payload]}}
    
                    }
    
                    
                   
                }
        

        },RemoveCart:(state,action)=>{
            if(users.username === ""){
                const newData = state.CartToData.data.filter((val)=>{
                    return val.id !== action.payload
                })
    
                return {...state,CartToData:{data:newData}}
            }

        },QuanUpdate:(state,action)=>{
            
            if(users.username === ""){
                const find = state.CartToData.data.find((val)=>val.id === action.payload.id);
                if (find){
                    const newdata = state.CartToData.data.map((val)=>{
                        if (val.id === action.payload.id){
                            const qty =  parseInt(action.payload.qty)
                            return {...val,qtyitem:qty,totalitemprice:(parseFloat(val.price) * qty).toFixed(2)}

                        }else {
                            return val
                        }
                    })
                   

                    return {...state,CartToData:{data:newdata}}
                }else {
                    return {...state,CartToData:{data:[...state.CartToData.data]}}
                }
            }else {
                
                
                
                
                
                const find = users.cart.find((val)=>val.id === action.payload.id);
                if (find){
                    const newdata = users.cart.map((val)=>{
                        if (val.id === action.payload.id){
                            const qty =  parseInt(action.payload.qty)
                            return {...val,qtyitem:qty,totalitemprice:parseFloat(val.price) * qty}

                        }else {
                            return val
                        }
                    })
                    
                    
                   
                    

                    
                }
            }
        },TotalPrice:(state,action)=>{
            if (users.username === ""){
               if (state.CartToData.data.length === 0){
                return {...state,totalPrice:{price:0}}
                }else {
                    let final_price = 0
                    state.CartToData.data.forEach((value)=>{
                        final_price += value.totalitemprice;
                    })
                    
                    return {...state,totalPrice:{price:final_price}};
                } 
            }else {
                
                if (action.payload.length === 0){
                    return {...state,totalPrice:{price:0}}
                }else {
                    let final_price = 0
                    action.payload.forEach((value)=>{
                        final_price += value.totalitemprice;
                    })   
                    return {...state,totalPrice:{price:final_price}};
                }
                

            }
            

        }
    },


    extraReducers:{
        [FetchProductData.pending]:(state)=>{
            state.main.load = true;
        },
        [FetchProductData.fulfilled]:(state,action)=>{
            state.main.load = false;
            state.main.data = action.payload;
        }
        ,[FetchProductData.rejected]:(state)=>{
            state.main.load = false;
            state.main.error = true;
        },[DealProductData.pending]:(state)=>{
            state.TodayDeal.load = true;
        },[DealProductData.fulfilled]:(state,action)=>{
            state.TodayDeal.load = false;
            state.TodayDeal.data = action.payload;
        },[DealProductData.rejected]:(state)=>{
            state.TodayDeal.load = false;
            state.TodayDeal.error = true;
        },[MobileCodeData.fulfilled]:(state,action)=>{
            state.NumberCodeData.data = action.payload;
        },[CountryStateCode.fulfilled]:(state,action)=>{
            state.CountryState.code = action.payload
        }
        // ,[UserNameFlag.fulfilled]:(state,action)=>{
        //     state.CurrentUser = action.payload
        // }
        // },[SetDataLocalStorage.fulfilled]:(action)=>{
        //     console.log(action.payload);
        //     // window.localStorage.setItem("users",JSON.stringify(action.payload))
        // }

    }
})


export const  {SinglePage, CartAdd,RemoveCart,QuanUpdate,TotalPrice} = Reducer.actions
export default Reducer.reducer;