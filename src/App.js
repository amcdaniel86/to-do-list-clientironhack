import React, { Component } from 'react';
import './App.css';
ipmort Axios from 'axios';
import ProjectIndex from './Components/ProjectIndex';
import { Route, Switch, Link } from 'react-router-dom';
import Signup from '/.Components/Signup';

class ProjectIndex extends Component {


    state = {
      loggedinUser: null
    }

    service = new UserService()



    compoenntDidMount(){
        this.fetchUser()



    }

    logInTheUser = (userToLogin) =>{

        this.setState({logInTheUser: userToLogin})

    }


      showUser = () =>{
        if(this.state.loggedInUser){
          return(
            <div>Welcome, {this.state.loggedInUser.username}</div>
          )
        }
      }


        logout = () =>{
            this.service.logout();
            
        }




      render(){
          return(
            <div>
              <h1>We're still here</h1>

                <nav>
                    <Link to="/project-index">View Projects</Link>

                
                </nav>

{/* // if you need to pass props to a ocmponent you are rendering insdiea  route, you must use render instead of component. if you do this, you must pass in {...this.props} in order ot have access to this.props. */}

              <Switch>
                  <Route path = "/project-index" render={(props) <ProjectIndex {...props} blah="whatever" /> }  />

                  <Route path = "/project/:id" component = {SingleProject} />
                  {/* component automatically adds in history, location, elements from the DOM, that enable usage in other components, so best way to do it is have component = {component.name} */}
                  {/* SingleProject parent is Switch, App component is SingleProject and ProjectIndex grandparents */}
                  {/*                       | */}
                  {/*                       -------------------------------- */}
                  {/*                                                       | */}
                  {/* in the SingleProject Component, we will have access to whatever is inside the url, insde this.props.match.params.id */}
{/* // future component path routes go here */}
                  // <Route path="/signup" component="Signup" />
                    <Router path="/signup" render = {(props)=> <Signup {...props} logTheUserIntoAppComponent = {this.logInTheUser} }  />
                  // should set the state in the app component to keep user consistent.



              </Switch>



          <ProjectIndex />



            </div>

          );
      }




}






export default ProjectIndex;

// 100% certain that all components have user information in same class, so its never changed amongst different components.