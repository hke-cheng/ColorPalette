import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import Palette from "./Palette";
import PlatteList from "./PaletteList";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

function findPalette(id) {
  return seedColors.find((palette) => palette.id === id);
};

function App() {
  return (
    
      //Define Routes 
      <Switch>
        <Route exact path="/" render={(routeProps) => <PlatteList palettes={seedColors} {...routeProps}/>} />
        <Route exact path="/palette/:id" render={(routeProps) => <Palette palette={generatePalette(
          findPalette(routeProps.match.params.id)
        )} />
        }
        />
        <Route 
        exact
        path="/palette/:paletteId/:colorId"
        render={()=><h1>Single color page!</h1>}
        />
      </Switch>

  );
}

export default App;
