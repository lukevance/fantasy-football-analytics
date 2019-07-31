import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        maxWidth: '97%',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 5,
        overflowX: 'auto',
    },
    table: {
        minWidth: 550,
    },
    avatar: {
        margin: 7,
    },
    icon: {
        margin: theme.spacing.unit * 0.2,
        fontSize: 12
      },
});

class LeagueSummaryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSorter: "wins"
        }
    }
    // After retrieving team info, render Table with rows for each team

    changeSorter(sorter){
        this.setState({
            activeSorter: sorter
        });
    }

    render() {
        const { classes, teams, leagueId, sorters } = this.props;
        
        return (
            <Paper className={classes.root}>
                <Table className={classes.table} padding='dense'>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Team name</TableCell>
                            <TableCell >Owner</TableCell>
                            {["Wins", "Losses", "Points Scored", "Waiver Order", "Acquisitions", "Trades"].map(col => {
                                if (col === "Losses"){
                                    return (
                                        <TableCell key={col}>{col}</TableCell>
                                    )
                                } else {
                                    return (
                                        <TableCell key={col} sortDirection={false} numeric>
                                            <Tooltip
                                                title="Sort"
                                                placement='bottom-start'
                                                enterDelay={300}
                                            >
                                                <TableSortLabel
                                                    active={this.state.activeSorter === col.toLowerCase().split(" ")[0]}
                                                    direction={this.state.activeSorter === 'waiver' ? 'asc' : 'desc'}
                                                    onClick={() => this.changeSorter(col.toLowerCase().split(" ")[0])}
                                                >
                                                    {col}
                                                </TableSortLabel>
                                            </Tooltip>
                                        </TableCell> 
                                    )
                                }
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams.sort(sorters[this.state.activeSorter]).map(team => {
                            return (
                                <TableRow key={team.teamId}>
                                    <TableCell component="th" scope="row">
                                        <Avatar
                                            alt="Team Logo"
                                            src={team.logoUrl}
                                            className={classes.avatar}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="inherit" noWrap={true}>{team.teamLocation + " " + team.teamNickname}</Typography>
                                            {/* <IconButton className={classes.button} aria-label="Team Link" href={`http://games.espn.com/ffl/clubhouse?leagueId=${leagueId}&teamId=${team.teamId}&seasonId=2018`} className={classes.button}>
                                                <OpenInNewIcon className={classes.icon}/>
                                            </IconButton> */}
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap={true}>{team.owners[0].firstName + " " + team.owners[0].lastName}</Typography>
                                    </TableCell>
                                    <TableCell numeric>{team.record.overall.wins}</TableCell>
                                    <TableCell numeric>{team.record.overall.losses}</TableCell>
                                    <TableCell numeric>{team.record.overall.pointsFor}</TableCell>
                                    <TableCell numeric>{team.waiverRank}</TableCell>
                                    <TableCell numeric>{team.transactionCounter.acquisitions}</TableCell>
                                    <TableCell numeric>{team.transactionCounter.trades}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

LeagueSummaryTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeagueSummaryTable);