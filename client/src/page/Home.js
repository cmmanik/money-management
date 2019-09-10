import React from 'react'
import {Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../store/actions/authAction';

const Home = props =>{
    return (
        <div>
             <h1>Home</h1>
            {props.auth.isAurienticated ? <Link to="/login" onClick={()=>props.logout(props.history)}>Logout</Link> : <Link to="/login">Login</Link>}
             <a href="/">Home</a>
        </div>
    )
}

const mapStateToProps = state => ({
    auth:state.auth
})
export default connect(mapStateToProps, {logout}) (Home)
