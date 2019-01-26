import React, { Component } from "react";
import { Card, Image, Flag } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class User extends Component {
  render() {
    let user = this.props.user;
    return (
      <div>
        <Image src={user.images[0].url} circular ize="tiny" />{" "}
        <Flag name={user.country.toLowerCase()} />
      </div>
    );
  }
}
export default User;
