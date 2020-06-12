import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import DraggableColorBox from "./DraggableColorBox";


const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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
  hide: {
    display: 'none',
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
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState("red");
  const [colors, setColors] = useState([{ color: "blue", name: "blue" }]);
  const [newName, setNewName] = useState("");
  const [newPaletteName, setNewPaletteName] = useState("");
  //

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

  }, [newName, currentColor,newPaletteName]);

  // 
  function handleDrawerOpen() {
    setOpen(true);
  };

  function handleDrawerClose() {
    setOpen(false);
  };

  function addNewColor() {
    const newColor = {
      color: currentColor,
      name: newName
    }
    setColors([...colors, newColor]);
  };

  function deleteColor(colorName){
    setColors(
      colors.filter(c=>c.name !== colorName)
    )
  };

  function handleChange(evt) {
    setNewName(evt.target.value);
  };

  function handleChangePaletteName(evt) {
    setNewPaletteName(evt.target.value);
  };

  function handleSubmit(){
    let newName = newPaletteName;
    const newPalette ={
      paletteName:newName,
      id:newName.toLocaleLowerCase().replace(/ /g, "-"),
      colors:colors,
    }
     props.savePalette(newPalette);
     //redirect
     props.history.push("/")
  }

  //
  return (
    <div className={classes.root}>
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
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>

          <ValidatorForm
          onSubmit={() => handleSubmit()}
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

        </ValidatorForm>


{/* 
          <Button
            variant="contianed"
            color="primary"
            onClick={()=>handleSubmit()}
          >
            Save Palette
         </Button> */}

        </Toolbar>
      </AppBar>

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
          <Button variant="contained" color="secondary"> Clear Palette</Button>
          <Button variant="contained" color="primary"> Random Color</Button>
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
            style={{ backgroundColor: currentColor }}
          >
            Add Color
        </Button>

        </ValidatorForm>

      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        {colors.map(c => <DraggableColorBox
          key={c.name}
          color={c.color}
          name={c.name}
          handleClick={()=> deleteColor(c.name)}
        />)}


      </main>
    </div>
  );
}