import React, {Fragment, useEffect, useState } from 'react'
import { updatePassword, clearErrors } from '../../actions/UserActions'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { loadUser } from '../../actions/UserActions'
import { UPDATE_PASSWORD_RESET} from '../../constants/userConstants'
import MetaData from '../layout/MetaData';
const UpdatePassword = ({history}) => {
    const [oldPassword, setOldpassword] = useState('');
    const [newPassword, setNewpassword] = useState('')
    const  dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, isUpdated } = useSelector(state => state.profile)
    useEffect(() => {
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(isUpdated) {
            dispatch(loadUser())
            history.push('/me')
            alert.success('Password updated successfully!')
            dispatch({type: UPDATE_PASSWORD_RESET})
        }
    }, [dispatch, alert, error, isUpdated])
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updatePassword(oldPassword, newPassword))
    }
    return (
        <Fragment>
            <MetaData title={'Password Update'}/>
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
                            name="oldPassword"
                            value={oldPassword}
                            onChange={(e)=>setOldpassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e)=>setNewpassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={loading?true: false}
                        >
                        Set Password
                    </button>

                </form>
            </div>
        </div>

        </Fragment>
    )
}

export default UpdatePassword
