import React from "react";
import "../Styles/Single.css";
import OfferLogo from "../Assets/Logo/order/offers2.png"


const OfferCon = () =>{
    return (
        <div className="offerscon"> 
            <div className="offercon--head" style={{display:"flex",alignItems:"center"}}>
                <img src={OfferLogo} style={{width:"50px"}} />
                <h4 style={{fontWeight:"500",marginLeft:"20px"}}>Offers</h4>
            </div>
            <div className="offercon--body">
                <div className="con-1">
                    <h5>No Cost EMI</h5>
                    <span>Upto $10 EMI interest saving on Amazon Pay ICICI</span>
                    <br/>
                    <span style={{color:"rgb(5, 143, 249)"}}>1 Offer {">"}</span>
                </div>
                <div className="con-1">
                <h5>Bank Offer</h5>
                    <span>Upto $100 discount on HSBC cashback credit...</span>
                    <br/>
                    <span style={{color:"rgb(5, 143, 249)"}}>1 Offer {">"}</span>
                </div>
                <div className="con-1">
                <h5>Partner Offers</h5>
                    <span>Get GST invoice save up to 20% cashback in business Account</span>
                    <br/>
                    <span style={{color:"rgb(5, 143, 249)"}}>1 Offer {">"}</span>
                </div>
            </div>
        </div> 
    )
}

export default OfferCon ;