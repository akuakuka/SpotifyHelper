import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Artist from "./components/Artist";
import TopMenu from "./components/TopMenu";
import Login from "./components/Login.js";
import "semantic-ui-css/semantic.min.css";
const ClientID = process.env.REACT_APP_CLIENTID;
let CallBackUri = process.env.REACT_APP_CALLBACK_URI;
let token = "";
if (
  window.location.href === CallBackUri
) 
{
  CallBackUri = window.location.href;
} else {
  token = window.location.href.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1]; // eslint-disable-line no-use-before-define
}
let AuthURL =
  "https://accounts.spotify.com/authorize?client_id=" +
  ClientID +
  "&redirect_uri=" +
  CallBackUri +
  "&scope=user-read-private%20user-library-modify%20user-follow-modify%20user-read-email&response_type=token&state=123" +
  "&show_dialog=true";
const getFollowed = async function(url) {
  let tok = "Bearer " + token;
  let headers = { headers: { Authorization: tok } };
  const response = await axios.get(url, headers);
  if (response.data.artists.next !== null) {
    return response.data.artists.items.concat(
      await getFollowed(response.data.artists.next)
    );
  } else {
    return response.data.artists.items;
  }
};
const getSavedAlbums = async (url) => {
  let tok = "Bearer " + token;
  let headers = { headers: { Authorization: tok } };
  const response = await axios.get(url, headers);
  if (response.data.next !== null) {
    return response.data.items.concat(
      await getSavedAlbums(response.data.next)
    );
  } else {
    return response.data.items;
  }
};
class App extends Component {
  async componentDidMount() {
    if (token === "") {
    } else {
      await this.getUserInfo();
      await this.getFollowedArtists();
      await this.handleGetSavedAlbums();
    }
  }
  constructor() {
    super();
    this.state = {
      artists: [],
      user: {},
      checked: [],
      followedAlbums: [],
      CheckedAlbums: [],
      filterString: ''
    };
  }
  GetCheckedArtistsAlbums = async () => {
    let tok = "Bearer " + token;
    let headers = { headers: { Authorization: tok } };
    let albumit = []
    await Promise.all(this.state.checked.map(async id => {
      let url =
        "https://api.spotify.com/v1/artists/" +
        id +
        "/albums?limit=50&include_groups=album";
       let res =  await axios
        .get(url, headers)
       await res.data.items.map(alb => {
         if (!this.state.CheckedAlbums.includes(alb.id)) {
          albumit.push(alb.id)
        } 
         })
    }));
    this.setState({
     CheckedAlbums: albumit 
  })
    };
  saveAlbums = async () => {
    await this.handleGetSavedAlbums()
    let tok = "Bearer " + token;
   await this.GetCheckedArtistsAlbums()
    let url = 'https://api.spotify.com/v1/me/albums?ids='
    let data = await this.state.CheckedAlbums;
  const config = {
    headers: { 'Authorization': tok,
    'Content-Type':'application/json' }
  } 
  if(this.state.CheckedAlbums<20) {
    await axios.put(url, data, config)
  }   else {
    var arrays = [], size = 20;

    while (this.state.CheckedAlbums.length > 0) {
      arrays.push(this.state.CheckedAlbums.splice(0, size));
    }
    arrays.map(async (array) => {
      await axios.put(url, array, config)
    })
  }
  await this.handleGetSavedAlbums();
};
  handleLoginClick = async () => {
    window.location.href = AuthURL;
  };
  getFollowedArtists = async () => {
    const artists = await getFollowed(
      "https://api.spotify.com/v1/me/following?type=artist&limit=50"
    );
    this.setState({ artists: artists });
  };
  handleGetSavedAlbums = async () => {
    let url = 'https://api.spotify.com/v1/me/albums?limit=50'
    const savedalbums = await getSavedAlbums(url)
    let koo = savedalbums.map(kk => kk.album.id)
    this.setState({ followedAlbums: koo });
  }
  getUserInfo = async () => {
    let tok = "Bearer " + token;
    let headers = { headers: { Authorization: tok } };
    const userinfo = await axios.get("https://api.spotify.com/v1/me", headers);
    this.setState({ user: userinfo.data });
    return userinfo;
  };
  handleCheckBox = (jj) => {
    if (this.state.checked.includes(jj)) {
      let array = this.state.checked;
      var index = array.indexOf(jj);
      if (index > -1) {
        array.splice(index, 1);
      }
    } else {
      let newarray = [...this.state.checked, jj];
      let filter = this.state.filterString;
      this.setState({
        checked: newarray,
        filterString: filter
      });
    }
  };
  handleGithubClick = () => {
    window.location.href = "https://github.com/akuakuka/SpotifyHelper"
  }
  handleFilterStringChange = (text) => {
    this.setState({filterString: text}, function () {
  });
  }
  removeAllFollowed = async () => {
    if(this.state.followedAlbums<1) {
      return;
    }
    let url = 'https://api.spotify.com/v1/me/albums/'
    let tok = "Bearer " + token;
   const config = {
     headers: { 'Authorization': tok },
     data: this.state.followedAlbums
   }   
   if(this.state.followedAlbums<20) {
  await axios.delete(url, config)
  }   else {
    var arrays = [], size = 20;

    while (this.state.followedAlbums.length > 0) {
      arrays.push(this.state.followedAlbums.splice(0, size));
    }
    arrays.map(async (array) => {
      const config2 = {
        headers: { 'Authorization': tok },
        data: array
      }
      await axios.delete(url, config2)
    })
  }
  };
  render() {
    return (
      <div className="App">
          {Object.keys(this.state.user).length === 0 ? (<Login click={this.handleLoginClick}>
            </Login>
          ) : (
            <div>
            <div className="Menu">
            <TopMenu saveAlbums={this.saveAlbums} removeAlbums={this.removeAllFollowed} user={this.state.user} github={this.handleGithubClick}filterFunction={() => this.handleFilterStringChange}/>
            
              </div>
              <div className='Artist'>
              <Artist
                artistit={this.state.artists}
                func={this.handleCheckBox}
                filterString={this.state.filterString}
              />
              </div>
              </div>
          )}
        </div>
    
    );
  }
}

export default App;
