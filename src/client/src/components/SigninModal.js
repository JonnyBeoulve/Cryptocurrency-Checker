import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';

import SigninImg from '../img/signin_img.png';

import { zoomIn } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

/*======================================================== 
// Animated styles using Aphrodite and React Animations.
========================================================*/
const styles = StyleSheet.create({
  zoomIn: {
    animationName: zoomIn,
    animationDuration: '1s'
  }
})

class SigninModal extends Component {

  /*======================================================================
  // This will track the state of the signin form.
  ======================================================================*/
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  /*======================================================================
  // As input changes in the form, so will the state.
  ======================================================================*/
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  /*======================================================================
  // This will handle submission of the signin form. If any fields
  // are empty, show error within the div. Otherwise, post data
  // to the database (which has validation of its own) and make sure
  // no errors are shown anymore. If an error is caught during the
  // transaction, post to console.
  ======================================================================*/
  submitSignin = (e) => {
    e.preventDefault();

    if (!this.state.username || !this.state.password) {
      this.props.onFormIncomplete();
    } else {
      axios ({
        method: 'post',
        url: window.location.href + 'account/signin',
        data: { 
          username: this.state.username,
          password: this.state.password,
        }
      })
      .then(response => {
        this.props.onSignin();
        this.props.onSigninSuccess();
        this.props.onHideSignin();
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
        this.props.onSigninError();
      })
    }
  }

  /*======================================================================
  // Upon clicking the X on the top right of the modal, the modal
  // will close.
  ======================================================================*/
  handleCloseSigninModal = (e) => {
    this.props.onHideSignin();
  }

  /*======================================================================
  // If the user clicks the link to Create An Account, the signin modal
  // will close and the register modal will open.
  ======================================================================*/
  handleShowRegisterModal = (e) => {
    this.props.onHideSignin();
    this.props.onDisplayRegister();
  }

  /*======================================================================
  // This will render the signin modal.
  ======================================================================*/
  render() {
    return (
      
      <div className={["signin-modal", css(styles.zoomIn)].join(' ')}>
        <p className="modal-close" onClick={this.handleCloseSigninModal}>X</p>
        <img src={SigninImg} className="login-img" alt='' />
        <h3>Sign In</h3>
        <div className="signin-form">
          <form
              onSubmit={this.submitSignin}
              >
              <FormGroup>
                <FormControl
                  name="username"
                  type="text"
                  placeholder="Enter username" 
                  onChange={this.onChange} />
                <FormControl.Feedback />
                <FormControl
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  onChange={this.onChange} />
                <FormControl.Feedback />
              </FormGroup>
              <Button className="signin-submit" bsStyle="danger" bsSize="large" type="submit">Submit</Button>
            </form>
            <a className="create-account" onClick={this.handleShowRegisterModal}><p>Create an account</p></a>
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    signedInStatus: state.signedInStatus.signedIn
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSignin: () => dispatch({type: 'SIGNIN'}),
    onHideSignin: () => dispatch({type: 'HIDE_SIGNIN_MODAL'}),
    onDisplayRegister: () => dispatch({type: 'DISPLAY_REGISTER_MODAL'}),
    onSigninSuccess: () => dispatch({type: 'DISPLAY_MESSAGE_SIGNIN_SUCCESS'}),
    onSigninError: () => dispatch({type: 'DISPLAY_MESSAGE_SIGNIN_ERROR'}),
    onFormIncomplete: () => dispatch({type: 'DISPLAY_MESSAGE_FORM_INCOMPLETE'})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninModal);