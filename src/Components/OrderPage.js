import React,{useState} from 'react';
import "../Styles/Order.css";
import HttpsIcon from '@mui/icons-material/Https';
import Amazonlogo from "../Assets/Logo/amazon-sign.png";
import {auth,db} from "../Config/Firebase";
import { getDoc,setDoc,doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { banklist } from '../bank';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import CartItem from './CartItem';
import OrderItem from './OrderItem';
import { useSelector, useDispatch } from 'react-redux';
import { TotalPrice } from '../Data/Reducer';

function OrderPage() {
  const dispatch = useDispatch()
  const user = JSON.parse(window.localStorage.getItem("users"));
  const dataPrice = useSelector((state)=>state.data.totalPrice.price)
  const [btncontrol,setbtncontrol] = useState({
    btn1:true,btn2:false,btn3:false
  })

  const [totalprice,settotalprice] = useState(0)
  const [orderdata,setorderdata] = useState({
    Address:{
      data:[]
    },
    PaymentStatus:false,
    Payment:{
      AmazonPay:false,
      COD:{
        type:"",status:false
      },
      Cardpayment:false,
      UPI:false
    },
    Product:[]
  })
  const [data,setdata] = useState({
    Address:[],
    Product:[]
  })


  const [address,setaddress] = useState([]);
  const [payment,setpayment] = useState({
    type:"",
    value:""
  })


  // usestate for getting data from users : - 

  const [loader,setloader] = useState({
    load1:{addload:false,display:false,change:false},load2:{payload:false,display:false,change:false},load3:{oderload:false,display:false,change:false}
  })

  const [billvalue,setbillvalue] = useState({
    value:"Choose a shipping address and payment method to calculate shipping, handling and tax.",billbtn:"Use this address"
  })

 

  const navigate = useNavigate()

  function Fetchdata(){
    const docref = doc(db,"users",user.userId);
    const shap = onSnapshot(docref,((datas)=>{
      setdata({
        Address:datas.data().address,
        Product:datas.data().cart
      })
    }))
    // if(docsnap.exists()){
    //   setdata({
    //     Address:docsnap.data().address,
    //     Product:docsnap.data().cart
    //   })
    // }

  }


  useEffect(()=>{
    Fetchdata()
    user.username ? dispatch(TotalPrice(data.Product)) : dispatch(TotalPrice())
    settotalprice(dataPrice)
  
  },[loader,dataPrice,data])

  

  function color(flag){
    if (flag){
      return {color:"red"}
    }
  }


  console.log(data.Product)
  return (
    <div style={{zIndex:"1",position:"absolute",top:"0rem",backgroundColor:"white",width:"100%",height:"140vh"}}>
      <div className='order-head'>
        <img src={Amazonlogo}/>
        <h1>Checkout</h1>
        <HttpsIcon style={{color:"gray"}}/>
      </div>
      <div className='order-body'>
        <div className='sub-order'>
        <div className='order-left'>
          <div className='upper-order'>
            <div className='btn-con1' onClick={()=>{
             
              if (loader.load1.display){
                setloader({...loader,load1:{...loader.load1,display:false,change:true}});
                setTimeout(()=>{
                  setloader({...loader,load1:{...loader,change:false}});
                  setbtncontrol({...btncontrol,btn1:!btncontrol.btn1});
                  if(btncontrol.btn2){
                    setbtncontrol({...btncontrol,btn2:!btncontrol.btn2,btn1:!btncontrol.btn1})
                  }
                  setbillvalue({ value:"Choose a shipping address and payment method to calculate shipping, handling and tax.",billbtn:"Use this address"})
                  

                },1500)
                
              }else {
                setbtncontrol({...btncontrol,btn1:!btncontrol.btn1})
              }
            }} style={color(btncontrol.btn1)}>
              <h4>1</h4><h4> Select a Delivery address</h4>
              <div className='select-address'>
                {loader.load1.change && <><CircularProgress style={{color:"orange"}} size={"20px"}/><span style={{fontSize:"13px",marginLeft:"5px",color:"gray"}}>Loading your address information</span></>}
                {loader.load1.addload && <><CircularProgress style={{color:"orange"}} size={"20px"}/><span style={{fontSize:"13px",marginLeft:"5px",color:"gray"}}>setting your shipping address</span></>}
                {loader.load1.display && <div className='show-add'>
                  <span>{orderdata.Address.data[0].fullname}</span>
                  <h5>{orderdata.Address.data[0].flat}, {orderdata.Address.data[0].area}</h5>
                  <h5>{orderdata.Address.data[0].town.toUpperCase()},{orderdata.Address.data[0].state.toUpperCase()} , pincode : {orderdata.Address.data[0].pincode}</h5>
                  <h5>landmark : {orderdata.Address.data[0].landmark}</h5>
                  <h5>Phone number : {orderdata.Address.data[0].mobile}</h5>
                  </div>}

              </div>
              

            </div>
            {btncontrol.btn1 && <div className='btn-address'>
              <div className='main-btn-address'>
              <div className='add-head-btn'>
                <h3>Your addresses</h3>
              </div>
              <div className='add-body-btn'>
                {data.Address.map((val)=>{
                  return (
                    <div className='address-detail-con'>
                      <input type='radio' name='add' onChange={(e)=>{
                        setaddress([val.personal]);
                        console.log(address)
                        
                      }}/>
                      <h4>{val.personal.fullname+" "} </h4>
                      <div>
                        <span>
                        {" " +val.personal.flat
                        +","+
                        val.personal.area},
                        {(val.personal.town).toUpperCase()},
                        {(val.personal.state).toUpperCase()},
                        {val.personal.pincode},
                        {val.personal.country}, Phone number : {val.personal.mobile}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className='new-add-btn' onClick={()=>{
                navigate("/address/edit")
              }} style={{cursor:"pointer"}}>
                <h4>+</h4>
                <span>Add a new address</span>
              </div>
              <div className='add-foot-btn'>
                <button onClick={()=>{
                  if(address.length === 0){
                    alert("please select the address");
                  }else {
                    setorderdata({...orderdata,Address:{data:address}});
                    setbtncontrol({...btncontrol,btn1:!btncontrol.btn1});
                    setloader({...loader,load1:{...loader.load1,addload:true}});
                  
                    
                    setTimeout(() => {
                      setloader({...loader,load1:{addload:false,display:true}});
                      setbtncontrol({...btncontrol,btn2:!btncontrol.btn2,btn1:!btncontrol.btn1})
                      setbillvalue({billbtn:"Use this payment method",value:"Choose a payment method to continue checking out. You will still have a chance to review and edit your order before it is final."})
                    }, 1500);
                    
                  }
                  
                }} >Use this Delivery</button>
              </div>
              </div>
            </div>}
            
            <hr/>
            <div className='btn-con2' style={color(btncontrol.btn2)} onClick={()=>{
              if (orderdata.Address.data.length !== 0){
                setbtncontrol({...btncontrol,btn2:!btncontrol.btn2});
                setloader({...loader,load3:{...loader.load3,display:false},load2:{...loader.load2,change:true,display:false}})
                setTimeout(() => {
                  setloader({...loader,load2:{...loader.load2,change:false,display:false},load3:{...loader.load3,display:false}})
                  setbillvalue({billbtn:"Use this payment method",value:"Choose a payment method to continue checking out. You will still have a chance to review and edit your order before it is final."})
                },1000);
              }else {
                alert("please select address !")
              }
            }}>
              <h4>2</h4><h4>Payment method</h4>
              <div className='select-payment'>
                {loader.load2.change && <><CircularProgress style={{color:"orange"}} size={"20px"}/><span style={{fontSize:"13px",marginLeft:"5px",color:"gray"}}>Loading your Payment information</span></>}
                {loader.load2.payload && <><CircularProgress style={{color:"orange"}} size={"20px"}/><span style={{fontSize:"13px",marginLeft:"5px",color:"gray"}}>setting your Payment</span></>}
                {loader.load2.display && <><div className='show-payment'>
                    <h4>{orderdata.Payment.COD.type}</h4>
                  
                  </div></>}
              </div>
            </div>

            {btncontrol.btn2 && <div className='btn-payment'>
              <div className='btn-pay1'>
                <h4>Your available balance</h4>  
              </div>
              <div className='btn-pay1-value'>
                <h1>+</h1><input type='text' placeholder='Enter Code'/> <button>Apply</button>
              </div>
              <div className='btn-pay2'>
                <h4>Another payment method</h4>
              </div>
              <div className='all-payment'>
                <div className='cr-dr'>
                  <div>
                    <label><input type='radio' name='payment'/>Credit or debit card</label>
                  </div>
                </div>
                <div className='net-bank'>
                  <label><input type='radio' name='payment'/> Net Banking</label>
                  <select>
                    <option>Choose an Option</option>
                    {banklist.map((val)=>{
                      return <option key={banklist.indexOf(val)}>{val}</option>
                    })}
                  </select>
                </div>
                <div className='upi-payment'>
                  <div>
                    <label><input type='radio' name='payment'/>Other UPI Apps</label>
                  </div>
                  <div className='upi-con'>
                    <span>Please enter your UPI ID</span>
                    <div>
                      <input type='text'placeholder='Enter UPI ID'/>
                      <button >Verify</button>
                    </div>
                  </div>
                </div>
                <div className='emi-payment'>
                    <div>
                      <label ><input type='radio' name='payment'/>EMI payment</label>
                    </div>
                </div>
                <div className='COD-payment'>
                  <div>
                    <label><input type='radio' name='payment' onChange={(e)=>{
                      setpayment({...payment,type:"Cash On Delivery - payment"});
                      
                    }}/>Cash on Delivery/Pay on Delivery</label>
                  </div>

                </div>

               
                
              </div>
              <div className='pay-foot' style={{width:"100%"}}>
                  <button onClick={()=>{
                    if(payment.type === "Cash On Delivery - payment"){
                      setorderdata({...orderdata,Payment:{...orderdata.Payment,COD:{...orderdata.Payment.COD,type:payment.type}}});
                      setbtncontrol({...btncontrol,btn2:!btncontrol.btn2});
                      setloader({...loader,load2:{...loader.load2,payload:true}});
                      setTimeout(() => {
                        setloader({...loader,load2:{...loader.load2,payload:false,display:true},load3:{...loader.load3,display:true}});
                        setbtncontrol({...btncontrol,btn3:!btncontrol.btn3,btn2:!btncontrol.btn2});
                        setbillvalue({billbtn:"Place your Order",value:"Your order will after clicking button."})

                      }, 1000);
                    }

                    

                    
                  }}>Use this payment method</button>
                </div>
              
              </div>}
            <hr />
            <div className='btn-con3' style={color(loader.load3.display)} onClick={()=>{
            }}>
              <h4>3</h4><h4>Items and delivery</h4>
            </div>
            {loader.load3.display && <div className='show-items'>
              {
                data.Product.map((ele)=>{
                  return <OrderItem key={ele.id} val={ele}/>

                })
              }
            </div>}
            <hr />
          </div>
          <div className='lower-order'>
            <p>Need help? Check our help pages or contact us</p>
            <p>When your order is placed, we'll send you an e-mail message acknowledging receipt of your order. If you choose to pay using an electronic payment method (credit card, debit card or net banking), you will be directed to your bank's website to complete your payment. Your contract to purchase an item will not be complete until we receive your electronic payment and dispatch your item. If you choose to pay using Pay on Delivery (POD), you can pay using cash/card/net banking when you receive your item.</p>
            <p>See Amazon.in's Return Policy.</p>
            <p>Need to add more items to your order? Continue shopping on the <Link to={"/"}>Amazon.in homepage.</Link></p>
          </div>
        </div>
        <div  className='order-right1'>
        <div className='order-right'>
          <div className='show-bill-con'>
            <div className='bill-head'>
              <button >{billvalue.billbtn}</button>
              <span>{billvalue.value}</span>
            </div>
            <div className='line'></div>
            <div className='bill-summary'>
              <h3>Order Summary</h3>
              <div>
                <h4>Items: </h4><h4>${totalprice.toFixed(2)}</h4>
              </div>
              <div>
                <h4>Delivery:</h4><h4>$0:00</h4>
              </div>
            </div>
            <div className='line'></div>
            <div className='bill-total'>
              <h3>Order Total:</h3><h3>${totalprice.toFixed(2)}</h3>

            </div>
          </div>
          <div className='bill-foots'>
              <p>How are delivery costs calculated?</p>
            </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPage