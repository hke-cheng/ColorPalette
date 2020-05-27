import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { withStyles } from '@material-ui/core/styles';
//
import MiniPalette from "./MiniPalette";


//Define Styles
const styles = {
  root: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  container: {
    width: "50%",
    display:"flex",
    alignItems:"flex-start",
    flexDirection:"column",
    flexWrap:"wrap",
    border:"1px solid black"
  },
  nav: {
    display:"flex",
    width:"100%",
    justifyContent:"space-between",
    border:"1px solid black",
    color:"white"
  },
  palettes:{
    boxSizing:"border-box",
    width:"100%",
    display:"grid",
    gridTemplateColumns:"repeat(3,30%)",
    gridGap:"5%"
  },
}

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