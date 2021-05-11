import { useEffect, useState, useContext } from "react";
import "./style.css";
import { TokenContext } from "../Context/TokenContext";

export default function LoginForm() {
  const [token, setToken] = useContext(TokenContext)
  const[state,setState] = useState({
    username: "",
    password: "",
  })
  const[error,setError] = useState({
    username: "",
    password: "",
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
      fetch("http://localhost:3001/user/login", {
        method: "POST",
        body: JSON.stringify({
          username: state.username,
          password: state.password,
        }),
        headers: new Headers({
          "content-Type": "application/json",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.sessionToken)
          setToken(data.sessionToken); //may be token
          window.location.href="/"
        });
      console.log("Registering can be done");
    } else {
      setError({...error, username: "Invalid credentials. Try again."})
      console.log("You cannot be logged in!!!"); //show error later
    }
  };

 
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h2>Log in</h2>
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