import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';



const drawerWidth = 400;

const useStyles = makeStyles(theme => ({

  hide: {
    display: 'none',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));


function PaletteFormNav(props) {

  const classes = useStyles();
  const theme = useTheme();

  const { handleOpen, onSubmit, palettes, open } = props;
  const [newPaletteName, setNewPaletteName] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
    palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
  );

  }, [newPaletteName]);


  function handleChangePaletteName(evt) {
    setNewPaletteName(evt.target.value);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >

        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleOpen()}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>

          <ValidatorForm
            onSubmit={() => onSubmit(newPaletteName)}
          >
            <TextValidator
              label="Palette Name"
              onChange={(evt) => handleChangePaletteName(evt)}
              value={newPaletteName}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter Palette Name", "Name is Taken"]}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              SAVE PALETTE
            </Button>

            <Link to="/">
              <Button variant="contained" color="secondary">Go Back</Button>
            </Link>

          </ValidatorForm>


        </Toolbar>
      </AppBar>

    </div>
  )
}

export default PaletteFormNav; 