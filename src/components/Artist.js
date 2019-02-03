import React, { Component } from "react";
import "../App.css";
import "semantic-ui-css/semantic.min.css";
import {
  Grid,
  Image,
  Item,
  Reveal,
  Checkbox,
  Container
} from "semantic-ui-react";

class Artist extends Component {
  render() {
    const artistit = this.props.artistit;
    return (
      <Grid columns={6} container doubling stackable>
        {artistit
          .filter(artists =>
            artists.name
              .toLowerCase()
              .includes(this.props.filterString.toLowerCase())
          )
          .map(artisti => (
            <Grid.Column key={artisti.id + "grid"}>
              <Container key={artisti.id + "container"}>
                <Item key={artisti.id}>
                  <Reveal animated="small fade">
                    <Reveal.Content visible>
                      <Image
                        src={artisti.images[0].url}
                        size="small"
                        circular
                        href={artisti.external_urls.spotify}
                      />
                    </Reveal.Content>
                    <Reveal.Content hidden>
                      <Image
                        src="https://developer.spotify.com/assets/branding-guidelines/icon2@2x.png"
                        size="small"
                        circular
                      />
                    </Reveal.Content>
                  </Reveal>
                  <Checkbox onChange={() => this.props.func(artisti.id)} />
                  <p>{artisti.name}</p>
                </Item>
              </Container>
            </Grid.Column>
          ))}
      </Grid>
    );
  }
}
export default Artist;
