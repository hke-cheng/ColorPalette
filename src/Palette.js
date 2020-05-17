import React, { Component } from 'react'
import "./Palette.css";

import ColorBox from "./ColorBox"

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {

    let colorBoxes = this.props.colors.map(color => <ColorBox background={color.color} name={color.name} />)


    return (
      <div className="Palette">
        {/* Navbar goes here */}
        <div className="Palette-colors">
          {colorBoxes}
        </div>
        {/*  footer eventually*/}
      </div>
    );
  }
}

// Test the github

export default Palette;