import { useState, useContext } from 'react'
import "./style.css";
import { TokenContext } from "../Context/TokenContext";


export default function NewVendorForm() {
    const [token, setToken] = useContext(TokenContext)
    const[state,setState] = useState({
      company: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: ""
    })
    const[error,setError] = useState({
      company: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: ""
    })
  
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
        fetch("http://localhost:3001/vendor/create", {
          method: "POST",
          body: JSON.stringify({
            company: state.company,
            address: state.address,
            city: state.city,
            state: state.state,
            zip: state.zip,
            phone: state.phone
          }),
          headers: new Headers({
            "content-Type": "application/json",
            "Authorization": token,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            const{id}=data
            // Redirect
            window.location.href=`/vendors/`
          });
        console.log("Registering can be done");
      } else {
        setError({...error, company: "Company is already created!"})
        console.log("You cannot be registered!!!"); //show error later
      }
    };
    return (
        <div className="wrapper">
        <div className="form-wrapper">
          <h2>Create New Vendor</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="company">
              <label htmlFor="company">Vendor Name</label>
              <input
                type="company"
                name="company"
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
                onChange={handleChange}
              />
              {error.phone.length > 0 && (
                <span style={{ color: "red" }}>{error.phone}</span>
              )}
            </div>
            <div className="submit">
              <button>Create Vendor!</button>
            </div>
          </form>
        </div>
      </div>
    );
    
}
