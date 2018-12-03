import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { connect } from "react-redux";
import { drawerActions } from "../../_actions";
const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

class TemporaryDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.props.closed(false);
  }

  toggleDrawer = (side, open) => () => {
    if (open == true) this.props.opened(true);
    else this.props.closed(false);
  };

  render() {
    const { classes } = this.props;
    const fullList = (
      <div className={classes.fullList}>
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Logout"].map((text, index) => (
            <ListItem button key={text} component="a" href="/login">
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
    console.log('in Drawerssssssssssssss state=', this.props.message);
    return (
      <div>
        <Drawer
          anchor="right"
          open={this.props.message}
          onClose={this.toggleDrawer("right", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("right", false)}
            onKeyDown={this.toggleDrawer("right", false)}
          >
            {fullList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    opened: newStatus => {
      dispatch(drawerActions.opened(newStatus));
    },
    closed: newStatus => {
      dispatch(drawerActions.closed(newStatus));
    }
  };
};

function mapStateToProps(state) {
  const { message } = state.drawer;
  return {
    message
  };
}

const ConnectedDrawers = connect(
  mapStateToProps,
  mapDispatchToProps
)(TemporaryDrawer);
export default withStyles(styles)(ConnectedDrawers);
