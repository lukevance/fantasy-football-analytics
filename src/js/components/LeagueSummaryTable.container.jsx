import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
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

class LeagueSummaryTableContainer extends Component {
    // Make API call to get league info using leagueId

    // After retrieving team info, render Table with rows for each team
    

    render(){
        const {classes} = this.props;

        return (
            <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>Team name</TableCell>
                    <TableCell numeric>Owner</TableCell>
                    <TableCell numeric>Wins</TableCell>
                    <TableCell numeric>Losses</TableCell>
                    <TableCell numeric>Points Scored</TableCell>
                    <TableCell numeric>Bench Points Scored</TableCell>
                    <TableCell numeric>Acquisitions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {/* {rows.map(row => {
                    return (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                        {row.name}
                        </TableCell>
                        <TableCell numeric>{row.calories}</TableCell>
                        <TableCell numeric>{row.fat}</TableCell>
                        <TableCell numeric>{row.carbs}</TableCell>
                        <TableCell numeric>{row.protein}</TableCell>
                    </TableRow>
                    );
                })} */}
                </TableBody>
            </Table>
            </Paper>
        )
    }
}

LeagueSummaryTableContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeagueSummaryTableContainer);