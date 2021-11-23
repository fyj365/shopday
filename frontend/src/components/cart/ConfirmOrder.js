import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { Link } from 'react-router-dom'

const ConfirmOrder = ( { history }) => {
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.user)
    const subtotal = cartItems.reduce((acc, item) => (acc + item.price * item.quantity), 0).toFixed(2)
    const shippingFee = 25
    const tax = 0
    const total = parseFloat(subtotal) + parseFloat(shippingFee) + parseFloat(tax)
    const ProceedPayment = () => {

        const data = {
            itemsPrice: subtotal,
            shippingPrice: shippingFee,
            tax: tax,
            totalPrice: total
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        history.push('/payment')

    }
    return (
        <Fragment>
                <MetaData title={'Shipping|ShopDay'}/>
                <CheckoutSteps shipping confirmOrder/>
            <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-confirm">

                <h4 className="mb-3">Shipping Info</h4>
                <p><b>Name:</b> {user.name}</p>
                <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                <p className="mb-4"><b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postCode}, {shippingInfo.country}</p>
                
                <hr />
                <h4 className="mt-4">Your Cart Items:</h4>

                <hr />
                {cartItems.length ? cartItems.map(item => (
                    <Fragment key={item.product}>
                    <div className="cart-item my-1" >
                        <div className="row">
                            <div className="col-4 col-lg-2">
                                <img src={item.image} alt="Laptop" height="45" width="65" />
                            </div>

                            <div className="col-5 col-lg-6">
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </div>


                            <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                <p>${item.price} * {item.quantity} = <b>${item.price * item.quantity}</b></p>
                            </div>

                        </div>
                    </div>
                    <hr />
                    </Fragment>
                )
                ) : <h2>Your cart is empty</h2>}


            </div>
			
			<div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${subtotal}</span></p>
                        <p>Shipping: <span className="order-summary-values">${shippingFee}</span></p>
                        <p>Tax:  <span className="order-summary-values">${tax}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">${parseFloat(total).toFixed(2)}</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={ProceedPayment}>Proceed to Payment</button>
                    </div>
                </div>
        </div>
        </Fragment>
    )
}

export default ConfirmOrder
