import React, { Component } from "react";
import {
Input
  } from "semantic-ui-react";
class Filter extends Component {
    render() {
      return (
        <div>
          
          <Input placeholder='Filter...'  onKeyUp={event => 
          this.props.onTextChange(event.target.value)}
          />
        </div>
      );
    }
}
export default Filter