import React, {Fragment, useEffect} from 'react'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import {useSelector } from 'react-redux'
import {useAlert } from 'react-alert'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import axios from 'axios'

const Payment = ({history}) => {
    // const stripe = useStripe();
    // const elements = useElements();
    const alert = useAlert();
    const {cartItems, shippingInfo} = useSelector(state => state.cart)
    const {user} = useSelector(state => state.user)
    const order = JSON.parse(sessionStorage.getItem('orderInfo'))
   
    const handleSubmit = async (event) => {
      event.preventDefault();
      // const data = {
      //   "amount" : Math.round(order.totalPrice * 100)
      // }
      // try{
      //   const {clientSecret} = await axios.post('/api/v1/pay', data)
      //   // if (!stripe || !elements) {
      //   //   return;
      //   // }
        
      //   await stripe.confirmCardPayment(clientSecret, {
      //     payment_method: {
      //       card: document.getElementById('card_num_field'),
      //       billing_details: {
      //         name: 'Jenny Rosen',
      //       },
      //     },
      //   }).then(function(result) {
      //     // Handle result.error or result.paymentIntent
      //     console.log(result)
      //   });
      
      // }catch(e) {
      //    alert.error(e.response.data.message)
      // }

    }
    return (
        <Fragment>
            <MetaData title='Payment | shopDay'/>
            <CheckoutSteps shipping confirmOrder payment/>
        <div className="row wrapper">
		<div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={handleSubmit}>
                <h1 className="mb-4">Card Info</h1>
                <div className="form-group">
                  <label htmlFor="card_num_field">Card Number</label>
                  <input
                    type="text"
                    id="card_num_field"
                    className="form-control"
                  />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_exp_field">Card Expiry</label>
                  <input
                    type="text"
                    id="card_exp_field"
                    className="form-control"  
                />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_cvc_field">Card CVC</label>
                  <input
                    type="text"
                    id="card_cvc_field"
                    className="form-control"
                  />
                </div>
      
            
                <button
                  id="pay_btn"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  Pay
                </button>
    
              </form>
			  </div>
        </div>
        </Fragment>
    )
}

export default Payment
