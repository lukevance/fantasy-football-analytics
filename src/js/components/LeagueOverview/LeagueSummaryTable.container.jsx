import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addTeam, addMember} from '../../actions';
import LeagueSummaryTable from './LeagueSummaryTable.presentation';

const sorters = {
    wins: (a, b) => {
        return b.record.overall.wins - a.record.overall.wins;
    },
    points: (a, b) => {
        return b.record.overall.pointsFor - a.record.overall.pointsFor;
    },
    waiver: (a, b) => {
        return a.waiverRank - b.waiverRank;
    },
    acquisitions: (a, b) => {
        return b.transactionCounter.acquisitions - a.transactionCounter.acquisitions;
    },
    trades: (a, b) => {
        return b.transactionCounter.trades - a.transactionCounter.trades;
    },
}

class LeagueSummaryTableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            members: []
        }
    }

    componentWillMount() {
        const {addTeam, addMember, teams, members, leagueId} = this.props;
        // Make API call to get league info using leagueId
        const getleagueData = async leagueId => {
            const url = `https://rwbgp2ppxa.execute-api.us-east-1.amazonaws.com/dev/leagues/${leagueId}?season=2018`;
            const options = {
                method: 'GET'
            };
            const res = await fetch(url, options);
            const json = await res.json();
            // if teams were found, save teams to store and state
            if (json.teams && json.teams.length > 1){
                await json.teams.forEach(team => {
                    addTeam(team)
                });
                this.setState({
                    teams: json.teams,
                });
            }
            // if members were found, save members to store and state
            if (json.members && json.members.length > 1){
                await json.members.forEach(member => {
                    addMember(member);
                });
                this.setState({
                    members: await json.members,
                });
            } 
            // if no teams returned, record error TODO; display helpful message to user
            else {
                console.log(json);
            }
        }
        if (!teams || teams.length < 1){
            getleagueData(leagueId);
        }
    }

    render() {
        const { teams, members, location, leagueId } = this.props;
        // After retrieving team info, render Table with rows for each team
        return (
            <div>
                <LeagueSummaryTable 
                    teams={teams} 
                    members={this.state.members}
                    leagueId={leagueId} 
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
      teams: state.teams,
      members: state.members
    }
  };

const mapDispatchToProps = dispatch => ({
    addTeam: team => dispatch(addTeam(team)),
    addMember: member => dispatch(addMember(member))
});
  
  const VisibleLeagueSummary = connect(
    mapStateToProps,
    mapDispatchToProps
  )(LeagueSummaryTableContainer);
  
export default VisibleLeagueSummary;
