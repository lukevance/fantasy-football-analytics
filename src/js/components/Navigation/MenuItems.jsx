import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import { Link } from 'react-router-dom';
// import { withRouter } from 'react-router';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PeopleIcon from '@material-ui/icons/People';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import LabelIcon from '@material-ui/icons/Label';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

const routes = [
    {
        title: 'League Overview',
        path: "",
        icon: (<BookmarksIcon />)
    },
    {
        title: 'My Team',
        path: 'my-team',
        icon: (<LabelIcon />)
    },
    {
        title: 'Players',
        path: 'players',
        icon: (<PeopleIcon />)
    }
];

class MenuItemsDrawer extends React.Component {
    state = {
        open: false,
    };
    
    handleClick = () => {
    this.setState(state => ({ open: !state.open }));
    };

    render(){
        const {open, handleDrawerClose, theme, classes, teams} = this.props;
        console.log(teams);
        console.log('teams?', this.props.teams && this.props.teams.length > 1);

        const teamLinks = (teams, open) => {
            if (teams.length > 0){
                return (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {teams.map(team => {
                                return (
                                    <Link to={`teams/${team.teamAbbrev.toLowerCase()}`}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <PeopleIcon />
                                            </ListItemIcon>
                                            <ListItemText inset primary={team.teamLocation + " " + team.teamNickname} />
                                        </ListItem>
                                    </Link>
                                );
                            })}
                        </List>
                    </Collapse>
                )
            } else {
                return null;
            }
        }
        return(
            <Router>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                            <Link to={`/`}> 
                                <ListItem button>
                                    <ListItemIcon>
                                        <BookmarksIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Overview" />
                                </ListItem>
                            </Link>
                            {/* <Link to='/teams'> */}
                                <ListItem 
                                    button 
                                    disabled={!Boolean(this.props.teams && this.props.teams.length > 1)} 
                                    onClick={this.handleClick}
                                >
                                    <ListItemIcon>
                                        <LabelIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Teams" />
                                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                {teamLinks(teams, this.state.open)}
                            {/* </Link> */}
                    </List>
                    <Divider />
                    <List>
                        {['Settings', 'Leagues'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Router>
        )
    }
}

MenuItemsDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  const mapStateToProps = state => {
    return {
      leagueId: state.leagueId,
      teams: state.teams
    }
  };

  const VisibleMenuItems = connect(
    mapStateToProps
  )(MenuItemsDrawer);

// export default withStyles(styles, { withTheme: true })(withRouter(MenuItemsDrawer));
export default withStyles(styles, { withTheme: true })(VisibleMenuItems);