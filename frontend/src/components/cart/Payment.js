import React, {Fragment, useEffect} from 'react'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import {useSelector, useDispatch } from 'react-redux'
import {useAlert } from 'react-alert'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import axios from 'axios'
import {createOrder, clearErrors} from '../../actions/orderActions'
import {removeAllItemsFromCart} from '../../actions/cartActions'
const Payment = ({history}) => {
  const elements = useElements();
    const stripe = useStripe();
    const alert = useAlert();
    const dispatch = useDispatch();
    const {cartItems, shippingInfo} = useSelector(state => state.cart)
    const {user} = useSelector(state => state.user)
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const {error} = useSelector(state => state.order)

    const orderData = {
      orderItems: cartItems,
      shippingInfo: shippingInfo,
    }
    if(orderInfo) {
      orderData.itemsPrice =  orderInfo.itemsPrice
      orderData.taxPrice = orderInfo.shippingPrice
      orderData.shippingPrice = orderInfo.tax
      orderData.totalPrice = orderInfo.totalPrice
    }

    const options = {
      style:{
        base: {
          fontSize: '1rem',
          padding: '5px',
          top: '5px'
        },
        invalid: {
          color: '#FF0000'
        }
      }
    }

    useEffect(() => {
      if(error) {
        alert.error('Failed to create order !')
        dispatch(clearErrors())
      }

    }, [alert, error, dispatch])

    const handleSubmit = async (event) => {
      event.preventDefault();
      document.querySelector('#pay_btn').disabled = true;

      const data = {
        "amount" : Math.round(orderInfo.totalPrice * 100)
      }
      let res;

      try{

        const config = {
          headers: {
              'Content-Type': 'application/json'
          }
        }

        res = await axios.post('/api/v1/pay', data, config)
        
        if (!stripe || !elements) {
          return;
        }
        console.log(res.data.client_secret)

        if(res.error) {
           error.alert(res.error.message)
           document.querySelector('#pay_btn').disabled = false;

        } else{ 
          await stripe.confirmCardPayment(res.data.client_secret, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                  name: user.name,
                  email: user.email,
                  phone: shippingInfo.phoneNo
            },
          },
        }).then(function(result) {
          if (result.error) {
              alert.error(result.error.message)
          } else {
            if(result.paymentIntent.status === 'succeeded') {

              orderData.paymentInfo =  {
                id: result.paymentIntent.id,
                status: result.paymentIntent.status
              }
              dispatch(removeAllItemsFromCart())
              dispatch(createOrder(orderData))
              history.push('/success')
            }
          }
          });
        }
      } catch(e) {
        document.querySelector('#pay_btn').disabled = false;
         alert.error(e.message)
      }

    }

    return (
        <Fragment>
            <MetaData title='Payment | shopDay'/>
            <CheckoutSteps shipping confirmOrder payment />
        <div className="row wrapper">
		<div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={handleSubmit}>
                <h1 className="mb-4">Card Info</h1>
                <div className="form-group">
                  <label htmlFor="card_num_field">Card Number</label>
                  <CardNumberElement
                    type="text"
                    id="card_num_field"
                    className="form-control"
                    options={options}
                  />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_exp_field">Card Expiry</label>
                  <CardExpiryElement
                    type="text"
                    id="card_exp_field"
                    className="form-control"  
                    options={options}

                />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_cvc_field">Card CVC</label>
                  <CardCvcElement
                    type="text"
                    id="card_cvc_field"
                    className="form-control"
                    options={options}

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
