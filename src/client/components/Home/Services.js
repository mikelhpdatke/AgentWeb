import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import TextField from "@material-ui/core/TextField";
import { servicesActions } from "../../_actions";
import TextareaAutosize from "react-textarea-autosize";
import openSocket from "socket.io-client";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const socket = openSocket("http://localhost:8081");
function subscribeToTimer(cb) {
  socket.on("timer", res => cb(null, res));
}

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  h1: {
    textAlign: "center",
    backgroundColor: "rgba(45, 45, 45, 0.1)",
    padding: "2px",
    color: "red",
    fontSize: "40px",
    marginTop: "3px"
  },
  contrainer: {
    marginTop: "50px",
    display: "flex",
    justifyContent: "center"
  },
  close: {
    padding: theme.spacing.unit / 2
  },
  card: {
    minWidth: 275,
    border: '3px solid rgb(131, 167, 233)',
    borderRadius: '20px',
    margin: '5px 5px',
    padding: '4px'
  }
});

const options = [
  "Get PID and MD5 data",
  "Get network data",
  "Get syscall data"
];

export async function HuanFetch(url, json) {
  const myRequest = new Request(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(json)
  });
  return await fetch(myRequest)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.debug("Something went wrong on api server!");
      }
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.debug(error);
    });
}
class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      selectedIndex: 1,
      pid: 0,
      dataRecevied: "",
      sendding: false,
      openSnackBar: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickSnackBar = this.handleClickSnackBar.bind(this);
    this.handleCloseSnackBar = this.handleCloseSnackBar.bind(this);
   
    subscribeToTimer((err, res) => {
      this.setState(state => {
        let newData = state.dataRecevied;
        newData = newData + res;
        if (newData.length > 10) newData = "hello";
        return { dataRecevied: newData, sendding: false, openSnackBar:true };
      });
    });
  }
  handleClickSnackBar = () => {
    this.setState({ openSnackBar: true });
  };

  handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openSnackBar: false });
  };
  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null, dataRecevied: "" });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChange(e) {
    let name = e.target.name;
    let val = e.target.value;
    if (name == "pid")
      this.setState({ pid: val }, () => {
        console.log(this.state);
      });
  }
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    let sendState;
    if (this.state.sendding == true) {
      sendState = (
        <div className="col-1">
          <CircularProgress className={classes.progress} />
        </div>
      );
    } else {
      sendState = (
        <div className="col-1">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              //console.log(this.state);
              //this.setState({ dataRecevied: "Hello" });
              let data = {
                id: this.props.message.id,
                task: this.state.selectedIndex + 1,
                pid: this.state.pid
              };
              this.setState({ sendding: true }, () => {
                HuanFetch("http://localhost:8081/api/fetch", data).then(req => {
                  console.log("Run send_cmd ok!!!");
                  //setInterval(() => {
                  //  this.setState({ sendding: false, openSnackBar:true });
                  //}, 5000);
                });
              });
            }}
          >
            Send
          </Button>
        </div>
      );
    }
    let textField = (
      <div className="col-4">
        <TextField
          id="outlined-uncontrolled"
          label="PID"
          name="pid"
          value={this.state.pid}
          className={classes.textField}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
      </div>
    );

    if (this.state.selectedIndex != 2) textField = <div />;
    //console.log(this.props.title); this.props.message.card
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openSnackBar}
          autoHideDuration={5000}
          onClose={this.handleCloseSnackBar}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Successfully received</span>}
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={this.handleCloseSnackBar}
            >
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleCloseSnackBar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />

        <h1 className={classes.h1}>{this.props.message.name}</h1>
        <div className="container"  style={{marginTop:"200px"}}>
          <div className="row justify-content-center"  >
            <div className="col-4">
              <div className={classes.root}>
                <List component="nav" className={classes.card}>
                  <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label="Function"
                    onClick={this.handleClickListItem}
                  >
                    <ListItemText
                      primary="Function"
                      secondary={options[this.state.selectedIndex]}
                    />
                  </ListItem>
                </List>
                <Menu
                  id="lock-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose} 
                >
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === this.state.selectedIndex}
                      onClick={event => this.handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>

            {textField}
          </div>
          <div className="container">
            <div className="row justify-content-center">{sendState}</div>
          </div>
        </div>
      </div>
    );
  }
}

Services.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    active: newStatus => {
      dispatch(homeActions.active(newStatus));
    },
    inactive: newStatus => {
      dispatch(homeActions.inactive(newStatus));
    }
  };
};

function mapStateToProps(state) {
  const { message } = state.services;
  return {
    message
  };
}

const ConnectedServices = connect(
  mapStateToProps,
  mapDispatchToProps
)(Services);

export default withStyles(styles)(ConnectedServices);
