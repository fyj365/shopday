import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productsReducer, productDetailsReducer } from './reducers/productReducers'
import { authReducer, userReducer, resetPasswrodReducer } from './reducers/userReducers'
import { cartReducer} from './reducers/cartReducers'
import { newOrderReducer, myOrdersReducer, OrderDetailsReducer} from './reducers/orderReducers'

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: authReducer,
    profile: userReducer,
    resetPassword: resetPasswrodReducer,
    cart: cartReducer,
    order: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetail: OrderDetailsReducer
})

let initalState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem('cartItems') )
        :[],
        shippingInfo: localStorage.getItem('shippingInfo') 
        ? JSON.parse(localStorage.getItem('shippingInfo'))
        : {}
    },
    order: sessionStorage.getItem('orderInfo') ? JSON.parse(sessionStorage.getItem('orderInfo')) : {},
}
const middleware = [thunk]; 
const store = createStore(reducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;