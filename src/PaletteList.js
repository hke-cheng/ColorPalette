import React, { Component } from 'react'
import { Link } from "react-router-dom"
//
import MiniPalette from "./MiniPalette";

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { palettes } = this.props;
    return (
      <div>

        <h1>React Color</h1>
        {/* Loopover Lists */}
        {palettes.map(palette => (
          <MiniPalette {...palette} />
        ))}
      </div>
    );
  }
}

export default PaletteList;