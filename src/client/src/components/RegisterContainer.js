import React, {Component } from 'react';
import {Button, FormGroup, FormControl} from 'react-bootstrap';
import axios from 'axios';

import Footer from './Footer';
import Header from './Header';

class RegisterContainer extends Component {

  /*======================================================================
  // This will track the state of the registration form.
  ======================================================================*/
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      emailAddress: '',
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
  // This will handle submission of the registration form. If any fields
  // are empty, show error within main div. Otherwise, post data
  // to the database (which has validation of its own) and make sure
  // no errors are shown anymore. If an error is caught during the
  // transaction, post to console.
  ======================================================================*/
  submitRegister = (e) => {
    e.preventDefault();

    if (!this.state.username || !this.state.password || !this.state.emailAddress ) {
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
          emailAddress: this.state.emailAddress
        }
      })
      .then(response => {
        this.setState({ 
          notice: true,
          noticeMessage: 'You have successfully registered.'
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
        this.setState({ 
          notice: true,
          noticeMessage: 'An error occurred during registration.'
        });
      })
    }
  } 

  /*======================================================================
  // This will render the login and registration forms.
  ======================================================================*/
  render() {
    return (
      <div className="register">
        <Header />
        <h3>Register</h3>
        <div className="register-form">
          <form
              onSubmit={this.submitRegister}
              >
              <FormGroup>
                <FormControl
                  name="username"
                  type="text"
                  placeholder="Enter username" 
                  onChange={this.onChange} />
                <FormControl.Feedback />
                <FormControl
                  name="emailAddress"
                  type="text"
                  placeholder="Enter email"
                  onChange={this.onChange} />
                <FormControl.Feedback />
                <FormControl
                  name="password"
                  type="text"
                  placeholder="Enter password"
                  onChange={this.onChange} />
                <FormControl.Feedback />
              </FormGroup>
              <Button className="register-submit" bsStyle="danger" bsSize="large" type="submit">Submit</Button>
            </form>
          </div>
          {(!this.state.notice)
            ? <p></p>
          : <p>An error occurred during registration!</p> }
        <Footer />
      </div>
    )
  }
}

export default RegisterContainer;