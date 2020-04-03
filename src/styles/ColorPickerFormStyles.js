import sizes from "./sizes";

export default {
  colorPicker: {
    width: "100% !important",
    marginTop: "2rem"
  },
  colorNameInput: {
    width: "100%",
    height: 70
  },
  addColorButton: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem",
    [sizes.down("xxs")]: {
      fontSize: "1rem"
    }
  }
};
