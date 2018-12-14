/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import { homeActions, servicesActions } from '../../_actions';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  card: {
    minWidth: 275,
    border: '3px solid rgb(131, 167, 233)',
    borderRadius: '20px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
class SimpleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    // this.props.inactive({ key: this.props.card, val: false });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    // console.log(this.props.status);
    const { classes, status, send } = this.props;
    // let status = "ACTIVE";
    // console.log(this.props.card);
    // console.log(this.props.message[this.props.card]+'??????wtf');
    // if (this.props.message[this.props.card] == false) status = "INACTIVE";
    // const textModal = "Connect";
    // console.log(this.props.status, this.props.status == 'INACTIVE');
    let button;
    if (status === 'INACTIVE') {
      button = (
        <Button size="small" onClick={this.handleOpen}>
          Connect
        </Button>
      );
    } else {
      button = (
        <Button
          size="small"
          onClick={() => {
            send({ name: this.props.name, id: this.props.card });
          }}
        >
          <Link to="/services">Analyse</Link>
        </Button>
      );
    }

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {`Client: ${this.props.name}`}
          </Typography>
          <Typography variant="h5" component="h2">
            {`IP: ${this.props.ip}`}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {`PORT: ${this.props.port}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color={status === 'ACTIVE' ? 'primary' : 'secondary'}
          >
            {status}
          </Button>
          {button}
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={classes.paper}>
              <Typography variant="h6" id="modal-title">
                CHÚ Ý
              </Typography>
              <Typography variant="subtitle1" id="simple-modal-description">
                BẠN CÓ CHẮC CHẮN MUỐN CÀI ĐẶT TÁC TỬ LÊN THIẾT BỊ KHÔNG?
              </Typography>
              <Button variant="contained" color="secondary">
                CÀI ĐẶT
              </Button>
            </div>
          </Modal>
        </CardActions>
      </Card>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  send: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  active: newStatus => {
    dispatch(homeActions.active(newStatus));
  },
  inactive: newStatus => {
    dispatch(homeActions.inactive(newStatus));
  },
  send: newStatus => {
    dispatch(servicesActions.send(newStatus));
  },
});

function mapStateToProps(state) {
  const { message } = state.home;
  return {
    message,
  };
}

const ConnectedCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(SimpleCard);

export default withStyles(styles)(ConnectedCard);
