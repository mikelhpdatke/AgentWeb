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
  }
});

const options = [
  "Lấy dữ liệu PID và MD5",
  "Lấy dữ liệu mạng",
  "Lấy dữ liệu syscall"
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
      dataRecevied: ""
    };
    this.handleChange = this.handleChange.bind(this);
    subscribeToTimer((err, res) => {
      this.setState(state => {
        let newData = state.dataRecevied;
        newData = newData + res;
        return { dataRecevied: newData };
      });
    });
  }
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
        <h1 className={classes.h1}>{this.props.message.name}</h1>
        <div class="container">
          <div class="row justify-content-center">
            <div className="col-4">
              <div className={classes.root}>
                <List component="nav">
                  <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label="Chức năng"
                    onClick={this.handleClickListItem}
                  >
                    <ListItemText
                      primary="Chức năng"
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
          <div class="container">
            <div class="row justify-content-center">
              <div col-6>
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
                    HuanFetch("http://localhost:8081/api/fetch", data).then(
                      req => {
                        console.log('Run send_cmd ok!!!');
                      }
                    );
                  }}
                >
                  Gửi
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col">
              <TextareaAutosize
                value={this.state.dataRecevied}
                rows={100}
                style={{ marginTop: 50, width: "100%", minHeight: 350 }}
              />
            </div>
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
