import React from 'react';
import RatingStar from '../Config/Cotegories';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
function ProductItem({img,title,price,rate}) {
  return (
    
        <div className='productsItemCon'>
            <div className='productitem--img--con'>
                <img src={img}></img>
            </div>
            <div className='productitem--details--con'>
                <div className='productitem--title--con'>
                    <h4>{title}</h4>
                </div>
                <div className='productitem--rating--con'>
                    <RatingStar rate={rate} /><KeyboardArrowDownIcon style={{color:"black"}} />
                </div>
                <div className='productitem--button--con'>
                    <button>Limited time deal</button>
                </div>
                <div className='productitem--price--con'>
                    <h3>{price} $ Offer 95%</h3> 
                </div>
                <div className='productitem--offer--con'>
                    <p> Get it by Wednesday, 2 August
    FREE Delivery by Amazon</p>
                </div>
            </div>

        </div>
    
  )
}

export default ProductItem