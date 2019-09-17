import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import classes from './c.module.css'
import IconButton from '@material-ui/core/IconButton';
import {
  Container, CardHeader, Card,
  Avatar, CardContent
} from '@material-ui/core'
import { connect } from 'react-redux';
import {loadTransction, removeTransction} from '../store/actions/transcationAction'
import Lists from '../components/List';
import List from '@material-ui/core/List';
import FormDialog from '../components/transaction/Transaction';


export class Dashboard extends Component {

  state = {
    open:false,
    setOpen:false,
  }
  componentDidMount() {
    
    this.props.loadTransction()

  }

  handleClickOpen = () => {
    this.setState({open:true})
  }

  handleClose =(e) => {
    this.setState({open:false})

  }

  render() {
    let {auth, transactions} = this.props;
    return (
      <Container >

        <Grid align="center" className={classes.main_card}>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
               {auth.user.firstName[0]}
          </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <FormDialog open={this.state.open} handleClickOpen={this.handleClickOpen} handleClose={this.handleClose} />
                </IconButton>
              }
              title={auth.user.firstName +" " + auth.user.lastName}
              subheader={auth.user.email}
            />
            
            <CardContent>
            <List className={classes.root}>
              {
                transactions.length === 0 ?  <h1>No Transaction</h1> : transactions.map(tr => <Lists key={tr._id} data={tr} />)
              }
          
               
            </List>
             
            </CardContent>
          </Card>
        </Grid>

      </Container>
    )
  }
}

const mapStateToProps = state => ({
  auth:state.auth,
  transactions:state.transaction
})
export default connect(mapStateToProps, {loadTransction, removeTransction})(Dashboard);
