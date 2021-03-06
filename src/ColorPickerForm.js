import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import styles from "./styles/ColorPickerFormStyles";

class ColorPickerForm extends Component {
  state = {
    currentColor: "#3F8185",
    newColorName: ""
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", value =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    );
  }

  updateCurrentColor = newColor => {
    this.setState({ currentColor: newColor.hex });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    this.props.addNewColor(newColor);
    this.setState({ newColorName: "" });
  };

  render() {
    const { paletteIsFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;

    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChange={this.updateCurrentColor}
          className={classes.colorPicker}
        />
        <ValidatorForm
          ref="form"
          instantValidate={false}
          onSubmit={this.handleSubmit}
        >
          <TextValidator
            className={classes.colorNameInput}
            value={newColorName}
            name="newColorName"
            placeholder="Color Name"
            variant="filled"
            margin="normal"
            onChange={this.handleChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "Color name is required",
              "There is already a color with that name",
              "That color is already on the palette"
            ]}
          />
          <Button
            className={classes.addColorButton}
            type="submit"
            variant="contained"
            color="primary"
            disabled={paletteIsFull}
            style={{
              backgroundColor: paletteIsFull ? "rgb(224,224,224)" : currentColor
            }}
          >
            {paletteIsFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
