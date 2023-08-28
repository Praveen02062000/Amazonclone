import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import "../Styles/Single.css";
import { useState } from 'react';
import { useEffect } from 'react';
import RatingStar from "../Config/Cotegories" ;
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import OfferCon from './OfferCon';
import OfferDetails from './OfferDetails';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LockIcon from '@mui/icons-material/Lock';
import { CartAdd,SetDataLocalStorage } from '../Data/Reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Styles } from '../Config/Cotegories';
import {db,auth} from "../Config/Firebase";
import { doc, collection, getDoc, setDoc} from 'firebase/firestore';

function SingleProduct({backscreenflag}){
  const [data,setdata] = useState([]);
  const [offerprice,setofferprice] = useState();
  const [delvierydate,setdeliverydate] = useState();
  const [qty,setqty] = useState(0);
  const dispatch = useDispatch();
  const DataFromLocal = JSON.parse(window.localStorage.getItem("SinglePageData"));
  const users = JSON.parse(window.localStorage.getItem("users"));

  function Dateofdelivery(){
    let date = new Date();
    return date.getDate() + 3;
  }

  const updatedatas = async (data)=>{
    function setdata (value){
      setDoc(docref,{
        ...getdata.data(),cart:value
      })
    }
    const docref = doc(db,"users",users.userId);
    const getdata = await getDoc(docref);
    const cartData = getdata.data().cart;
    if(getdata.exists()){
      if (cartData.length === 0){
          setdata([data])
      }else {
        const find = cartData.find((val)=>data.title === val.title)
        if(find){
          const newData = cartData.map((val)=>{
            if(val.title === data.title){
              return {...val,qtyitem:val.qtyitem + data.qtyitem,totalitemprice:val.totalitemprice + data.totalitemprice}
            }else {
              return val
            }
          })
          setdata(newData)
        }else{
          setdata([...cartData,data])
        }
      }
      
    }
    
  }

  function orginalPrice(value) {
    const price = value
    const cutoffer = (24/100) * price 
    let finalprice = price - cutoffer;
    return (finalprice).toFixed(2)
    
  }

  

  useEffect(()=>{
    setTimeout(()=>{
      setdata(DataFromLocal);
      setofferprice(orginalPrice(DataFromLocal[0].price))
      setdeliverydate(Dateofdelivery());      
    },500);
    if(users.username !== ""){
      dispatch(SetDataLocalStorage(users.userId))
    }
    
  },[])


  
  
       

  function AddtoCart(){
    if (qty === 0){
      const cartdata = {
      id:new Date().getTime(),
      title:data[0].title,
      image:data[0].image,
      qtyitem:1,
      price:offerprice ,
      oringalprice:data[0].price,
      rate:data[0].rating.rate,
      totalitemprice:offerprice * 1
      }
 
      dispatch(CartAdd(cartdata));
      users.username && updatedatas(cartdata)
      
      
      
    }else {
      if (qty !== 0){
        const cartdata = {
        id:new Date().getTime(),
        title:data[0].title,
        image:data[0].image,
        qtyitem:qty,
        price:offerprice ,
        oringalprice:data[0].price,
        rate:data[0].rating.rate,
        totalitemprice:offerprice * qty
        }
        
        dispatch(CartAdd(cartdata));
        users.username && updatedatas(cartdata)
        
      }
    
    }
  }
  


  if (data.length === 0){
    return (
      <div className='SingleLoading' style={{width:"100%",marginTop:"5rem",display:"flex",justifyContent:"center"}}>
        <CircularProgress />
      </div>
    )
  }else {
    return (
      <div className='singleproduct--main--con' style={Styles(backscreenflag)}>
        <div className='singleproduct--head--con'>
          <div className='sigleproduct-head-detail'>
            <h4>{data[0].category}</h4>
          </div>
        </div>
        <div className='singleproduct--body--con'>
          <div className='singleproductleft--con'>
            <div className='left--head--con'>
              <h5 style={{color:"darkblue",fontSize:"12px"}}>{`${data[0].category} > ${data[0].title}`}</h5>
            </div>
            <div className='left--img--con'>
              <img src={`${data[0].image}`}/>
            </div>
            <div></div>
          </div>
          <div className='singleproductright--con'>
            <div className='singleproductright--left--con'>
              <div className='product--title--con'>
                <h1>{data[0].title + data[0].description}</h1>
                <div className='viewmore--con'>
                  <h4 style={{ color: "rgb(0, 106, 132)",lineHeight:"12px",fontSize:"11px"}}>ViewMore {`${data[0].title}`}</h4>
                </div>
                <div className='rating--con' style={{color:"orange"}} >
                  <RatingStar rate={data[0].rating.rate}/><div style={{color:"gray"}}>
                  <KeyboardArrowDownIcon />
                  </div>
                  <h5 style={{marginLeft:"20px",color:"rgb(0,106,132)"}}>{data[0].rating.count} ratings</h5>
                </div>
                <hr />
                <div className='left--price--con'>
                  <div className='sub--price--con'>
                  <h4 style={{color:"red"}}>-24%</h4><div style={{marginLeft:"20px",display:"flex",alignItems:"center"}}><span>$</span><h1>{offerprice}</h1></div>
                  </div>
                  <div className='orginal-price'>
                    <h5 style={{color:"gray",lineHeight:"3px"}}>M.R.P: <span className='price-oringal' style={{textDecoration:"line-through"}}>{data[0].price}</span></h5>
                    <h5>Inclusive of all taxes</h5>
                    <h4 style={{lineHeight:"1px",position:"relative",bottom:"1rem"}}>EMI <span style={{fontSize:"12px",fontWeight:"400"}}>start at $10. No Cost EMI available </span><span style={{fontSize:"15px",color:"rgb(0,106,132)" ,textAlign:"center"}}>EMI options <KeyboardArrowDownIcon /></span></h4>
                  </div>
                </div>
                <hr />
                <div className='offercon--holder'>
                  <OfferCon />
                </div>
                <hr />
                <div className='offerdetail--holder'>
                  <OfferDetails />
                </div>
              </div>
            </div>
            <div className='singleproductright--right--con'>
              <div className='top--con'>
                <h4>Total Price : <span style={{color:"red",fontSize:"24px"}}>${offerprice}</span></h4>
                <h4><span style={{color:"rgb(2, 168, 210)"}}>FREE delivery</span> Friday, {delvierydate}, <br/><span style={{color:"rgb(2, 168, 210)"}}>Details</span></h4>
                <h4 style={{fontSize:"14px",fontWeight:"500"}}>Or faster delivery Tomorrow, 3 <br/>August, Order within <span style={{color:"rgb(2, 168, 210)"}}>3 hr 15 <br/>mins Details</span></h4>
                <div className='delivery-con' style={{display:"flex",alignItems:"center"}}>
                  <LocationOnOutlinedIcon /> <h6 style={{color:"rgb(2, 168, 210)"}}>Select delivery Location</h6>
                </div>
                <h4 style={{color:"green"}}>In Stock</h4>
                <h5>Sold by <span style={{color:"rgb(2,168,210)"}}>Praveen Factory from AMAZON</span></h5>
                <div className='add-extra--con' style={{paddingLeft:"20px",display:"flex",flexDirection:"column",marginBottom:"20px"}}>
                  
                  <label style={{color:"rgb(2, 168, 210)",fontSize:"12px"}}><input type='checkbox' onChange={(e)=>{
                    const price = 24
                    if (e.target.checked){
                      setofferprice(parseFloat(offerprice) + price)
                    }else {
                      setofferprice(parseFloat(offerprice) - 24)
                    }
                  }} /><span>1 years Total Protection plan for </span><br /><span style={{color:"red"}}>$24</span></label>
                  <label style={{color:"rgb(2, 168, 210)",fontSize:"12px"}}><input type='checkbox' onChange={(e)=>{
                    if(e.target.checked){
                      setofferprice(parseFloat(offerprice) + 14)
                    }else {
                      setofferprice(parseFloat(offerprice) - 14)
                    }
                  
                  }}/><span>1 years Damage Protection plan for</span><br/><span style={{color:"red"}}>$14</span></label>
                </div>
              </div>
              <div className='bottom--con' style={{display:"flex",flexDirection:"column"}}>
              <select onChange={(e)=>{
                    setqty(Number(e.target.value))
                  }}>
                    <option>{1}</option>
                    <option>{2}</option>
                    <option>{3}</option>
                    <option>{4}</option>
                    <option>{5}</option>
                    <option>{6}</option>
                    <option>{7}</option>
                    <option>{8}</option>
                    <option>{9}</option>
                    <option>{10}</option>
                  </select>
                <button onClick={()=>{
                  AddtoCart()
                }}>Add to Cart</button>
                <button>Buy Now</button>
              </div>
              <div className='secure--con'>
                <h5 style={{color:"rgb(2, 168, 210)"}}><LockIcon style={{color:"gray"}} /> Secure Transition</h5>
                <h5><input type='checkbox'/> ADD gift options</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }
    
  
}

export default SingleProduct