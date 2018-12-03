import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { homeActions, servicesActions } from "../../_actions";
import { Link } from "react-router-dom";
const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

class SimpleCard extends Component {
  constructor(props) {
    super(props);
    this.props.inactive({key:this.props.card, val:false});
  }
  render() {
    const { classes } = this.props;
    let status = "ACTIVE";
    //console.log(this.props.card);
    //console.log(this.props.message[this.props.card]+'??????wtf');
    if (this.props.message[this.props.card] == false) status = "INACTIVE";
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {"Client: " + this.props.name}
          </Typography>
          <Typography variant="h5" component="h2">
            {"IP: " + this.props.ip}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {"PORT: " + this.props.port}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={()=>{
            if (this.props.message[this.props.card] == true) this.props.inactive({key:this.props.card, val:false});
            else this.props.active({key:this.props.card, val:true});
          }}>{status}</Button>
          <Button size="small" onClick={()=>{this.props.send({name:this.props.name, id:this.props.card})}}
          ><Link to="/services" >Phân tích</Link></Button>
        </CardActions>
      </Card>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    active: newStatus => {
      dispatch(homeActions.active(newStatus));
    },
    inactive: newStatus => {
      dispatch(homeActions.inactive(newStatus));
    },
    send: newStatus => {
      dispatch(servicesActions.send(newStatus));
    }
  };
};

function mapStateToProps(state) {
  const { message } = state.home;
  return {
    message
  };
}

const ConnectedCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(SimpleCard);

export default withStyles(styles)(ConnectedCard);
