import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { Switch , Route, BrowserRouter as Router, RouteComponentProps } from 'react-router-dom';
import Home from "./Components/Home";
import ViewMarketplaces from "./Components/ViewMarketplaces";
import ViewProducts from "./Components/ViewProducts";
import ViewVendors from "./Components/ViewVendors";
import SignUpForm  from './Components/SignUpForm';
import NavBar  from './Components/NavBar';
import LoginForm  from './Components/LoginForm';
import { TokenContext } from './Context/TokenContext';
import NewMarketPlaceForm from './Components/NewMarketPlaceForm'
import NewProductForm from './Components/NewProductForm'
import NewVendorForm from './Components/NewVendorForm'
import ProductDetails from './Components/ProductDetails'
import EditProductForm from './Components/EditProductForm'
import EditMarketplaceForm from './Components/EditMarketplaceForm'
import EditVendorForm from './Components/EditVendorForm'
import Grid from './Components/Grid'
import { LocalDining,  } from '@material-ui/icons';

interface MatchParams {
  vendorId: string;
  marketplaceId: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

interface ProductDetailsMatchParams {
  productId: string;
}

interface ProductDetailsMatchProps extends RouteComponentProps<ProductDetailsMatchParams> {
}

interface MarketplaceMatchParams {
  marketplaceId: string;
}

interface MarketplaceMatchProps extends RouteComponentProps<MarketplaceMatchParams> {
}

interface VendorMatchParams {
  vendorId: string;
}

interface VendorMatchProps extends RouteComponentProps<VendorMatchParams> {
}

type User = {
  id: number;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

function App() {
  const initialState : User = {id: -1}
  const [ user, setUser ] = useState(initialState)
  const [token, setToken ] = useContext(TokenContext)

  useEffect(() => {
    fetch("http://localhost:3001/user/me", {
            method: "POST",
            body: JSON.stringify({
                token: token
            }),
            headers: new Headers({
                "content-Type": "application/json",
            })
        }).then(user => user.json()).then(user => {
            if(user) {
              setUser(user)
            }
        })
  }, [token])

  return (
      <div className="App">
        <NavBar user={user} /> 
        <Router>
          <Switch>
            <Route exact path="/"component={Home}/>
            <Route exact path="/marketplaces"component={ViewMarketplaces}/>
            <Route path="/products/:vendorId/:marketplaceId" render={({match} : MatchProps) => (<ViewProducts vendorIdParam={match.params.vendorId} marketplaceIdParam={match.params.marketplaceId} user={user} />)}/>
            <Route exact path="/vendors"component={ViewVendors}/>
            <Route exact path="/Grid"component={Grid}/>
            <Route exact path="/Signup"component={SignUpForm}/>
            <Route exact path="/Login"component={LoginForm}/>
            <Route exact path="/Marketplace/Create"component={NewMarketPlaceForm}/>
            <Route exact path="/Product/Create"component={NewProductForm}/>
            <Route exact path="/Vendor/Create"component={NewVendorForm}/>
            {/* <Route exact path="/products" component={ViewProducts}/> */}
            <Route path="/products/:productId" render={({match} : ProductDetailsMatchProps) => (<ProductDetails productId={match.params.productId} />)} />
            <Route path="/edit/products/:productId" render={({match} : ProductDetailsMatchProps) => (<EditProductForm productId={match.params.productId} />)} />
            <Route path="/edit/marketplaces/:marketplaceId" render={({match} : MarketplaceMatchProps) => (<EditMarketplaceForm marketplaceId={match.params.marketplaceId} />)} />
            <Route path="/edit/vendor/:vendorId" render={({match} : VendorMatchProps) => (<EditVendorForm vendorId={match.params.vendorId} />)} />
          </Switch>
        </Router>
      </div>
    
  );
}

export default App;