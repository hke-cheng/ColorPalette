import React, {useState}from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
//
import Palette from "./Palette";
import PlatteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
//
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import NewPaletteForm from './NewPaletteForm';


function App() {
  const SEEDCOLORS = seedColors;
  const [colorPalettes, setColorPalettes] = useState([...SEEDCOLORS]);
  
  function findPalette(id) {
    return colorPalettes.find((palette) => palette.id === id);
  };
  
  function savePalette(newPalette) {
    // console.log(newPalette);
    // save this palette into thr seedColors
    setColorPalettes([...colorPalettes, newPalette]);
  }


  return (
    //Define Routes 
    <Switch>
      <Route exact path="/palette/new" render={(routeProps) => <NewPaletteForm savePalette={savePalette} {...routeProps}/>} />
      <Route exact path="/" render={(routeProps) => <PlatteList palettes={colorPalettes} {...routeProps} />} />
      <Route exact path="/palette/:id" render={(routeProps) => <Palette palette={generatePalette(
        findPalette(routeProps.match.params.id)
      )} />
      }
      />
      <Route
        exact
        path="/palette/:paletteId/:colorId"
        render={routeProps => <SingleColorPalette
          colorId={routeProps.match.params.colorId}
          palette={generatePalette(
            findPalette(routeProps.match.params.paletteId)
          )} />
        }
      />

    </Switch>

  );
}

export default App;
