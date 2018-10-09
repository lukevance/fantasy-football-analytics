import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import LeagueSummaryTableContainer from './LeagueSummaryTable.container';
import CollectLeagueIdContainer from './CollectLeagueId.container';
// import LeaguePositionSummary from './LeaguePositionSummaries.container';


const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    textAlign: 'left',
  }
});

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   leagueId: '286565'
    // }
  }

  render() {
    const { classes } = this.props;
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
    const combinedComponents = (
      <div className={classes.root}>
        <Typography variant="title"> League Summary</Typography>
        {/* <LeagueSummaryTableContainer leagueId={this.props.leagueId} /> */}
        {/* <LeaguePositionSummary teams={store.getState(teams)} */}
        {loginOrTable(this.props.leagueId)}
      </div>
    );
    return combinedComponents;
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
