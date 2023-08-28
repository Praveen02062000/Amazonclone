import React, { useEffect,useState } from 'react'
import logo from "../Assets/Logo/amazon-sign.png"
import { Link, useNavigate } from 'react-router-dom';
import "../Styles/Signin.css";
import CopyrightIcon from '@mui/icons-material/Copyright';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Config/Firebase';
import { doc, getDoc} from "firebase/firestore";
import { db } from '../Config/Firebase';
import { useDispatch } from 'react-redux';
import { SignUpUser } from '../Data/Reducer';




function Sigin() {
  const [emptytext,setemptytext] = useState(false);
  const [text,settext] = useState("");
  const [pass,setpass] = useState("");
  const [passwordpage,setpasswordpage] = useState(false);
  const navigate = useNavigate()
 
  function naviHome(){
    navigate("/");
    setTimeout(() => {
      window.location.reload()
    }, 100);
  }


  function inputBorder(flag){
    if (flag){
      return {border:"1px solid red "}
    }else {
      return {border:"1px solid rgb(197, 197, 197)"}
    }
    

  }
  
  
    
  return (
    <div style={{zIndex:"1",position:"absolute",top:"0rem",backgroundColor:"white",width:"100%",height:"100vh"}}>
      <div className='signin--main--con'>
        
        <div className='signin--main--upper--con'>
        <div className='signin-logo--con' onClick={()=>{
          navigate("/")
        }}>
          <img src={logo}></img>
        </div>
        <div className='signin--form--con'>
          
          {passwordpage ? <div className='signin--con'>
            <h1>Sign in</h1>
            <form>
              <h6 style={{position:"relative",bottom:"2rem",fontWeight:"500"}}>{text} <Link onClick={()=>{
                window.location.reload()
              }}>Change</Link></h6>
               <label style={{position:"relative",bottom:"2.5rem"}}>
                password
                <input autoFocus type='email' className='email'style={inputBorder(emptytext)} onChange={(e)=>{
                  setpass(e.target.value)
                  
                }}/>
                
              </label>
              {emptytext && <p style={{position:"relative",bottom:"3.5rem"}} className='emptytext'><i>!</i> Enter your Password</p>}
              <a href='/' ><button style={{position:"relative",bottom:"3rem"}}  className={emptytext ? "altsignin" : "sign"} onClick={(e)=>{
                e.preventDefault()
                if (!pass){
                  setemptytext(true)
                  
                }else {
                  setemptytext(false)
                  signInWithEmailAndPassword(auth,text,pass)
                  .then(async (cred)=>{
                    const user = cred.user;
                    try {
                      const docref = doc(db,"users",cred.user.uid);
                      const docsnap = await getDoc(docref);
                      if(docsnap.exists()){
                          const value = docsnap.data()
                          const data = JSON.stringify({
                            username:value.fullname,
                            email:value.email,
                            userId:value.userId,
                            cart:value.cart,
                            address:value.address
                         })
                        window.localStorage.setItem("users",data);  
                        naviHome()
                        
                      }else {
                        console.log("no data")
                      }
                    } catch(err){
                      console.log(err)
                    }
                    
                  })
                }
              }}>Continue</button></a>

            </form>
           
          </div> : <div className='signin--con'>
            <h1>Sign in</h1>
            
            <form>
              <label>
                Email or Mobile phone number
                <input autoFocus type='email' className='email'style={inputBorder(emptytext)} onChange={(e)=>{
                  settext(e.target.value)
                  
                  
                }}/>
                
              </label>
              {emptytext && <p className='emptytext'><i>!</i> Enter your email or mobile phone number</p>}
              <button onClick={(e)=>{
                e.preventDefault()
                if (!text){
                  setemptytext(true)
                  
                }else {
                  setemptytext(false)
                  setpasswordpage(true)
                }
              }} className={emptytext ? "altsignin" : "sign"}>Continue</button>
            </form>
            <span className={emptytext ? "altspan" : "span"}>By continuing, you agree to Amazon's <Link style={{color:"blue",textDecoration:"none"}}>Condition of use</Link> and <Link style={{color:"blue",textDecoration:"none"}}>Privacy Notice</Link></span>
            <br/>
            <span className={emptytext ? "altspan" : "span"}><Link style={{color:"blue",textDecoration:"none"}}>Need help?</Link></span>
          </div>}
          <div className='signin--con--foot'>
            <div className='line--con'>
            <hr style={{margin:"2rem 0px"}}/>
            <span>New to Amazon?</span>
            </div>
            <Link to={"/Signup"}><button>Create Your Amazon account</button></Link>
          </div>

        </div>
        </div>
        <div className='main--footer--con'>
        
        <div className='signin--footer--con'>
        <hr></hr>
          <div className='signin--footer--condition'>
            <ul>
              <li><Link style={{color:"blue",textDecoration:"none"}}>Condition of Use</Link></li>
              <li><Link style={{color:"blue",textDecoration:"none"}}>Privacy Notice</Link></li>
              <li><Link style={{color:"blue",textDecoration:"none"}}>Help</Link></li>
            </ul>
            <div style={{display:"flex",fontSize:"12px",margin:"1rem 0rem",alignItems:"center"}}><CopyrightIcon style={{fontSize:"13px"}}/>1996-2023. Amazon.com,Inc, or its affilitaes</div>
          </div>

        </div>

        </div>
      </div>
    </div>
  )
}

export default Sigin