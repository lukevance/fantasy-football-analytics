import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch, withRouter } from 'react-router-dom';
// import { withRouter } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItemsDrawer from './MenuItems';
// import MainContent from '../MainContentContainer';

import LeagueSummaryTableContainer from '../LeagueOverview/LeagueSummaryTable.container';
import LeagueByPositions from '../TableViews/LeagueByPositions.container';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  main: {
    marginTop: theme.spacing.unit * 8,
    marginLeft: theme.spacing.unit * 3,
    textAlign: 'left',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class PersistentDrawerLeft extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme, history, location } = this.props;
    const { open } = this.state;
    console.log('navbr is rendering!', location, history);

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"s
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="headline" color="inherit" noWrap>
              Fantasy Football Data Ninja
            </Typography>
          </Toolbar>
          {/* TODO: Place league select menu here! */}
        </AppBar>
        <MenuItemsDrawer open={open} handleDrawerClose={this.handleDrawerClose}/>
        <div
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {/* <MainContent /> */}
          <div className={classes.main}>
            <Switch>
                <Route exact path="/" component={LeagueSummaryTableContainer}/>
                <Route path="/players" component={LeagueByPositions} />
                <Route path="/teams/:abbrev" component={LeagueByPositions} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const styledDrawer = withStyles(styles, { withTheme: true })(PersistentDrawerLeft);

export default withRouter(styledDrawer);