import React from 'react';
import "../Styles/Home.css"
import { useSelector, useDispatch } from 'react-redux';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DealItem from './DealItem';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';


function TodaysDeal() {
  // const data = JSON.parse(localStorage.getItem("todaydeal"));
  const { data, load, error } = useSelector((state) => state.data.TodayDeal);

  return (
    <div className='main--todaydeal--con'>
      <div className='todaydeal-title'><h4>TodayDeals</h4> <Link to={"Todaydeal/products"} style={{ fontSize: "10px" }}>See all Deals</Link></div>
      <div className='todaydeal'>
        <button className='left--scroll--todaydeal' onClick={() => {
          const scrollContainer = document.querySelector(".scroll-todaydeal");
          scrollContainer.scrollBy(-900, 0)
        }}><ChevronLeftIcon /></button>
        {
          <div className={data.products ? 'scroll-todaydeal' : "load--pro--todaydeal"}>

            {data.products ? data.products.map((val) => {
              return <DealItem Offer={"98"} Time={"09:09:09"} src={val.thumbnail} Title={val.title} key={val.id} />
            }) : <CircularProgress />}
          </div>
        }

        <button className='right--scroll--todaydeal' onClick={() => {

          const scrollContainer = document.querySelector(".scroll-todaydeal");
          scrollContainer.scrollBy(900, 0)

        }}><ChevronRightIcon /></button>
      </div>
    </div>
  )
}

export default TodaysDeal