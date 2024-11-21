import { useState } from "react";
import Spinner from "../components/Spinner";
import  useSignin from "../hooks/useSignin";
import "../App.css";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion'
import Nav from "../components/nav";



export default function Signin() {
  const [username, setUsername] = useState("");
  const [name, setname] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Signin, err, isLoading } = useSignin();

  function handleCredentials(e) {
    if (e.target.className === "username") {
      setUsername(e.target.value);
    } else if (e.target.className === "email") {
      setEmail(e.target.value);
    }
    else if (e.target.className === "name") {
      setname(e.target.value);
    } 
    else {
      setPassword(e.target.value);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (username === "") {
      setError("Username is Empty");
      return;
    } else if (password === "") {
      setError("Password is Empty");
      return;
    } else if (email === "") {
      setError("Email is empty");
      return;
    }

    await Signin(username, password, email);
  }

  return (
    <>
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{ duration: 1 }}
      exit={{opacity:0}}
    >
      <section className="auth-page">
        {isLoading && <Spinner />}
        <div className="auth-page-container">
          <div className="auth-form">
            <form onSubmit={handleSubmit}>
              <span className="auth-heading">Register</span>
              <input
                type="text"
                value={name}
                onChange={handleCredentials}
                className="name"
                placeholder="Name"
              />
              <input
                type="text"
                value={username}
                onChange={handleCredentials}
                className="username"
                placeholder="Username"
              />
              <input
                type="text"
                value={email}
                onChange={handleCredentials}
                className="email"
                placeholder="Email"
              />
              <input
                type="password"
                value={password}
                onChange={handleCredentials}
                className="password"
                placeholder="Password"
              />
              <button className="submit-Button">Submit</button>
              <div className="signin-other-nav">
                <Link to='/login'><span className="tologin">Login</span></Link>
              </div>

              {error.includes("Username") && <span>Username is Empty</span>}
              {error.includes("Password") && <span>Password is Empty</span>}
              {error.includes("email") && <span>Password is Empty</span>}
              {error.includes("Fetching") && (
                <span>Some Problem while Fetching</span>
              )}
            </form>
          </div>
        </div>
      </section>
      <Nav/>
      </motion.div>
    </>
  );
}
