import React from 'react';
import { Link } from 'react-router-dom';
import { mainSrc } from '../Config/Cotegories';
import { useSelector } from 'react-redux';
function HomeAdd() {
    
  const users = JSON.parse(window.localStorage.getItem("users"))
  return (
    <div>
        <div className="add--box">
            <div className='con--1'>
              <div className='title--main--product--con'>
                <h3>Great Freedom Safe</h3>
              </div>
              <div className='img--con--main--product'>
                <img src={mainSrc.Offer1} alt='Add-1'></img>
              </div>
              <div className='btn--main--con'>
                <Link style={{textDecoration:"none"}}><p>See All</p></Link>
              </div>

            </div>
            <div className='con--1'>
            <div className='title--main--product--con'>
                <h3>Bluetooth Calling Smartwatch <br/>Starts at $1,999</h3>
              </div>
              <div className='img--con--main--product'>
                <img src={mainSrc.Offer2} alt='add-2'></img>
              </div>
              <div className='btn--main--con'>
                <Link style={{textDecoration:"none"}}><p>Shop Now</p></Link>
              </div>
            </div>
            <div className='con--1'>
            <div className='title--main--product--con'>
                <h3>Appliances fro your home | Up<br/>to 55% off</h3>
              </div>
              <div className='img--grid'>
                <div>
                  <img src={mainSrc.ac} alt='of-1'></img>
                  <span>Air Conditioners</span>
                </div>
                <div>
                  <img src={mainSrc.frg} alt='0f-2'></img>
                  <span>Refrigerations</span>
                </div>
                <div>
                  <img src={mainSrc.micro} alt='of-3'></img>
                  <span>Microwaves</span>
                </div>
                <div>
                  <img src={mainSrc.wash} alt='of-4'></img>
                  <span>Washing Machines</span>
                </div>

              </div>
              <div className='btn--main--con'>
                <Link style={{textDecoration:"none"}}><p>See All</p></Link>
              </div>
            </div>
            <div className='con--2'>
              {users.username === "" ? <div className='sign--con'>
                <h3>Sign in for your best <br></br> expersion</h3>
                <Link to={"/Signin"}><button>Sign in Securely</button></Link>
              </div> : <></>}
              <div className='add-sponsored'>
                  <Link to={'/allproducts/data'}><button>All Products</button></Link>
              </div>

            </div>
            <div className='con--1'>
            <div className='title--main--product--con'>
               <h3>Up to 70% | Clearance store</h3>
              </div>
              <div className='img--con--main--product'>
                <img src={mainSrc.laptop} alt='laptop'></img>
              </div>
              <div className='btn--main--con'>
                <Link style={{textDecoration:"none"}}><p>Shop More</p></Link>
              </div>
            </div>
            <div className='con--1'>
            <div className='title--main--product--con'>
                <h3>Revamp your home in style</h3>
              </div>
              <div className='img--grid'>
                <div>
                  <img src={mainSrc.decor1} alt='decor1'></img>
                  <span>Bedsheets,Curtain & <br/> more</span>
                </div>
                <div>
                  <img src={mainSrc.decor2} alt='decor2'></img>
                  <span>Home decoration</span>
                </div>
                <div>
                  <img src={mainSrc.decor3} alt='decor3'></img>
                  <span>Home storage</span>
                </div>
                <div>
                  <img src={mainSrc.decor4} alt='decor4'></img>
                  <span>Lighting solution</span>
                </div>

              </div>
              <div className='btn--main--con'>
                <Link style={{textDecoration:"none"}}><p>Expore All</p></Link>
              </div>
            </div>
            <div className='con--1'>
            <div className='title--main--product--con'>
                <h3>Starting $99 | All your home <br/> imporovement needs</h3>
              </div>
              <div className='img--grid'>
                <div>
                  <img src={mainSrc.clean1} alt='cl1'></img>
                  <span>Spin mops, wipes & more</span>
                </div>
                <div>
                  <img src={mainSrc.clean2} alt='cl2'></img>
                  <span>Bathrrom hardware & <br/> accessories</span>
                </div>
                <div>
                  <img src={mainSrc.clean3} alt='cl3'></img>
                  <span>Hammers, screwdrivers & <br/> more</span>
                </div>
                <div>
                  <img src={mainSrc.clean4} alt='cl4'></img>
                  <span>Extension boards,plugs & <br/>More</span>
                </div>

              </div>
              <div className='btn--main--con'>
                <Link style={{textDecoration:"none"}}><p>Expore All</p></Link>
              </div>
            </div>
            <div className='con--1'>
            <div className='title--main--product--con'>
                <h3>Up to 60% off | Styles for <br/> women</h3>
              </div>
              <div className='img--grid'>
                <div>
                  <img src={mainSrc.dress1} alt='dr1'></img>
                  <span>women's colthing</span>
                </div>
                <div>
                  <img src={mainSrc.dress2} alt='dr2'></img>
                  <span>Footwear + handbags</span>
                </div>
                <div>
                  <img src={mainSrc.dress3} alt='dr3'></img>
                  <span>Watches</span>
                </div>
                <div>
                  <img src={mainSrc.dress4} alt='dr4'></img>
                  <span>fashion jewellary</span>
                </div>

              </div>
              <div className='btn--main--con'>
                <Link style={{textDecoration:"none"}}><p>Expore All</p></Link>
              </div>
            </div>
        </div>
    </div>
  )
}

export default HomeAdd