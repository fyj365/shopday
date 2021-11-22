import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productsReducer, productDetailsReducer } from './reducers/productReducers'
import { authReducer, userReducer, resetPasswrodReducer } from './reducers/userReducers'
import { cartReducer} from './reducers/cartReducers'
const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: authReducer,
    profile: userReducer,
    resetPassword: resetPasswrodReducer,
    cart: cartReducer
})

let initalState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem('cartItems') )
        :[]
    }
}
const middleware = [thunk]; 
const store = createStore(reducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;