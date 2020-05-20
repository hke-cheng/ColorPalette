import React, { Component } from 'react'
import 'rc-slider/assets/index.css';
import "./Palette.css";

import Slider, { Range } from "rc-slider";
import ColorBox from "./ColorBox"
import Navbar from "./Navbar";

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500
    };
    this.changeLevel = this.changeLevel.bind(this);
  }

  changeLevel(level) {
    this.setState({ level });
    // console.log(level)
  };
  render() {
    const { colors } = this.props.palette;
    const { level } = this.state;
    let colorBoxes = colors[level].map(color => <ColorBox background={color.hex} name={color.name} />)

    return (
      <div className="Palette">
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
        />

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