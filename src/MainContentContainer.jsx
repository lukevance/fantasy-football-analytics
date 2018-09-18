import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import DataTableContainer from './DataTableContainer';

const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    textAlign: 'left',
  }
});

function MainContent(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
        <h1>Your League Name Here</h1>
        <DataTableContainer />
    </div>
  );
}

MainContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainContent);