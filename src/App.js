import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import User from './components/User.js'
console.log(process.env)
//const ClientID = '1a01776648c346898ae59a997f989a91'
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
  const getFollowed = async (url, arr) => {
    let tok = 'Bearer ' + token;
    let headers = {headers: {'Authorization': tok}}
    let jk = [];
    let r = ''
    const response = await axios.get(url, headers)
         r = response.data.artists
           jk = arr.concat(response.data.artists.items)
           console.log(jk)
      if(r.next===null) {
        let art = {}
        await jk.map(jj =>
          art = {... jj})
        return art
      } else {
        await getFollowed(r.next, jk)
      }
  }
class App extends Component {
  constructor() {
    super()
    this.state = {
      artists: []
    }
  }

  handleLoginClick = () => {
    window.location.href = AuthURL;
  }
   handleGetFOllowClick = async () => {
     const artists = await getFollowed('https://api.spotify.com/v1/me/following?type=artist&limit=50', [])
     console.log(artists)
    }
     handlePrintClick = () => {
     console.log("asfasafa")
      }
       handlePrintAlbums = () => {
    //let url = 'https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?limit=50&include_groups=album'
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
    return (
      <div className="App">
        <header className="App-header">
        <User></User>
            <button onClick={this.handleLoginClick}>Login to Spotifu</button>
            <button onClick={this.handleGetFOllowClick}>GetFollowed</button>
            <button onClick={this.handlePrintClick}>PRint</button>
            <button onClick={this.handlePrintAlbums}>Print artist albums</button>
        </header>
      </div>
    );
  }
}

export default App;
