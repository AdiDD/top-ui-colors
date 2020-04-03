import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NewPaletteForm from "./NewPaletteForm";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from "./seedColors";
import "./styles/App.css";
import { generatePalette } from "./colorHelpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Page from "./Page";

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
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="page" timeout={100}>
              <Switch location={location}>
                <Route
                  exact
                  path="/"
                  render={routeProps => (
                    <Page>
                      <PaletteList
                        {...routeProps}
                        palettes={this.state.palettes}
                        deletePalette={this.deletePalette}
                      />
                    </Page>
                  )}
                />
                )} />
                <Route
                  exact
                  path="/new-palette"
                  render={routeProps => (
                    <Page>
                      <NewPaletteForm
                        {...routeProps}
                        palettes={this.state.palettes}
                        seedColors={seedColors}
                        savePalette={this.savePalette}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={routeProps => (
                    <Page>
                      <Palette
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.id)
                        )}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={routeProps => (
                    <Page>
                      <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.paletteId)
                        )}
                      />
                    </Page>
                  )}
                />
                <Route
                  render={routeProps => (
                    <Page>
                      <PaletteList
                        {...routeProps}
                        palettes={this.state.palettes}
                        deletePalette={this.deletePalette}
                      />
                    </Page>
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
