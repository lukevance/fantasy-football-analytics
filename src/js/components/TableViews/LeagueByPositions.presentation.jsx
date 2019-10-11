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

class LeagueByPositions extends Component {
    render(){
        const {classes, teams, teamData} = this.props;
        const columns = ["Team", "QB", "RB", "WR", "TE", "D/ST"];
        const rowValues = ["My Team", 123, 32, 543, 456, 7345];
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
                        {teamData.map(team => {
                            if (!team.schedule) {
                                return null;
                            }
                            return (
                                <TableRow>
                                    <TableCell className={classes.tableCell}>
                                        {team.location + " " + team.nickname}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {team.schedule[0].roster.players.find(plyr => plyr.position === "QB")}
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