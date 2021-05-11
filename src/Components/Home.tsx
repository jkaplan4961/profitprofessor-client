import React from 'react'
import Grid from './Grid'
import { Container, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import IconsGrid from './IconsGrid/IconsGrid';

const useStyles = makeStyles(theme => ({
  conatainer: {
    height: '100vh',
    background: `linear-gradient(rgba(38, 70, 83, .8), rgba(33, 70, 131, .5)), url('https://res.cloudinary.com/rocket-enterprises-llc/image/upload/v1620604214/Best-multi-channel-listing-software-solutions-for-eCommerce-sellers-960x502_qsdifi.jpg'
    )`,
    backgroundPosition: 'contained',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    flexDirection: 'column',
  },
  title: {
    fontSize: '6rem',
    color: '#6200ea',
  },
  text: {
    fontSize: '1.4rem',
    marginBottom: '20px',
  },
}));



const Home = () => {
  const classes = useStyles();


  return (
    <div>
        <>
      <div className={classes.conatainer} >
        <Hidden mdDown>
          <h1 className={classes.title}>Profit Professor</h1>
       

        </Hidden>
      </div>
      <IconsGrid />

      
      {/* <MainContent /> */}
    </>
      <h1>
      COST CALCULATOR
Estimate your Amazon sales margin
The cost of selling on Amazon.com varies based on your product characteristics, fulfillment method, optional services, and other factors. Use this calculator to generate a rough estimate of your per unit sales margin.



Net profitability
Net profit
</h1>

<p>Revenue
Item price
Shipping
Total revenue
Selling on Amazon fees
Fulfillment cost
Cost of seller fulfillment
Fulfillment by Amazon fees
Ship to Amazon
Total fulfillment cost
Storage cost
Monthly storage cost per unit
Average inventory units stored
Storage cost per unit sold
Your fulfillment
Click here
N/A
N/A
1
Amazon Fulfillment
N/A
1
Seller proceeds
Cost of product
Net profitability
Net profit
Net margin
Price your FBA listings right  
</p>
<h1>
The calculator provides an estimate that does not include taxes, selling plan fees, FBA storage fees, optional services, all potential shipping expenses, and other costs your business might incur. Read the Amazon Services Business Solutions Agreement for a comprehensive explanation of the costs and terms applicable to selling in Amazon stores.

You can also use the FBA Revenue Calculator to estimate your sales margin.</h1>Start selling on Amazon
Amazon Business is the B2B marketplace on Amazon, providing business customers with the pricing, selection and convenience of Amazon, with features and benefits designed for businesses of all sizes.
Step 1
Register to sell on Amazon
Register for a Professional Selling Account on Amazon.com. For existing sellers, you can add Amazon Business features easily through Seller Central.
Step 2
Create a Business Profile
Tell your unique story using our Profile Editor. You can add your quality certifications and diversity credentials for discerning business customers.
Step 3
Set up your products
Use our simple listing tools to add your entire catalog and the Enhanced Content feature to display additional product information to your customers.
Step 4
Start Selling
Reach millions of business customers already shopping on Amazon.
    </div>
    
  )
  }
  export default Home;
