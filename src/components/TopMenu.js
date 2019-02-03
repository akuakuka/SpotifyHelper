import React, { Component } from "react";
import "../App.css";
import "semantic-ui-css/semantic.min.css";
import Filter from "./Filter.js";
import { Menu, Image, Icon, Popup, Flag } from "semantic-ui-react";
class TopMenu extends Component {
  render() {
    return (
      <div className="Menu">
        <Menu inverted color="grey" fixed="top">
          <Menu.Item onClick={this.props.saveAlbums}>
            Save checked albums
          </Menu.Item>
          <Menu.Item onClick={this.props.removeAlbums}>
            Remove all followed albums
          </Menu.Item>
          <Menu.Item position="right">
            <Filter
              onTextChange={
                this.props.filterFunction()
            }
            />
          </Menu.Item>
          <Menu.Item
            position="right"
            icon="github"
            onClick={this.props.github}
          />
          <Menu.Item position="right">
            {this.props.user.images.length === 0 ? (
              <Popup
                size="large"
                key={this.props.user.id}
                trigger={<Icon name="user outline" />}
                header={<Icon name="user" />}
                content={
                  <div>
                    <p>{this.props.user.display_name}</p>
                    <p>{this.props.user.email}</p>
                    <p>
                      {<Flag name={this.props.user.country.toLowerCase()} />}
                      {this.props.user.country}
                    </p>
                    <p>{this.props.user.product}</p>
                  </div>
                }
              />
            ) : (
              <Popup
                size="large"
                key={this.props.user.id}
                trigger={<Icon name="user outline" />}
                header={<Image src={this.props.user.images[0].url} />}
                content={
                  <div>
                    <p>{this.props.user.display_name}</p>
                    <p>{this.props.user.email}</p>
                    <p>
                      {<Flag name={this.props.user.country.toLowerCase()} />}
                      {this.props.user.country}
                    </p>
                    <p>{this.props.user.product}</p>
                  </div>
                }
              />
            )}
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
export default TopMenu;
