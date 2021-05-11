import { AppBar, Button, Toolbar, Typography, makeStyles, Box, createStyles, Theme, Link, Menu, MenuItem } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { AccountCircle } from '@material-ui/icons';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { TokenContext } from '../Context/TokenContext';

interface PropTypes {
    user: {
        id: number;
        username?: string;
        email?: string;
        firstName?: string;
        lastName?: string;
        role?: string;
    }
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    grow:{
        flexGrow:1
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    buttons: {
        marginLeft: '5ch'
    }
}))

export default function NavBar({ user }: PropTypes) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [token, setToken ] = useContext(TokenContext)

    useEffect(() => {
        console.log(user)
    }, [user])

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    const classes = useStyles()

    const renderLoggedIn = () => (
        <React.Fragment>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                getContentAnchorEl={null}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={open}
                onClose={handleClose}
            >
                <Typography>Welcome, {user.firstName}</Typography>
                <MenuItem onClick={() => window.location.href = '/profile'}>Profile</MenuItem>
                <MenuItem onClick={() => {
                    setToken("logout")
                    window.location.href = window.location.href
                }}>Log out</MenuItem>
            </Menu>
        </React.Fragment>
    )

    const renderLoggedOut = () => (
        <React.Fragment>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                getContentAnchorEl={null}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => window.location.href = '/login'}>Log In</MenuItem>
                <MenuItem onClick={() => window.location.href = '/signup'}>Sign Up</MenuItem>
            </Menu>
        </React.Fragment>
    )

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Box display="flex" flexGrow={1}>
                        <Typography variant="h6" noWrap className={classes.title}>
                            <Link href="/" color="inherit">
                                The Profit Professor
                            </Link>
                        </Typography>
                    </Box>
                    <div className={classes.buttons}>
                        <Button onClick={() => window.location.href = "/products/-1/-1"} style={{color:'white', fontWeight:'bold'}}>Products</Button>
                    </div>
                    <div className={classes.buttons}>
                        <Button onClick={() => window.location.href = "/vendors"} style={{color:'white', fontWeight:'bold'}}>Vendors</Button>
                    </div>
                    <div className={classes.buttons}>
                        <Button onClick={() => window.location.href = "/marketplaces"} style={{color:'white', fontWeight:'bold'}}>Marketplaces</Button>
                    </div>
                    <div className={classes.buttons}>
                        <Button onClick={handleMenu} startIcon={<AccountCircle />} />
                    </div>
                    {user.id > 0 ? renderLoggedIn() : renderLoggedOut()}
                </Toolbar>
            </AppBar>
        </div>
    )
}
