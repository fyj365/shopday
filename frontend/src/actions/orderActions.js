import axios from 'axios'
import {CREATE_ORDER_REQUEST, 
        CREATE_ORDER_SUCCESS, 
        CREATE_ORDER_FAIL, 
        CLEAR_ERRORS,
        MY_ORDERS_REQUEST,
        MY_ORDERS_SUCCESS,
        MY_ORDERS_FAIL,
        MY_ORDERDTAILS_SUCCESS,
        MY_ORDERDTAILS_REQUEST,
        MY_ORDERDTAILS_FAIL
    } from '../constants/orderConstants'
export const createOrder = (order) => async (dispatch) => {
    try {

        dispatch({ type: CREATE_ORDER_REQUEST})
        const config = {
            'content-type': 'application/json'
        }
        const { data } = await axios.post('/api/v1/order/new', order, config)
        
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data})

    }catch (error) {
        dispatch({ type: CREATE_ORDER_FAIL, payload: error.repsonse.data.errMessage})
    }
}
export const getMyOrders = () => async (dispatch) => {
    try {

        dispatch({ type: MY_ORDERS_REQUEST})

        const { data } = await axios.get('/api/v1/orders')
        
        dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders})

    }catch (error) {
        dispatch({ type: MY_ORDERS_FAIL, payload: error.message})
    }
}
export const getMyOrderDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: MY_ORDERDTAILS_REQUEST})

        const { data } = await axios.get(`/api/v1/order/${id}`)
        
        dispatch({ type: MY_ORDERDTAILS_SUCCESS, payload: data.order})

    }catch (error) {
        dispatch({ type: MY_ORDERDTAILS_FAIL, payload: error.message})
    }
}
// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}