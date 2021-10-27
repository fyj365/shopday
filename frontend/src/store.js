import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productsReducer } from './reducers/productReducers'
const reducer = combineReducers({
    products: productsReducer
})

let initalState = {}
const middleware = [thunk]; 
const store = createStore(reducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;