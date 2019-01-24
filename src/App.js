import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import User from './components/User.js'
const ClientID = process.env.REACT_APP_CLIENTID
let CallBackUri = process.env.REACT_APP_CALLBACK_URI
let AuthURL = 'https://accounts.spotify.com/authorize?client_id=' + 
ClientID + '&redirect_uri=' + CallBackUri + 
'&scope=user-read-private%20user-read-email&response_type=token&state=123'
let token = ''
if (window.location.href==='http://localhost:3000/' || window.location.href=== 'http://192.168.0.107:3000/') {
  console.log("eikirjauduttu")
  CallBackUri = window.location.href;
} else {
  token = window.location.href.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
}
  
  const getFollowed = async function(url) {
    let tok = 'Bearer ' + token;
    let headers = {headers: {'Authorization': tok}}
    const response = await axios.get(url, headers)
    if (response.data.artists.next !== null) {
      console.log(response)
      return response.data.artists.items.concat(await getFollowed(response.data.artists.next));
    } else {
      return response.data.artists.items;
    }
  }//response.data.artists.next


class App extends Component {
   componentDidMount() {
    console.log("DidMOUNT")
 
  }
  constructor() {
    super()
    this.state = {
      artists: [],
      user: false
    }
  }

    handleLoginClick = () => {
    window.location.href = AuthURL;
  }
   handleGetFOllowClick = async () => {
    const artists= await    getFollowed('https://api.spotify.com/v1/me/following?type=artist&limit=50')
    console.log(artists)
    this.setState({artists: artists})
      }
     handlePrintClick = () => {
    this.state.artists.map(artist => {
      console.log(artist.name)
    })
      }
      getUserInfo = async () => {
        let tok = 'Bearer ' + token;
        let headers = {headers: {'Authorization': tok}}
        const userinfo = await axios.get('https://api.spotify.com/v1/me', headers)
        console.log(userinfo)
        this.setState({user: userinfo.data})
      }
       handlePrintAlbums = () => {
     let tok = 'Bearer ' + token;
    let headers = {headers: {'Authorization': tok}}
    
    this.state.artists.map(artist => {
      let url = 'https://api.spotify.com/v1/artists/'+artist.id+'/albums?limit=50&include_groups=album'
      axios.get(url, headers).then(response => {
        console.log(response)
       
      }) .catch(error => {
        console.log(error)
      })
    })}
  
  
  render() {
    const isLoggedIn = this.state.user;
    return (
      <div className="App">
        <header className="App-header">
        {isLoggedIn ? <User usr={this.state.user}></User>: <a>NOtLoggeDIn</a>}
        
            <button onClick={this.handleLoginClick}>Login to Spotifu</button>
            <button onClick={this.handleGetFOllowClick}>GetFollowed</button>
            <button onClick={this.handlePrintClick}>PRint</button>
            <button onClick={this.handlePrintAlbums}>Print artist albums</button>
            <button onClick={this.getUserInfo}>userinfo</button>
        </header>
      </div>
    );
  }
}

export default App;
