import React, { useState } from 'react';
import "../Styles/Sidemenu.css";
import ClearIcon from '@mui/icons-material/Clear';
import Cancellogo from "../Assets/Logo/cancel-2.png";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import { BodyScroll } from '../Config/Cotegories';
import { useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';


function SideMenu({flag,remove}) {
    const [down,setdown] = useState(false);
    const navigate = useNavigate()
    const users = JSON.parse(window.localStorage.getItem("users"));
   
    BodyScroll(flag)
  return (
    <div className='sidemenu--con' >
      <div className='menu--con'>
         {flag ?  <div className='menu' style={{animation:".1s sidemenu linear 1"}}>
            <div className='side-upper--con' style={{cursor:"pointer"}} onClick={()=>{
                if (users.username){
                    navigate("/setting")
                    remove()
                }else {
                    navigate("/Signin")
                }
                
                
            }}>
                <div className='acc-details--side'>
                    <div className='profile--circle' >
                        <PersonIcon />
                    </div>
                    <h3>Hello, {users.username === "" ? "sign in" : users.username}</h3>
                </div>
                <img src={Cancellogo} style={{position:"absolute",left:"105%",width:"25px",top:"4%"}} onClick={()=>{
                remove()
            }}></img>
            </div>
            <div className='side-lower--con' style={{overflowY:"scroll",height:"92vh",scrollBehavior:"smooth"}}>
                <div className='side-con-1'>
                    <h3>Trending</h3>
                    <p>Best Sellers</p>
                    <p>New Releases</p>
                    <p>Movers and Shakers</p>

                </div>
                <hr/>
                <div className='side-con-2'>
                    <h3>Digital Content And Devices</h3>
                    <div><p>Echo & Alexa</p><KeyboardArrowRightIcon /></div>
                    <div><p>Fire TV</p><KeyboardArrowRightIcon /></div>
                    <div><p>Kindle E-Readers & eBooks</p><KeyboardArrowRightIcon /></div>
                    <div><p>Audible Audiobooks</p><KeyboardArrowRightIcon /></div>
                    <div><p>Amazon Prime Video</p><KeyboardArrowRightIcon /></div>
                    <div><p>Amazon Prime Music</p><KeyboardArrowRightIcon /></div>
                </div>
                <hr/>
                <div className='side-con-3' style={!down ? {height:"17.5rem"} : {height:"70%"}}>
                    <h3>Shop By category</h3>
                    <div><p>Mobile, Computer</p><KeyboardArrowRightIcon /></div>
                    <div><p>TV,Appliances,Electronics</p><KeyboardArrowRightIcon /></div>
                    <div><p>Men's Fashion</p><KeyboardArrowRightIcon /></div>
                    <div><p>Women's Fashion</p><KeyboardArrowRightIcon /></div>
                    <div><p>Home,Kitchen,Pets</p><KeyboardArrowRightIcon /></div>
                    <div><p>Beauty,Health,Grocery</p><KeyboardArrowRightIcon /></div>
                    <div><p>Toys,Baby Products,Kids'Fashion</p><KeyboardArrowRightIcon /></div>
                    <div><p>Car,Motorbike,Industrial</p><KeyboardArrowRightIcon /></div>
                    <div><p>Books</p><KeyboardArrowRightIcon /></div>
                    <div><p>Movies,Music & Video Games</p><KeyboardArrowRightIcon /></div>
                </div>
                {!down ? <div className='btn--show' onClick={()=>setdown(!down)}>
                    <p>See All</p>
                    <KeyboardArrowDownIcon />
                </div> : <div className='btn--show' onClick={()=>setdown(!down)}>
                    <p>See Less</p>
                    <KeyboardArrowUpIcon />
                </div>}
                <hr/>
                <div className='side-con-4'>
                    <h3>ProgramS & Features</h3>
                    <div><p>Gift Cards & Mobile Recharges</p><KeyboardArrowRightIcon /></div>
                    <div><p>Amazon LaunchPad</p></div>
                    <div><p>Flight Tickets</p></div>
                    <div><p>Clearance Store</p></div>
                </div>
                <hr/>
                <div className='side-con-4'>
                    <h3>Help & Setting</h3>
                    <div><p>Your Account</p></div>
                    <div><p>Customer Service</p></div>
                    {users.username === "" ? <Link to = "/Signin"><div><p>Sign in</p></div> </Link>: <Link style={{textDecoration:"none"}} to={"/Signin"} onClick={()=>{
                        const data = JSON.stringify({
                            username:"",
                            email:"",
                            userId:"",
                            cart:[],
                            address:[]
                        })
                        window.localStorage.setItem("users",data);
                        setTimeout(()=>{
                            window.location.reload()
                        },400)
                    }}><div><p>Sign out</p></div></Link>}
                </div>
                
            </div>
         </div> : <div className='menuoff' style={{animation:".2s sidemenuoff linear 1"}}></div>}
         {flag &&  <div className='backscreen' style={{animation:".3s backscreen linear 1"}} onClick={()=>{
                remove()
         }}></div>}
      </div>
    </div>
  )
}

export default SideMenu