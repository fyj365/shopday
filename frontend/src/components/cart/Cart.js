
import { Fragment } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { Link } from 'react-router-dom'
import {addItemToCart, removeItemFromCart } from '../../actions/cartActions'
const Cart = ({history}) => {
    const {cartItems} = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const removeItemFromCartHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }
    const increaseQty = (productId, qty, stock) => {
        const newQty = qty + 1 ;
        if(newQty <= stock) {
            dispatch(addItemToCart(productId, newQty))
        }
    }
    const decreaseQty = (productId, qty) => {
        const newQty = qty - 1;
        if (newQty > 0 ) {
            dispatch(addItemToCart(productId, newQty))
        }
    }
    const checkOut = () => {
        history.push('/login?redirect=shipping')
    }
    return (
        <Fragment>
            <MetaData title={'Cart'}/>
            {cartItems.length === 0 ? <h1 className="text-center mt-5">Your cart is empty </h1> : 
            <Fragment>
                    <h2 className="mt-5">Your Cart: <b>{ cartItems.length } item(s)</b></h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8" >

                            {
                                cartItems.map( item =>
                             { 
                                 return(
                                    <div className="cart-item" key={item.product}>
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
                                                <span className="btn btn-danger minus" onClick={() => decreaseQty(item.product, item.quantity)}>-</span>
                                                <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />
    
                                                <span className="btn btn-primary plus" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>
                                            </div>
                                        </div>
    
                                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeItemFromCartHandler(item.product)}></i>
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
                                <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((total, current) => (total + current.quantity) , 0) } (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">${cartItems.reduce((acc, item)=> (acc + item.price * item.quantity), 0).toFixed(2)}</span></p>
                
                                <hr />
                                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkOut}>Check out</button>
                            </div>
                        </div>
                    </div>
            </Fragment>
            }
        </Fragment>            
    
    )
}

export default Cart