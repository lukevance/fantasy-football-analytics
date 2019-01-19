import React, { Component } from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
// import logo from './logo.svg';
import './App.css';

// import NavBar from './js/components/NavBar';
import NavBar from './js/components/Navigation/NavBarWithMenuDrawer';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4a148c',
    },
    secondary: {
      main: '#69f0ae',
    },
  },
});

class App extends Component {
  render() {
    console.log('appjs is rendering!');
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <NavBar />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
