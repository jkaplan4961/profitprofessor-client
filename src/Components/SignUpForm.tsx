import { useEffect, useState, useContext } from "react";
import "./style.css";
import { TokenContext } from "../Context/TokenContext";


interface SignUpProps {
  updateToken: Function;
}
interface SignUpState {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  errors: {
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
  };
}
export default function SignUpForm() {
  const [token, setToken] = useContext(TokenContext)
  const[state,setState] = useState({
    username: "",
    email: "",
    password: "",
    firstname:"",
    lastname: "",
  })
  const[error,setError] = useState({
    username: "",
    email: "",
    password: "",
    firstname:"",
    lastname: "",
  })

  const handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    switch (name) {
      case "username":
          value.length < 6
                  ? setError({...error, username: "Username must be at least 6 characters long!"}) 
                  : setError({...error, username: ""});
        break;
      case "email":
          !value.includes("@")
                  ? setError({...error,email:"Enter a valid email"})
                  : setError({...error, email: ""});
        break;
      case "firstname":

              value.length < 1
                  ? setError({...error, firstname: "Enter a First Name!"})
                  : setError({...error, firstname: ""});  
        break;
      case "lastname":
     
                    value.length < 6
                  ? setError({...error, lastname: "Enter a Last Name!"})
                  : setError({...error, lastname: ""});;
        break; 
      case "password":
    
          value.length < 6
                  ? setError({...error, password: "Enter a valid password!"})
                  : setError({...error, password: ""});
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
      fetch("http://localhost:3001/user/create", {
        method: "POST",
        body: JSON.stringify({
          username: state.username,
          password: state.password,
          email: state.email,
          firstname: state.firstname,
          lastname: state.lastname,
        }),
        headers: new Headers({
          "content-Type": "application/json",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setToken(data.sessionToken); //may be token
          console.log(data);
          window.location.href="/"
        });
      console.log("Registering can be done");
    } else {
      setError({...error, username: "Account is already registered!"})
      console.log("You cannot be registered!!!"); //show error later
    }
  };

 
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="username">
              <label htmlFor="username">Username</label>
              <input
                type="username"
                name="username"
                onChange={handleChange}
              />
              {error.username.length > 0 && (
                <span style={{ color: "red" }}>{error.username}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
              />
              {error.email.length > 0 && (
                <span style={{ color: "red" }}>{error.email}</span>
              )}
            </div>
            <div className="firstname">
              <label htmlFor="firstname">First Name</label>
              <input
                type="firstname"
                name="firstname"
                onChange={handleChange}
              />
              {error.firstname.length > 0 && (
                <span style={{ color: "red" }}>{error.firstname}</span>
              )}
            </div>
            <div className="lastname">
              <label htmlFor="lastname">Last name</label>
              <input
                type="lastname"
                name="lastname"
                onChange={handleChange}
              />
              {error.lastname.length > 0 && (
                <span style={{ color: "red" }}>{error.lastname}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
              />
              {error.password.length > 0 && (
                <span style={{ color: "red" }}>{error.password}</span>
              )}
            </div>
            <div className="submit">
              <button>Sign Me Up!</button>
            </div>
          </form>
        </div>
      </div>
    );
  
}