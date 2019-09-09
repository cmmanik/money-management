import React  from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// const classes = useStyles();
import classes from './c.module.css'
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
    

    onchangeHandler = e => {
        this.setState({[e.target.name]:e.target.value})
        if(e.target.name === 'password2') {
          //  this.state.errors.name="Password not Match!"
        }
        // console.log(e.target)
    }

    submitHandler = e => {
        e.preventDefault();
        console.log(this.state)
    }


    render() {

       
    let { email, password, } = this.state;
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
                     <form className={classes.form} onSubmit={this.submitHandler}  autoComplete="off">
                       <Grid container spacing={2}>
                 
                       
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            onChange={this.onchangeHandler}
                            name="email"
                            value={email}
                            autoFocus
                            autoComplete="email"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            onChange={this.onchangeHandler}
                            name="password"
                            value={password}
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                          />
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
                    </form>
                   </div>
                </Container>
       
       )
    }
}
export default Login
