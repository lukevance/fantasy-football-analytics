import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import LeagueSummaryTableContainer from './LeagueSummaryTable.container';
import CollectLeagueIdContainer from './CollectLeagueId.container';
import LeagueByPositions from './TableViews/LeagueByPositions';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    textAlign: 'left',
  }
});

class MainContent extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   leagueId: '286565'
    // }
  }

  render() {
    const { classes, leagueId } = this.props;
    const loginOrTable = (leagueId) => {
      if (leagueId) {
        return (
          <div>
            {/* <LeagueHighlights /> */}
            <LeagueSummaryTableContainer leagueId={this.props.leagueId} />
          </div>
        );
      } else {
        return (
          <CollectLeagueIdContainer />
        )
      }
    }
    const combinedComponents = () => (
      <div>
        <Typography variant="title"> League Summary</Typography>
        {/* <LeagueSummaryTableContainer leagueId={this.props.leagueId} /> */}
        {/* <LeaguePositionSummary teams={store.getState(teams)} */}
        {loginOrTable(leagueId)}
      </div>
    );
    // return combinedComponents;
    return (
        <Router>
          <div className={classes.root}>
            <Route exact path="/" component={combinedComponents}/>
            <Route path="/positions" component={LeagueByPositions} />
            {/* <Route path="/airports" component={Airport}/> */}
            {/* <Route path="/cities" component={City}/> */}
          </div>
        </Router>
    );
    
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

export default withStyles(styles)(VisibleMainContent);
