import React from 'react';
import {
  Navbar,
  Button,
  Alignment
} from "@blueprintjs/core";

export default class PageNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <a href={"/"}><Button className="bp3-minimal" icon="home" /></a>
          <Navbar.Heading>Find a nursing home!</Navbar.Heading>
          <Navbar.Divider />
          <a href={"/featureone"}><Button className="bp3-minimal" text="featureone"/></a>
          <a href={"/featuretwo"}><Button className="bp3-minimal" text="featuretwo"/></a>
          <a href={"/featurethree"}><Button className="bp3-minimal" text="Stats by State"/></a>
          <a href={"/featurefour"}><Button className="bp3-minimal" text="Search for a Nursing Home"/></a>
        </Navbar.Group>
      </Navbar>
    );
  }
}