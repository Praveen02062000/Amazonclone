import React from 'react';
import Logosrc from "../Assets/Logo/amazon-sign.png";
import { Link } from 'react-router-dom';
import CopyrightIcon from '@mui/icons-material/Copyright';
import "../Styles/Signin.css";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import {auth,db} from "../Config/Firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {collection, addDoc, doc, setDoc} from "firebase/firestore";




function Signup() {
    const { data } = useSelector((state) => state.data.NumberCodeData);
    const [emptyfield, setfield] = useState(false);
    const [passwordLen, setpasswordLen] = useState(false);
    const [validnum, setvalidnum] = useState(false);
    const [validemail, setvalidemail] = useState(false);
    const [emptypassword, setemptypassword] = useState(false);
    const [emptynum, setemptynum] = useState(false);
    const [emptyemail, setemptyemail] = useState(false);
    const [emptyname, setemptyname] = useState(false);

    




    const [detail, setdetail] = useState({
        fullname: "",
        mobile: "",
        email: "",
        password: ""
    })

    function InputHandler(e) {
        setdetail(
            {
                ...detail,
                [e.target.attributes[0].value]: e.target.value
            }
        )
    }

    function validationFields() {
        var { fullname, mobile, email, password } = detail;
        var alphaCharacter = "abcdefghijklmnopqrstuvwxyz";
        var UpperalphaCharacter = alphaCharacter.toUpperCase
        var mobilevalid = false;
        if (!fullname && !mobile && !email && !password) {
            setfield(true);
        }
        else if (!fullname) {
            setemptyname(true)
        } else if (!mobile) {
            setemptynum(true);
        } else if (!email) {
            setemptyemail(true)
        } else if (!password) {
            setemptypassword(true)
        }
        if (mobile) {
            setemptynum(false)
        }
        if (password) {
            setemptypassword(false)
        }
        if (fullname) {
            setemptyname(false);
        }
        if (email) {
            setemptyemail(false)
        }

        if (!emptypassword) {
            if (password.length < 6) {
                setpasswordLen(true)
            } else {
                setpasswordLen(false)
            }
        }
        if (!emptynum) {
            for (let i = 0; i < mobile.length; i++) {
                for (let j = 0; j < alphaCharacter.length; j++) {
                    if (mobile[i] === alphaCharacter[j]) {
                        mobilevalid = true;
                        break;
                    }
                }

                for (let k = 0; k < UpperalphaCharacter.length; k++) {
                    if (mobile[i] === UpperalphaCharacter[k]) {
                        mobilevalid = true;
                        break;
                    }
                }

            }
            if (mobilevalid) {
                setvalidnum(true);
            } else if (!mobilevalid) {
                setvalidnum(false)
            }

        }
        if (email && mobile && password && fullname) {
            setfield(false);
            createUserWithEmailAndPassword(auth, email, password)
            .then(async (cred)=>{
                const user = cred.user;
                // db.collection("users").doc(user.uid)
                // .set({
                //     username:fullname,
                //     email:email,
                //     mobile:mobile,
                //     password:password,
                //     cart:[],
                //     order:[]
                // })
                // .then (()=>{
                //     console.log("addd")
                // })
                const ref = doc(db,"users",cred.user.uid);
                const docref = await setDoc(ref,{
                    fullname,email,mobile,password,userId:user.uid,cart:[],address:[]
                })
                .then ((re)=>{
                    console.log("success")
                }).catch((err)=>{
                    console.log("err",err);
                })

                // try {
                //     const docref = await addDoc(collection(db,'users'),{
                //         fullname,email,mobile,password,userId:user.uid,cart:[]
                //     })
                //     console.log(docref.id)
                    
                // }catch(e){
                //     console.log("err",e)
                // }
                
                
                
            }).catch((err)=>{
                console.log("err",err)
            })

        }


    }


    return (
        <div style={{ zIndex: "1", position: "absolute", top: "0rem", backgroundColor: "white", width: "100%", height: "100vh" }}>
            <div className='signup--upper--con'>
                <div className='sigup--upper-main--con'>
                    <div className='signup--img--con'>
                        <img src={Logosrc}></img>
                    </div>
                    <div className='signup--main--con'>
                        <h3>Create Account</h3>
                        <form>
                            <div className='signup-name'>
                                <label>
                                    Your name
                                </label>
                                <div className='signup-name-con'>
                                    <input name='fullname' placeholder='First and last name' type='text' onChange={(e) => {
                                        InputHandler(e)

                                    }}></input>
                                    {emptyfield && <span><i>! </i> Enter your name</span>}
                                    {emptyname && <span><i>! </i> Enter your name</span>}
                                </div>
                            </div>
                            <div className='signup-number'>
                                <label>Mobile number</label>
                                <div className='signup-number-con'>
                                    <div className='signup-number-select'>
                                        <select>
                                            {data ? data.map((val) => {
                                                return <option key={data.indexOf(val)}>{val.name + val.dial_code}</option>
                                            }) : <option>Fetching</option>}
                                        </select>
                                    </div>
                                    <div className='signup-number-input'>
                                        <input name="mobile" placeholder='Mobile number' type="text" onChange={(e) => {
                                            InputHandler(e)
                                        }} />
                                        {emptyfield && <span><i>! </i>  Enter the mobile number</span>}
                                        {emptynum && <span><i>! </i>  Enter the mobile number</span>}
                                        {validnum && <span><i>! </i> The mobile number you entered does not seem to be valid</span>}
                                    </div>

                                </div>
                            </div>
                            <div className='signup-email-con'>
                                <label>Email (optional)</label>
                                <input name='email' type='email' onChange={(e) => {
                                    InputHandler(e)
                                }} />
                                {emptyfield && <span><i>!</i> Enter a valid email address</span>}
                                {emptyemail && <span><i>!</i> Enter a valid email address</span>}
                            </div>
                            <div className='signup-password-con'>
                                <label>Password</label>
                                <input name='password' type='password' onChange={(e) => {
                                    InputHandler(e)
                                }} />
                                {emptyfield && <span><i>!</i> Enter your password</span>}
                                {emptypassword && <span><i>!</i> Enter your password</span>}
                                {passwordLen && <span className='password-con'><i>!</i> Passwords must be at least 6 characters.</span>}
                            </div>
                            <p>To verify your number, we will send you text message with a temporary code. Message and data rates may apply</p>
                            <button onClick={(e) => {
                                e.preventDefault()
                                validationFields()
                                console.log(detail)
                            }}>Continue</button>
                        </form>
                        <div className='signup-form-foot-con'>
                            <hr></hr>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <span>Already have a account? <Link to={"/Signin"}>Sign in</Link></span>
                                <span>Buying for work? <Link>Create a free business account</Link></span>
                                <br></br>
                                <span>By create an account or logging in, you agree to <br />Amazon's <Link>Conditions of Use </Link> and <Link>Privacy Policy</Link></span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className='signup--footer--con'>
                <hr></hr>
                <div className='signin--footer--condition'>
                    <ul>
                        <li><Link style={{ color: "blue", textDecoration: "none" }}>Condition of Use</Link></li>
                        <li><Link style={{ color: "blue", textDecoration: "none" }}>Privacy Notice</Link></li>
                        <li><Link style={{ color: "blue", textDecoration: "none" }}>Help</Link></li>
                    </ul>
                    <div style={{ display: "flex", fontSize: "12px", margin: "1rem 0rem", alignItems: "center" }}><CopyrightIcon style={{ fontSize: "13px" }} />1996-2023. Amazon.com,Inc, or its affilitaes</div>
                </div>

            </div>
        </div>
    )
}

export default Signup