import React, {Component} from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import LeagueSummaryTableContainer from './LeagueOverview/LeagueSummaryTable.container';
import CollectLeagueIdContainer from './CollectLeagueId.container';
import LeagueByPositions from './TableViews/LeagueByPositions.container';
import TeamSummary from './TableViews/SingleTeamSummary';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8,
    marginLeft: theme.spacing.unit * 3,
    textAlign: 'left',
  }
});

class MainContent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('main content is rendering!');
    const { classes, leagueId } = this.props;
    if (leagueId) {
      return (
        <div className={classes.root}>
          <Switch>
              <Route exact path="/" component={LeagueSummaryTableContainer}/>
              <Route path="/players" component={LeagueByPositions} />
              <Route path="/my-team" component={LeagueByPositions} />
              <Route path="/teams/:team" component={TeamSummary} />
          </Switch>
          </div>
      );
    } else {
      return (
        <div style={{paddingTop: 50}}>
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

export default withStyles(styles, {withTheme: true})(MainContentWithRouter);
