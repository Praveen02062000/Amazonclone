import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';

function Subhead({SliderOn,sliderflag}) {
  

  return (
    <div className='subhead'>
      <div className='menu--con--logo' onClick={()=>{SliderOn()}}>
        <MenuIcon />
        <h5>All</h5>
      </div>
      <div className='menu--nav--det'> 
        <nav>
            <button>Amazon miniTV</button>
            <button>Sell</button>
            <button>Amazon Pay</button>
            <button>Gift cards</button>
            <button>Coupons</button>
            <button>health,Household & buttonersonal Care</button>
            <button>AmazonBasics</button>
            <button>Home Improvement</button>
            <button>Subscribe & Save</button>
            <button>Books</button> 
        </nav>

      </div>
      <div className='new--arrival--con'>
        <p>New Launches from Mobiles, Electronics & more | Shop now</p>

      </div>
    </div>
  )
}

export default Subhead