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

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      selectedIndex: 1,
      pid: 0,
      dataRecevied:"..."
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleChange(e){
    let name = e.target.name;
    let val = e.target.value;
    if (name == "pid") this.setState({pid:val},()=>{console.log(this.state)});
  }
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    let textField = (
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
    );

    if (this.state.selectedIndex != 2) textField = <div />;
    //console.log(this.props.title);
    return (
      <div>
        <h1 className={classes.h1}>{this.props.message.name}</h1>
        <div className={classes.contrainer}>
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
        <Button variant="contained" color="primary" onClick={()=>{console.log(this.state);this.setState({dataRecevied:"Hello"})}}>
          Gửi
        </Button>
        </div>
        {textField}
        <TextField
          id="outlined-read-only-input"
          label="Data Received"
          value={this.state.dataRecevied}
          margin="normal"
          InputProps={{
            readOnly: true
          }}
          variant="outlined"
        />
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
