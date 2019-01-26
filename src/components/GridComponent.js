import React, { Component } from "react";
import "../App.css";
import "semantic-ui-css/semantic.min.css";
import {
  Grid,
  Icon,
  Image,
  Card,
  Checkbox
} from "semantic-ui-react";

class GridComponent extends Component {
  render() {
    const artistit = this.props.artistit;
    return (
      <Grid columns={6} container doubling stackable>
        {artistit.map(artisti => (
          <Grid.Column key={artisti.id + 3}>
            <Card color="green" key={artisti.id}>
              <Image src={artisti.images[0].url} />
              <Card.Content>
                <Card.Header>{artisti.name}</Card.Header>
                <Card.Meta />
                <Card.Description>
                  <Checkbox onChange={() => this.props.func(artisti.id)} />
                  {artisti.genres[0]}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="user" />
                  Followers: {artisti.followers.total}
                </a>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>
    );
  }
}
export default GridComponent;
