import React from 'react';
import "../Styles/Single.css";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import emptycart from "../Assets/Logo/emptycart.svg";
import VerifiedIcon from '@mui/icons-material/Verified';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import CartItem from './CartItem';
import { useEffect } from 'react';
import { TotalPrice,SetDataLocalStorage } from '../Data/Reducer';
import { Styles } from '../Config/Cotegories';
import { auth,db } from '../Config/Firebase';
import { getDoc,doc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function MainCart({backscreenflag}) {
    const [total,settotal] = useState(0);
    const [price,setprice] = useState(0)
    const [dropflag,setdropflag] = useState(false);
    const [cartdata,setcartdata] = useState([])
    const {data} = useSelector((state)=>state.data.CartToData);
    const dataPrice = useSelector((state)=>state.data.totalPrice.price);
    const users = JSON.parse(window.localStorage.getItem("users"));
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function totaldataprice(data){
        let finalprice = 0
        if (data.length === 0){
            setprice(0)
        }else {
            data.forEach((val)=>{
                finalprice = finalprice + val.totalitemprice
            })
            setprice(finalprice);
        }

    }

    if(users.username){
        const unsub = onSnapshot(doc(db,"users",users.userId),(doc)=>{
        setcartdata(doc.data().cart)  
        })

    }
    

    useEffect(()=>{
        users.username ? dispatch(TotalPrice(cartdata)) : dispatch(TotalPrice())
        settotal(dataPrice)
        dispatch(SetDataLocalStorage(users.userId))
         
    },[dataPrice,cartdata])

    if (data.length === 0 && cartdata.length === 0 ){
       
        return (
            <div className='emptycart--con'>
                <div className='emptycart--main--con'>
                    <div className='logo--concart'>
                        <img src={emptycart} />
                        
                    </div>
                    <h2 style={{}}>Your Cart is empty</h2>
                </div>
            </div>
        )
    }else {
        
        return (
            <div className='nonemptycart--con' style={Styles(backscreenflag)}>
             <div style={{marginTop:"2rem"}} className='nonemptycart--con'>
               <div className='maincart--con'>
                    <h1>Shopping Cart</h1>
                    <div className='cartitem--con'>
                        <div className='cartitem-holder'>
                            { users.username === "" ?
                                data.map((val)=>{
                                    return <CartItem key={val.id} val = {val} />
                                }) : cartdata.map((val)=>{
                                    return <CartItem key={val.id} val = {val} />
                                })
                            }
                        </div>
                        <div className='carttotal--con'>
                            
                        </div>
                        
                    </div>
                    <div className='cartfooter--con'></div>
                </div>
                <div className='paymentscon' >
                <div className='cartpayment--con' style={dropflag ? {height :"29rem"} : {height:"21rem"}}> 
                    {total > 150 ? <div className='freedelivery-check' style={{display:"flex",alignItems:"center",position:"relative"}}>
                        <VerifiedIcon style={{color:"#039c64"}}/><div style={{lineHeight:"3px",position:"relative",top:"10px"}}><h6 style={{color:"#039c64"}}>Your order is eligible for FREE Delivery</h6><h6 style={{position:"relative",bottom:"15px"}}>Select this option at checkout.<span style={{color:"rgb(6,132,246)",cursor:"pointer"}}>Details</span></h6></div>
                    </div> : <div></div>}

                    <div className='paymentcart--btn--con' style={{display:"flex",flexDirection:"column"}}>
                        <h4 style={{fontWeight:"500"}}>Subtotal ({users.username === "" ? data.length : cartdata.length} items): ${dataPrice.toFixed(2)}</h4>
                        <label style={{fontSize:"12px",position:"relative",bottom:"1rem",fontWeight:"500"}}><input type='checkbox' /> This order contains a gift</label>
                        <button style={{height:"40px"}} onClick={()=>{
                            if(users.username){
                                navigate(`/Orderpage/${users.userId}`);
                            }else {
                                navigate("/signin")
                            }
                        }}>Proceed to Buy</button>
                    </div>

                    <div className='dropdown--cart--con' >
                        <div className='dropdown--payment--con'  onClick={()=>{
                            setdropflag(!dropflag)
                        }}><h5>EMI Avaiable</h5> {!dropflag ? <KeyboardArrowDownOutlinedIcon /> : <KeyboardArrowUpOutlinedIcon />}</div>
                       <div style={dropflag ? {display:"block",transition:"2s"} : {display :"none",transition:"2s"}}>
                       <h5 style={{fontWeight:"300",fontSize:"11.5px"}}>Your order qualifies for EMI with valid credit cards (not avaiable on purchase of Gold, jewelry, Gift cards and Amazon pay balance top up). <span style={{color:"rgb(6,132,246)",cursor:"pointer"}}>Learn more</span></h5>
                       </div>

                    </div>
                </div>
                </div>
               </div>
            </div>
        )
    }
 
}

export default MainCart