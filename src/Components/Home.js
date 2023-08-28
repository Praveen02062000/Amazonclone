import Slider from "./Slider";
import React, { useEffect } from 'react';
import "../Styles/Home.css";
import SimpleImageSlider from "react-simple-image-slider";
import { Bannerimages } from "./Slider";
import HomeAdd from "./HomeAdd";
import ErrorPage from "./ErrorPage";
import Products from "./Products";
import TodaysDeal from "./TodaysDeal";
import { Styles } from "../Config/Cotegories";

function Home({backscreenflag}) {
  
 

  try {
    return (
      <div className='home-main--con'>
      
       <div className="main-small-con" style={Styles(backscreenflag)}>
        <SimpleImageSlider 
            
            width={"100%"}
            height={600}
            images={Bannerimages}
            autoPlay={true}
            loop={true}
            autoPlayDelay={3.0}
            showNavs={true}
          />
    
          <HomeAdd />
          <TodaysDeal />
       </div>
      
  
        
      </div>
    )

  }catch(err){
    if (err){
      return (<ErrorPage />)
    }
    

  }
 
  
  
}

export default Home