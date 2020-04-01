import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NewPaletteForm from "./NewPaletteForm";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from "./seedColors";
import "./App.css";
import { generatePalette } from "./colorHelpers";

class App extends Component {
  state = { palettes: seedColors };

  findPalette = id => this.state.palettes.find(palette => palette.id === id);

  savePalette = newPalette => {
    this.setState({ palettes: [...this.state.palettes, newPalette] });
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={routeProps => (
            <PaletteList palettes={this.state.palettes} {...routeProps} />
          )}
        />
        )} />
        <Route
          exact
          path="/new-palette"
          render={routeProps => (
            <NewPaletteForm {...routeProps} savePalette={this.savePalette} />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={routeProps => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
