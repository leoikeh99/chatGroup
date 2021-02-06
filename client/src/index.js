import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
const darkTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#2f80ed",
    },
    secondary: {
      main: "#eb5757",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
