import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';

import SearchBar from '../components/searchBar/searchBar';
import StockCard from '../components/stockCard/stockCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  card: {
    flexGrow: 1,
  },  
}));

const SearchForm = (props) => {
  const classes = useStyles();
  const alertType = ['info', 'warning', 'error'];

  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12}>
            <Typography className={classes.paper} variant="h3" component="h3">AFFINIPAY</Typography>
        </Grid>
        
        <Grid item xs={12} sm={12}>
            <Grid item><SearchBar /></Grid>
        </Grid>

        <Grid item xs={12} sm={12} >
          <Grid container justify="center">
            { props.loading && <CircularProgress /> }
          </Grid>
        </Grid>


        <Grid item xs={12} sm={12} >
          <Grid container justify="center">
            { props.type !== -1 &&
              <Alert severity={alertType[props.type]}>
                <AlertTitle>{props.message}</AlertTitle>
              </Alert>
            }
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12}>
            <Grid container spacing={5}>
                {props.stocks.map((value, idx) => (
                    <StockCard key={idx} data={value} />
                ))}
            </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        type: state.stocks.get('type'),
        message: state.stocks.get('message'),
        stocks: state.stocks.get('stocks'),
        loading: state.stocks.get('loading'),
    };
};

export default connect(mapStateToProps, null)(SearchForm);