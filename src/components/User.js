import React, { Component } from 'react';
import {Card, Image} from 'semantic-ui-react';
class User extends Component {
//
    render() {
      let user = this.props.usr
      console.log(user)
      return (
        <Card>
        <Image src={user.images[0].url} />
        <Card.Content>
          <Card.Header>{user.display_name}</Card.Header>
          <Card.Meta>
          {user.followers.total} Followers
          </Card.Meta>
          <Card.Description>{user.email}</Card.Description>
        </Card.Content>
      </Card>
      );
    }
  }
  export default User;
