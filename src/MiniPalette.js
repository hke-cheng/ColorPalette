import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from "./styles/MiniPaletteStyles";


// UI
function MiniPalette(props) {
  const { classes } = props;
  const { paletteName, id, emoji, colors, } = props;
  const miniColorBoxes= colors.map(color => (
    <div 
    className={classes.miniColor} 
    style={{backgroundColor:color.color}} 
    key={color.name}/>
  ))
  return (
    <div className={classes.root} onClick={props.handleClick}>
      <div className={classes.colors}>
        {miniColorBoxes}
      </div>
      <h5 className={classes.title}>{paletteName}<span className="emoji">{emoji}</span></h5>
    </div>
  )
}

export default withStyles(styles)(MiniPalette);