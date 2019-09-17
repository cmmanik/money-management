import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import {NavLink, Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { logout } from '../store/actions/authAction';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = props => {
  const classes = useStyles();

let {auth} = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
      <div id="main">
  <div className="container">
    <nav position="static">
      <div className="nav-fostrap">
        <ul>
        <li><NavLink to="/" color="inherit">Home</NavLink></li>
          {
            auth.isAurienticated ? 
              <React.Fragment>
                  <li><NavLink to="/login" onClick={()=>props.logout(props.history)}>Logout</NavLink></li>
              </React.Fragment>
              : <React.Fragment>
                <li><NavLink to="/register">Register</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
              </React.Fragment>
          }
          
         
          
        </ul>
      </div>
      <div className="nav-bg-fostrap">
        <div className="navbar-fostrap"> <span></span> <span></span> <span></span> </div>
        <Link to="/" className="title-mobile">Money managment </Link>
      </div>
    </nav>
</div>
</div>
      </AppBar>
    </div>
  );
}
const mapStateToProps = state => ({
  auth:state.auth
})
export default connect(mapStateToProps, {logout})(withRouter(Navbar));
