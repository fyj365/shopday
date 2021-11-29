import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    CLEAR_ERRORS,
    MY_ORDERDTAILS_REQUEST,
    MY_ORDERDTAILS_SUCCESS,
    MY_ORDERDTAILS_FAIL
} from '../constants/orderConstants'

export const newOrderReducer = (state= {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST: 
            return {
                ...state,
                loading: true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS: {
            return{
                ...state,
                error: null
            }
        }
        default: 
            return state
    }
}
export const myOrdersReducer = (state= { orders: [] }, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
        case MY_ORDERDTAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case MY_ORDERS_SUCCESS:
        case MY_ORDERDTAILS_SUCCESS: 
            return {
                loading: false,
                orders: action.payload
            }
        case MY_ORDERS_FAIL:
        case MY_ORDERDTAILS_FAIL: 
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS: {
            return{
                ...state,
                error: null
            }
        }
        default: 
            return state
    }
}