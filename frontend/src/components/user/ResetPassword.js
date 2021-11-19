import React, {Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { resetPassword, clearErrors } from '../../actions/UserActions'
import MetaData from '../layout/MetaData';

const ResetPassword = ({history,  match}) => {

    const token = match.params.resetToken;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmpassword] = useState('')
    const dispatch = useDispatch();
    const alert = useAlert();
    const {loading, success, error} = useSelector(state => state.resetPassword)
    useEffect( () => {
        if(success) {
            alert.success('reset password successfully')
            history.push('/login')
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors());
        }

    }, [dispatch, alert, history, success, error])
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(resetPassword(token, password, confirmPassword))
    }
    return (
        <Fragment>
            <MetaData title={'Reset Password'}/>
		<div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => {setConfirmpassword(e.target.value)} }
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={loading? true: false}>
                        Set Password
                    </button>

                </form>
            </div>
        </div>
        </Fragment>
    )
}

export default ResetPassword
