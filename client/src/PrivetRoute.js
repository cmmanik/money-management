import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'


const PrivetRoute = ({component:Component, ...rest}) => {
    let {auth} = {...rest}
      return (
        <Route {...rest} render={(props) => (
            auth.isAurienticated
                             ? <Component {...props} /> 
                             : <Redirect to={{
                                 pathname:'/login',
                                 state:{from:props.location}
                             }} />
    
           )} />
      )
};

const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps)(PrivetRoute);