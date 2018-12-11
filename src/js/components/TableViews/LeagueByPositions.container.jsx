import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LeagueByPositionsPresentation from './LeagueByPositions';

// import getTeamsWeeklyStats from '../../util';

const range = (start, end) => {
    let range = [];
    for (let i = start; i <= end; i++){
        range.push(i);
    }
    return range;
}

class LeagueByPositionsContainer extends Component {
    state = {
        activeViewPeriod: {
            start: 1,
            end: 12
        }
    };

    componentDidMount(){
        console.log('positions table mounting!')
        const {teams} = this.props;
        const {activeViewPeriod} = this.state;
        // for each team in props.teams
        teams.forEach(team => {
            // for each week in "activePeriod"
            console.log(team, 'api call!')
            const activePeriod = range(activeViewPeriod.start, activeViewPeriod.end);
            activePeriod.forEach(async week => {
                // check if this weeks' data is already recorded
                if (team.gamesPlayed[week]) {
                    return;
                } else {
                    // call lambda.getSingleWeekScore
                    // const teamWeekStats = await getTeamsWeeklyStats(team, week);
                    // update store/indexedDB with weekly stats for BOTH teams
                    
                }
            });
        })            
    }
    
    render(){
        return (
            // <LeagueByPositionsPresentation teams={teamsData}/>
            <LeagueByPositionsPresentation />
        )
    }
}

LeagueByPositionsContainer.propTypes = {
    // classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        teams: state.teams
    }
}

const VizleLeagueByPositions = connect(mapStateToProps)(LeagueByPositionsContainer);

export default VizleLeagueByPositions;