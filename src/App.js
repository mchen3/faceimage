import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import './App.css';
import Particles from 'react-particles-js';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}
//
const initialState =  {
  input: '',
  imageUrl: '',
  box:{},
  route:'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();

    this.state = initialState;
  }

  // Update State User with new User Data
  // Called by Register.js
  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    
    // DOM manipulation, grab the face image component dimensions
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width,height);

    //Get dimensions for box around face
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol:  width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
    console.log(box);
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input });
      fetch('https://rocky-cove-26013.herokuapp.com/imageurl', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
       .then(response => response.json())
       .then(response =>  {
          // Update entry count on backend, recieved response, and update state/DOM
          if(response) {
            fetch('https://rocky-cove-26013.herokuapp.com/image', {
              method: 'put',
              headers: { 'Content-Type': 'application/json'},
              body: JSON.stringify({
                 id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log);
          }
         this.displayFaceBox(this.calculateFaceLocation(response))    
       })
       .catch(err => console.log(err));
  }

  onRouteChange = (route) => {

    if(route === 'signout') {
      this.setState(initialState);
    } else  if (route === 'home') {
      this.setState({ isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    
    return (
      <div className="App">
      <Particles className='particles'
              params={particlesOptions}
      />
      <Navigation isSignedIn={isSignedIn}   onRouteChange= {this.onRouteChange}   />

      { route === 'home'
          ?      
            <div>     
              <Logo />
              <Rank 
                name={this.state.user.name} 
                entries={this.state.user.entries}
              />
              <ImageLinkForm  onInputChange={this.onInputChange} 
                              onButtonSubmit={this.onButtonSubmit} 
              />
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          : 
            ( 
              route === 'signin' 
              ? <Signin 
                  onRouteChange = {this.onRouteChange}
                  loadUser= {this.loadUser} 
                />  
              : <Register 
                  onRouteChange = {this.onRouteChange}
                  loadUser= {this.loadUser} 
                />  
            )
      }
      </div>
    );
  }
}

export default App;
