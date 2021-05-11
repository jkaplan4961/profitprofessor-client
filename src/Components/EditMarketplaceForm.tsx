import { useState, useContext, useEffect } from 'react'
import "./style.css";
import { TokenContext } from "../Context/TokenContext";
import { Select, MenuItem } from '@material-ui/core';

type EbayItem = {
  price: {
    value: number;
    currency: string;
  };
  image:{
    imageUrl:string;
  };
  title: string;
}

interface PropTypes {
  marketplaceId: string;
}

type Marketplace= {
    id: number;
    name: string;
    commission: number;
    shipping_price: number;
    image: string;
}

export default function EditMarketplaceForm({ marketplaceId } : PropTypes) {
  const [token, setToken] = useContext(TokenContext)
  const initialState : Marketplace = {
    id: Number(marketplaceId),
    name: "",
    commission: 0,
    shipping_price: 0,
    image: ""
  }
  const [marketplace, setMarketplace] = useState(initialState)
  const[error,setError] = useState({
    name: "",
    commission: "",
    shipping_price: "",
    image: ""
  })

  useEffect(() => {
    console.log("Marketplace Id :: " + marketplaceId)
      fetch(`http://localhost:3001/marketplace/${marketplaceId}`,{
        method: "GET",
        headers: new Headers({
            "content-Type": "application/json",
            "Authorization": token,
        })
      }).then(marketplace => marketplace.json())
          .then(data => {
              setMarketplace(data)
          })
  }, [token])

    const handleChange = (event: any) => {
      event.preventDefault();
      const { name, value } = event.target;
      switch (name) {
        case "name":
            value.length < 3
                    ? setError({...error, name: "Marketplace name must be at least 3 characters long!"}) 
                    : setError({...error, name: ""});
          break;
        case "commission":
            isNaN(value)
                    ? setError({...error,commission:"Commission Rate must be a number"})
                    : setError({...error, commission: ""});
          break;
        case "image":
  
                value.length < 1
                    ? setError({...error, image: "Enter an image!"})
                    : setError({...error, image: ""});  
          break;
          case "shipping_price":
            isNaN(value)
                    ? setError({...error, shipping_price: "Shipping Rate must be a number!"}) 
                    : setError({...error, shipping_price: ""});
          break;
        default:
          break;
      }
      setMarketplace(Object.assign(marketplace, {[name]: value} ));
      console.log(error);
    };

    const handleSubmit = (event: any) => {
      event.preventDefault();
      let validity = true;
      Object.values(error).forEach(
        (val) => val.length > 0 && (validity = false)
      );
      if (validity === true) {
        fetch(`http://localhost:3001/marketplace/${marketplace.id}`, {
          method: "PUT",
          body: JSON.stringify({
            name: marketplace.name,
            commission: marketplace.commission,
            image: marketplace.image,
            shipping_price: marketplace.shipping_price
          }),
          headers: new Headers({
            "content-Type": "application/json",
            "Authorization": token,
          }),
        })
        window.location.href=`/marketplaces/`
      } else {
        setError({...error, name: "Marketplace is already created!"})
        console.log("You cannot be registered!!!"); //show error later
      }
    };

    return (
      <form noValidate>
        <div className="name">
          <label htmlFor="name">Product Name</label>
          <input
            type="name"
            name="name"
            value={marketplace.name}
            onChange={handleChange}
          />
          {error.name.length > 0 && (
            <span style={{ color: "red" }}>{error.name}</span>
          )}
        </div>
        <div className="commission">
          <label htmlFor="commission">Commission Rate</label>
          <input
            type="text"
            name="commission"
            value={marketplace.commission}
            onChange={handleChange}
          />
          {error.commission.length > 0 && (
            <span style={{ color: "red" }}>{error.commission}</span>
          )}
        </div>
        <div className="shipping_price">
          <label htmlFor="shipping_price">Shipping Price</label>
          <input
            type="shipping_price"
            name="shipping_price"
            value={marketplace.shipping_price}
            onChange={handleChange}
          />
          {error.shipping_price.length > 0 && (
            <span style={{ color: "red" }}>{error.shipping_price}</span>
          )}
        </div>
        <div className="marketplace_image">
          <label htmlFor="marketplace_image">Image</label>
          <input
            type="text"
            name="marketplace_image"
            value={marketplace.image}
            onChange={(e:any)=>setMarketplace({...marketplace,image:e.target.value})}
          />
        </div>
      
        <div className="submit">
          <button onClick={handleSubmit}>Editwd Marketplace!</button>
        </div>
 
      </form>
    );
    
}