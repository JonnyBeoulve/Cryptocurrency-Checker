import React, {Component } from 'react';
import {Button, FormGroup, FormControl} from 'react-bootstrap';
import axios from 'axios';

import Footer from './Footer';
import Header from './Header';

import SigninImg from '../img/signin_img.png';

class SigninContainer extends Component {

  /*======================================================================
  // This will track the state of the signin form.
  ======================================================================*/
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      notice: false,
      noticeMessage: ''
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
  // are empty, show error within main div. Otherwise, post data
  // to the database (which has validation of its own) and make sure
  // no errors are shown anymore. If an error is caught during the
  // transaction, post to console.
  ======================================================================*/
  submitSignin = (e) => {
    e.preventDefault();

    if (!this.state.username || !this.state.password) {
      this.setState({ 
        notice: true,
        noticeMessage: "Form incomplete."
      });
    } else {
      axios ({
        method: 'post',
        url: window.location.href,
        data: { 
          username: this.state.username,
          password: this.state.password,
        }
      })
      .then(response => {
        this.setState({ 
          notice: true,
          noticeMessage: 'You have successfully signed in.'
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
        this.setState({ 
          notice: true,
          noticeMessage: 'An error occurred during sign in.'
        });
      })
    }
  } 

  /*======================================================================
  // This will render the login and registration forms.
  ======================================================================*/
  render() {
    return (
      <div className="signin">
        <Header />
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
                  type="text"
                  placeholder="Enter password"
                  onChange={this.onChange} />
                <FormControl.Feedback />
              </FormGroup>
              <Button className="signin-submit" bsStyle="danger" bsSize="large" type="submit">Submit</Button>
            </form>
            <a href="/register"><p>Create an account</p></a>
          </div>
          {(!this.state.notice)
            ? <p></p>
            : <p>{this.state.noticeMessage}</p> }
        <Footer />
      </div>
    )
  }
}

export default SigninContainer;