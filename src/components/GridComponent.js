import React, { Component } from "react";
import "../App.css";
import "semantic-ui-css/semantic.min.css";
import {
  Grid,
  Icon,
  Image,Item,
  Reveal,
  Card,
  Checkbox,
  Container
} from "semantic-ui-react";

class GridComponent extends Component {
  render() {
    const redirect = (artisti) => {
      console.log("REDIRECTICLICK")
      window.location.href=artisti.href
    } 
    const artistit = this.props.artistit;
    const image640 = async (imagearray) => {
      console.log("IMAGEARRAYFUNCTION")
      imagearray.map(image => {
        console.log("IMAGE MAPPI")
        if(image.height/image.width===1) {
          return image.url
        } 
      })
      return imagearray[0].url
    }
    return (
      <Grid columns={6} container doubling stackable>
                   { artistit.filter(artists =>
        artists.name.toLowerCase().includes(
        this.props.filterString.toLowerCase())
          ).map(artisti =>
          
        // {artistit.map(artisti => (
          <Grid.Column key={artisti.id+'grid'}>
          <Container key={artisti.id+'container'}>
          <Item key={artisti.id}>
          <Reveal animated='small fade'>
    <Reveal.Content visible>
    <Image src={artisti.images[0].url} size='small' circular/>
    </Reveal.Content>
    <Reveal.Content hidden>
      <Image src='https://developer.spotify.com/assets/branding-guidelines/icon2@2x.png'size='small' circular onClick={() => this.redirect(artisti)}/>
    </Reveal.Content>
  </Reveal>
)
          
          <Checkbox onChange={() => this.props.func(artisti.id)} />
          <p>{artisti.name}</p>
          </Item>
          </Container>
          </Grid.Column>
        
          )}
      </Grid>
    );
  }
}
export default GridComponent;
