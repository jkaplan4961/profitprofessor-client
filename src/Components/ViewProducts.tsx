import { Card, CardActionArea, CardMedia, CardContent, CardActions, Typography, makeStyles, Grid, Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core'
import React, { useEffect, useContext, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { TokenContext } from '../Context/TokenContext'
import NewProductForm from './NewProductForm'

const useStyles=makeStyles(theme => ({
        root: {
            maxWidth: 345,
            margin: '10px'
        },
        media: {
            height: 140,
        },
}))

type User = {
    id: number;
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
  }

type FilterBody = {
    userId?: number;
    vendorId?: number;
    marketplaceId?: number;
}

type Product= {
    id: number;
    name: string;
    description: string;
    price: number;
    manufacturer: string;
    upc: string;
    cost: number;
    part_num: string;
    shipping_cost: number;
    packaging: number;
    image: string;
    userId: number;
    marketplaceId: number;
    vendorId: number;
}

interface PropTypes {
    vendorIdParam: string;
    marketplaceIdParam: string;
    user: User
}

export default function ViewProducts({vendorIdParam, marketplaceIdParam, user}: PropTypes) {
    const classes =useStyles()
    const [token, setToken ] = useContext(TokenContext)
    const [ products, setProducts ] = useState([])
    const [ vendorId, setVendorId ] = useState(vendorIdParam)
    const [ marketplaceId, setMarketplaceId ] = useState(marketplaceIdParam)
    const [ popUp, setPopUp ] = useState(false)

    useEffect(() => {
        if (user.id > 0) {
            const reqBody : FilterBody = {}
            if (user.role?.toUpperCase() !== "ADMIN") {
                reqBody.userId = user.id
            }
            if (Number(vendorId) > 0) reqBody.vendorId = Number(vendorId)
            if (Number(marketplaceId) > 0) reqBody.marketplaceId = Number(marketplaceId)
            fetch("http://localhost:3001/product/filter", {
                method: "POST",
                body: JSON.stringify(reqBody),
                headers: new Headers({
                "content-Type": "application/json",
                "Authorization": token,
                }),
            })
                .then(products => products.json())
                .then(data => {
                    setProducts(data)
                })
        }
    }, [token, user])

    const createProduct =()=> {
        setPopUp(true)
    }

    const renderCards=() => (
        <React.Fragment>

            {products.length > 0 && products.map((p: Product) => (
            <Grid item justify="center">
                <Card className={classes.root}>
                    <CardActionArea onClick={() => window.location.href = `/products/${p.id}`}>
                    <CardMedia
                            className={classes.media}
                            component="img"
                            src={`data:image/png;base64, ${p.image}`}
                            title={p.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                            {p.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            {p.description}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            Price: {p.price}<span />Cost: {p.cost}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                            <Button onClick={() => window.location.href=`/edit/products/${p.id}`} size="small" color="primary">
                            Edit
                            </Button>
                            <Button
                                onClick={() => fetch(`http://localhost:3001/product/${p.id}`, {
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
                <CardActionArea onClick={createProduct}>
                    
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                         
                        
                        Create New Product
                        </Typography>

                    </CardContent>
                </CardActionArea>
            </Card>
            <Dialog title="create-product-modal" open={popUp}>
                <DialogTitle>Create New Product</DialogTitle>
                <DialogContent>
                    <NewProductForm userId={user.id} vendorId={Number(vendorId)} marketplaceId={Number(marketplaceId)} />
                </DialogContent>
            </Dialog>
        </div>
    )
}
