import React  from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

// const classes = useStyles();
import classes from './c.module.css'
import { login } from '../store/actions/authAction';
import { connect } from 'react-redux';


const stylesss = {
    margin:'0 auto',
    textAlign:'center',
    marginBottom:'10px',
}
class Login extends React.Component {

    state = {
        email:'',
        password:'',
        errors:{}
    }
    
    static getDerivedStateFromProps(props, state) {
      if(JSON.stringify(props.auth.errors) !== JSON.stringify(state.errors) ) {
        state.errors = props.auth.errors
      }
      return null;
    }

    onchangeHandler = e => {
        this.setState({[e.target.name]:e.target.value})
    }

    submitHandler = e => {
        e.preventDefault();
        let {email, password} = this.state;
        this.props.login({email, password}, this.props.history)
    }


    render() {

       
    let { email, password, errors} = this.state;
        return (

            <Container component="main" maxWidth="xs">
                  <CssBaseline />
                   <div className={classes.paper}>
                     <Avatar className={classes.avatar} style={stylesss}>
                       <LockOutlinedIcon />
                     </Avatar>
                     <Typography style={stylesss} component="h1" variant="h5">
                       Log In
                     </Typography>
                     <ValidatorForm className={classes.form} onSubmit={this.submitHandler}  autoComplete="off">
                       <Grid container spacing={2}>
                 
                       
                        <Grid item xs={12}>
                          <TextValidator
                            variant="outlined"
                            fullWidth
                            id="email"
                            label="Email Address"
                            onChange={this.onchangeHandler}
                            name="email"
                            value={email}
                            autoFocus
                            validators={['required', 'isEmail']}
                            errorMessages={['This field is required', 'Email is not valid']}
                            autoComplete="email"
                          />
                      {errors.email ? <FormHelperText className={classes.error} id="component-error-text">{errors.email}</FormHelperText>:""}
                        </Grid>
                        <Grid item xs={12}>
                          <TextValidator
                            variant="outlined"
                            fullWidth
                            onChange={this.onchangeHandler}
                            name="password"
                            value={password}
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            validators={['required']}
                            errorMessages={['This field is required']}
                          />
                             {errors.password ? <FormHelperText className={classes.error} id="component-error-text">{errors.password}</FormHelperText>:""}
                       
                        </Grid>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="I want to receive inspiration, marketing promotions and updates via email."
                          />
                        </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        Log In
                      </Button>
                      <Grid container justify="flex-end">
                        <Grid item>
                          <Link to="/register" variant="body2">
                            Already have an account? Sign in
                          </Link>
                        </Grid>
                      </Grid>
                    </ValidatorForm>
                   </div>
                </Container>
       
       )
    }
}

const mapStateToProps = state => ({
  auth:state.auth
})
export default connect(mapStateToProps, {login})(Login)
