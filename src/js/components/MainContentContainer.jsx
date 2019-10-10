import React, { Component } from 'react';
import { Link, Route, Switch, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// UI components
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// UI icons
import {ArrowDropDown} from '@material-ui/icons';

import LeagueSummaryTableContainer from './LeagueOverview/LeagueSummaryTable.container';
// import CollectLeagueIdContainer from './CollectLeagueId.container';
import LeagueByPositions from './TableViews/LeagueByPositions.container';
// import TeamSummary from './TableViews/SingleTeamSummary';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8,
    marginLeft: theme.spacing.unit * 3,
    textAlign: 'left',
  },
  tableTitle: {
    marginBottom: theme.spacing.unit * 2,
  }
});

const availableTableViews = [
  {
    title: "League Overview",
    link: "overview"
  },
  {
    title: "Points by Position",
    link: "pts-by-position"
  }
];

class MainContent extends Component {
  state = {
    anchorEl: null,
    selectedTable: 0
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = tableView => {
    const newSelectedTable = availableTableViews.findIndex(view => view.link === tableView.link);
    // check that a valid new table was selected
    if (newSelectedTable >= 0) {
      this.setState({ anchorEl: null, selectedTable: newSelectedTable});
    } else {
      this.setState({ anchorEl: null});
    }
  };

  render() {
    const { classes, leagueId } = this.props;
    const { anchorEl, selectedTable } = this.state;
    if (leagueId) {
      return (
        <div className={classes.root}>
          <Button 
            variant="contained" 
            color="secondary"
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            {availableTableViews[selectedTable].title}
            <ArrowDropDown/>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            {availableTableViews.map(view => {
              return (
                <MenuItem 
                  component={Link}
                  to={`/${view.link}`}
                  onClick={() => this.handleClose(view)}
                >
                  {view.title}
                </MenuItem>
              )
            })
          }
          </Menu>
          <Switch>
            <Route exact path="/overview" component={LeagueSummaryTableContainer} />
            <Route path="/pts-by-position" component={LeagueByPositions} />
              {/* <Route path="/my-team" component={LeagueByPositions} />
              <Route path="/teams/:team" component={TeamSummary} /> */}
          </Switch>
        </div>
      );
    } else {
      return (
        <div style={{ paddingTop: 50 }}>
          <h2>No League ID found</h2>
        </div>
      );
    }
  }
}

MainContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    leagueId: state.leagueId
  }
}

const VisibleMainContent = connect(
  mapStateToProps
)(MainContent);

const MainContentWithRouter = withRouter(VisibleMainContent);

export default withStyles(styles, { withTheme: true })(MainContentWithRouter);
