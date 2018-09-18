import React, {Component} from 'react';

class LeagueSummaryTableContainer extends Component {
    // Make API call to get league info using leagueId

    // After retrieving team info, render Table with rows for each team


    render(){
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