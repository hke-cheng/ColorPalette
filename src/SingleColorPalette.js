import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ColorBox from "./ColorBox";
import NavBar from "./Navbar";
import {withStyles} from "@material-ui/styles";

const styles = {
  palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  colors:{
    height: "90%",
  },
  goBack:{
    width: "20%",
    height:"50%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    background:"black",
    position:"relative",
    "& a":{
      textDecoration:"none",
      color:"white",
      width: "100px",
      height: "30px",
      position: "absolute",
      display:"inline-block",
      top:"50%",
      left:"50%",
      marginLeft: "-50px",
      marginRight: "-15px",
      textAlign: "center",
      outline: "none",
      border: "none",
      background: "rgba(255,255,255,0.3)",
      fontSize: "1rem",
      lineHeight:"30px ",
      borderRadius: "4px",
    }
  }
}

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