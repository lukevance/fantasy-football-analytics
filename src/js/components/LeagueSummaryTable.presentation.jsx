import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
      width: '95%',
      marginTop: theme.spacing.unit * 3,
      // marginLeft: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });

class LeagueSummaryTable extends Component {
    constructor(props){
        super(props);
        // this.state = {
        //     teams: this.props.teams
        // }
    }

    // After retrieving team info, render Table with rows for each team
    

    render(){
        const {classes, teams, leagueId} = this.props;

        return (
            <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                <TableCell
                        sortDirection={false}
                    >
                        <Tooltip
                            title="Sort"
                            placement='bottom-start'
                            enterDelay={300}
                        >
                        <TableSortLabel
                            active={true}
                            direction='desc'
                            // onClick={this.createSortHandler(row.id)}
                        >
                            Team name
                        </TableSortLabel>
                        </Tooltip>
                    </TableCell>
                    {/* <TableCell>Team name</TableCell> */}
                    <TableCell >Owner</TableCell>
                    <TableCell numeric>Wins</TableCell>
                    <TableCell numeric>Losses</TableCell>
                    <TableCell numeric>Points Scored</TableCell>
                    <TableCell numeric>Waiver Order</TableCell>
                    <TableCell numeric>Acquisitions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {teams.map(team => {
                    return (
                    <TableRow key={team.teamId}>
                        <TableCell component="th" scope="row">
                            <Button href={`http://games.espn.com/ffl/clubhouse?leagueId=${leagueId}&teamId=${team.teamId}&seasonId=2018`} className={classes.button}>
                                {team.teamLocation + " " + team.teamNickname}
                            </Button>
                        </TableCell>
                        <TableCell>{team.owners[0].firstName + " " + team.owners[0].lastName}</TableCell>
                        <TableCell numeric>{team.record.overallWins}</TableCell>
                        <TableCell numeric>{team.record.overallLosses}</TableCell>
                        <TableCell numeric>{team.record.pointsFor}</TableCell>
                        <TableCell numeric>{team.waiverRank}</TableCell>
                        <TableCell numeric>{team.teamTransactions.overallAcquisitionTotal}</TableCell>
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