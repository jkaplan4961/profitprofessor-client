import { useState, useContext } from 'react'
import "./style.css";
import { TokenContext } from "../Context/TokenContext";

export default function NewMarketPlaceForm() {
    const [token, setToken] = useContext(TokenContext)
    const[state,setState] = useState({
      marketplacename: "",
      commissionrate: "",
      image: "",
      shippingprice: "",
    })
    const[error,setError] = useState({
        marketplacename: "",
        commissionrate: "",
        image: "",
        shippingprice: "",
    })
  
    const handleChange = (event: any) => {
      event.preventDefault();
      const { name, value } = event.target;
      switch (name) {
        case "marketplacename":
            value.length < 3
                    ? setError({...error, marketplacename: "Marketplace name must be at least 3 characters long!"}) 
                    : setError({...error, marketplacename: ""});
          break;
        case "commissionrate":
            isNaN(value)
                    ? setError({...error,commissionrate:"Commission Rate must be a number"})
                    : setError({...error, commissionrate: ""});
          break;
        case "image":
  
                value.length < 1
                    ? setError({...error, image: "Enter an image!"})
                    : setError({...error, image: ""});  
          break;
          case "shippingprice":
            isNaN(value)
                    ? setError({...error, shippingprice: "Shipping Rate must be a number!"}) 
                    : setError({...error, shippingprice: ""});
          break;
        default:
          break;
      }
      setState(Object.assign(state, {[name]: value} ));
      console.log(error);
    };
    const handleSubmit = (event: any) => {
      event.preventDefault();
      let validity = true;
      Object.values(error).forEach(
        (val) => val.length > 0 && (validity = false)
      );
      if (validity === true) {
        fetch("http://localhost:3001/marketplace/create", {
          method: "POST",
          body: JSON.stringify({
            name: state.marketplacename,
            commission: state.commissionrate,
            image: state.image,
            shippingprice: state.shippingprice
          }),
          headers: new Headers({
            "content-Type": "application/json",
            "Authorization": token,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(token);
            const{id}=data

            // Redirect
            window.location.href=`/marketplaces/`
          });
        console.log("Registering can be done");
      } else {
        setError({...error, marketplacename: "Marketplace is already created!"})
        console.log("You cannot be registered!!!"); //show error later
      }
    };
    return (
        <div className="wrapper">
        <div className="form-wrapper">
          <h2>Create Marketplace</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="marketplacename">
              <label htmlFor="marketplacename">Marketplace Name</label>
              <input
                type="marketplacename"
                name="marketplacename"
                onChange={handleChange}
              />
              {error.marketplacename.length > 0 && (
                <span style={{ color: "red" }}>{error.marketplacename}</span>
              )}
            </div>
            <div className="commissionrate">
              <label htmlFor="commissionrate">Commission Rate</label>
              <input
                type="commissionrate"
                name="commissionrate"
                onChange={handleChange}
              />
              {error.commissionrate.length > 0 && (
                <span style={{ color: "red" }}>{error.commissionrate}</span>
              )}
            </div>
            <div className="shippingprice">
              <label htmlFor="shippingprice">Shipping Rate</label>
              <input
                type="shippingprice"
                name="shippingprice"
                onChange={handleChange}
              />
              {error.shippingprice.length > 0 && (
                <span style={{ color: "red" }}>{error.shippingprice}</span>
              )}
            </div>
            <div className="marketplaceimage">
              <label htmlFor="image">Enter an Image URL</label>
              <input
                type="marketplaceimage"
                name="image"
                onChange={handleChange}
              />
              {error.image.length > 0 && (
                <span style={{ color: "red" }}>{error.image}</span>
              )}
              </div>
            <div className="submit">
              <button>Create Marketplace!</button>
            </div>
          </form>
        </div>
      </div>
    );
    
}
