import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import CollectLeagueIdDialog from './CollectLeagueId.presentation';

const emails = ['username@gmail.com', 'user02@gmail.com'];


// given a league ID, send league name to props

// if selected, pass league info into store

// render form component
class CollectLeagueIdDialogContainer extends Component {
    state = {
        open: false,
        selectedValue: emails[1],
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = value => {
        this.setState({ selectedValue: value, open: false });
    };

    render() {
        const { leagueId, leagueName } = this.props;
        return (
            <div>
                <Typography variant="subheading">Selected: {this.state.selectedValue}</Typography>
                <br />
                <Button onClick={this.handleClickOpen}>Open simple dialog</Button>
                <CollectLeagueIdDialog
                    leagueId={leagueId}
                    leagueName={leagueName}
                    selectedValue={this.state.selectedValue}
                    open={this.state.open}
                    onClose={this.handleClose}
                />
            </div>
        );
    }
}

export default CollectLeagueIdDialogContainer;