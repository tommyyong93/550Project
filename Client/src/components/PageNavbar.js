import React from 'react';
import {
  Navbar,
  Button,
  Alignment
} from "@blueprintjs/core";
import '../style/PageNavbar.css';

export default class PageNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {}

  render() {
    return (
      <Navbar className='page-navbar'>
        <Navbar.Group className="navbar-heading"align={Alignment.LEFT}>
          <a href={"/"}><svg id="Capa_1" enableBackground="new 0 0 512 512" height="25" viewBox="0 0 512 512" width="25" xmlns="http://www.w3.org/2000/svg">
            <g><path d="m469.36 165.93v295.07h-426.72v-295.07l213.36-125.6z" fill="#e6f3ff"/><path d="m469.36 165.93v295.07h-213.36v-420.67z" fill="#bbe4f2"/><path d="m94 227.435h125.429v233.565h-125.429z" fill="#ffcf67"/>
              <path d="m292.571 227.435h121.762v84.565h-121.762z" fill="#28abf9"/><path d="m0 438.86h512v73.14h-512z" fill="#13cffe"/><path d="m256 438.86h256v73.14h-256z" fill="#28abf9"/><path d="m73.143 0h73.143v108.038h-73.143z" fill="#13cffe"/><path d="m512 147.8v73.31l-256-147.8-256 147.8v-73.31l256-147.8z" fill="#393e9f"/>
              <path d="m512 147.8v73.31l-256-147.8v-73.31z" fill="#340d66"/></g>
          </svg>
          </a>
          <Navbar.Heading>&nbsp; Nurse Next Door</Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <a href={"/profile/123"}><Button className={this.props.active === 'profile' ? "highlighted bp3-minimal" : "bp3-minimal"} text={this.props.selected ?  this.props.selected : "Random Profile"}/></a>
          <a href={"/search"}><Button className={this.props.active === 'search' ? "highlighted bp3-minimal" : "bp3-minimal"} text="Search for a Nursing Home"/></a>
          <a href={"/state"}><Button className={this.props.active === 'state' ? "highlighted bp3-minimal" : "bp3-minimal"} text="Statistics by State"/></a>
          <a href={"/featureone"}><Button className="bp3-minimal" text="featureone"/></a>
          <a href={"/featuretwo"}><Button className="bp3-minimal" text="featuretwo"/></a>
        </Navbar.Group>
      </Navbar>
    );
  }
}