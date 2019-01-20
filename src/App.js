import React, { Component } from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import { withRouter } from 'react-router';
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
    const { location, history } = this.props;
    console.log('appjs is rendering!');
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <NavBar 
            location={location}
            history={history}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
