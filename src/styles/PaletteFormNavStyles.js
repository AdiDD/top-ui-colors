import { DRAWER_WIDTH } from "../constants";
import sizes from "./sizes";

const drawerWidth = DRAWER_WIDTH;
const styles = theme => ({
  root: {
    display: "flex"
  },
  hide: {
    display: "none"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 64
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  navButtons: {
    marginRight: "1rem",
    "& a": {
      textDecoration: "none"
    }
  },
  displayNoneAt870px: {
    "@media (max-width: 870px)": {
      display: "none"
    }
  },
  button: {
    margin: "0 0.5rem"
  },
  h6Text: {
    [sizes.down("xs")]: {
      display: "none"
    }
  }
});

export default styles;
