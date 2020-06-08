import React, { Component } from 'react'
import 'rc-slider/assets/index.css';
import "./Palette.css";

import Slider, { Range } from "rc-slider";
import ColorBox from "./ColorBox"
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";



const styles = {
  palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  paletteColor:{
    height: "90%",
  }
}

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
  };

  changeFormat(val) {
    this.setState({ format: val });
  }

  /**
  |--------------------------------------------------
  | UI
  |--------------------------------------------------
  */
  render() {
    const { colors, paletteName, emoji, id} = this.props.palette;
    const {classes} = this.props;
    const { level, format } = this.state;

    let colorBoxes = colors[level].map(color => <ColorBox
      background={color[format]}
      name={color.name}
      id={color.id}
      paletteId={id}
      moreUrl={`/palette/${id}/${color.id}`}
      key={color.id}
      showingFullPalette
    />)

    return (
      <div className={classes.palette}>
        
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          showSlider={true}
        />

        <div className={classes.paletteColor}>
          {colorBoxes}
        </div>

        {/*  footer eventually*/}
        <PaletteFooter paletteName={paletteName} emoji={emoji}/>
      </div>
    );
  }
}

// Test the github

export default withStyles(styles)(Palette);