import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SingleTeamSummary extends Component {
    render(){
        const {focusTeam} = this.props;
        return (
            <div>
                <p>THis is one team {focusTeam.teamLocation}</p>
            </div>
        )
    }
}

const mapStateToProps = (state, otherProps) => {
    return {
        focusTeam: state.teams.find(team => team.teamAbbrev.toLowerCase() === otherProps.match.params.team)
    }
}

const VisibleTeamSummary = connect(
    mapStateToProps
)(SingleTeamSummary);

export default VisibleTeamSummary;