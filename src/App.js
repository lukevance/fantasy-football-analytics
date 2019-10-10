import React, { Component } from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import { Route, Switch, withRouter } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';

import NavBar from './js/components/Navigation/NavBarWithMenuDrawer';
import LeagueSummaryTableContainer from './js/components/LeagueOverview/LeagueSummaryTable.container';
import LeagueByPositions from './js/components/TableViews/LeagueByPositions.container';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4a148c',
    },
    secondary: {
      main: '#774AAD',
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
