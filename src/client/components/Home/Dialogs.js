/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { dialogsActions } from '../../_actions';
import { PostApi } from '../Utils';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
  render() {
    const { dialogs, closeDialogs } = this.props;
    console.log(`${dialogs.message}ffffffffffffffff`);
    return (
      <div>
        <Dialog
          open={dialogs.message}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => {
            closeDialogs(false);
          }}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">WARNING</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure to install agent to this device?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                closeDialogs(false);
              }}
              color="primary"
            >
              Disagree
            </Button>
            <Button
              onClick={() => {
                closeDialogs(false);
                PostApi('/api/installAgent', {})
                  .then(res => {
                    if (res === undefined) Promise.reject(new Error('err'));
                    toast.success(
                      '🦄 Wow you has been install successfully, so easyy!',
                      {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                      }
                    );
                  })
                  .catch(() => {
                    toast.error(
                      ' Oops!!Got some error while installing agent....!!!!!!!!!!!!!!!!',
                      {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                      }
                    );
                  });
              }}
              color="primary"
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AlertDialogSlide.propTypes = {
  dialogs: PropTypes.object.isRequired,
  closeDialogs: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { dialogs } = state;
  return {
    dialogs,
  };
}

const mapDispatchToProps = dispatch => ({
  openDialogs: newStatus => {
    dispatch(dialogsActions.openDialogs(newStatus));
  },
  closeDialogs: newStatus => {
    dispatch(dialogsActions.closeDialogs(newStatus));
  },
});

const ConnectedAlertDialogSlide = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertDialogSlide);
export default ConnectedAlertDialogSlide;
