import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/index";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
// import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";  <---This is commented out for now until we decide on theme.

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: "#0087ea"
//     },
//     secondary: {
      // light: '#0066ff',
//       main: "#24dc8e",
//       contrastText: "#fff"
//     },
//     accent: {
//       backgroundColor: "#ffa500",
//       color: "#fff"
//     }
//   }
// });

const AppWithRouter = withRouter(App);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      {/* <MuiThemeProvider theme={theme}> */}
      <AppWithRouter />
      {/* </MuiThemeProvider> */}
    </Router>
  </Provider>,
  document.getElementById("root")
);