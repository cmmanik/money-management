import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {Link} from 'react-router-dom'
const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin:'0 auto'
  },
});

const Transction = props =>  {

  const classes = useStyles();

  let id = props.match.params.id
  const [transction, setTransction] = useState({})
  useEffect(() => {
      axios.get(`/api/transction/${id}`)
          .then(response => {
              setTransction(response.data)
          })
          .catch(err => {
              let message = 'No data found!'
              setTransction({message})
              
          })
  },[id])


  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          src="https://timedotcom.files.wordpress.com/2017/08/money-dirty-hands-microbes.jpg?quality=85&w=1012&h=569&crop=1"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <MonetizationOnIcon /> {transction.balance}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {transction.note}
            <em>That money talks, I'll not deny, I heard it once: It said, 'Goodbye'.</em>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <em>Back to </em>
        <Button size="small" color="primary">
         <Link to="/">Home</Link>
        </Button>
      </CardActions>
    </Card>
  );
}


export default Transction;