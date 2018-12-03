import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ConnectedCard from "./Card";
const styles = {
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
    justifyContent: "space-around"
  }
};

const listCard = [
  { name: "ProLink Camera", ip: "192.168.0.107", port: "22", card: "1" },
  { name: "Router Dlink", ip: "192.168.0.1", port: "80", card: "2" }
];
class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1 className={classes.h1}>Controller</h1>

        <div className={classes.contrainer}>
          {listCard.map(x => {
            return (
              <ConnectedCard
                name={x.name}
                ip={x.ip}
                port={x.port}
                card={x.card}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
