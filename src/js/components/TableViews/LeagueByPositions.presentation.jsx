import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
    }
});

const sum = (items, prop) => {
    return items.reduce((a, b) => {
        return a + b[prop];
    }, 0);
};

const totalPointsForPosition = (players, position) => {
    const positionPlayers = players.filter(plyr => plyr.position === position && plyr.starter === true);
    const totalPoints = Math.round(sum(positionPlayers, "points") * 10)/10;
    return totalPoints;
}

class LeagueByPositions extends Component {
    constructor(props){
        super(props);
    };

    render(){
        const {classes, teams, teamsData} = this.props;
        const columns = ["Team", "QB", "RB", "WR", "TE", "D/ST", "Total"];
        // const rowValues = ["My Team", 123, 32, 543, 456, 7345];
        console.log(teamsData);
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {
                                columns.map(col => {
                                    return (
                                        <TableCell key={col}>
                                            {col}
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teamsData.map(team => {
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
                                </TableRow>
                            )}
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