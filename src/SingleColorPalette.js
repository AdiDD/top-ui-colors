import React, { Component } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyles";

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = { format: "hex", overflowHidden: false };
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);

    this.changeFormat = this.changeFormat.bind(this);
  }

  gatherShades(palette, colorId) {
    let shades = [];
    const allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorId)
      );
    }
    return shades.slice(1);
  }

  changeFormat(value) {
    this.setState({ format: value });
  }

  changeOverflowHidden = () => {
    this.setState({ overflowHidden: !this.state.overflowHidden });
  };

  render() {
    const { format, overflowHidden } = this.state;
    const { id, paletteName, emoji } = this.props.palette;
    const { classes } = this.props;
    const colorBoxes = this._shades.map(color => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        format={format}
        showingFullPalette={false}
        changeOverflowHidden={this.changeOverflowHidden}
      />
    ));

    return (
      <div
        className={classNames(classes.Palette, {
          [classes.overflowHidden]: overflowHidden
        })}
      >
        <Navbar handleChange={this.changeFormat} showSlider={false} />
        <div className={classes.colors}>
          {colorBoxes}
          <Link to={`/palette/${id}`} className={classes.goBack}>
            <div className={classes.backButton}>Go Back</div>
          </Link>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
