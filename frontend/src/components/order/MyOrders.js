import React, {Fragment, useEffect} from 'react'
import {Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import {useAlert} from 'react-alert'
import { useSelector, useDispatch } from 'react-redux'
import { getMyOrders, clearErrors } from '../../actions/orderActions'

const MyOrders = () => {
    const Alert = useAlert()
    const dispatch = useDispatch()
    const {loading, orders, error } = useSelector(state => state.myOrders)

    useEffect(() => {
        dispatch(getMyOrders())
        if(error) {
            Alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, Alert, error])
    return (
        <Fragment>
            <MetaData title='My Orders'/>
            {loading ? <Loader /> : (
                <Fragment>
                <h2 className="mt-5"> My Orders</h2>
                    {
                        ( !orders || orders.length === 0) ? <h2 className="text-center"> You don't have any order</h2> : (
                            <Fragment>
                                <div className="row">
                                    <table className="table table-striped">
                                    <thead>
                                        <tr>
                                        <th scope="col">#Order ID</th>
                                        <th scope="col">Number of Items</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Order Created At</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order._id}>
                                            <th scope="row">{order._id}</th>
                                            <td>{order.orderItems.length}</td>
                                            <td>{order.totalPrice.toFixed(2)}</td>
                                            <td>{order.createdAt}</td>
                                            <td>{order.orderStatus}</td>
                                            <td><Link to={`/order/${order._id}`} className=" btn btn-primary mt-1">view</Link></td>
                                            </tr>
                                        ))}

                                    </tbody>
                                    </table>
                                </div>
                            </Fragment>
                        )}

                </Fragment>

            )}

        </Fragment>
    )
}

export default MyOrders
