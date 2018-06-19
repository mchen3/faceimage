import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/facerecognition/FaceRecognition';


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

const app = new Clarifai.App({
  apiKey: 'c0171a8f6eed4cb1abd49fb2cd58d774'
 });
 
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    //console.log('click');

    app.models.predict(Clarifai.COLOR_MODEL, 
    "https://samples.clarifai.com/face-det.jpg").then(
      function(response) {
        // do something with response
        console.log(response);
      },
      function(err) {
        // there was an error
      }
    );

  }


  render() {
    return (
      <div className="App">
      <Particles className='particles'
              params={particlesOptions}
      />

       <Navigation/>
       <Logo />
       <Rank />
       <ImageLinkForm  onInputChange={this.onInputChange} 
                       onButtonSubmit={this.onButtonSubmit}  />

       <FaceRecognition />

      </div>
    );
  }
}

export default App;
