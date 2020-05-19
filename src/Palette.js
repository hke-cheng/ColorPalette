import React, { Component } from 'react'
import "./Palette.css";

import Slider, { Range } from "rc-slider";
import 'rc-slider/assets/index.css';
import ColorBox from "./ColorBox"

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500
    };
    this.changeLevel=this.changeLevel.bind(this);
  }

  changeLevel(level){
    this.setState({level});
    // console.log(level)
  };
  render() {
    const {colors} = this.props.palette;
    const {level} = this.state;
    let colorBoxes = colors[level].map(color => <ColorBox background={color.hex} name={color.name} />)

    return (
      <div className="Palette">
        {/* Navbar goes here */}
        <Slider
          defaultValue={this.state.level}
          min={100} max={900} step={100}
          onAfterChange={this.changeLevel}
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