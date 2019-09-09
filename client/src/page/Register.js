import React  from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {register} from '../store/actions/authAction';
import {connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText'
import classes from './c.module.css'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const stylesss = {
    margin:'0 auto',
    textAlign:'center',
    marginBottom:'10px',
}
class Register extends React.Component {


    state = {
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        password2:'',
        errors:{}
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
     if(JSON.stringify(nextProps.auth.errors) !== JSON.stringify(prevState.errors)) {
       return {
         errors:nextProps.auth.errors
       }
     }
     return null;
    }
    //Onchange handler for control form
    onchangeHandler = e => {
        this.setState({[e.target.name]:e.target.value})
        if(e.target.name === 'password2') {
        //    this.setState({errors: this.state.errors.name})
        }
        // console.log(e.target)
    }

    //Submit handler for for submit the form
    submitHandler = e => {
        e.preventDefault();
        let {firstName, lastName, email, password, password2} = this.state;
        this.props.register({firstName, lastName, email, password, password2}, this.props.history)
       
        
    }

    // password match 
    componentDidMount() {

      ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
          if (value !== this.state.password) {
              return false;
          }
          return true;
      });
  }

  componentWillUnmount() {
      // remove rule when it is not needed
      ValidatorForm.removeValidationRule('isPasswordMatch');
  }


    render() {

       
    let {firstName, lastName, email, password, password2, errors } = this.state;
        return (

            <Container component="main" maxWidth="xs">
                  <CssBaseline />
                   <div className={classes.paper}>
                     <Avatar className={classes.avatar} style={stylesss}>
                       <LockOutlinedIcon />
                     </Avatar>
                     <Typography style={stylesss} component="h1" variant="h5">
                       Sign up
                     </Typography>
                     <ValidatorForm onSubmit={this.submitHandler}>
                     {/* <form className={classes.form}   autoComplete="off"> */}
                       <Grid container spacing={2}>
                         <Grid item xs={12} sm={6}>
                           <TextValidator
                            autoComplete="fname"
                            onChange={this.onchangeHandler}
                            name="firstName"
                            value={firstName}
                            variant="outlined"
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            validators={['required', 'minStringLength:3']}
                            errorMessages={['This field is required', 'Name is too sort!']}
                          />
                          {errors.firstName ? <FormHelperText className={classes.error} id="component-error-text">{errors.firstName}</FormHelperText>:""}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextValidator
                            variant="outlined"
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            onChange={this.onchangeHandler}
                            name="lastName"
                            value={lastName}
                            validators={['required', 'minStringLength:3']}
                            errorMessages={['This field is required', 'Name is too sort!']}
                            autoComplete="lname"
                          />
                        {errors.lastName ? <FormHelperText className={classes.error} id="component-error-text">{errors.lastName}</FormHelperText> :""}  
                        </Grid>
                        <Grid item xs={12}>
                          <TextValidator
                            variant="outlined"
                            
                            fullWidth
                            id="email"
                            label="Email Address"
                            onChange={this.onchangeHandler}
                            name="email"
                            value={email}
                            autoComplete="email"
                            validators={['required', 'isEmail']}
                            errorMessages={['This field is required', 'Email is not valid']}
                          />
                          {errors.email ? <FormHelperText className={classes.error} id="component-error-text">{errors.email}</FormHelperText> :""}
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
                            validators={['required', 'minStringLength:5']}
                            errorMessages={['This field is required', 'Password is too sort!']}
                            autoComplete="current-password"
                          />
                          {errors.password ? <FormHelperText className={classes.error} id="component-error-text">{errors.password}</FormHelperText> : ""}
                        </Grid>
                        <Grid item xs={12}>
                          <TextValidator
                            variant="outlined"
                            
                            fullWidth
                            onChange={this.onchangeHandler}
                            name="password2"
                            value={password2}
                            label="Confirm Password"
                            type="password"
                            id="password2"
                            autoComplete="current-password"
                            validators={['isPasswordMatch', 'required']}
                            errorMessages={['password mismatch', 'this field is required']}
                          />
                          {errors.password2 ? <FormHelperText className={classes.error} id="component-error-text">{errors.password2}</FormHelperText> : "" }
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
                        Sign Up
                      </Button>
                      <Grid container justify="flex-end">
                        <Grid item>
                          <Link to="/login" variant="body2">
                            Already have an account? Sign in
                          </Link>
                        </Grid>
                      </Grid>
                    {/* </form> */}
                    </ValidatorForm>
                   </div>
                </Container>
       
       )
    }
}

const mapStateToProps = state => ({
  auth:state.auth
})
export default connect(mapStateToProps, {register}) (Register)
