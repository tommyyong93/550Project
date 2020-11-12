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
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <Navbar>
        <Navbar.Group className="navbar-heading"align={Alignment.LEFT}>
          <a href={"/"}><Button className="bp3-minimal" icon="home" /></a>
          <Navbar.Heading>Nurse Next Door</Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <a href={"/profile"}><Button className="bp3-minimal" text="Random Profile"/></a>
          <a href={"/search"}><Button className="bp3-minimal" text="Search for a Nursing Home"/></a>
          <a href={"/state"}><Button className="bp3-minimal" text="Statistics by State"/></a>
          <a href={"/featureone"}><Button className="bp3-minimal" text="featureone"/></a>
          <a href={"/featuretwo"}><Button className="bp3-minimal" text="featuretwo"/></a>
        </Navbar.Group>
      </Navbar>
    );
  }
}