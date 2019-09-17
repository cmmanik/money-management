import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { useState } from 'react'
import {addTransction} from '../../store/actions/transcationAction'
import { connect} from 'react-redux'
const FormDialog =props => {

    const [incomeType, setValues] = useState({
        type: 'income'
    });

    const [amount, setAmount] = useState({
        balance:0
    })
    const [note, setNote] = useState({
        note:''
    })
 
    const handleChange2 = (e) => {
        setAmount({
            ...amount,
            [e.target.name]: e.target.value
        })
    }
    const handleChange3 = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }
    // const [note, setNote] = useState('')

    function handleChange(event) {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    }

    const submitHandelr = e => {
        const newTransction = {
            type:incomeType.type,
            note:note.note,
            balance:Number(amount.balance)
        }
            // incomeType.type,
            // amount.balance,
            

        // )
        props.addTransction(newTransction)
    }

    const closeAndSubmit = e => {
        props.handleClose()
        submitHandelr()

    }
    return (
        <form onSubmit={submitHandelr}>
        <FormControl>
            
            <AddCircleOutlineIcon onClick={() => props.handleClickOpen()} />
            <Dialog open={props.open} onClose={() => props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add New Transaction</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
                    
                    <TextField
                        autoFocus
                        margin="dense"
                        id="amount"
                        name="balance"
                        onChange={handleChange2}
                        label="Enter Balance"
                        type="number"
                        inputProps={{
                            name: 'balance',
                            
                          }}
                        fullWidth
                    />
                    
                    <FormControl fullWidth>
                        <InputLabel htmlFor="age-simple"  >Type</InputLabel>
                        <Select
                        value={incomeType.type}
                        onChange={handleChange}
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
                    <TextField
                        autoFocus
                        margin="dense"
                        inputProps={{
                            name: 'note',
                            
                          }}
                        id="amount"
                        onChange={handleChange3}
                        label="Note about this amount"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.handleClose()} color="primary">
                        Cancel
          </Button>
                    <Button type="submit" onClick={() => closeAndSubmit()} color="primary">
                        Add
          </Button>
                </DialogActions>
            </Dialog>

        </FormControl>
        </form>
    );
}
export default connect(null, {addTransction})(FormDialog);