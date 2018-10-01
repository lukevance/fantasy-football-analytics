import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeagueSummaryTable from './LeagueSummaryTable.presentation';

const ROOT_URL = process.env.REACT_APP_ROOT_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

class LeagueSummaryTableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: []
        }
    }

    componentWillMount() {
        // Make API call to get league info using leagueId
        const getleagueData = async (leagueId) => {
            let url = `${ROOT_URL}/season-summary/${leagueId}`;
            const options = { 
                method: 'GET',
                headers: { 'X-Api-Key': API_KEY }
            };
            const res = await fetch(url, options);
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
        // After retrieving team info, render Table with rows for each team
        return (
            <div>
                <LeagueSummaryTable teams={teams} leagueId={this.props.leagueId} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      leagueId: state.leagueId,
      teams: state.teams
    }
  }
  
  const VisibleLeagueSummary = connect(
    mapStateToProps
  )(LeagueSummaryTableContainer);
  

export default VisibleLeagueSummary;