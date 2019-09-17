import React from 'react';

import NoMatch from './page/Nomatch'
import Login from './page/Login';
import Register from './page/Register';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from './page/Footer';
import Dashboard from './page/Dashboard';
import './App.css'
import Transaction from './page/TransctionDetails';
import UpdateTransction from './page/UpdateTransction';
import Navbar from './components/Navbar';
import PrivetRoute from './PrivetRoute';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


function App() {
  const classes = useStyles();
  return (
   <BrowserRouter>
    <React.Fragment>
      <CssBaseline />
      <Navbar/>
      <main>
        <Container className={classes.cardGrid} >
          
       
  
          <Switch>
           
            <Route  path="/login" component={Login}  />
            <Route  path="/register" component={Register}  />
            <PrivetRoute exact  path="/" component={Dashboard}  />
            <PrivetRoute   path="/update/:id" component={UpdateTransction}  />
            <PrivetRoute  path="/transaction/:id" component={Transaction}  />
            <Route component={NoMatch} />
          </Switch>

       
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          @CM~Manik
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          
        </Typography>
        <Footer />
      </footer>
      {/* End footer */}
    </React.Fragment>
   </BrowserRouter>
  );
}

export default App;
