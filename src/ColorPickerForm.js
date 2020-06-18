import React, { useState, useEffect } from 'react';

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


function ColorPickerForm(props) {

  const classes = useStyles();
  const theme = useTheme();

  const { handleSetCurrentColor, currentColor, handleAddNewColor, handleSetNewName, newName, colors, defaultProps } = props;

  // 
  useEffect(() => {
 
    ValidatorForm.addValidationRule("isColorUnique", (value) =>
       colors.every(({ color }) => color !== currentColor)
    );

    ValidatorForm.addValidationRule("isNameUnique", (value) =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );

  }, [newName, currentColor]);

  function handleChange(evt) {
    handleSetNewName(evt.target.value);
  };

  return (
    <div>
      <ChromePicker
        color={currentColor}
        onChangeComplete={newColor => handleSetCurrentColor(newColor.hex)}
      />

      <ValidatorForm
        onSubmit={() => handleAddNewColor()}
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

    </div>
  )
}


export default ColorPickerForm;
