import React, { Component } from "react";
import "./../App.css";
import {
Input,
Container,
Button,
Segment,
Header
  } from "semantic-ui-react";

class Filter extends Component {

    
    render() {

        
      return (
         
                    <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
           <Header
      as='h1'
      content='Tool to save albums to your library from followed artists'
        style={{
            fontSize: '2em',
            marginBottom: 0
        }}
></Header>
       <Container>
        <Button onClick={this.props.click} size='massive'>Login</Button>
        </Container>
         </Segment>
      );
    }
}
export default Filter