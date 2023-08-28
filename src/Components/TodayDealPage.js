import React from 'react'
import TodaysDeal from './TodaysDeal';
import "../Styles/Todaydeal.css";
import { useSelector } from 'react-redux';
import DealItem from './DealItem';
import CircularProgress from '@mui/material/CircularProgress';
import {Styles} from "../Config/Cotegories";


function TodayDealPage({backscreenflag}) {
    const { data, load, error } = useSelector((state) => state.data.TodayDeal);

  return (
    <div className='todaydealpage--con' style={Styles(backscreenflag)}>
        <div className='todaydeal--head'>

        </div>
        <h2 style={{fontSize:"14px",position:"relative",left:"8%",marginTop:"2rem",lineHeight:"1px"}}>Recommended deals for you</h2>
        <div className='all-products--con'>
            
        {data.products ? data.products.map((val) => {
              return <div className='con-todaydeal' key={val.id}>
                <DealItem Offer={"98"} Time={"09:09:09"} src={val.thumbnail} Title={val.title} key={val.id} />
              </div>
            }) : <CircularProgress />}
        </div>
    </div>
  )
}

export default TodayDealPage