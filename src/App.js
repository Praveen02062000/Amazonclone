import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import "./Styles/Main.css";
import { Routes,Route, json } from 'react-router-dom';
import Home from './Components/Home';
import { useDispatch, useSelector } from 'react-redux';
import { DealProductData, FetchProductData ,MobileCodeData,SetDataLocalStorage,CountryStateCode} from './Data/Reducer';
import Subhead from './Components/Subhead';
import SideMenu from './Components/SideMenu';
import Products from './Components/Products';
import SingleProduct from "./Components/SingleProduct";
import Signin from "./Components/Sigin";
import Signup from "./Components/Signup";
import MainCart from "./Components/MainCart";
import Footer from "./Components/Footer";
import TodayDealPage from './Components/TodayDealPage';
import { auth ,db } from './Config/Firebase';
import { getDoc,doc } from 'firebase/firestore';
import Account from './Components/Account';
import Address from './Components/Address';
import AddressEdit from './Components/AddressEdit';
import OrderPage from './Components/OrderPage';


function App() {
  const [border,setborder] = useState(false);
  const [slider,setslider] = useState(false);
  const [animation,setanimation] = useState(false);
  const [signinpaga,setsigninpaga] = useState(true);
  const [userFlag,setuserFlag] = useState("");
  const [dbvalue,setdbvalue] = useState("");
  const {data,load, error} = useSelector((state)=>state.data.TodayDeal)
  const users = JSON.parse(window.localStorage.getItem("users"));
  const dispatch = useDispatch()


  function setLocaldata(){
    if(window.localStorage.getItem("users")){
    }else {
        const data = JSON.stringify({
          username:"",
          email:"",
          userId:"",
          cart:[],
          address:[]
        })
      window.localStorage.setItem("users",data);
    }
  }

 
  
  function setBackgorund(){
    setborder(true);
  }
  function Removebackground(){
    setborder(false)
  }
  function SidemenuFlag(){
    setslider(true);
    setanimation(true);
  }
  function SidemenuremoveFlag(){
    setslider(false)
  }
 
  function setanimations(){
    if(slider){
      setanimation(true);
    }else{
      setTimeout(() => {
        setanimation(false)
      }, 100);
    }
    
  }
  // function UserNameFlag(){
  //   setTimeout(()=>{
  //     setuserFlag(auth.currentUser.email)
  //     setdbvalue(DataGetDataBase())
  //   },2000) 
  // }

  useEffect(()=>{
    setLocaldata()
    dispatch(FetchProductData());
    dispatch(DealProductData());
    dispatch(MobileCodeData());
    dispatch(CountryStateCode());
    setanimations();

    dispatch(SetDataLocalStorage(users.userId))
   
  },[slider]) 



  return (
    <div className='app'>
      {setLocaldata()}
      {animation && <SideMenu flag = {slider} remove={SidemenuremoveFlag}/> }
      <Header background = {setBackgorund} flag = {border} remove={Removebackground}/>
      <Subhead SliderOn = {SidemenuFlag} sliderflag = {slider}/>
      <div className={border ? "background" : "removebackground"} onClick={()=>{
        setborder(false)
        
      }}>
        
        <Routes>
          <Route exact path="/" element={<Home backscreenflag = {border}/>}/>
          <Route exact path='/allproducts/data' element={<Products backscreenflag = {border}/>} />
          <Route exact path='/product/:id' element={<SingleProduct backscreenflag = {border} />} />
          <Route exact path='/Signin' element={<Signin />}/>
          <Route exact path="/Signup" element={<Signup />}/>
          <Route exact path='amazon/cart' element={<MainCart backscreenflag = {border}/>}/>
          <Route exact path="Todaydeal/products" element = {<TodayDealPage   backscreenflag = {border}/>}/>
          <Route exact path="/setting" element={<Account  backscreenflag = {border}/>}/>
          <Route exact path="/address" element={<Address  backscreenflag = {border}/>} />
          <Route exact path="/address/edit" element={<AddressEdit  backscreenflag = {border}/>} />
          <Route exact path='/Orderpage/:id' element={<OrderPage />} />
        </Routes>
        
      </div>
      <Footer />
  

    </div>
  )
}

export default App