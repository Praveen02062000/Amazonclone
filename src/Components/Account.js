import React from 'react';
import "../Styles/Account.css";
import order from "../Assets/Logo/account/order.png";
import lock from "../Assets/Logo/account/lock.png";
import prime from "../Assets/Logo/account/prime.png";
import address from "../Assets/Logo/account/address.png";
import payment from "../Assets/Logo/account/payment.png";
import amazonpay from "../Assets/Logo/account/amazonpay.png";
import contact from "../Assets/Logo/account/contact.png";
import amazonbusiness from "../Assets/Logo/account/amazon business.jpg";
import { useNavigate } from 'react-router-dom';
import { Styles } from '../Config/Cotegories';

function Account({backscreenflag}) {
    const navigate = useNavigate()
  return (
    <div className='account-con' style={Styles(backscreenflag)}>
        <div className='main-account-con'>
            <div className='title-con'>
                <h1>Your Account</h1>
            </div>
            <div className='account-menu-con'>
                <div className='acc-con'>
                    <img src={order} alt='Order'/>
                    <div>
                        <p>Your Orders</p>
                        <p>Track, return, or buy things again</p>
                    </div>
                </div>
                <div className='acc-con'>
                    <img src={lock} alt='Order'/>
                    <div>
                        <p>Login & security</p>
                        <p>Edit login, name, and mobile number</p>
                    </div>
                </div>
                <div className='acc-con'>
                    <img src={prime} alt='Order'/>
                    <div>
                        <p>prime</p>
                        <p>View benefits and payments settings</p>
                    </div>
                </div>
                <div className='acc-con' onClick={()=>{
                    navigate("/address")
                }}>
                    <img src={address} alt='Order'/>
                    <div>
                        <p>Your Address</p>
                        <p>Edit addresses for orders and gifts</p>
                    </div>
                </div>
                <div className='acc-con'>
                    <img src={payment} alt='Order'/>
                    <div>
                        <p>Payment options</p>
                        <p>Edit or add payment methods</p>
                    </div>
                </div>
                <div className='acc-con'>
                    <img src={amazonpay} alt='Order'/>
                    <div>
                        <p>Amazon pay Balance</p>
                        <p>Add money to your balance</p>
                    </div>
                </div>
                <div className='acc-con'>
                    <img src={contact} alt='Order'/>
                    <div>
                        <p>Contact Us</p>
                        
                    </div>
                </div>
                <div className='acc-con'>
                    <img src={amazonbusiness} alt='Order'/>
                    <div>
                        <p>Amazon Business</p>
                        <p>Save up to 28% with GST invoice</p>
                        <p>and bulk discounts,purchase on</p>
                        <p>credit, and more</p>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className='bottom-account-con'>
                <div>
                    <h5>Digit content and devices</h5>
                    <p>Apps and more</p>
                    <p>Content and devices</p>
                    <p>Digital gifts you've received</p>
                </div>
                <div>
                    <h5>Email alerts, messages, and ads</h5>
                    <p>Advertising preference</p>
                    <p>Communication preferences</p>
                    <p>SMS alert preference</p>
                    <p>Message center</p>
                    <p>Alexa shopping notifications</p>
                    <p>Deals Notifications</p>
                </div>
                <div>
                    <h5>More ways to pay</h5>
                    <p>Default Purchase Settings</p>
                    <p>Amazon Pay</p>
                    <p>Bank accounts for refunds</p>
                    <p>Coupons</p>
                </div>
                <div>
                    <h5>Ordering and shopping preferences</h5>
                    <p>Leave packaging feedback</p>
                    <p>Lists</p>
                    <p>Manage saved IDs</p>
                    <p>Profile</p>
                    <p>Language settings</p>
                </div>
                <div>
                    <h5>Other accounts</h5>
                    <p>Account Linking</p>
                    <p>Amazon Web Services</p>
                    <p>Login with Amazon</p>
                </div>
                <div>
                    <h5>shopping programs and rentals</h5>
                    <p>Manage Your Profiles</p>
                    <p>Subscribe & Save</p>
                    <p>Shop the Kids' store by age</p>
                </div>
                <div>
                    <h5>Subscriptions</h5>
                    <p>Email</p>
                    <p>Memberships & Subscriptions</p>
                </div>
                <div>
                    <h5>Data and Privacy</h5>
                    <p>Request Your</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Account