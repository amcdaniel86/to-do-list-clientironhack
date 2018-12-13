import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import ProjectIndex from './Components/ProjectIndex';
import { Link } from 'react-router-dom';

class AddNewProject extends Component {

    state={
      titleInput: '',
      descriptionInput: ''
    }


      updateInput = (e) => {

        this.setState({[e.target.id]: e.target.value })
// e.target is the thing that just got updated.


// this.state[e.target.id] = e.target.value
// fancy way of saying above


      }


      createNewProject = (e) => {
        e.preventDefault();
        // above prevents refreshing from happening
// step 1 grab from the state
          const newTitle = this.state.titleInput;
          const newDescription = this.state.descriptionInput;
          // grab values from the DOM

          Axios.post("http://localhost:5000/api/tasks/new", {theTitle: newTitle, theDescription: newDescription })
        // 2nd argument MUST be an object.
            .then((responseFromOurApi)=>{
              // newly created task from the api post add new route.
                console.log('success', responseFromOurApi)

                
                this.props.letTheIndexComponentKnowWeAddedProject()
                // after axios request, we call function in parent component, to make component go and get all proejct again so now we should have a new project.
            })
            .catch((err)=>{
                console.log('error creating task', err)
            })



      }





      render(){
        return(

              <div>
                This is add new project component

                <h2>Add New Project</h2>
                <form onSubmit={this.createNewProject}>

                  <label>Title</label>
                  <input value={this.state.titleInput} id="titleInput" onChange = {this.updateInput} />
{/* // for a form, input must have value this.state. then key from the state at top of component */}


                  <label>Description</label>
                  <input value={this.state.descriptionInput} id="descriptionInput" onChange = {this.updateInput}/>
                  
                  <button>Save</button>

                </form>


              </div>



        )

      }






}










export default AddNewProject;



// var state = {theWord: 'hello'}

// var blah = "theWord"


// state.[blah] = 'goodbye'
// state.blah would be different

// console.log(state)