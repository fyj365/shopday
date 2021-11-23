import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails'
import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import { loadUser } from './actions/UserActions'
import store from './store'
import ProtectedRoute from './components/route/ProtectedRoute'
import EditProfile from './components/user/EditProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgetPassword from './components/user/ForgetPassword'
import ResetPassowrd from './components/user/ResetPassword'
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'

import Payment from './components/cart/Payment'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
function App() {

  const [stripeApikey, setStripeApiKey] = useState('')
  const stripeApikeyB = 'pk_test_51Jyw9NDMBgjKJmCnFSpPu8975Sg8JgyGzuhAjSsSffeiy2KTvITYj6gjSfgnK4LVhLkZgweneQ5xby5Thp518xbR00gvZZ1bP6'
  useEffect(() => {
    store.dispatch(loadUser())
    try{
      async function getStripApiKey() {
        const { data } = await axios.get('/api/v1/apikey');
  
        setStripeApiKey(data.stripeAPIkey)
      }
  
      getStripApiKey();
      console.log(stripeApikey)
    } catch (e) {
      console.log(e.message)
    }


  })
  
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact/>
          <Route path="/search/:keyword" component= {Home} />
          <Route path="/product/:id" component={ProductDetails} exact/>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/password/forget" component={ForgetPassword} />
          <Route path="/password/reset/:resetToken" component={ResetPassowrd} />
          <Route path="/cart" component={Cart} />
          <ProtectedRoute path="/shipping" component={Shipping} />
          <ProtectedRoute path="/confirmOrder" component={ConfirmOrder} />
          {/* {stripeApikeyB && 
            <Elements stripe={loadStripe(stripeApikeyB)} >
                <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          } */}
           <ProtectedRoute path="/payment" component={Payment} />
          <ProtectedRoute path="/me" component={Profile} exact/> 
          <ProtectedRoute path="/me/update" component={EditProfile} exact />
          <ProtectedRoute path="/password/update" component={UpdatePassword} />
        </div>
        <Footer />
      </div>
    </Router>

  );
}
export default App;
