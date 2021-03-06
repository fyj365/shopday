import React from 'react'
import { Route, Link  } from  'react-router-dom'
import  '../../App.css'
import Search from './Search'
import {useAlert } from 'react-alert'
import {useSelector, useDispatch} from 'react-redux'
import { logout } from '../../actions/UserActions'
// import { addItemToCart } from '../../actions/cartActions'
const Header = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const {user, loading } = useSelector(state => state.user)
    const {cartItems } = useSelector(state => state.cart)
    const  logoutHandler = () => {
        dispatch(logout());
        alert.success('logout successfully');
    }
    return (  
        <div>
                <nav className="navbar row">
                    <div className="col-12 col-md-3">
                        <div className="navbar-brand">
                        <Link to='/' >
                        <img src="/images/logo.png" alt="logo"/>
                        </Link>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 mt-2 mt-md-0">
                        <Route render={ ( history ) => <Search myHistory={ history } />  } /> 
                    </div>

                    <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                        <Link to="/cart">
                            <span id="cart" className="ml-3">Cart</span>
                            <span className="ml-1" id="cart_count">{cartItems.length}</span>
                        </Link>
                        {user  ? 
                        <div className="ml-3 dropdown d-inline"> 
                            <Link to="#!"className="btn dropdown-toggle text-white mr-4" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <img src={user.avatar && user.avatar.url || '/images/default_avatar.jpg'} width={30} alt={user.name} className="rounded mr-2"/>
                                            <span>{user && user.name}</span>
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <Link className="dropdown-item" to="/me">My profile</Link>
                                <Link className="dropdown-item" to="/" onClick={logoutHandler}>Logout</Link>
                            </div>
                        </div>
                        : 
                        !loading &&  <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}
                    </div>
                    </nav>
        </div>
    )
}

export default Header
 