import React, { Component } from "react";
import "./../App.css";
import {Button} from "semantic-ui-react";

class Login extends Component {
    render() {
      return (
              <div className='Login'>
              <Button onClick={this.props.click} size='massive'>Login</Button>
              </div>
      );
    }
}
export default Login