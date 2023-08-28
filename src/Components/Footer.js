import React from 'react';
import "../Styles/Footer.css";
import AmazonLogo from "../Assets/Logo/amazon-logo.png"
import LanguageIcon from '@mui/icons-material/Language';


function Footer() {
  return (
    <div className='footer--con'>
        <div className='main-footer'>
            <div className='backtotop'>Back to top</div>
            <div className='footer--main--con'>
                <div className='footer-1'>
                    <div className='footer-1--sub--1'>
                        <div>
                            <h4>Get to Know Us</h4>
                            <p>About Us</p>
                            <p>Careers</p>
                            <p>Press Releases</p>
                            <p>Amazon Science</p>
                        </div>
                        <div>
                        <h4>Connect with Us</h4>
                            <p>Facebook</p>
                            <p>Twitter</p>
                            <p>Instagram</p>
                            <p>Amazon Science</p>
                        </div>
                        <div>
                        <h4>Make Money with Us</h4>
                            <p>Sell on Amazon</p>
                            <p>Sell under Amazon Accelerator</p>
                            <p>Protect and Build Your Brand</p>
                            <p>Amazon Global Selling</p>
                            <p>Fulfilment by Amazon</p>
                            <p>Advertise Your Products</p>
                            <p>Amazon Pay on Merchants</p>
                        </div>
                        <div>
                        <h4>Let Us Help You</h4>
                            <p>Covid-19 and Amazon</p>
                            <p>Your Account</p>
                            <p>Retruns Centre</p>
                            <p>100% Purchase Protection</p>
                            <p>Amazon App Download</p>
                            <p>Help</p>
                        </div>
                    </div>
                </div>
                <div className='footer-2'>
                    <div className='footer-2--con'>
                        <img src={AmazonLogo} style={{width:"110px"}}/>
                        <div style={{display:"flex",alignItems:"center"}}>
                        <LanguageIcon style={{color:"white",fontSize:"20px",position:"relative",left:"30px"}} />
                        <select>
                            <option>English</option>
                            <option>Tamil</option>
                            <option>Hindi</option>
                            <option>greek</option>
                            
                        </select>
                        </div>

                    </div>
                    <div className='footer-2--con-1'>
                        <p>Australia</p>
                        <p>Brazil</p>
                        <p>canada</p>
                        <p>China</p>
                        <p>France</p>
                        <p>Germany</p>
                        <p>Italy</p>
                        <p>Japan</p>
                        <p>Mexico</p>
                        <p>Netherlands</p>
                        <p>Poland</p>
                        <p>Singapore</p>
                        <p>Spain</p>
                        <p>turkey</p>
                        <p>United Arab Emirates</p>
                        <p>United Kingdom</p>
                        <p>United States</p>
                    </div>
                </div>
                <div className='footer-3'>
                    <div className='footer-3-con'>
                        <div>
                            <h4>AbeBooks</h4>
                            <p>Books, art</p>
                            <p>& collections</p>
                        </div>
                        <div>
                        <h4>Amazon Web Services</h4>
                            <p>Scalable Cloud</p>
                            <p>Computing Services</p>
                        </div>
                        <div>
                        <h4>Audible</h4>
                            <p>Download</p>
                            <p>Audio Books</p>
                        </div>
                        <div>
                        <h4>DPReview</h4>
                            <p>Digital </p>
                            <p>Photography</p>
                        </div>
                        <div>
                        <h4>IMDB</h4>
                            <p>Movies, Tv</p>
                            <p>& Celebrities</p>
                        </div>
                        <div>
                        <h4>Shopbop</h4>
                            <p>Designer</p>
                            <p>Fashion Brands</p>
                        </div>
                        <div>
                        <h4>Amazon Business</h4>
                            <p>Everything For</p>
                            <p>Your Business</p>
                        </div>
                        <div>
                        <h4>Prime Now</h4>
                            <p>2-Hour Delivery</p>
                            <p>On Everything items</p>
                        </div>
                        <div>
                        <h4>Amazon Prime Music</h4>
                            <p>100 Million Songs, ad-free</p>
                            <p>Over 15 million podcast episodes</p>
                        </div>
                        
                    </div>
                    <div className='footer-3-con-1'>
                        <p>Condition of Use & Sale Privacy Notice Interest-Based Ads</p>
                        <p>© 1996-2023, Amazon.com, inc. Or its affiates</p>
                            
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer