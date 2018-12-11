import axios from 'axios';

class UserService {
// NOT A COMPONENT, A CLASS


  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true
    });

// axios.create - assumes that 'http:.. will be the beginning of every request.


    this.service = service;
  }

// axios.create allows you to  preconfigure the url (and headers) of axios requests.
// so that when we make an axios request with that object, we pass in a url, and that url gets added onto the end of the url we created the axios object with.






  signup = (username, password) => {

    return this.service.post('/signup', {username, password})
    .then(response => response.data)
  }
  
  // this UserService class has a .signup function that takes 2 arguments. Whatever it is, it'll take axios request with the 2 arguments.

fetchUser = () =>{
    return this.service.get('/loggedin')
      .then(response => response.data)

}


}
// service is a pre-configured axios request.
// creating a random thing, custom-like stuff, anything other than state - you need a constructor().  THIS IS NOT A COMPONENT

export default UserService;