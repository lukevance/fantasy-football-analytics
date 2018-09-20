import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import LeagueSummaryTableContainer from './js/components/LeagueSummaryTable.container';

const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    textAlign: 'left',
  }
});

class MainContent extends React.Component {
  // (props) {
  constructor(props) {
    super(props);
    this.state = {
      leagueId: '286565'
    }
  }

  componentWillMount(){
    const getleagueData = async (leagueId) => {
      let url = 'http://games.espn.com/ffl/api/v2/teams?leagueId=' + leagueId;
      const res = await fetch(url);
      const json = await res.json();
      // save teams to current state
      this.setState({
        leagueData: json.teams
      });
    }
   getleagueData(this.state.leagueId);
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="title"> Your League Name </Typography>
        {/* <h1>Your League Name Here</h1> */}
        {/* <DataTableContainer /> */}
        <LeagueSummaryTableContainer teams={this.state.teams} />
      </div>
    );
  }
}

MainContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainContent);