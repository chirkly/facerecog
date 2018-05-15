import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Particles from 'react-particles-js';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import LinkForm from './components/LinkForm/LinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const particleOptions = {
  particles: {
    number: {
      value:80,
      density:{
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
    imageUrl: '',
    box: [],
    route: 'signin',
    isSignedIn: false,
    user: {
      email: '',
      id: '',
      name: '',
      entries: 0,
      joined: ''
    }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  loadUser = (data) => {
    this.setState({user: {
        email: data.email,
        id: data.id,
        name: data.name,
        entries: data.entries,
        joined: data.joined
        }
    })
  }

  calcFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions.map( 
      (box) => { return box.region_info.bounding_box})
     
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const box = clarifaiFace.map((face) => {
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height)
        }
      }
    );
    return box;
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  setRank = (direction) => {
    fetch('https://tranquil-bastion-50512.herokuapp.com/' + direction,{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://tranquil-bastion-50512.herokuapp.com/imageurl',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })
          })
      .then(response => response.json())
      .then(response => {
        if(response){
          this.setRank('rankup');
        }
        this.displayFaceBox(this.calcFaceLocation(response));
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState)
    } else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  renderRoute = (route,box,imageUrl) => {
    switch(route){
      case 'home':
        return (<div>     
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries} setRank = {this.setRank}/>
          <LinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>);
      case 'register':
        return (<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>);
      case 'signin':
      case 'signout':
        return (<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>);
      default:
        return (<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>);
    }
  }

  render() {
    const { isSignedIn, imageUrl, route, box} = this.state
    console.log(route)
    return (
      <div className="App">
        <Particles className='particles'
              params={particleOptions}
            />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.renderRoute(route,box,imageUrl)}
      </div>
    );
  }
}

export default App;
