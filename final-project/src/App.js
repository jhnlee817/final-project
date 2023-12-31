import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg';
import './App.css';



const returnClarifaiRequestOptions = (imageUrl) => {
      // Your PAT (Personal Access Token) can be found in the portal under Authentification
      const PAT = 'd32f97f3a3c24a5c8e649d527cfb336d';
      // Specify the correct user_id/app_id pairings
      // Since you're making inferences outside your app's scope
      const USER_ID = 'jhnlee817';       
      const APP_ID = 'my-first-application-05xbr';
      // Change these to whatever model and image URL you want to use
      const MODEL_ID = 'face-detection';
      const IMAGE_URL = imageUrl;

      const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    return {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/versions/" + "/outputs", returnClarifaiRequestOptions(this.state.input))
    .then(response => response.json())
    .then(response => {
        console.log('hi', response);
      },
      function(err) {

      }
    );
  }


  render() {
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation />
        <Logo />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <Rank />
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    )
  }
}

export default App;
