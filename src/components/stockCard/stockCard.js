import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';

import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles((theme) => ({
    card: {
      flexGrow: 1,
    },
    list: {
        backgroundColor: theme.palette.background.paper,
    },
}));

const StockCard = (props) => {
    const classes = useStyles();
    const data = Object.fromEntries(props.data);
    
    return (
        <Grid item xs={6} sm={6}>
            <Card className={classes.card}>
                <CardHeader
                    title={data.symbol}
                />
                <CardContent>
                    <div className={classes.list}>
                        <List dense={true}>
                            <ListItem>
                                <ListItemIcon><AccountBalanceOutlinedIcon /></ListItemIcon>
                                <ListItemText primary={data.name} secondary={null} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><ChangeHistoryIcon /></ListItemIcon>
                                <ListItemText primary={data.type} secondary={null} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><PublicOutlinedIcon /></ListItemIcon>
                                <ListItemText primary={data.region} secondary={null} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><AccessTimeIcon /></ListItemIcon>
                                <ListItemText primary={data.marketOpen} secondary={null} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><AccessTimeIcon /></ListItemIcon>
                                <ListItemText primary={data.marketClose} secondary={null} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
                                <ListItemText primary={data.currency} secondary={null} />
                            </ListItem>
                        </List>
                    </div>                    
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon color='secondary' />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon color='action' />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
}
  
export default StockCard;