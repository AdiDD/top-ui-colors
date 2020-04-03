import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NewPaletteForm from "./NewPaletteForm";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from "./seedColors";
import "./App.css";
import { generatePalette } from "./colorHelpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class App extends Component {
  constructor(props) {
    super(props);
    const windowStoragePalettes = JSON.parse(
      window.localStorage.getItem("palettes")
    );
    this.state = { palettes: windowStoragePalettes || seedColors };
  }

  findPalette = id => this.state.palettes.find(palette => palette.id === id);

  savePalette = newPalette => {
    this.setState(
      { palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage
    );
  };

  deletePalette = id => {
    this.setState(
      {
        palettes: this.state.palettes.filter(palette => palette.id !== id)
      },
      this.syncLocalStorage
    );
  };

  syncLocalStorage = () => {
    // save palettes to local storage
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  };

  render() {
    return (
      <Route
        render={() => (
          <TransitionGroup>
            <CSSTransition classNames="fade" timeout={5000}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={routeProps => (
                    <PaletteList
                      {...routeProps}
                      palettes={this.state.palettes}
                      deletePalette={this.deletePalette}
                    />
                  )}
                />
                )} />
                <Route
                  exact
                  path="/new-palette"
                  render={routeProps => (
                    <NewPaletteForm
                      {...routeProps}
                      palettes={this.state.palettes}
                      savePalette={this.savePalette}
                    />
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
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}

export default App;
