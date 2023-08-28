import Offer1 from "../Assets/Add/offer-1.jpg";
import Offer2 from "../Assets/Add/watch.jpg";
import ac from "../Assets/Add/ac-1.jpg";
import frg from "../Assets/Add/frige.jpg";
import micro from "../Assets/Add/microoven.jpg";
import wash from "../Assets/Add/washingmechin.jpg";
import laptop from "../Assets/Add/laptop.jpg";
import decor1 from "../Assets/Add/decor-1.jpg";
import decor2 from "../Assets/Add/decore-2.jpg";
import decor3 from "../Assets/Add/decor-3.jpg";
import decor4 from "../Assets/Add/decor-4.jpg";
import clean1 from "../Assets/Add/clewan-1.jpg";
import clean2 from "../Assets/Add/clean-2.jpg";
import clean3 from "../Assets/Add/clean-3.jpg";
import clean4 from "../Assets/Add/clean-4.jpg";
import dress1 from "../Assets/Add/dress-1.jpg";
import dress2 from "../Assets/Add/dress-2.jpg";
import dress3 from "../Assets/Add/dress-3.jpg";
import dress4 from "../Assets/Add/dress-4.jpg";
import React from "react";
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';


import { RemoveCart ,QuanUpdate,TotalPrice,SetDataLocalStorage} from "../Data/Reducer";
import { useDispatch } from "react-redux";

import FreedelLogo from "../Assets/Logo/order/free del.png";
import PodLogo from "../Assets/Logo/order/pod.png";
import ReplacementLogo from "../Assets/Logo/order/replacement.png";
import warrentyLogo from "../Assets/Logo/order/warrrenty.png";
import TopBandLogo from "../Assets/Logo/order/band.png";
import SecureLogo from "../Assets/Logo/order/secure.png";
import {db} from "./Firebase";
import { getDoc,setDoc,onSnapshot,doc } from "firebase/firestore";

const users = JSON.parse(window.localStorage.getItem("users"));


export const OfferDetailsImages = {
    FreedelLogo:FreedelLogo,PodLogo:PodLogo,ReplacementLogo:ReplacementLogo,warrentyLogo:warrentyLogo,TopBandLogo:TopBandLogo,SecureLogo:SecureLogo
}





export default function RatingStar({rate}){
    if (rate === 1){
        return (<div>
            <StarIcon />
            <StarOutlineIcon />
            <StarOutlineIcon />
            <StarOutlineIcon />
            <StarOutlineIcon /> 
          </div>)
    }else if (rate === 2){
        return (
            <div>
                <StarIcon />
                <StarIcon />
                <StarOutlineIcon />
                <StarOutlineIcon />
                <StarOutlineIcon />  
            </div>
        )
    }else if(rate === 3){
        return (
            <div>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarOutlineIcon />
                <StarOutlineIcon />
            </div>
        )
    }else if(rate === 4){
        return (
            <div>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarOutlineIcon />
            </div>
        )
    }else if(rate === 4){
        return (
            <div>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
            </div>
        )
    }else if (rate < 2  && rate > 1){
        return (
            <div>
                <StarIcon />
                <StarHalfIcon />
                <StarOutlineIcon />
                <StarOutlineIcon />
                <StarOutlineIcon />
            </div>
        )
        
    }else if (rate < 3  && rate > 2){
        return (
            <div>
                <StarIcon />
                <StarIcon />
                <StarHalfIcon />
                <StarOutlineIcon />
                <StarOutlineIcon />
            </div>
        )
        
    }else if (rate < 4  && rate > 3){
        return (
            <div>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarHalfIcon />
                <StarOutlineIcon />
            </div>
        )
        
    }else if (rate < 5  && rate > 4){
        return (
            <div>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarHalfIcon />
            </div>
        )
        
    }else{
        return (
            <div>
                <StarOutlineIcon />
                <StarOutlineIcon />
                <StarOutlineIcon />
                <StarOutlineIcon />
                <StarOutlineIcon />
            </div>
        )
    }


}

export function Styles(flag){
    return flag ? {zIndex:"-1",position:"relative"} : {zIndex:"0",position:"relative"}
}



export const Categories = [
    "All Categories",
    "Alexa Skill",
    "Amazon Devices",
    "Amazon Fashioh",
    "Amazon Fresh",
    "Amazon Pharmacy",
    "Appliances",
    "Apps & Games",
    "Audible Audiobooks",
    "Baby",
    "Beauty",
    "Car & Motorbike",
    "Clothing & Accessories",
    "Collectibles","Computers & Accessories","Electronics","Furniture","Garden & Outdoors","Gift Card",
    "Grocery & Gourmet Foods","Health & personal Care","Home & Kitchen","Industrial & Scientific","Jewellery",
    "Kindle Store","Luggage & Bags","Luxury Beauty","Movies & TV Shows","Music","Musical Instruments","Office Products"
    ,"Pet Supplies","Shoes & Handbags","Software","Sports,Fitness & Outdoors","Subsrcibe & Save","Tools & Home Improvements",
    "Toys & Games","Under $500","Video Games","Watches"

]


export const BodyScroll = (flag) =>{
    if(flag){
        document.querySelector("body").style.overflow="hidden"
    }else{
        document.querySelector("body").style.overflowY = "scroll"
    }
}

export const mainSrc = {
    Offer1,Offer2,ac,frg,wash,micro,laptop,decor1,decor2,decor3,decor4
    ,clean1,clean2,clean3,clean4,dress1,dress2,dress3,dress4

}



// function for sort the product data from user response :-


export function HightoLow (data){
    var duplicatdata = data
    var final = []

    while(true){
        if(duplicatdata.length === 0){
            break;
        }else {
            var min = duplicatdata[0]
            for (let i=0;i<duplicatdata.length;i++){
                if (duplicatdata[i].price > min.price){
                    min = duplicatdata[i]
                }
            }
            final.push(min);
            duplicatdata = duplicatdata.filter((val)=>{
                return min.id !== val.id
            })
        }
    }


    return final

}

export function LowtoHigh(data){
    var duplicatdata = data
    var final = []

    while(true){
        if(duplicatdata.length === 0){
            break;
        }else {
            var min = duplicatdata[0]
            for (let i=0;i<duplicatdata.length;i++){
                if (duplicatdata[i].price < min.price){
                    min = duplicatdata[i]
                }
            }
            final.push(min);
            duplicatdata = duplicatdata.filter((val)=>{
                return min.id !== val.id
            })
        }
    }


    return final

}


export function OptionReturn(a,b,c){
    const users = JSON.parse(window.localStorage.getItem("users"));
    const dispatch = useDispatch()
    async function DeleteCartItemDb(id){
        const docref = doc(db,"users",users.userId);
        const docsnap = await getDoc(docref)
        const cartitems = docsnap.data().cart
        if(docsnap.exists()){
          const newdata = cartitems.filter((val)=>{
            return val.id !== id
          })
          
          setDoc(docref,{...docsnap.data(),cart:newdata})
          
        }
      }

    async function UpdataQuanDb(id,vals){
        const docef = doc(db,"users",users.userId);
        const docsnap = await getDoc(docef)
        if(docsnap.exists()){
            const find = docsnap.data().cart.find((val)=>val.id===id);
            if(find){
                const newData = docsnap.data().cart.map((val)=>{
                    if (val.id === id){
                        const qty = parseInt(vals)
                        return {...val,qtyitem:qty,totalitemprice:(parseFloat(val.price).toFixed(2) * qty)}
                    }else {
                        return val
                    }
                })
                setDoc(docef,{...docsnap.data(),cart:newData})


            }
            
        }

    }
      
    function SelectRemove(val){
        if (val.target.value === "0"){
            dispatch(RemoveCart(b)) 
            users.username && DeleteCartItemDb(b)
         

        }else {
            const obj = {
                id:b,
                qty:val.target.value
            }

            users.username && UpdataQuanDb(obj.id,obj.qty)
            
            dispatch(QuanUpdate(obj))
            dispatch(SetDataLocalStorage(users.userId))
        }


        users.username ? onSnapshot(doc(db,"users",users.userId),(doc)=>{
            dispatch(TotalPrice(doc.data().cart))
          }) : dispatch(TotalPrice())
    }
    

    
    if (a === 1){
      return (
                <select onChange={(e)=>{
                    SelectRemove(e)
                    

                    
                }}><option>{0}</option>
                <option value={1} selected>{1}</option>
                <option>{2}</option>
                <option>{3}</option>
                <option>{4}</option>
                <option>{5}</option>
                <option>{6}</option>
                <option>{7}</option>
                <option>{8}</option></select>
                
                
      )
    }else if(a===2){
        return (
            <select onChange={(e)=>{
                SelectRemove(e)
            }}>
                <option>{0}</option>
                <option >{1}</option>
                <option value={2} selected>{2}</option>
                <option>{3}</option>
                <option>{4}</option>
                <option>{5}</option>
                <option>{6}</option>
                <option>{7}</option>
                <option>{8}</option>
            </select>
        )    
    }
    else if(a===3){
       return <select onChange={(e)=>{
        SelectRemove(e)
    }}>
                <option>{0}</option>
                <option >{1}</option>
                <option >{2}</option>
                <option value={3} selected>{3}</option>
                <option>{4}</option>
                <option>{5}</option>
                <option>{6}</option>
                <option>{7}</option>
                <option>{8}</option>
       </select>
                
        
    }
    else if(a===4){
       return (
        <select onChange={(e)=>{
            SelectRemove(e)
        }}>
        <option>{0}</option>
                <option >{1}</option>
                <option >{2}</option>
                <option>{3}</option>
                <option  value={4} selected>{4}</option>
                <option>{5}</option>
                <option>{6}</option>
                <option>{7}</option>
                <option>{8}</option>
       </select>
       )
                
        
    }
    else if(a===5){
        return (
            <select onChange={(e)=>{
                SelectRemove(e)
            }}>
                <option>{0}</option>
                <option >{1}</option>
                <option >{2}</option>
                <option >{3}</option>
                <option >{4}</option>
                <option value={5} selected>{5}</option>
                <option>{6}</option>
                <option>{7}</option>
                <option>{8}</option>
            </select>
        )
                
        
    }
    else if(a===6){
       return  (
        <select onChange={(e)=>{
            SelectRemove(e)
        }}>
            <option>{0}</option>
                <option >{1}</option>
                <option >{2}</option>
                <option>{3}</option>
                <option>{4}</option>
                <option>{5}</option>
                <option value={6} selected>{6}</option>
                <option>{7}</option>
                <option>{8}</option>
        </select>
       )
                
        
    }
    else if(a===7){
       return (
        <select onChange={(e)=>{
            SelectRemove(e)
        }}>
            <option>{0}</option>
                <option >{1}</option>
                <option >{2}</option>
                <option>{3}</option>
                <option>{4}</option>
                <option>{5}</option>
                <option>{6}</option>
                <option  value={7} selected>{7}</option>
                <option>{8}</option>
        </select>
       )
                
        
    }
    else if(a===8){
      return  (
        <select onChange={(e)=>{
            SelectRemove(e)
        }}>
            <option>{0}</option>
                <option >{1}</option>
                <option >{2}</option>
                <option >{3}</option>
                <option>{4}</option>
                <option>{5}</option>
                <option>{6}</option>
                <option>{7}</option>
                <option value={3} selected>{8}</option>
        </select>
      )
                
        
    }
    else if(a===9){
       return (
        <select onChange={(e)=>{
            SelectRemove(e)
        }}>
            <option>{0}</option>
                <option >{1}</option>
                <option >{2}</option>
                <option>{3}</option>
                <option>{4}</option>
                <option>{5}</option>
                <option>{6}</option>
                <option>{7}</option>
                <option>{8}</option>
                <option value={9} selected >{9}</option>
        </select>
       )
                
        
    }
    else if(a===10){
      return (
        <select onChange={(e)=>{
            SelectRemove(e)
        }}><option>{0}</option>
        <option >{1}</option>
        <option >{2}</option>
        <option>{3}</option>
        <option>{4}</option>
        <option>{5}</option>
        <option>{6}</option>
        <option>{7}</option>
        <option>{8}</option>
        <option value={10} selected >{10}</option></select>
      )
        
    }

  }