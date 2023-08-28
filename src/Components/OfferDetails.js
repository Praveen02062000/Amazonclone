import React from "react";
import "../Styles/Single.css";
import { OfferDetailsImages } from "../Config/Cotegories";

export default function OfferDetails (){
    return (
        <div className="offerdetails" style={{display:"flex",alignItems:"center",justifyContent:"space-evenly",overflowX:"scroll"}}>
            <div className="detail-con">
                <img src={OfferDetailsImages.FreedelLogo}/>
                <h5>Free Delivery</h5>
            </div>
            <div className="detail-con">
                <img src={OfferDetailsImages.PodLogo}/>
                <h5>Pay on Delivery</h5>
            </div>
            <div className="detail-con">
                <img src = {OfferDetailsImages.ReplacementLogo}/>
                <h5>7 days Replacement by Brand</h5>
            </div>
            <div className="detail-con">
                <img src = {OfferDetailsImages.warrentyLogo}/>
                <h5>1 Year Warranty</h5>
            </div>
            <div className="detail-con">
                <img src = {OfferDetailsImages.TopBandLogo}/>
                <h5>Top Band</h5>
            </div>
            <div className="detail-con">
                <img src = {OfferDetailsImages.SecureLogo} />
                <h5>Secure Transition</h5>
            </div>
        </div>
    )
}