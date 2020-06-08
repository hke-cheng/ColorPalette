import React, { Component } from 'react';
import { withStyles } from "@material-ui/styles";
// 
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
//
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
// 
import Slider, { Range } from "rc-slider";
import 'rc-slider/assets/index.css';

//
import { Link } from "react-router-dom";
import styles from "./styles/NavbarStyles";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "hex",
      open: false
    };
    // 
    this.handleChange = this.handleChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }
  /**
  |--------------------------------------------------
  | Helper methods
  |--------------------------------------------------
  */
  handleChange(e) {

    this.setState({ format: e.target.value, open: true });
    this.props.handleChange(e.target.value);
  };

  closeSnackbar() {
    this.setState({ open: false });
  }

  render() {
    const { level, changeLevel, handleChange, showSlider, classes } = this.props;
    const { format } = this.state;
    return (
      <header className={classes.Navbar}>
        {/* Logo */}
        <div className={classes.logo}>
          <Link to="/">reactcolorpicker</Link>
        </div>

        {showSlider &&
          <div>
            <span>Level: {level}</span>

            <div className={classes.slider}>
              <Slider
                defaultValue={level}
                min={100} max={900} step={100}
                onAfterChange={changeLevel}
              />
            </div>
          </div>
        }

        {/* Selector */}
        <div className={classes.selectContainer}>
          <Select value={format} onChange={this.handleChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
          </Select>
        </div>

        {/* Snackbar */}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={3000}
          // onClose={handleClose}
          message={<span id="message-id">Format Changed to {format}</span>}
          ContentProps={{
            "aria-describedly": "message-id"
          }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton
              onClick={this.closeSnackbar}
              color="inherit"
              key="color"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          ]}
        />

      </header>
    );
  }
}

export default withStyles(styles)(Navbar);