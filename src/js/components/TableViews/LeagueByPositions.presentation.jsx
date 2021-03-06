import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Button, Menu, MenuItem } from '@material-ui/core';

const styles = theme => ({
    root: {
        maxWidth: '97%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    tableCell: {
        textAlign: 'left'
    },
    menuButton: {
        float: 'right',
        margin: theme.spacing.unit * 2,
    }
});

const sum = (items, prop) => {
    return items.reduce((a, b) => {
        return a + b[prop];
    }, 0);
};

const totalPointsForPosition = (players, position) => {
    const positionPlayers = players.filter(plyr => plyr.position === position && plyr.starter === true);
    const totalPoints = Math.round(sum(positionPlayers, "points") * 10) / 10;
    return totalPoints;
};

const columns = ["QB", "RB", "WR", "TE", "D/ST", "Total", "Bench"];

const sorters = columns.map(col => {
    switch (col) {
        case "Total":
            return {
                sortBy: col,
                sorter: (a, b) => {
                    return sum(b.schedule[0].roster.players.filter(plyr => plyr.starter === true), "points") - sum(a.schedule[0].roster.players.filter(plyr => plyr.starter === true), "points");
                }
            }
        case "Bench":
            return {
                sortBy: col,
                sorter: (a, b) => {
                    return sum(b.schedule[0].roster.players.filter(plyr => plyr.starter === false), "points") - sum(a.schedule[0].roster.players.filter(plyr => plyr.starter === false), "points");
                }
            }
        default:
            return {
                sortBy: col,
                sorter: (a, b) => {
                    return totalPointsForPosition(b.schedule[0].roster.players, col) - totalPointsForPosition(a.schedule[0].roster.players, col);
                }
            }
    }
});

class LeagueByPositions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSorter: "Total",
            anchorEl: null
        }
    };

    changeSorter(sorter) {
        this.setState({
            activeSorter: sorter
        });
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    changeActiveWeek = week => {
        const {setActiveWeek} = this.props;
        this.handleClose();
        setActiveWeek(week);
    };

    render() {
        const { classes, teams, teamsData } = this.props;
        const { activeSorter, anchorEl } = this.state;
        const currWeek = teamsData.length > 0 ? teamsData[0].schedule[0].week : 0;
        const validWeeks = Array.from(new Array(currWeek), (x,i) => i + 1).reverse();
        return (
            <Paper className={classes.root}>
                <div>
                    <Button
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                        className={classes.menuButton}
                    >
                        {`Week ${currWeek}`}
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                    >
                        {validWeeks.map(week => {
                            return (<MenuItem onClick={() => this.changeActiveWeek(week)}>{`Week ${week}`}</MenuItem>)
                        })}
                    </Menu>
                </div>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Team</TableCell>
                            {
                                columns.map(col => {
                                    return (
                                        <TableCell key={col}>
                                            <Tooltip
                                                title="Sort"
                                                placement="bottom-start"
                                                enterDelay={300}
                                            >
                                                <TableSortLabel
                                                    active={activeSorter === col}
                                                    direction='desc'
                                                    onClick={() => this.changeSorter(col)}
                                                >
                                                    {col}
                                                </TableSortLabel>
                                            </Tooltip>
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teamsData.sort(sorters.find(srtr => srtr.sortBy === this.state.activeSorter).sorter).map(team => {
                            if (!team.schedule) {
                                return null;
                            }
                            return (
                                <TableRow>
                                    <TableCell className={classes.tableCell}>
                                        {team.location + " " + team.nickname}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {totalPointsForPosition(team.schedule[0].roster.players, "QB")}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {totalPointsForPosition(team.schedule[0].roster.players, "RB")}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {totalPointsForPosition(team.schedule[0].roster.players, "WR")}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {totalPointsForPosition(team.schedule[0].roster.players, "TE")}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {totalPointsForPosition(team.schedule[0].roster.players, "D/ST")}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {Math.round(sum(team.schedule[0].roster.players.filter(plyr => plyr.starter === true), "points") * 10) / 10}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {Math.round(sum(team.schedule[0].roster.players.filter(plyr => plyr.starter === false), "points") * 10) / 10}
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        )}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

LeagueByPositions.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        teams: state.teams
    }
}

const VisibleLeagueByPositions = connect(mapStateToProps)(LeagueByPositions);

export default withStyles(styles)(VisibleLeagueByPositions);