import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getDoc,setDoc,doc,onSnapshot } from 'firebase/firestore';
import { auth, db } from '../Config/Firebase';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import amazonlogo from "../Assets/Logo/amazon-sign.png";
import { Styles } from '../Config/Cotegories';
function Address({backscreenflag}) {
    const navigate = useNavigate()
    const users = JSON.parse(window.localStorage.getItem("users"));
    const [Address,setAddress] = useState([]);
    const [defaultupdate,setdefaultupdate] = useState(false);


    function getdata(){
        const docref = doc(db,"users",users.userId);
        const snap = onSnapshot(docref,(doc)=>{
            const address = doc.data().address;
            setAddress(address);
        })

    }

    async function RemoveAddress(id){
        const docref = doc(db,"users",users.userId);
        const docsnap = await getDoc(docref);

        if(docsnap.exists()){
            const data = docsnap.data();
            const removeadd = data.address.filter((val)=>{
                return val.id !== id
            })
            setDoc(docref,{...data,address:removeadd});
        }
    }

    async function SetdefaultAddress(id){
        const docref = doc(db,"users",users.userId);
        const docsnap = await getDoc(docref);

        if (docsnap.exists()){
            const data = docsnap.data();
            const newupdated = data.address.map((val)=>{
                if(val.id === id){
                    return {...val,defaultaddress:true};
                }else {
                    return {...val,defaultaddress:false};
                }
            })
            const singleadd = newupdated.filter((val)=>{
                return val.id === id;
            })
            const alldata = newupdated.filter((val)=>{
                return val.id !== id;
            })
            alldata.unshift(singleadd[0]);
            setDoc(docref,{...data,address:alldata});
        }

    }



    function padding(e){
        if (!e){
            return {position:"relative",top:"40px"}
        }
    }
    function btns(e){
        if(!e){
            return {position:"relative",top:"60px"}
        }
    }

    useEffect(()=>{
        getdata()
        
    },[])


  return (
    <div className='address-con' style={Styles(backscreenflag)}>
        <div className='address-main-con'>
            <div className='address-navi-con'>
                <span onClick={()=>{
                    navigate("/setting")
                }}>Your Account</span> <span>{" > "}</span> <span style={{color:"red"}}>Your Address</span>
            </div>
            {defaultupdate && <div className='updateddefault'>
                <div>
                    <CheckCircleIcon style={{color:"green",position:"relative",left:"1rem"}} /> <span>Default address changed</span>
                </div>
                </div>}
            <div className='title-con'>
                <h1>Your Addresses</h1>
            </div>
            <div className='address-edit-con'>
                <div className='main--edit--button' onClick={()=>{
                    navigate("/address/edit")
                }}>
                    <div><h1>+</h1><h2>Add address</h2></div>
                </div>
                {
                    Address.length === 0 ? <CircularProgress /> : Address.map((val)=>{
                        return <div key={val.id} className='add-box' >
                            {val.defaultaddress && <div className='add-head'>
                              <span>Default</span><img src={amazonlogo}/>    
                            </div>}
                            <div className='add-body' style={padding(val.defaultaddress)}>
                                <h4>{val.personal.fullname}</h4>
                                <h4 className='sub'>{val.personal.flat}</h4>
                                <h4 className='sub'>{val.personal.area}</h4>
                                <h4 className='sub'>{val.personal.town}, {val.personal.state} {val.personal.pincode}</h4>
                                <h4 className='sub'>{val.personal.country}</h4>
                                <h4 className='sub'>Phone number : {val.personal.mobile}</h4>
                                <span>Add delivery instructions</span>
                            </div>
                            <div className='add-btns' style={btns(val.defaultaddress)}>
                                <span>Edit</span> | <span onClick={()=>{
                                    RemoveAddress(val.id);
                                }}>Remove</span>  |{!val.defaultaddress && <span onClick={()=>{
                                    setTimeout(() => {
                                        SetdefaultAddress(val.id)
                                        setdefaultupdate(true)
                                    }, 100);
                                    setTimeout(()=>{
                                        setdefaultupdate(false)
                                    },3000)
                                }}>Set as Default</span>}
                            </div>
                            
                        </div>
                    })
                }
                
            </div>
        </div>
    </div>
  )
}

export default Address