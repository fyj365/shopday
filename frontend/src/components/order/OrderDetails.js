import React, {Fragment, useEffect} from 'react'
import {getMyOrderDetails, clearErrors} from '../../actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import {Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'

const OrderDetails = ({match}) => {
    const dispatch = useDispatch()
    const { loading, error, order} = useSelector(state => state.orderDetail)
    const { user } = useSelector(state => state.user)
    const { shippingInfo, paymentInfo, orderItems } = order

    useEffect(() => {

        if(error) {
            dispatch(clearErrors())
        }
        
        dispatch(getMyOrderDetails(match.params.id))

    },[dispatch, error, match.params.id])
    return (
        <Fragment>
            <MetaData title={'Order Details'}/>
        {loading ? <Loader /> : (
            <Fragment>
                {
                    order && (
                        <Fragment>
                <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-details">

                    <h1 className="my-5">Order #{order._id}</h1>

                    <h4 className="mb-4">Shipping Info</h4>
                    <p><b>Name:</b> {user.name}</p>
                    <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b>Address:</b> {shippingInfo && shippingInfo.address} , {shippingInfo && shippingInfo.city} , {shippingInfo && shippingInfo.country}</p>
                    <p><b>Amount:</b> ${order.totalPrice}</p>

                    <hr />

                    <h4 className="my-4">Payment</h4>
                    <p className="greenColor" ><b>{paymentInfo && paymentInfo.status}</b></p>


                    <h4 className="my-4">Order Status:</h4>
                    <p className='greenColor' ><b>{order && order.orderStatus}</b></p>


                    <h4 className="my-4">Order Items:</h4>

                    <hr />
                    {orderItems && orderItems.map(item => (
                        <Fragment key={item._id}>
                    <div className="cart-item my-1">
                    <div className="row my-5">
                        <div className="col-4 col-lg-2">
                            <img src={item.image} alt={item.name} height="45" width="65" />
                        </div>

                        <div className="col-5 col-lg-5">
                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </div>


                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p>${item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <p>{item.quantity} Piece(s)</p>
                        </div>
                    </div>
                    </div>
                    <hr />
                        </Fragment>

                    ))}

                </div>
            </div>
                        </Fragment>
                    )
                }

            </Fragment>
        )}
        </Fragment>
    )
}

export default React.memo(OrderDetails)
