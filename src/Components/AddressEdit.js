import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import {auth, db} from "../Config/Firebase";
import { getDoc,setDoc,doc } from 'firebase/firestore';
import { Styles } from '../Config/Cotegories';

function AddressEdit({backscreenflag}) {
    const navigate = useNavigate();
    const users = JSON.parse(window.localStorage.getItem("users"));
    const {code} = useSelector((state)=>state.data.CountryState);
    const [AddDrop,setAddDrop] = useState(true);
    const [loader,setloader] = useState(false);
    const [acc,setacc] = useState({
        acc1:true,acc2:false,acc3:false
    })
    const [state,setstate] = useState( [
        "Badakhshan",
        "Badghis",
        "Baghlan",
        "Balkh",
        "Bamian",
        "Daykondi",
        "Farah",
        "Faryab",
        "Ghazni",
        "Ghowr",
        "Helmand",
        "Herat",
        "Jowzjan",
        "Kabul",
        "Kandahar",
        "Kapisa",
        "Khost",
        "Konar",
        "Kondoz",
        "Laghman",
        "Lowgar",
        "Nangarhar",
        "Nimruz",
        "Nurestan",
        "Oruzgan",
        "Paktia",
        "Paktika",
        "Panjshir",
        "Parvan",
        "Samangan",
        "Sar-e Pol",
        "Takhar",
        "Vardak",
        "Zabol"
      ])
    const [addtype,setaddtype] = useState({
       btn1:{
        value:"House",
        status:false,
        val:"Independent house, villa, or builder floor (7 AM - 9 PM delivery)"
       } 
       ,btn2:{
        value:"Apartment",
        status:false,
        val:"Gated society, flats, or condominiums (7 AM - 9 PM delivery)"
       },btn3:{
        value:"Business",
        status:false,
        val:"Office, retail store, hotel, hospital, malls, etc (10 AM - 6 PM delivery)"
       },btn4:{
        value:"Other",
        status:false,
        val:"Other accommodations like hostel, PG, farmhouse, etc. (10 AM - 6 PM delivery)"
       }
    })

    const [emptyerr,setemptyerr] = useState({
        country:"",
        fullname:{
            value:"",
            err:false
        },
        mobile:{
            value:"",
            err:false
        }
        ,pincode:{
            value:"",
            err:false
        },flat:{
            value:"",
            err:false
        },area:""
        ,landmark:"",
        town:{
            value:"",
            err:false
        },state:{
            value:"",
            err:false
        },defaultaddress:false,
        Additional:{
            addresstype:"",
            DND:"",
            weekend:[],
            additionalinfo:""
        }
    })
    const getdata = async (obj)=>{
        try {
            const docref = doc(db,"users",users.userId);
            const docsnap = await getDoc(docref)
            if (docsnap.exists()){
                const data = docsnap.data()
                setDoc(docref,{...data,address:[...data.address,obj]})
            }
        }catch (err){
            console.log(err)
        }
    }

    function ValidationForm(){
        const fullname = emptyerr.fullname.value;
        const mobile = emptyerr.mobile.value;
        const pincode = emptyerr.pincode.value;
        const flat = emptyerr.flat.value;
        const town = emptyerr.town.value;
        const state = emptyerr.state.value;


        if (!fullname && !mobile && !pincode && !flat && !town && !state){
            setemptyerr({...emptyerr,fullname:{...emptyerr.fullname,err:true},mobile:{...emptyerr.mobile,err:true},pincode:{...emptyerr.pincode,err:true}
            ,flat:{...emptyerr.flat,err:true},town:{...emptyerr.town,err:true},state:{...emptyerr.state,err:true}});
        }
        else if (!fullname){
            setemptyerr({...emptyerr,fullname:{...emptyerr.fullname,err:true}});
        }
        else if (!mobile) {
            setemptyerr({...emptyerr,mobile:{...emptyerr.mobile,err:true}})
        }
        else if(!pincode){
            setemptyerr({...emptyerr,pincode:{...emptyerr.pincode,err:true}})
        }
        else if(!flat){
            setemptyerr({...emptyerr,flat:{...emptyerr.flat,err:true}})
        }
        else if(!town){
            setemptyerr({...emptyerr,town:{...emptyerr.town,err:true}})
        }
        else if(!state){
            setemptyerr({...emptyerr,state:{...emptyerr.state,err:true}})
        }
        if (fullname){
            setemptyerr({...emptyerr,fullname:{...emptyerr.fullname,err:false}});
        }
        if (mobile) {
            setemptyerr({...emptyerr,mobile:{...emptyerr.mobile,err:false}})
        }
        if(pincode){
            setemptyerr({...emptyerr,pincode:{...emptyerr.pincode,err:false}})
        }
        if(flat){
            setemptyerr({...emptyerr,flat:{...emptyerr.flat,err:false}})
        }
        if(town){
            setemptyerr({...emptyerr,town:{...emptyerr.town,err:false}})
        }
        if(state){
            setemptyerr({...emptyerr,state:{...emptyerr.state,err:false}})
        }
        if (fullname && mobile && pincode && flat && town && state){
            setemptyerr({...emptyerr,fullname:{...emptyerr.fullname,err:false},mobile:{...emptyerr.mobile,err:false},pincode:{...emptyerr.pincode,err:false}
            ,flat:{...emptyerr.flat,err:false},town:{...emptyerr.town,err:false},state:{...emptyerr.state,err:false}});
            const objectfordb = {
                id:new Date().getTime(),
                personal:{country:emptyerr.country,fullname:fullname,mobile:mobile,pincode:pincode,flat:flat,area:emptyerr.area,landmark:emptyerr.landmark,town:town,state:state},
                additional:emptyerr.Additional,
                defaultaddress:emptyerr.defaultaddress
            }
            
            getdata(objectfordb)
        }
        

        // else if (fullname && !mobile && !pincode && !flat && !town && !state){
        //     setemptyerr({...emptyerr,fullname:{...emptyerr.fullname,err:false},mobile:{...emptyerr.mobile,err:true},pincode:{...emptyerr.pincode,err:true}
        //         ,flat:{...emptyerr.flat,err:true},town:{...emptyerr.town,err:true},state:{...emptyerr.state,err:true}});

        // }else if (!fullname && !mobile && !pincode && !flat && !town && !state){
        //     setemptyerr({...emptyerr,fullname:{...emptyerr.fullname,err:false},mobile:{...emptyerr.mobile,err:true},pincode:{...emptyerr.pincode,err:true}
        //         ,flat:{...emptyerr.flat,err:true},town:{...emptyerr.town,err:true},state:{...emptyerr.state,err:true}});

        // }
        

    }

    function stylereturn (flag){
        if(flag){
            return {backgroundColor:"rgb(210, 245, 255)",border:"2px solid rgb(3,135,172)",color:"black",fontWeight:"600"}

        }
    }

    function Loaders(){
        setloader(true)
        setTimeout(() => {
            setloader(false)
        }, 1000);
    }


    function radiovalueUpdate(e){
        setemptyerr({...emptyerr,Additional:{...emptyerr.Additional,DND:e}})
    }

    function WeekendUpdate(value,e){
        if (e.target.checked){
            setemptyerr({...emptyerr,Additional:{...emptyerr.Additional,weekend:[...emptyerr.Additional.weekend,value]}});
        }else {
            const find = emptyerr.Additional.weekend.find((val)=>val === value);
            if(find) {
                const updateweekend = emptyerr.Additional.weekend.filter((val)=>{
                    return val !== value ;
                })
                setemptyerr({...emptyerr,Additional:{...emptyerr.Additional,weekend:updateweekend}});
            }
        }
        

    }



  return (
    <div className='addressedit--con' style={Styles(backscreenflag)}>
        <div className='addressedit--main'>
            <div className='address-navi-con'>
                <span onClick={()=>{
                    navigate("/setting")
                }}>Your Account</span> 
                <span>{">"}</span>
                <span onClick={()=>{
                    navigate("/address")
                }}>Your Addresses</span>
                <span>{">"}</span>
                <span style={{color:"red"}}>New Address</span>
            </div>
            <div className='title-con-1'>
                <h1>Add a new address</h1>
            </div>
            <div className='address-autofill-con'>
                <span>Save time. Autofill your current location</span>
                <button>Autofill</button>
            </div>
            <div className='form-addressgetting'>
                <form>
                    <div className='country'>
                        <label>Country/Region</label>
                        <select style={{height:"30px",borderRadius:"5px"}} className='country-code' onChange={(e)=>{
                            const countryname = e.target.value;
                            const datastate = code.filter((val)=>{
                                return val.country === countryname

                            })
                            setstate(datastate[0].states)
                            setemptyerr({...emptyerr,country:e.target.value});
                        }}>
                            {code.length === 0 ? <option>Fecting</option> : code.map((val)=>{
                                return <option key = {val.country}>{val.country}</option>
                            })}
                        </select>
                    </div>
                    <div className='fullname'>
                        <label>Full name {"("}First and Last name {")"}</label>
                        <input type='text' onChange={(e)=>{
                            setemptyerr({...emptyerr,fullname:{...emptyerr.fullname,value:e.target.value}})
                        }} />
                        {emptyerr.fullname.err && <span className='fullname-err'>
                            <NewReleasesIcon style={{fontSize:"16px",paddingRight:"10px"}} />Please enter a name
                        </span>}
                    </div>
                    <div className='mobile'>
                        <label>Mobile number</label>
                        <input type='text' onChange={(e)=>{
                            setemptyerr({...emptyerr,mobile:{...emptyerr.mobile,value:e.target.value}})
                        }}/>
                        <span className='warring-to-mobile'>May be used to assist delivery</span>
                        {emptyerr.mobile.err && <span className='mobile-err'>
                            <NewReleasesIcon style={{fontSize:"16px",paddingRight:"10px"}} />
                            Please enter a phone number so we can call if there are any issues with delivery
                        </span>}
                    </div>
                    <div className='pincode'>
                        <label>Pincode</label>
                        <input type='text' placeholder='6 digits [0-9] PIN code' onChange={(e)=>{
                            setemptyerr({...emptyerr,pincode:{...emptyerr.pincode,value:e.target.value}})
                        }}/>
                        {emptyerr.pincode.err && <span className='fullname-err'>
                            <NewReleasesIcon style={{fontSize:"16px",paddingRight:"10px"}} />
                            Please enter a ZIP or postal code
                        </span>}
                    </div>
                    <div className='add-1'>
                        <label>Flat, House no., Buliding, Company, Apartment</label>
                        <input type='text' onChange={(e)=>{
                            setemptyerr({...emptyerr,flat:{...emptyerr.flat,value:e.target.value}})
                        }}/>
                        {emptyerr.flat.err && <span className='fullname-err'>
                            <NewReleasesIcon style={{fontSize:"16px",paddingRight:"10px"}} />
                            Please enter an address
                        </span>}
                    </div>
                    <div className='add-2'>
                        <label>Area, Street, Sector, Village</label>
                        <input type='text' onChange={(e)=>{
                            setemptyerr({...emptyerr,area:e.target.value})
                        }}/>
                    </div>
                    <div className='add-3'>
                        <label>Landmark</label>
                        <input type='text' placeholder='E.g. near apollo hospital' onChange={(e)=>{
                            setemptyerr({...emptyerr,landmark:e.target.value})
                        }}/>
                    </div>
                    <div className='town-city'>
                        <div>
                            <label>Town/City</label>
                            <input type='text' onChange={(e)=>{
                                setemptyerr({...emptyerr,town:{...emptyerr.town,value:e.target.value}})
                            }}/>
                            {emptyerr.town.err && <span className='fullname-err'>
                            <NewReleasesIcon style={{fontSize:"16px",paddingRight:"10px"}} />
                            Please enter a City name
                            </span>}
                        </div>
                        <div>
                            <label>State</label>
                            <select onChange={(e)=>{
                                setemptyerr({...emptyerr,state:{...emptyerr.state,value:e.target.value}})
                            }}>
                                {state.map((val)=>{
                                    return <option key={val}>{val}</option>
                                })}
                            </select>
                            {
                                emptyerr.state.err && <span className='fullname-err'>
                                <NewReleasesIcon style={{fontSize:"16px",paddingRight:"10px"}} />
                                Please enter a State,region or provice
                                </span>
                            }
                        </div>
                        
                    </div>
                    <div className='default-add'>
                            <label><input type="checkbox" onChange={(e)=>{
                                setemptyerr({...emptyerr,defaultaddress:e.target.checked});
                            }}/> Make this my default address</label>
                    </div>
                    <div className='drop-down-add'>
                            <label>Delivery instructions (optional)</label>
                            <label onClick={()=>{
                                setAddDrop(!AddDrop);
                                Loaders()
                                setaddtype({
                                    btn1:{
                                     value:"House",
                                     status:false,
                                     val:"Independent house, villa, or builder floor (7 AM - 9 PM delivery)"
                                    } 
                                    ,btn2:{
                                     value:"Apartment",
                                     status:false,
                                     val:"Gated society, flats, or condominiums (7 AM - 9 PM delivery)"
                                    },btn3:{
                                     value:"Business",
                                     status:false,
                                     val:"Office, retail store, hotel, hospital, malls, etc (10 AM - 6 PM delivery)"
                                    },btn4:{
                                     value:"Other",
                                     status:false,
                                     val:"Other accommodations like hostel, PG, farmhouse, etc. (10 AM - 6 PM delivery)"
                                    }
                                 })
                            }} className='btn-drop'>{AddDrop ? <KeyboardArrowDownIcon style={{color:"black"}}/> : <KeyboardArrowUpIcon style={{color:"black"}}/> } Add preferences, note, access codes and more</label>
                            <div className='additional-add'>
                            {
                                !AddDrop && <div >
                                    {loader ? <CircularProgress style={{position:"relative",left:"30%",top:"50%"}}/> : <div className='add-detail'>
                                        <label>Please select an address type  
                                            { addtype.btn1.status && " Selected : " + addtype.btn1.value}
                                            {addtype.btn2.status && " Selected : " + addtype.btn2.value}
                                            {addtype.btn3.status && " Selected : " + addtype.btn3.value}
                                            {addtype.btn4.status && " Selected : " + addtype.btn4.value}
                                        
                                        </label>
                                        <div className='add-type'>
                                            <button onClick={(e)=>{
                                                const value = "House";
                                                e.preventDefault();
                                                setemptyerr({...emptyerr,Additional:{...emptyerr.Additional,addresstype:value}});
                                                setaddtype({...addtype,btn1:{...addtype.btn1,status:true},btn2:{...addtype.btn2,status:false},btn3:{...addtype.btn3,status:false},btn4:{...addtype.btn4,status:false}})
                                            }} style={stylereturn(addtype.btn1.status)}>House</button>
                                            <button onClick={(e)=>{
                                                const value = "Apartment";
                                                e.preventDefault();
                                                setemptyerr({...emptyerr,Additional:{...emptyerr.Additional,addresstype:value}});
                                                setaddtype({...addtype,btn1:{...addtype.btn1,status:false},btn2:{...addtype.btn2,status:true},btn3:{...addtype.btn3,status:false},btn4:{...addtype.btn4,status:false}})
                                            }} style={stylereturn(addtype.btn2.status)}>Apartment</button>
                                            <button onClick={(e)=>{
                                                const value = "Business";
                                                e.preventDefault();
                                                setemptyerr({...emptyerr,Additional:{...emptyerr.Additional,addresstype:value}});
                                                setaddtype({...addtype,btn1:{...addtype.btn1,status:false},btn2:{...addtype.btn2,status:false},btn3:{...addtype.btn3,status:true},btn4:{...addtype.btn4,status:false}})
                                            }} style={stylereturn(addtype.btn3.status)}>Business</button>
                                            <button onClick={(e)=>{
                                                const value = "Other";
                                                e.preventDefault();
                                                setemptyerr({...emptyerr,Additional:{...emptyerr.Additional,addresstype:value}});
                                                setaddtype({...addtype,btn1:{...addtype.btn1,status:false},btn2:{...addtype.btn2,status:false},btn3:{...addtype.btn3,status:false},btn4:{...addtype.btn4,status:true}})
                                            }} style={stylereturn(addtype.btn4.status)}>Other</button>
                                        </div>
                                        <div className='add-type-status'>
                                            <label>
                                            {addtype.btn1.status && addtype.btn1.val}
                                            {addtype.btn2.status && addtype.btn2.val}
                                            {addtype.btn3.status && addtype.btn3.val}
                                            {addtype.btn4.status && addtype.btn4.val}
                                        
                                            </label>
                                            <div className='acc-add'>
                                                <div className='acc-1' onClick={()=>{
                                                    setacc({...acc,acc1:!acc.acc1})
                                                }}>
                                                    Select your do not distrub delivery perference {!acc.acc1 ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                                                </div>
                                                {acc.acc1 && <div className='acc-1-ans' for="acc-1">
                                                    <label><input type='radio' name='acc-1' onChange={(e)=>radiovalueUpdate("Front door")}/> Front door</label>
                                                    <label><input type='radio' name='acc-1' onChange={(e)=>radiovalueUpdate("Mailbox")}/> Mailbox</label>
                                                    <label><input type='radio' name='acc-1' onChange={(e)=>radiovalueUpdate("With a security guard")}/> With a security guard</label>
                                                    <label><input type='radio' name='acc-1' onChange={(e)=>radiovalueUpdate("Mailroom")}/> Mailroom</label>
                                                    <label><input type='radio' name='acc-1' onChange={(e)=>radiovalueUpdate("Turn off do not distrub delivery")}/> Turn off do not distrub delivery</label>
                                                </div>}
                                                <div className='acc-1' onClick={()=>{
                                                    setacc({...acc,acc2:!acc.acc2})
                                                }}>
                                                    Can you receive deliveries at this address on weekends? {!acc.acc2 ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                                                </div>
                                                {acc.acc2 && <div className='day-add'>
                                                    <label><input type='checkbox'onChange={(e)=>{
                                                        WeekendUpdate("Monday",e)
                                                    }}/> Monday</label>
                                                    <label><input type='checkbox' onChange={(e)=>{
                                                        WeekendUpdate("Tuesday",e)
                                                    }}/> Tuesday</label>
                                                    <label><input type='checkbox' onChange={(e)=>{
                                                        WeekendUpdate("Wednesday",e)
                                                    }}/> Wednesday</label>
                                                    <label><input type='checkbox' onChange={(e)=>{
                                                        WeekendUpdate("Thursday",e)
                                                    }}/> Thursday</label>
                                                    <label><input type='checkbox' onChange={(e)=>{
                                                        WeekendUpdate("Friday",e)
                                                    }}/> Friday</label>
                                                    <label><input type='checkbox' onChange={(e)=>{
                                                        WeekendUpdate("Saturday",e)
                                                    }}/> Saturday</label>
                                                    <label><input type='checkbox' onChange={(e)=>{
                                                        WeekendUpdate("Sunday",e)
                                                    }}/> Sunday</label>
                                                    </div>}
                                                <div className='acc-1' onClick={()=>{
                                                    setacc({...acc,acc3:!acc.acc3})
                                                }}>
                                                    Share additional information to find this address {!acc.acc3 ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                                                </div>
                                                {acc.acc3 && <div className='type-add'>
                                                    <textarea placeholder="Provide details such as building description, a nearby landmark, or other navigation instructions" onChange={(e)=>{
                                                        setemptyerr({...emptyerr,Additional:{...emptyerr.Additional,additionalinfo:e.target.value}})
                                                    }}></textarea>
                                                    </div>}
                                            </div>
                                        </div>
                                        <div>
                                            
                                            
                                        </div>
                                        </div>}
                                </div>
                            }
                            </div>
                            <div className='last-detail'>
                                <label style={{fontWeight:"300",fontSize:"11.5px"}}>
                                Your instructions help us deliver to this address. However, deliveries may not always follow all the instructions.
                                </label>
                            </div>
                            <div className='sub-btn-con'>
                                <button onClick={(e)=>{
                                    e.preventDefault()
                                    ValidationForm()
                                    
                                }}>Add address</button>
                            </div>
                        </div>
                        

                </form>
            </div>
        </div>
    </div>
  )
}

export default AddressEdit