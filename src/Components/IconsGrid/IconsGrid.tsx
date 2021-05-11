import { Card, CardContent, Grid, makeStyles } from '@material-ui/core';
import { 
  AiFillAmazonCircle
 } from "react-icons/ai";
 import { 
  TiDeviceDesktop,
  TiChartLineOutline
 } from "react-icons/ti";
import React from 'react';
import {
  FaMoneyBillWave,
  FaPhoenixFramework,
  FaUserGraduate
} from 'react-icons/fa';
import { GiPayMoney, GiSpellBook } from 'react-icons/gi';

const useStyles = makeStyles(theme => ({
  iconsGridContainer: {
    color: 'yellow',
    background: 'black',
    paddingTop: '20px',
  },

  card_1: {
    // marginTop: '-70px',
    height: '150px',
    marginBottom: '20px',
    background: '#264653',
    textAlign: 'center',
    '&:hover': {
      background: 'black',
    },
  },

  card_2_3: {
    height: '150px',
    marginBottom: '20px',
    background: '#264653',
    textAlign: 'center',
    '&:hover': {
      background: 'black',
    },
  },

  icons: {
    fontSize: '5rem',
    textAlign: 'center',
    marginRight: '80px',
    marginLeft: '100px',
    color: 'yellow',
  },

  icon_1: {
    fontSize: '5rem',
    textAlign: 'center',
    marginRight: '80px',
    marginLeft: '100px',
    color: 'yellow',
  },
}));

const IconsGrid = () => {
  const classes = useStyles();
  return (
    <>
      <Grid
        className={classes.iconsGridContainer}
        container
        direction='row'
        justify='space-evenly'>
        <Grid item xs={12} md={3}>
          <Card elevation={0} className={classes.card_1}>
            <CardContent>
              <div>
                <div>
                  <AiFillAmazonCircle className={classes.icon_1} />
                </div>
                <div>
                  <h3>Create Marketplace</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className={classes.card_2_3}>
            <CardContent>
              <div className={classes.card_2_3}>
                <div>
                  <TiDeviceDesktop className={classes.icons} />
                </div>
                <div>
                  <h3>Create A Vendor</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className={classes.card_2_3}>
            <CardContent>
              <div className={classes.card_2_3}>
                <div>
                  <TiChartLineOutline className={classes.icons} />
                </div>
                <div>
                  <h3>Build A Product</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default IconsGrid;