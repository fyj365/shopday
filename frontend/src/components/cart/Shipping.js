import { Fragment, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import {saveShippingInfo } from '../../actions/cartActions'
import countryList from 'react-select-country-list'
import CheckoutSteps from './CheckoutSteps'

const Shipping = ({history}) => {
    const countryNames = countryList().getLabels()
    const { shippingInfo } = useSelector(state => state.cart)
    const [address, setAddress ] = useState(shippingInfo.address)
    const [city, setCity ] = useState(shippingInfo.city)
    const [postCode, setPostCode ] = useState(shippingInfo.postCode)
    const [phoneNo, setPhoneNo ] = useState(shippingInfo.phoneNo)
    const [country, setCountry ] = useState(shippingInfo.country)
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({address, city, postCode, phoneNo, country}))
        history.push('/confirmOrder')
    }
    return (
        <Fragment>
        <MetaData title={'Shipping|ShopDay'}/>
        <CheckoutSteps shipping/>

        <div className="row wrapper">
        <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
                <label htmlFor="address_field">Address</label>
                <input
                    type="text"
                    id="address_field"
                    className="form-control"
                    value={address}
                    onChange={(e)=> setAddress(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="city_field">City</label>
                <input
                    type="text"
                    id="city_field"
                    className="form-control"
                    value={city}
                    onChange={(e)=> setCity(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="phone_field">Phone No</label>
                <input
                    type="phone"
                    id="phone_field"
                    className="form-control"
                    value={phoneNo}
                    onChange={(e)=> setPhoneNo(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="postal_code_field">Postal Code</label>
                <input
                    type="number"
                    id="postal_code_field"
                    className="form-control"
                    value={postCode}
                    onChange={(e)=> setPostCode(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="country_field">Country</label>
                <select
                    id="country_field"
                    className="form-control"
                    value={country}
                    onChange={(e)=> setCountry(e.target.value)}
                    required
                >   
                    {countryNames.map(name => (
                        <option value={name} key={name}>{name}</option>
                    ))}  
                

                </select>
            </div>

            <button
                id="shipping_btn"
                type="submit"
                className="btn btn-block py-3"
            >
                CONTINUE
                </button>
        </form>
    </div>
    </div>
    </Fragment>

    )
}

export default Shipping