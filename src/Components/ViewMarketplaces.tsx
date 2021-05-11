import { Card, CardActionArea, CardActions, Button, CardMedia, CardContent, Typography, makeStyles, Grid } from '@material-ui/core'
import { render } from '@testing-library/react'
import React, { useEffect, useContext, useState } from 'react'
import { TokenContext } from '../Context/TokenContext'
// import NewMarketPlaceForm from '../NewMarketPlaceForm';

const useStyles=makeStyles(theme => ({
        root: {
            maxWidth: 345,
            margin: '10px'
        },
        media: {
            height: 140,
        },
}))

type Marketplace= {
    id: number;
    name: string;
    commission: number;
    shipping_price: number;
    image: string;
}

export default function ViewMarketplaces() {
    const classes =useStyles()
    const [token, setToken ] = useContext(TokenContext)
    const [ marketplaces, setMarketplaces ] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/marketplace/",{
            method: "GET",
            headers: new Headers({
                "content-Type": "application/json",
                "Authorization": token,
            }),
        }).then(marketplaces => marketplaces.json())
            .then(data => {
                setMarketplaces(data)
            })
    }, [])

    const createMarketplace =()=> {
        window.location.href="/MarketPlace/Create"
    }

    const renderCards=() => (
        <React.Fragment>

            {marketplaces.map((m: Marketplace) => (
            <Grid item justify="center">
                <Card className={classes.root}>
                    <CardActionArea onClick={() => window.location.href = `/products/-1/${m.id}`}>
                        <CardMedia
                            className={classes.media}
                            component="img"
                            src={`${m.image}`}
                            title={m.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                            {m.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            Commission Rate: {m.commission}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            Shipping Price: {m.shipping_price}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                            <Button onClick={() => window.location.href=`/edit/marketplaces/${m.id}`} size="small" color="primary">
                            Edit
                            </Button>
                            <Button
                                onClick={() => fetch(`http://localhost:3001/marketplace/${m.id}`, {
                                    method: "DELETE",
                                    headers: new Headers({
                                        "content-Type": "application/json",
                                        "Authorization": token,
                                    })
                                    })
                                    .then(() => window.location.href = window.location.href)
                                }
                                size="small" color="secondary">
                            Delete
                            </Button>
                    </CardActions>
                </Card>    
            </Grid>
            ))}
        </React.Fragment>
    )
    return (
        <div>
            <Grid container spacing={3} justify="center">
                {renderCards()}
            </Grid>
            <Card className={classes.root}>
                <CardActionArea onClick={createMarketplace}>
                    
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {/* <NewMarketPlaceForm>Hello from marketplace card </NewMarketPlaceForm> */}
                        
                        Create a New Marketplace
                        </Typography>

                    </CardContent>
                </CardActionArea>
            </Card>

        </div>
    )
}
