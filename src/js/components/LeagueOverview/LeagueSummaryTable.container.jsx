import React, { Component } from 'react';
// import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {addTeam} from '../../actions';
import LeagueSummaryTable from './LeagueSummaryTable.presentation';


const sorters = {
    wins: (a, b) => {
        return b.record.overallWins - a.record.overallWins;
    },
    points: (a, b) => {
        return b.record.pointsFor - a.record.pointsFor;
    },
    waiver: (a, b) => {
        return a.waiverRank - b.waiverRank;
    },
    acquisitions: (a, b) => {
        return b.teamTransactions.overallAcquisitionTotal - a.teamTransactions.overallAcquisitionTotal;
    },
    trades: (a, b) => {
        return b.teamTransactions.trades - a.teamTransactions.trades;
    },
}

class LeagueSummaryTableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: []
        }
    }

    componentWillMount() {
        const {addTeam, teams} = this.props;
        // Make API call to get league info using leagueId
        const getleagueData = async (leagueId) => {
            const url = `http://games.espn.com/ffl/api/v2/teams?leagueId=${leagueId}&seasonId=2018`;
            const options = {
                method: 'GET',
            };
            const res = await fetch(url, options);
            const json = await res.json();
            // if teams were found, save teams to current state -- hit REDUX with this ish!!
            if (json.teams && json.teams.length > 1){
                await json.teams.forEach(team => {
                    // console.log(team);
                    addTeam(team)
                });
                this.setState({
                    teams: json.teams
                });
            } 
            // if no teams returned, record error TODO; display helpful message to user
            else {
                console.log(json);
            }
        }
        if (!teams || teams.length < 1){
            getleagueData(this.props.leagueId);
        }
    }

    render() {
        const { teams, location } = this.props;
        // After retrieving team info, render Table with rows for each team
        return (
            <div>
                <LeagueSummaryTable 
                    teams={teams} 
                    leagueId={this.props.leagueId} 
                    sorters={sorters}
                    location={location}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      leagueId: state.leagueId,
      teams: state.teams
    }
  };

const mapDispatchToProps = dispatch => ({
    addTeam: team => dispatch(addTeam(team))
});
  
  const VisibleLeagueSummary = connect(
    mapStateToProps,
    mapDispatchToProps
  )(LeagueSummaryTableContainer);
  

// export default withRouter(VisibleLeagueSummary);
export default VisibleLeagueSummary;