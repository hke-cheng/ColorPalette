import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from "chroma-js";
import { withStyles } from "@material-ui/styles";
import "./ColorBox.css"


//Define Styles ↓
const styles = {
  ColorBox: {
    width: "20%",
    height: props => props.showingFullPalette ? "25%" : "50%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover button": {
      opacity: 1,
    }
  },
  copyText: {
    color: props => chroma(props.background).luminance() >= 0.7 ? "black" : "white"
  },
  colorName: {
    color: props => chroma(props.background).luminance() <= 0.1 ? "white" : "black"
  },
  seeMore: {
    color: props => chroma(props.background).luminance() >= 0.7 ? "black" : "white",
    background: "rgba(255,255,255,0.3)",
    position: "absolute",
    border: "none",
    right: "0px",
    bottom: "0px",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase",
  },
  copyButton: {
    color: props => chroma(props.background).luminance() >= 0.7 ? "black" : "white",
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginRight: "-15px",
    textAlign: "center",
    outline: "none",
    border: "none",
    background: "rgba(255,255,255,0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    borderRadius: "4px",
    opacity: 0,
  },
  boxContent: {
    position: 'absolute',
    padding: '10px',
    width: '100%',
    left: '0px',
    bottom: '0px',
    color: 'black',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
  },
  copyOverlay: {
    opacity: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
    transition: "transform 1s ease-in-out",
    transform: "sacle(0.1)",
  },
  showOverlay: {
    opacity: "1",
    transform: " scale(50)",
    zIndex: "10",
    position: "absolute",
  },
  copyMsg: {
    position: "fixed",
    left: "0px",
    top: "0px",
    right: "0px",
    bottom: "0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "4rem",
    transform: "scale(0.1)",
    opacity: "0",
    color: "white",
    "& h1":{
      fontWeight:"400",
      textShadow:"1px 2px black",
      background: "rgba(255,255,255,0.2)",
      width: "100%",
      marginBottom: "0px",
      padding:"1rem",
      textAlign: "center",
      textTransform: "uppercase",
    },
    "& p":{
      fontSize:"2rem",
      fontWeight: "100",
    }
  },
  showCopyMsg: {
    opacity: "1",
    transform: "scale(1)",
    zIndex: "25",
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.2s",
  }
}

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };

    this.changeCopyState = this.changeCopyState.bind(this);
  }
  /**
  |--------------------------------------------------
  | Set Helper method
  |--------------------------------------------------
  */
  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    })
  }

  /**
  |--------------------------------------------------
  | 
  |--------------------------------------------------
  */
  render() {
    const { name, background, paletteId, id, showingFullPalette, classes } = this.props;
    const { copied } = this.state;

    return (

      <CopyToClipboard text={background} onCopy={this.changeCopyState}>

        <div style={{ background: background }} className={classes.ColorBox}>
          <div style={{ background: background }} className={`${classes.copyOverlay} ${copied && classes.showOverlay}`} />

          <div className={`${classes.copyMsg} ${copied && classes.showCopyMsg}`}>
            <h1>copied</h1>
            <p className={classes.copyText}>
              {this.props.background}
            </p>
          </div>

          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>

          {/* Constructing Route Link */}
          {showingFullPalette &&
            <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
              <span className={classes.seeMore}>MORE</span>
            </Link>
          }
        </div>

      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);