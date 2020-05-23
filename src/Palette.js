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
      level: 500,
      format: "hex"
    };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  /**
  |--------------------------------------------------
  | Helper Methods
  |--------------------------------------------------
  */

  changeLevel(level) {
    this.setState({ level });
    // console.log(level)
  };

  changeFormat(val) {
    // alert(val);
    this.setState({ format: val });
  }

  /**
  |--------------------------------------------------
  | UI
  |--------------------------------------------------
  */
  render() {
    const { colors, paletteName, emoji } = this.props.palette;
    const { level, format } = this.state;
    let colorBoxes = colors[level].map(color => <ColorBox background={color[format]} name={color.name} key={color.id}/>)

    return (
      <div className="Palette">
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
        />

        <div className="Palette-colors">
          {colorBoxes}
        </div>
        {/*  footer eventually*/}
        <footer className="Palette-footer">
          {paletteName}
          <span className="emoji">{emoji}</span>
        </footer>
      </div>
    );
  }
}

// Test the github

export default Palette;