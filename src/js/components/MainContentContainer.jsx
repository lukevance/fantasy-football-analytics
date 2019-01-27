import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
// import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import LeagueSummaryTableContainer from './LeagueOverview/LeagueSummaryTable.container';
import CollectLeagueIdContainer from './CollectLeagueId.container';
import LeagueByPositions from './TableViews/LeagueByPositions.container';

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
    console.log('main nav is rendering!');
    const { classes, leagueId } = this.props;
    if (leagueId) {
      return (
        <div className={classes.root}>
          <Switch>
              <Route exact path="/" component={LeagueSummaryTableContainer}/>
              <Route path="/players" component={LeagueByPositions} />
              <Route path="/my-team" component={LeagueByPositions} />
          </Switch>
          </div>
      );
    } else {
      // this should render leagueID collection components
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
