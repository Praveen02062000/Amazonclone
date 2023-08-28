import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "../Styles/Products.css";
import ProductItem from './ProductItem';
import { Link,Outlet } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Styles,HightoLow,LowtoHigh } from '../Config/Cotegories';
import { useState } from 'react';
import { useEffect } from 'react';
import {SinglePage} from "../Data/Reducer"

function Products({backscreenflag}) {
  const {data,load,error} = useSelector((state)=>state.data.main);
  const dispatch = useDispatch();
  const [sortedData,setSortData] = useState([]);
  function setdata(){
    setSortData(data)
  }
  useEffect(()=>{
    setSortData(data);
    
  },[data])

  const HandlerSelect=(e)=>{
    if (e.target.value === "Sort by : High to Low"){
      if(!data){
        setSortData([]);
      }else{
        var values = HightoLow(data)
        setSortData(values)
        
        
      }
      
    }else if (e.target.value === "Sort by : Low to High"){
      if (!data){
        setSortData([]);
      }else {
        var values = LowtoHigh(data);
        setSortData(values);
        

      }
    }else {
      if (!data){
        setSortData([]);
      }else {
        setSortData(data)
      }

    }
    
  }
 
  
  return (
    <div className='products' >

        <div style={Styles(backscreenflag)}>
          <div className='product--main-con'>
          <div className='product-main-head'>
            <div className='fav-select'>
              <select onChange={(e)=>HandlerSelect(e)}>
                <option>Sort by : Featured</option>
                <option>Sort by : Low to High</option>
                <option>Sort by : High to Low</option>
              </select>
            </div>
          </div>
          <div className='products--con'>
            <div className='products--con--main'>
              <div className='product--con--head'>
                <h4>Result</h4>
                <span>Price and other details may vary based on product size and color</span>
                  
              </div>
              <div className='products--show--list'>
                {
                  sortedData.length !== 0 ? sortedData.map((val)=>{
                    return (
                      <Link key={val.id} onClick={()=>{
                        dispatch(SinglePage(val.id))
                      }} style={{textDecoration:"none"}} to={`/product/${val.title}`} ><ProductItem  key={val.id} rate={val.rating.rate} img = {val.image} title = {val.title} price ={val.price} /></Link>
                    )
                  })
                 : <CircularProgress style={{margin:"3rem auto"}}/> }
                 <Outlet />

              </div>
            </div>

          </div>
        </div>
        </div>

    </div>
  )
}

export default Products