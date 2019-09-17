import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import { removeTransction } from '../store/actions/transcationAction';
import {connect } from 'react-redux'
import {Link } from 'react-router-dom'
const options = [
  'edite',
  'delete',
  'detail'
];

const ITEM_HEIGHT = 48;

const LongMenu = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }



  function handleClose(transction) {
    setAnchorEl(null);
   
    
    if(transction.type === 'delete') {
        props.removeTransction(transction.id)
        
    }
    if(transction.type === 'edite') {

    }
    if(transction.type === 'details') {

    }
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
          
        {options.map(option => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => handleClose('111')}>
               {option === 'detail' ? <Link to={`/transaction/${props.transctionid}`}><InfoIcon  /></Link> :''}
              {option === 'delete' ? <DeleteIcon onClick={() => handleClose({type:'delete', id: props.transctionid})} /> : ""  }
              {option === 'edite' ? <Link to={`/update/${props.transctionid}`}><EditIcon  /></Link> : ""  }
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default connect (null, {removeTransction})(LongMenu)