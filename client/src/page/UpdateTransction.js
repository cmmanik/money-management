import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { updateTransction } from '../store/actions/transcationAction';
import {connect} from 'react-redux'
import axios from 'axios'
class UpdateTransction extends React.Component {
   
    state = {
        type:'',
        balance:0,
        note:''
    }

   
    componentDidMount() {
        let id = this.props.match.params.id;
        axios.get(`/api/transction/${id}`)
            .then(response => {
               
                this.setState({
                    type:response.data.type,
                    balance:response.data.balance,
                    note:response.data.note
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
     onChangeHandler = (e) => {
       this.setState({[e.target.name]:e.target.value})
    }

     submitHandler = e => {
        let id = this.props.match.params.id;
        e.preventDefault();
      
       const updatedata = {
         balance:Number(this.state.balance),
         note:this.state.note,
         type:this.state.type

       }
       
      
       this.props.updateTransction(updatedata, id);
       this.props.history.push('/')
       
    }

render(){
   
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div >
        
        <Typography style={{marginBottom:'15px'}} component="h1" variant="h5">
          Update Transaction
        </Typography>
        <form  noValidate onSubmit={(e) =>this.submitHandler(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                onChange={this.onChangeHandler}
                fullWidth
              value={this.state.balance}
                type="number"
                id="email"
                label="Update Transcation"
                name="balance"
               
              />
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth>
                        <InputLabel htmlFor="age-simple"  >Type</InputLabel>
                        <Select
                         onChange={this.onChangeHandler}
                        value={this.state.type}
                        inputProps={{
                            name: 'type',
                            id: 'age-simple',
                          }}
                        fullWidth
                        >
                        <MenuItem value="income">Income</MenuItem>
                        <MenuItem value='expense'>Expense</MenuItem>
                        </Select>
                    </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                onChange={this.onChangeHandler}
                fullWidth
                name="note"
                value={this.state.note}
                label="Note"
                type="textarea"
                multiline={true}
                rows={2}
                rowsMax={4}
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            
          >
            Update Transaction
          </Button>
        </form>
      </div>
    </Container>
  );
}
}

export default  connect(null, {updateTransction})(UpdateTransction)