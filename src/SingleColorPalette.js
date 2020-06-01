import React, { Component } from 'react';
import {Link} from "react-router-dom";
import ColorBox from "./ColorBox";
import NavBar from "./Navbar";

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.state={ format:"hex"};
    this.changeFormat=this.changeFormat.bind(this);
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
  
    const colorBoxes = this._shades.map(color => (
      // console.log(color)
      <ColorBox key={color.name} name={color.name} background={color[this.state.format]} showLink={false} />
    ))
    return (
      <div className="SingleColorPalette Palette">
        <NavBar
          showSlider={false}
          handleChange={this.changeFormat}
        />

        <div className="Palette-colors">
          {colorBoxes}
          <div className="go-back ColorBox">
            <Link to={`/palette/${this.props.palette.id}`} className="back-button">GO BACK</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleColorPalette;