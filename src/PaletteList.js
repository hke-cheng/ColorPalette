import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { withStyles } from '@material-ui/core/styles';
//
import MiniPalette from "./MiniPalette";
import styles from "./styles/PaletteListStyles";



class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //gotopalette methods
 goToPalette(id){
   this.props.history.push(`/palette/${id}`)
 }

  render() {
    const { classes, palettes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Color</h1>
          </nav>
          <div className={classes.palettes}>
            {palettes.map(palette => (
              <MiniPalette {...palette} handleClick={()=>this.goToPalette(palette.id)}/>
            ))}
          </div>
        </div>

        {/* Loopover Lists */}

      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);