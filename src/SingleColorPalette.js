import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ColorBox from "./ColorBox";
import NavBar from "./Navbar";
import styles from "./styles/PaletteStyles";
import {withStyles} from "@material-ui/styles";



class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.state = { format: "hex" };
    this.changeFormat = this.changeFormat.bind(this);
  }
  //Helper Method
  gatherShades(palette, colorToFilterBy) {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorToFilterBy)
      )
    };
    //return all shades of given color
    return shades.slice(1);
  }

  changeFormat(val) {
    this.setState({ format: val });
  }

  // UI
  render() {
    const {classes} = this.props;
    const colorBoxes = this._shades.map(color => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[this.state.format]}
        showingFullPalette={false} />
    ))
    return (
      <div className={classes.palette}>
        <NavBar
          showSlider={false}
          handleChange={this.changeFormat}
        />

        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes. goBack}>
            <Link to={`/palette/${this.props.palette.id}`}>GO BACK</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);