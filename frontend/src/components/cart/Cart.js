
import { Fragment } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { Link } from 'react-router-dom'

const Cart = () => {
    const {cartItems} = useSelector(state => state.cart)
    let totalUnits = 0
    let estTotal = 0
    return (
        <Fragment>
            <MetaData title={'Cart'}/>
            {cartItems.length == 0 ? 'Your cart is empty' : 
            <Fragment>
                    <h2 className="mt-5">Your Cart: <b>{ cartItems.length } items</b></h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8" >

                            {
                                cartItems.map( item =>
                             { 
                                totalUnits = totalUnits + item.quantity
                                estTotal = estTotal + item.quantity * item.price
                                 return(
                                    <div className="cart-item" key={item.name}>
                                      <hr />

                                    <div className="row">
                                        <div className="col-4 col-lg-3">
                                            <img src={item.image} alt={item.name} height="90" width="115" />
                                        </div>
    
                                        <div className="col-5 col-lg-3">
                                            <Link to={`/product/${item.product}`} >{item.name}</Link>
                                        </div>
    
    
                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p id="card_item_price">${item.price}</p>
                                        </div>
    
                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <div className="stockCounter d-inline">
                                                <span className="btn btn-danger minus">-</span>
                                                <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />
    
                                                <span className="btn btn-primary plus">+</span>
                                            </div>
                                        </div>
    
                                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger"></i>
                                        </div>
    
                                    </div>
                                </div>
                                )
                                                 
                            })}
                        </div>



                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal:  <span className="order-summary-values">{totalUnits} (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">${estTotal.toFixed(2)}</span></p>
                
                                <hr />
                                <button id="checkout_btn" className="btn btn-primary btn-block">Check out</button>
                            </div>
                        </div>
                    </div>
            </Fragment>
            }
        </Fragment>            
    
    )
}

export default Cart