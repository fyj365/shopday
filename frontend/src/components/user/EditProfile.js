import React, {Fragment, useEffect, useState } from 'react'
import { updateProfile, clearErrors } from '../../actions/UserActions'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { loadUser } from '../../actions/UserActions'
import { UPDATE_PROFILE_RESET} from '../../constants/userConstants'
import MetaData from '../layout/MetaData';
const EditProfile = ({ history }) => {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()

    const {user } = useSelector(state => state.user)
    const {isUpdated, loading, error } = useSelector( state => state.profile)

    useEffect(() => {
        if(user) {
            setName(user.name)
            setEmail(user.email)
            setAvatar(user.avatar.url)
        }
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success('updated profile successfully!')
            dispatch(loadUser())
            history.push('/me')
            dispatch({type: UPDATE_PROFILE_RESET })
        }

    }, [dispatch, alert, isUpdated, error, history, user])

    const submitHandler  = (e) => {
        e.preventDefault();
        dispatch(updateProfile(name, email, avatar));

    }
    const fileHander = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setAvatar(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };

    }
    return (
        <Fragment>
            <MetaData title={'Profile Update'}/>
             <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler} >
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input 
								type="name" 
								id="name_field" 
								className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatar || '/images/default_avatar.jpg'}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        onChange={fileHander}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading?true:false}>Update</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default EditProfile
