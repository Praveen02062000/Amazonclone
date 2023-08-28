import React, { useState,useEffect } from 'react';
import logo from "../Assets/Logo/amazon-logo.png";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Categories } from '../Config/Cotegories';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import FlagLang from "../Assets/Logo/flag.png";
import CartLogo from "../Assets/Logo/cart.png";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link ,useNavigate} from 'react-router-dom';
import { db } from '../Config/Firebase';
import { doc,onSnapshot } from 'firebase/firestore';

function Header({background,flag,remove}) {
   const [item,setitem] = useState(Categories) ;
   const [value,setvalue] = useState("");
   const [lang,setlang] = useState("EN");
   const [signin,setsignin] = useState(false)
   const [langeffect,setLangeffect] = useState({eng:true,tam:false,hin:false})
   const [DropLang,setDroplang] = useState(false)
   const [searchdata,setsearchdata] = useState([]);
   const [count,setcount] = useState([]);
   const {data, load, error} = useSelector((state)=>state.data.main);
   const users =JSON.parse(window.localStorage.getItem("users"));
   const navigate = useNavigate()
   const countdata = useSelector((state)=>state.data.CartToData.data)
   if (users.username){
    const unsub = onSnapshot(doc(db,"users",users.userId),(doc)=>{
        setcount(doc.data().cart.length)
   })

   }
   

  
   

   function SearchData(data,value){
    let final = []
    for (let i=0;i<data.length;i++){
        let word = "";
        for (let j=0;j<value.length;j++){
            if( j === 0){
                let letter = data[i].title[j]
                word += letter;
            }else{
                word += data[i].title[j];
            }
           
        }
        
        if (word.length !== 0){
            if (word === value) {
                if (final.length === 0){
                    final.push(data[i]);
                }else {
                    let finded = final.find((element)=>{
                        return element !== data[i].title
                    });
                    if(finded){
                        final.push(data[i])
                    }
                }
            }
        }

        setsearchdata(final)
    }
    window.addEventListener("scroll",()=>{
        remove()
        document.getElementById("header-input").blur = true

    })
    
    

   }
   useEffect(()=>{
    SearchData(data,value)

   },[value])
    
  return (
    <div className='header'>
        <div className='logo--con'>
            <div className='img--con'>
                <Link to={"/"}><img src={logo}></img></Link>
                <span>.in</span>
            </div>
        </div>
        <div className='del--con'>
                <LocationOnOutlinedIcon color='palette.secondary.light'/>
                <div>
                    <p>Deliver to praveen</p>
                    <h3>Pallipattu 631207</h3>
                </div>
        </div>
        <div className={flag ? "sreach--border" : "sreach--con"}>
            <select>
                {item.map((val)=>{
                    return (
                        <option style={{backgroundColor:"white",lineHeight:"10px",fontSize:"15px",marginBottom:"20px"}} key={item.indexOf(val)}>{val}</option>
                    )
                })} 
            </select>
            
                <input type='text'
                placeholder='Sreach Amazon.in' onFocus={()=>{
                    background()
                }}
                id='header-input'
                value={value}
                onChange={(e)=>{
                    setvalue(e.target.value);
                }}/>
                <div className='SearchIcon--con'>
                    <SearchIcon  />    
                </div> 

                             
            
            {flag  && 
                <div className='con--search'>
                    {
                        searchdata.map((val)=>{
                            return (
                                <div key={val.id}
                                onClick={()=>{
                                    setvalue(val.title);
                                    remove()
                                }}>
                                    <img src={val.image}/>
                                    <p>{val.title}</p>
                                </div>
                            )
                        })
                    }
                
                </div>}
        </div>
        <div className='lang--con'onMouseLeave={()=>{
                setTimeout(() => {
                    setDroplang(false);
                    remove()
                }, 0);
            }} onMouseOver={()=>{
                setDroplang(true)
                background()
            }}>
            <div className='select--lang'>
                <img src={FlagLang} style={{width:"20px"}}></img>
                <span>{lang}</span>
                <ArrowDropDownIcon style={{color:"gray",position:"relative",top:"10px"}}/>
            </div>
            {DropLang  && <div className='dropdownforlang'>
                    <div className='drop--lang--con'>
                        <div >
                            <div className='cir-1'><span className={langeffect.eng && "spaneffect"}></span></div> <p>English - EN</p>
                        </div>
                        <hr></hr>
                        <div onMouseOver={()=>{
                            setLangeffect({...langeffect,tam:true})
                        }} onMouseLeave={()=>{
                            setLangeffect({...langeffect,tam:false})
                        }}>
                            <div className='cir-2'><span className={langeffect.tam && "spaneffect"}></span></div> <p>Tamil - TA</p>
                        </div>
                        <div onMouseOver={()=>{
                            setLangeffect({...langeffect,hin:true})
                        }} onMouseLeave={()=>{
                            setLangeffect({...langeffect,hin:false})
                        }}>
                            <div className='cir-3'><span className={langeffect.hin && "spaneffect"}></span ></div> <p>Hindi - HI</p>
                        </div>
                      
                    </div>

                </div>}
        </div>
        <div className='acc-sign--con' onMouseOver={()=>{
            setsignin(true)
            background()
        }} onMouseLeave={()=>{
            setTimeout(() => {
                setsignin(false);
                remove()
            }, 0);
        }}>
            <div className='acc-det--con'
            onMouseOver={()=>{
                setsignin(true)
                background()
            }} >
                <h6>Hello {users.username ==="" ? "Signin" : users.username}</h6>
                <div className='acc--sign--arrow'>
                    <span>Account & List </span>
                    <ArrowDropDownIcon  style={{}}/>
                
                </div>
            </div>
            <div className='dropdown--sign' style={{zIndex:"1"}}>
                <div className='upper--con'>
                        {signin ? <div className='upper-1'>
                            {users.username === "" && <div className='sub--upper'>
                                <Link to={"/Signin"}><button>sign in</button></Link>
                                <p>New Customer? <Link style={{color:"blue"}} to={"/Signup"}> Start Here</Link> </p>
                            </div>}
                            
                            <div className='lower--con'>
                                <div className='left--con'>
                                    <h3>Your Lists</h3>
                                        <p>Create a Wish pst</p>
                                        <p>Wish from Any Website</p>
                                        <p>Baby Wishpst</p>
                                        <p>Discover Your Style</p>
                                        <p>Explore Showroom</p>
                                </div>
                                <div className='right--con'>
                                <h3>Your Account</h3>
                                        <p onClick={()=>{
                                            navigate("/setting")
                                        }}>Your Account</p>
                                        <p>Your Orders</p>
                                        <p>Your Wish pst</p>
                                        <p>Your Recommendation</p>
                                        <p>Your Prime MemberShip</p>
                                        <p>Your Prime Video</p>
                                        <p>Your Subscribe & Save Items</p>
                                        <p>Your Seller Account</p>
                                        <p>Manage Your Content and Devices</p>
                                        <p>Your Free Amazon Business <br></br>Account</p>
                                </div>

                        </div>
                        </div> : <></>}
                </div>
               
            </div>
        </div>
        <div className='return--con'>
            <div className='return'>
                <h6>Returns</h6>
                <p> <span>&</span> Order</p>
            </div>
        </div>
        
        <div className='cart--con'>
            <div>
            <span>{users.username === "" ? countdata.length : count}</span>
            <Link to={"amazon/cart"} ><img src={CartLogo}></img></Link>
            
            </div>
            <h5>Cart</h5>
            
        </div>
        
    </div>
  )
}

// {""}
export default Header