import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import ProjectIndex from './Components/ProjectIndex';
import AuthService from './auth-service';
import { Link } from 'react-router-dom'


class Signup extends Component {
  

    state = { usernameInput: '', passwordInput: '' };
    service = new UserService();
    // new UserService because UserService is a class. so it makes a new instance of UserService.
  }



componentDidMount(){
    // each time app.js logs in, it checks to see who is logged in.



}



  // handleChange() and handleSubmit() will be added here

  handleChange = (e) =>{

    this.setState({[e.target.name]: e.target.value})
  }


    handleFormSubmit = (e) =>{
      e.preventDefault();
      // you could do Axios.post('http://localhost:5000/api/signup, {username: this.state.usernameInput, password: this.state.passwordInput}, {withCredentials: true}) 
      
      this.service.signup(this.state.usernameInput, this.state.passwordInput)
      .then((userFromDB)=>{
        console.log('=-=--==-=-=-=-=', userFromDB.data)
          // this.props.logTheUserIntoApComponent(userFromDB)
          // here we wait for the API to give us the user object back after logging in. then we pass that user object back to the app component.
          this.setState({usernameInput: '', passwordInput: ''})

          this.props.history.push('/project-index');
          // redirect back to '/project-index' page once .then is carried out.
          
          
          
      })
      .catch((err)=>{
          console.log('sorry, something wrong', err)
      })

    }


  render(){
    return(

          <div>
                <form onSubmit={this.handleFormSubmit}>
                  <label>Username:</label>
                  <input type="text" name="usernameInput" value={this.state.usernameInput} onChange={ e => this.handleChange(e)}/>
                  
                  <label>Password:</label>
                  <input name="passwordInput" value={this.state.passwordInput} onChange={ e => this.handleChange(e)} />
                  
                  <input type="submit" value="Signup" />
                </form>

                <p>Already have account? 
                    {/* <Link to={"/"}> Login</Link> */}
                </p>

              </div>


      // more code will be added here
    )
  }


export default Signup;