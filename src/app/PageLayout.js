import React, {Component} from 'react';
import {hot} from 'react-hot-loader/root';
import './css/App.scss';
import {CssBaseline, MuiThemeProvider} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import CONFIG from './config';
import theme from './theme';
import withStyles from "@material-ui/core/styles/withStyles";
import Tab from "@material-ui/core/Tab";
import {withRouter} from "react-router";
import classNames from 'classnames';
import APIKeyDialog from "./components/APIKeyDialog";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const styles = theme => ({
  titleText: {
    width: '100%',
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '32px'
  },
  root: {
    flexGrow: 1,
  },
  tabBar: {
    flexGrow: 1,
  },
  apiLink: {
    color: '#fff',
    textAlign: 'right',
    marginRight: '2rem'
  }
});

class PageLayout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: props.history.location.pathname
    };

    this.handleTabChange = this.handleTabChange.bind(this);

  }

  handleTabChange(event, value) {
    this.setState(
      {
        value: value
      }
    );
    this.props.history.push(value);
  }

  render() {
    const {classes} = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>

        <AppBar position="static" color="primary" className={classes.root}>
          <Toolbar>
            <h2 className={classes.titleText}>FirstVoices API Client Demo</h2>
          </Toolbar>
          <Toolbar>
            <Tabs
              className={classes.tabBar}
              value={this.state.value}
              onChange={this.handleTabChange}
              centered
            >
              <Tab value="/archives" label="Archives"/>
              <Tab value="/shared" label="Shared"/>
              {/*<Tab value="/user" label="Authentication Details"/>*/}
            </Tabs>
          </Toolbar>
          <Link
            href={CONFIG.DOCUMENTATION_URL}
            target={'#'}
            className={classes.apiLink}
          >
            API Documentation
          </Link>
        </AppBar>
        <div className={classes.container}>
          <main className={classNames(classes.layout, classes.main)}>
            {this.props.authenticated && this.props.children}
            {this.props.authenticated || (
              <Paper className="authenticationContainer">
                <Typography variant="h3">Client Auth Required</Typography>
                <p>Please enter a valid set of client credentials to proceed</p>
                <APIKeyDialog/>
              </Paper>
            )}

          </main>

        </div>

      </MuiThemeProvider>
    );
  }
}


function mapStateToProps(state) {
  const {auth} = state;

  return {authenticated: auth.validated};

}

export default hot(withRouter(withStyles(styles)(connect(mapStateToProps, null)(PageLayout))));
