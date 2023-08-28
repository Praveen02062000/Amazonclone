import React, { useEffect, useState } from 'react'

function DealItem({ Offer, Time, src, Title }) {
  const valueContainer = Time.split(":")
  const [hr, sethr] = useState(Number(valueContainer[0]));
  const [min, setmin] = useState(Number(valueContainer[1]));
  const [sec, setsec] = useState(Number(valueContainer[2]))


  return (
    <div className='dealitem'>
      <div style={{ padding: "4px" }}><img src={src}></img></div>
      <div className='deal-item-con-details'>
        <div className='offer-time'>
          <button>Up to {Offer}% off</button>
          <p>Ends in {`${hr} : ${min} : ${sec}`}</p>
        </div>
        <p className='todaydeal-item-title'>{Title}</p>
      </div>

    </div>
  )
}

export default DealItem