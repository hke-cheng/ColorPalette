import React, { useState, useEffect } from 'react';


//
import PaletreFormNav from "./PaletteFormNav";
//
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";




const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


export default function NewPaletteForm(props) {
  const defaultProps = {
    maxColors: 20
  };

  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState("red");
  const [colors, setColors] = useState([...props.palettes[0].colors]);
  const [newName, setNewName] = useState("");
  const [newPaletteName, setNewPaletteName] = useState("");

  useEffect(() => {

    ValidatorForm.addValidationRule("isNameUnique", (value) =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );

    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      colors.every(({ color }) => color !== currentColor)
    );

    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
    );

  }, [newName, currentColor]);

  // 
  function handleDrawerOpen() {
    setOpen(true);
  };

  function handleDrawerClose() {
    setOpen(false);
  };
  //
  function addNewColor() {
    const newColor = {
      color: currentColor,
      name: newName
    }
    setColors([...colors, newColor]);
  };

  function deleteColor(colorName) {
    setColors(
      colors.filter(c => c.name !== colorName)
    )
  };

  //
  function clearColors() {
    setColors([]);
  };

  function addRadomColors() {
    const allColors = props.palettes.map(p => p.colors).flat();
    var rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    setColors([...colors, randomColor]);
  }

  function handleChange(evt) {
    setNewName(evt.target.value);
  };

  function handleChangePaletteName(evt) {
    setNewPaletteName(evt.target.value);
  };

  function handleSubmit(newPaletteName) {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLocaleLowerCase().replace(/ /g, "-"),
      colors: colors,
    }
    props.savePalette(newPalette);
    //redirect
    props.history.push("/")
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors((colors) => (
      arrayMove(colors, oldIndex, newIndex)))
  };

  //
  return (
    <div className={classes.root}>
      
      <PaletreFormNav 
      handleOpen={handleDrawerOpen} 
      open={open} 
      palettes={props.palettes} 
      onSubmit={handleSubmit} 
      colors={colors}/>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />

        <Typography variant='h4'>Design Palette</Typography>
        <div>
          <Button variant="contained" color="secondary" onClick={clearColors}> Clear Palette</Button>
          <Button variant="contained" color="primary" onClick={addRadomColors} disabled={colors.length >= defaultProps.maxColors}> Random Color</Button>
        </div>

        <ChromePicker
          color={currentColor}
          onChangeComplete={newColor => setCurrentColor(newColor.hex)}
        />

        <ValidatorForm
          onSubmit={() => addNewColor()}
        >
          <TextValidator
            label="Name"
            onChange={(evt) => handleChange(evt)}
            value={newName}
            validators={["required", "isNameUnique", "isColorUnique"]}
            errorMessages={["add name is required", "Name is Taken", "Color already used!"]}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={colors.length >= defaultProps.maxColors}
            style={{ backgroundColor: currentColor }}
          >
            {colors.length >= defaultProps.maxColors ? "Palette Full" : "Add Color"}
          </Button>

        </ValidatorForm>

      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        <DraggableColorList
          colors={colors}
          deleteColor={deleteColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />


      </main>
    </div>
  );
}