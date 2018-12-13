import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import ProjectIndex from './Components/ProjectIndex';
import { Link } from 'react-router-dom';
import AddNewProject from './AddNewProject';
// not /components because they're in same folder.

class ProjectIndex extends Component {

    state={
      allTheProjects: []
    }
    // empty array is preferred.


    // remember: first time the render function runs, the state will look exactly like it is set it up in the constructor above.
    // since we are doing this.state.allTheProjects.map, == an empty array in the beginnning is good because first time the component renders, the state will  have an empty array, and will loop through it.
    // you will not see it though beacuse it happens quickly.
    // but if we don't start with equalling our this.state.allTheProjects to an empty array, it will throw an error, because we are trying to do .map on NULL which is not allowed or possible.




    // componentWillMount runs everytime the component is about to be rendered on the page. in this function, we will make an AXIOS REQUEST to our api route, the response we get back should be equal to an object with a .data key inside it, and .data will be equal to all the tasks we get from our api.
    componentWillMount(){
      
        this.fetchProjects()
    }
// this componentWillMount happens everytime the Component is not there, and then it is there. kind of like changing views in backend. each time a component shows up, if it is to stay on the page, 

fetchProjects = () =>{

// function that automatically runs before the render function below.
Axios.get('http://localhost:5000/api/tasks')
.then((responseFromApi)=>{
// arrayOfTasks is the array of objects from the api.

// anytime it says .map .filter forEach is not a function, then its saying is not an array is being targeted, probably missing something like .data.

  this.setState({allTheProjects: responseFromApi.data.reverse()})
    // .reverse sorts in reverse order
    // console.log('-=-=-=-=-=-') test
    // once we get all the tasks, we set the state so the state will have all the tasks in the state.
  })
.catch((err)=>{
  
})

}

// because componentWillMount will still allow the component to initialize before running, we can protect ourselves by putting an if statement before anytime we want to loop something that is in our state.


componentWillReceiveProps(){
    // want something when the props change, 
}


      showAllProjects = () =>{
        // once we have all the tasks in the state, we can map through them as we normally would.
            if(this.state.allTheProjects && this.props.currentUser)
            // above is not necessary in a functional component, because there is no state in functional components.
        return this.state.allTheProjects.map((eachProject)=>{
          return(
              <div key={eachProject._id}>
              {/* key goes in this div. on main component. */}

                  <h3>{eachProject.title}</h3>
                  <h3>{eachProject.description}</h3>
                  <Link to={'/project/' + eachProject._id} >See Details</Link>

              </div>



          )
        })
        }
      }



      // render function will run one time when state is equal to the default state from the top under Component. if default state is null, function .map will not work. if default state is [], empty array, function .map etc will work.

      render(){
        // console.log('-=-=-=-=-=-=-=-', this.state); a test
          return(
              <div>

{/* // now we got to show all the projects on our page, this happens in the render function. */}
              <h1>Project Index</h1>

              <div className="list-of-projects-container">
              {this.showAllProjects()}

              </div>

              <div className="add-new-component-container">
              <AddNewProject letTheIndexComponentKnowWeAddedProject = {this.fetchProjects}/>
              {/* we pass in this function so after we add a new project in the addNewProject component, that component will be able to tell this component to go check for new projects. */}

              </div>

              </div>
          )
      }




}






export default ProjectIndex;


// npm run dev in the api todo list so the api is online.
// open other terminal window so api and react are both open at same time. 