import React, { Component } from 'react';
import './App.css';
ipmort Axios from 'axios';


class SingleProject extends Component {

  // what we know now.. is the id of a project we want to show on this page.

    state={
        titleInput: '',
        descInput: '',
        editing: false

    }

    componentWillMount(){
      const theID = this.props.match.params.id
        Axios.get('http://localhost:5000/api/task/details/' + theID)
          .then((theThingIGetBackFromApi)=>{


              // console.log('-=-=-=-=-==-=--=-=-=-=-=-=-=--=', theThingIGetBackFromApi) test

              this.setState({
                 theActualProject: theThingIGetBackFromApi.data,
                  titleInput: theThingIGetBackFromApi.data.title,
                  descInput: theThingIGetBackFromApi.data.description
              
              })
              
          })
          .catch(()=>{

          })
    }

      updateInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
      }

      editProject = (e) => {
        e.preventDefault();
          Axios.post('http://localhost:5000/api/tasks/edit/this.state.theActualProject._id',
          // whatever the id of this project is at this moment in time.
            {theTitle: this.state.titleInput, theDescription: this.state.descInput})
          .then(()=>{
              this.setState({editing: false});
              // after submitting the form and the axios request is complete, we set this.state.editing back to false so the form disappears, and looks clean
          })
          .catch((err)=>{

          })

      }


        toggleForm = () =>{
          this.setState({editing: true})
        }


// referenced below on component's return area in curly braces. better that way when using if and loop functions
        showProjectDetails = () =>{
            if(this.state.theActualProject){



              if(this.state.editing){

              
              return(
                <form onSubmit={this.editProject}>
                    <input className="input" value={this.state.titleInput} onChange={this.updateInput} />
                    <input className="input" value={this.state.descInput} onChange={this.updateInput} />

                    <button>Submit changes</button>

                </form>
                // with forms, YOU ALWAYS need a state at the top of the component to track the form.
              )
            } else {
                // by default this.state.editing is set to false so when page first loaded, we'll see the return area vvvv below. just the info, NOT the form


              return(
                  <div>
                          <span>
                            {this.state.titleInput}
                          </span>
                          
                          <span>
                            {this.state.descInput}
                          </span>
                            {/* we put the small pen image here and add an onclick function. the onclick function  */}

                          <img onClick={this.toggleForm} className="pen-pic" src="web.address" />

                  </div>
              )
            }


        }
      }


        deleteProject = () =>{

            Axios.post('http://localhost:5000/api/tasks/delete/'+this.state.theActualProject._id, {})
            .then(()=>{

                this.props.history.push('/project-index');
                // how to redirect within the React app.
            })
            .catch(()=>{

            })
        }




      render(){
          console.log(this.props)
          // props always come from parent component,
        
        // console.log(this.state) test
        
        
        return(

              <div>This is single detailed project
                    <h1> project details page</h1>

                    
                  {this.showProjectDetails}
                  {/* references the function above, that's where if and loop functions should be placed, not within the return section of a component page. */}

              
              {/* anytime there's a loop or if situation, put them in their own function and not inside the page's return area. */}
              

              <button onClick={this.deleteProject} className="delete">Delete This Project</button>
              </div>
        )
      }



}





export default SingleProject;