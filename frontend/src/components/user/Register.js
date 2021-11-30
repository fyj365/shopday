import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import {useDispatch, useSelector } from 'react-redux'

import { register, clearErrors } from '../../actions/UserActions'

const Register = ({history}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password,  setPassword] = useState('')
    const [avatar, setAvatar] = useState('/images/default_avatar.jpg')
    const alert = useAlert()
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password, avatar))
    }
    const {isAuthenticated, error, loading } = useSelector(state => state.user)
    const fileHandler = (e) => {
        // setAvatar(URL.createObjectURL(e.target.files[0]))
        let reader = new FileReader();
        let file = e.target.files[0]
        reader.readAsDataURL(file);
        reader.onload = function () {
            setAvatar(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    useEffect(() => {
        if(isAuthenticated) {
            history.push('/')
        }
        if(error) {
            alert.error(error);
            dispatch(clearErrors);
        }

    }, [dispatch, alert, isAuthenticated, error, history])

    return (
            <Fragment>
                <MetaData title={"Register"}/>
            <div className="row wrapper">
            <div className="col-10 col-lg-5">
            <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                <h1 className="mb-3">Register</h1>
    
              <div className="form-group">
                <label htmlFor="email_field">Name</label>
                <input type="name" id="name_field" className="form-control" 
                name="name"
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
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    
                  />
                </div>
      
                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
    
                <div className='form-group'>
                  <label htmlFor='avatar_upload'>Avatar</label>
                  <div className='d-flex align-items-center'>
                      <div>
                          <figure className='avatar mr-3 item-rtl'>
                              <img
                                  src={avatar}
                                  className='rounded-circle'
                                  alt="avatar preview"
                              />
                          </figure>
                      </div>
                      <div className='custom-file'>
                          <input
                              type='file'
                              name='avatar'
                              className='custom-file-input'
                              id='customFile'
                              onChange={fileHandler}
                          />
                          <label className='custom-file-label' htmlFor='customFile'>
                              Choose Avatar
                          </label>
                      </div>
                  </div>
              </div>
      
                <button
                  id="register_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading? true: false }
                >
                  REGISTER
                </button>
              </form>
              </div>
        </div>
            </Fragment>

    )
}

export default Register
