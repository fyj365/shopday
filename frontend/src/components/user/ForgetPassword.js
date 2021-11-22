import React, {Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { forgetPassword, clearErrors } from '../../actions/UserActions'
import MetaData from '../layout/MetaData';

const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    const alert = useAlert()
    const dispatch = useDispatch()
    const {loading, error, success, message} = useSelector(state => state.resetPassword)
    useEffect(()=> {
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(success) {
            alert.success(message)
        }
    },[dispatch, alert, error, success, message])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(forgetPassword(email))
    }
    return (
        <Fragment>
            <MetaData title={'Forget Password'}/>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}>
                            Send Email
                    </button>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default ForgetPassword
