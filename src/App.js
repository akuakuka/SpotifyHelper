import React, { Component } from "react";
import "./App.css";
import axios from "axios";
//import User from "./components/User.js";
import GridComponent from "./components/GridComponent.js";
import { Button, Menu, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
const ClientID = process.env.REACT_APP_CLIENTID;
let CallBackUri = process.env.REACT_APP_CALLBACK_URI;
let token = "";
if (
  window.location.href === "http://localhost:3000/" ||
  window.location.href === "http://192.168.0.104:3000/"
) {
  console.log("eikirjauduttu");
  CallBackUri = window.location.href;
} else {
  token = window.location.href.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1]; // eslint-disable-line no-use-before-define
}

let AuthURL =
  "https://accounts.spotify.com/authorize?client_id=" +
  ClientID +
  "&redirect_uri=" +
  CallBackUri +
  "&scope=user-read-private%20user-read-email&response_type=token&state=123" +
  "&show_dialog=true";


const getFollowed = async function(url) {
  let tok = "Bearer " + token;
  let headers = { headers: { Authorization: tok } };
  const response = await axios.get(url, headers);
  if (response.data.artists.next !== null) {
    console.log(response);
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
  componentDidMount() {
    console.log("DidMOUNT");
    if (token === "") {
      console.log("DIDMOUNT EI KIRJAUDUTTU");
    } else {
      console.log("DIDMOUNT KIRJAUDUTTU");
      const user = this.getUserInfo();
      console.log(user);
      const followed = this.handleGetFOllowClick();
    }
  }
  constructor() {
    super();
    this.state = {
      artists: [],
      user: {},
      checked: [],
      followedAlbums: []
    };
  }
  apuFunc = async albums => {
    let tok = "Bearer " + token;
    let headers = { headers: { Authorization: tok } };
    let putUrl = "https://api.spotify.com/v1/me/albums?ids=";
    await albums.map(id => {
      putUrl = putUrl + ","+ id;
    });
     await console.log(putUrl);
    // axios.put(putUrl, headers).then
  };
  saveAlbums = async () => {
    let tok = "Bearer " + token;
    let headers = { headers: { Authorization: tok } };
    let albums = [];
    this.state.checked.map(id => {
      let url =
        "https://api.spotify.com/v1/artists/" +
        id +
        "/albums?limit=50&include_groups=album";
      axios
        .get(url, headers)
        .then(response => {
          response.data.items.map(jk => {
            albums.push(jk.id);
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
    await this.apuFunc(albums);
  };
  handleLoginClick = async () => {
    window.location.href = AuthURL;
  };
  handleGetFOllowClick = async () => {
    const artists = await getFollowed(
      "https://api.spotify.com/v1/me/following?type=artist&limit=50"
    );
    console.log(artists);
    this.setState({ artists: artists });
  };
  handlePrintClick = () => {
    this.state.artists.map(artist => {
      console.log(artist.name);
    });
  };
  handleGetSavedAlbums = async () => {
    let url = 'https://api.spotify.com/v1/me/albums?limit=50'
    const savedalbums = await getSavedAlbums(url)
    console.log(savedalbums)
    this.setState({ followedAlbums: savedalbums });
  }
  getUserInfo = async () => {
    let tok = "Bearer " + token;
    let headers = { headers: { Authorization: tok } };
    const userinfo = await axios.get("https://api.spotify.com/v1/me", headers);
    console.log(userinfo);
    this.setState({ user: userinfo.data });
    return userinfo;
  };
  handleCheckBox = jj => {
    if (this.state.checked.includes(jj)) {
      console.log(jj, "onjolistal");

      let array = this.state.checked;
      var index = array.indexOf(jj);
      if (index > -1) {
        array.splice(index, 1);
      }
    } else {
      console.log("CheckboxChange", jj);
      let newarray = [...this.state.checked, jj];
      let filter = this.state.filterString;
      this.setState({
        checked: newarray,
        filterString: filter
      });
    }
  };
  handlePrintAlbums = () => {
    let tok = "Bearer " + token;
    let headers = { headers: { Authorization: tok } };

    this.state.artists.map(artist => {
      let url =
        "https://api.spotify.com/v1/artists/" +
        artist.id +
        "/albums?limit=50&include_groups=album";
      axios
        .get(url, headers)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  render() {
    return (
      <div>
        <div>
          {Object.keys(this.state.user).length === 0 ? (
            <Button onClick={this.handleLoginClick}>Button</Button>
          ) : (
            <div>
              <Button onClick={this.saveAlbums} />
              <Button onClick={this.handleGetSavedAlbums}>PrintSavedAlbums</Button>
              <GridComponent
                artistit={this.state.artists}
                func={this.handleCheckBox}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
