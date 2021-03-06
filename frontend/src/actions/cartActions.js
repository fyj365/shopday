import axios from 'axios'
import { ADD_TO_CART, 
         REMOVE_ITEM_CART,
         SAVE_SHIPPING_INFO,
         REMOVE_ALL_ITEMS_CART
        } from '../constants/cartConstants'
import store from '../store'

export const addItemToCart =  (id, quantity) => async(dispatch) => {
    const { data } = await axios.get(`/api/v1/product/${id}`)
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(store.getState().cart.cartItems))
}
export const removeItemFromCart =  (id) => async(dispatch) => {
    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(store.getState().cart.cartItems))
}

export const removeAllItemsFromCart =  () => async(dispatch) => {
    dispatch({
        type: REMOVE_ALL_ITEMS_CART,
    })
    localStorage.setItem('cartItems', JSON.stringify(store.getState().cart.cartItems))
}

export const saveShippingInfo =  (data) => async(dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })
    localStorage.setItem('shippingInfo', JSON.stringify(data))
}