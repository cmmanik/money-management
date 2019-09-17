import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import LongMenu from './MoreIconButton';

const Lists = props => {
    let { data } = props
    return (
            <ListItem key={"value"} role={undefined} dense button>
                <ListItemText id="labelId" className={ data.type === 'expense' ? 'red':'green'}  primary={"Amount= " +data.balance} />
                <ListItemText id="labelId"  primary={"Type= " +data.type} />
                <ListItemSecondaryAction>
                    {/* <IconButton edge="end" aria-label="comments"> */}
                        {/* <MoreIcon /> */}
                        <LongMenu transctionid={data._id} />
                    {/* </IconButton> */}
                </ListItemSecondaryAction>
            </ListItem>
    );
}

export default Lists;