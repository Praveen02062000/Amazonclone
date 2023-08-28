import React from 'react';
import "../Styles/Single.css";
import AmazonLogo from "../Assets/Logo/order/fba-badge_18px._CB485936079_.png"
import { useDispatch } from 'react-redux';
import { SetDataLocalStorage} from '../Data/Reducer';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDoc,doc,setDoc, onSnapshot } from 'firebase/firestore';
import {db} from "../Config/Firebase"

function OrderItem({val}) {
  const dispatch = useDispatch()
  const [cartdata,setcartdata] = useState([])
  const users = JSON.parse(window.localStorage.getItem("users"))
  

  useEffect(()=>{
    dispatch(SetDataLocalStorage(users.userId))
  },[])




  async function DeleteCartItemDb(id){
    const docref = doc(db,"users",users.userId);
    const docsnap = await getDoc(docref)
    const cartitems = docsnap.data().cart
    if(docsnap.exists()){
      const newdata = cartitems.filter((val)=>{
        return val.id !== id
      })
      console.log(newdata)
      setDoc(docref,{...docsnap.data(),cart:newdata})
      const unsub = onSnapshot(doc(db,"users",users.userId),(doc)=>{
        setcartdata(doc.data().cart)
      })
    }
  }
 

  return (
    <div className='cartitem'>
      <div className='cart-img-con'>
        <img src={val.image}></img>
      </div>
      <div className='itemdetail'>
        <div className='cart-title' style={{lineHeight:"20px"}}>
          <h4>{val.title}</h4>
        </div>
        <div className='cart-price' style={{lineHeight:"1px"}}>
          <h3 ><span style={{fontSize:"15px",fontWeight:"400"}}>Total price of item :</span> ${val.totalitemprice}</h3>
          <h4 style={{fontSize:"12px"}}>Single item price : ${val.price}</h4>
        </div>
        <div className='stockdetails--con' style={{lineHeight:"2px"}}>
          <h6 style={{color:"green"}}>In stock</h6>
          <h6 style={{fontWeight:"300",color:"gray",position:"relative",bottom:".6rem"}}>Eligible for FREE Shipping</h6>
          <img src={AmazonLogo} style={{width:"50px",position:"relative",bottom:"1.2rem"}}/>
        </div>
        <div className='cart-btn-control'>
          <label style={{fontSize:"10px",fontWeight:"500",display:"flex",alignItems:"center"}}><input type='checkbox'/> This will be a gift  <span style={{cursor:"pointer",color:"rgb(36,136,242)",position:"relative",left:"10px"}}> Learn more</span></label>
        </div>
        
      </div>
      
    </div>
  )
}

export default OrderItem