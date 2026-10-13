
import { useState } from "react";


function Login({ onLogin }) {

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");


  const handleLogin = async (event) => {

    event.preventDefault();

    setMessage("");


    if (!username || !password) {

      setMessage(
        "Please enter username and password."
      );

      return;

    }


    try {

      const response = await fetch(
        "http://localhost:5000/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            username: username,
            password: password
          })
        }
      );


      const data = await response.json();


      if (!response.ok) {

        setMessage(
          data.message || "Login failed."
        );

        return;

      }


      localStorage.setItem(
        "accessToken",
        data.accessToken
      );


      localStorage.setItem(
        "refreshToken",
        data.refreshToken
      );


      localStorage.setItem(
        "adminUser",
        JSON.stringify(data.user)
      );


      onLogin();


    } catch (error) {

      console.error(error);

      setMessage(
        "Cannot connect to backend."
      );

    }

  };


  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8"
      }}
    >

      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          width: "380px",
          borderRadius: "10px",
          border: "1px solid #ddd",
          boxSizing: "border-box"
        }}
      >

        <h1>Portfolio CMS</h1>

        <h2>Admin Login</h2>


        <form onSubmit={handleLogin}>


          <label>
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            placeholder="Enter username"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              boxSizing: "border-box"
            }}
          />


          <br />
          <br />


          <label>
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter password"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              boxSizing: "border-box"
            }}
          />


          <br />
          <br />


          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              cursor: "pointer"
            }}
          >
            Login
          </button>


        </form>


        {message && (

          <p>
            {message}
          </p>

        )}


      </div>

    </div>

  );

}


export default Login;

