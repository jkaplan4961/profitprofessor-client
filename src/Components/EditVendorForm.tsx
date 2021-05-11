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
  vendorId: string;
}

type Vendor = {
    id: number;
    company: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
}

export default function EditVendorForm({ vendorId } : PropTypes) {
  const [token, setToken] = useContext(TokenContext)
  const initialState : Vendor = {
    id: Number(vendorId),
    company: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: ""
  }
  const [vendor, setVendor] = useState(initialState)
  const[error,setError] = useState({
    company: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: ""
  })

  useEffect(() => {
      fetch(`http://localhost:3001/vendor/${vendorId}`,{
        method: "GET",
        headers: new Headers({
            "content-Type": "application/json",
            "Authorization": token,
        })
      }).then(vendor => vendor.json())
          .then(data => {
            setVendor(data)
          })
  }, [token])

  const handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    switch (name) {
      case "company":
          value.length < 3
                  ? setError({...error, company: "Company name must be at least 3 characters long!"}) 
                  : setError({...error, company: ""});
        break;
      case "address":
          value.length < 1
                  ? setError({...error,address:"Enter an address!"})
                  : setError({...error, address: ""});
        break;
      case "city":
              value.length < 1
                  ? setError({...error, city: "Enter a city!"})
                  : setError({...error, city: ""});  
        break;
        case "state":
          value.length !== 2
                  ? setError({...error, state: "Enter a state!"}) 
                  : setError({...error, state: ""});
        break;
        case "zip":
          value.length < 5
                  ? setError({...error, zip: "Enter a zip code!"}) 
                  : setError({...error, zip: ""});
        break;
        case "phone":
          value.length < 10
                  ? setError({...error, phone: "Enter a zip code!"}) 
                  : setError({...error, phone: ""});
        break;
      default:
        break;
    }
    setVendor(Object.assign(vendor, {[name]: value} ));
    console.log(error);
  };


    const handleSubmit = (event: any) => {
      event.preventDefault();
      let validity = true;
      Object.values(error).forEach(
        (val) => val.length > 0 && (validity = false)
      );
      if (validity === true) {
        fetch(`http://localhost:3001/vendor/${vendor.id}`, {
          method: "PUT",
          body: JSON.stringify({
            company: vendor.company,
            address: vendor.address,
            city: vendor.city,
            state: vendor.state,
            zip: vendor.zip,
            phone: vendor.phone
          }),
          headers: new Headers({
            "content-Type": "application/json",
            "Authorization": token,
          }),
        })
        window.location.href=`/vendors/`
      } else {
        setError({...error, company: "Marketplace is already created!"})
        console.log("You cannot be registered!!!"); //show error later
      }
    };

    return (
          <form onSubmit={handleSubmit} noValidate>
            <div className="company">
              <label htmlFor="company">Vendor Name</label>
              <input
                type="company"
                name="company"
                value={vendor.company}
                onChange={handleChange}
              />
              {error.company.length > 0 && (
                <span style={{ color: "red" }}>{error.company}</span>
              )}
            </div>
            <div className="address">
              <label htmlFor="address">Address</label>
              <input
                type="address"
                name="address"
                value={vendor.address}
                onChange={handleChange}
              />
              {error.address.length > 0 && (
                <span style={{ color: "red" }}>{error.address}</span>
              )}
            </div>
            <div className="city">
              <label htmlFor="city">City</label>
              <input
                type="city"
                name="city"
                value={vendor.city}
                onChange={handleChange}
              />
              {error.city.length > 0 && (
                <span style={{ color: "red" }}>{error.city}</span>
              )}
            </div>
            <div className="state">
              <label htmlFor="state">State</label>
              <input
                type="state"
                name="state"
                value={vendor.state}
                onChange={handleChange}
              />
              {error.state.length > 0 && (
                <span style={{ color: "red" }}>{error.state}</span>
              )}
            </div>
            <div className="zip">
              <label htmlFor="zip">ZIP Code</label>
              <input
                type="zip"
                name="zip"
                value={vendor.zip}
                onChange={handleChange}
              />
              {error.zip.length > 0 && (
                <span style={{ color: "red" }}>{error.zip}</span>
              )}
            </div>
            <div className="phone">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="phone"
                name="phone"
                value={vendor.phone}
                onChange={handleChange}
              />
              {error.phone.length > 0 && (
                <span style={{ color: "red" }}>{error.phone}</span>
              )}
            </div>
            <div className="submit">
              <button>Edit Vendor</button>
            </div>
          </form>
    );
    
}