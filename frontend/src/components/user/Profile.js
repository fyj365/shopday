
import react, {Fragment} from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import {useSelector } from 'react-redux'
const Profile = () => {
    const {loading, user} = useSelector(state => state.user)
    return (
        <Fragment>
            <MetaData title="My Profile"/>
            {loading ? <Loader/> : (
            <div className="container container-fluid">
            <h2 className="mt-5 ml-5">My Profile</h2>
            <div className="row justify-content-around mt-5 user-info">
                <div className="col-12 col-md-3">
                    <figure className='avatar avatar-profile'>
                        <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
                    </figure>
                    <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                        Edit Profile
                    </Link>
                </div>
         
                <div className="col-12 col-md-5">
                     <h4>Full Name</h4>
                     <p>{user.name}</p>
         
                     <h4>Email Address</h4>
                     <p>{user.email}</p>
                     <h4>Joined At</h4>
                     <p>{new Date(user.createdAt).toISOString().split('T')[0]}</p>
    
                     <Link to="/orders" className="btn btn-danger btn-block mt-5">
                        My Orders
                    </Link>
    
                    <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                        Change Password
                    </Link>
                </div>
            </div>
        </div>
        )}

        </Fragment>
    )
}
export default Profile