import React, { Component } from 'react';
import LeagueSummaryTable from './LeagueSummaryTable.presentation';

class LeagueSummaryTableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: []
        }
    }
    // Make API call to get league info using leagueId

    // After retrieving team info, render Table with rows for each team

    componentWillMount() {
        const getleagueData = async (leagueId) => {
            let url = 'http://games.espn.com/ffl/api/v2/teams?leagueId=' + leagueId;
            const res = await fetch(url);
            const json = await res.json();
            // save teams to current state
            this.setState({
                teams: json.teams
            });
        }
        getleagueData(this.props.leagueId);
    }

    render() {
        const { teams } = this.state;
        return (
            <div>
                <LeagueSummaryTable teams={teams} leagueId={this.props.leagueId}/>
            </div>
        );
    }
}

export default LeagueSummaryTableContainer;