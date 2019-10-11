import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import LeagueByPositionsPresentation from './LeagueByPositions.presentation';

// import getTeamsWeeklyStats from '../../util';

const range = (start, end) => {
    let range = [];
    for (let i = start; i <= end; i++){
        range.push(i);
    }
    return range;
}

const getLeagueWeekStats = async (leagueId, week) => {
    const weekParam = week ? `?week=${week}` : ``;
    const url = `https://8fqfwnzfyb.execute-api.us-east-1.amazonaws.com/dev/leagues/${leagueId}/teams/stats${weekParam}`;
    const options = {
        method: 'GET'
    };
    const res = await fetch(url, options);
    const json = await res.json();
    return json;
};

class LeagueByPositionsContainer extends Component {
    state = {
        teams: []
    };

    async componentDidMount (){
        const {teams, leagueId} = this.props;
        // Check that teams don't have a schedule array
        
        // Call for teams/stats with no week param
        const teamsStatsForcurrentWeek = await getLeagueWeekStats(leagueId);
        if (teamsStatsForcurrentWeek.length > 0) {
            // record current week and add current stats
            this.setState({
                teams: teamsStatsForcurrentWeek
            });
            // work backwards from current week and call /teams/stats for each preceding week
                // add each week's stats to store     
        } else {
            console.error(teamsStatsForcurrentWeek);
        }
                   
    }
    
    render(){
        const {match, location} = this.props;
        const {teams} = this.state;
        return (
            <LeagueByPositionsPresentation teamsData={teams}/>
            // <LeagueByPositionsPresentation location={location}/>
        )
    }
}

LeagueByPositionsContainer.propTypes = {
    // classes: PropTypes.object.isRequired,
    teams: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        leagueId: state.leagueId,
        teams: state.teams,
    }
}

const VizleLeagueByPositions = connect(mapStateToProps)(LeagueByPositionsContainer);

export default withRouter(VizleLeagueByPositions);