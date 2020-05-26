import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// Define Styles here!
const styles = {
  root: {
    backgroundColor: "white",
    borderRadius: "5px",
    border: "1px solid black",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      cursor: "pointer"
    }
  },
  colors: {
    backgroundColor: "grey",
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative"
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem"
  }


}

function MiniPalette(props) {
  const { classes } = props;
  console.log(props);
  const { paletteName, id, emoji, colors, } = props;
  return (
    <div className={classes.root}>
      <div className={classes.colors}></div>
      <h5 className={classes.title}>{paletteName}<span className="emoji">{emoji}</span></h5>
    </div>
  )
}

export default withStyles(styles)(MiniPalette);