import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SingleTeamSummary extends Component {
    render(){
        const {match, location, myTeam} = this.props;
        console.log('team: ', match.params.abbrev);
        console.log('league positions', location);
        return (
            <div>
                <p>THis is one team {myTeam.teamLocation}</p>
            </div>
        )
    }
}

const mapStateToProps = (state, otherProps) => {
    console.log(otherProps);
    return {
        myTeam: state.teams.filter(team => team.teamAbbrev === 'VDPT')
    }
}

export default SingleTeamSummary;