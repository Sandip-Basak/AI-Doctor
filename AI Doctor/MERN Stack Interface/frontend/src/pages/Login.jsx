import { useContext, useState } from "react";
import useLogin from "../hooks/useLogin";
import Spinner from '../components/Spinner'
import "../App.css";
import { Link, useNavigate} from "react-router-dom";
import {authHook} from "../hooks/authContextHook";
import {motion} from 'framer-motion'
import Nav from "../components/nav";



export default function Login() {
  const [username, setUsername] = useState("");
  const [name, setname] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { Login, err, isLoading } = useLogin();
  const context=authHook()
  const navigate = useNavigate();

  function handleCredentials(e) {
    if (e.target.className === "username") {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (username === "") {
        setError("Username is Empty");
        return;
      } 
      else if(password==="") {
        setError("Password is Empty");
        return;
      }
  
    await Login(username, password);
  }

  if(context.user){
    navigate("/",{replace:true})
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
        {isLoading && <Spinner/>}
        <div className="auth-page-container">
          <div className="auth-form">
            <form onSubmit={handleSubmit}>
              <span className="auth-heading">Login</span>
              <input
                type="text"
                value={username}
                onChange={handleCredentials}
                className="username"
                placeholder="Username"
              />
              {err==='Incorrect Username' && <span>{err}</span>}
              <input
                type="text"
                value={password}
                onChange={handleCredentials}
                className="password"
                placeholder="Password"
              />
            {err==='Incorrect password' && <span>{err}</span>}
              <button className="submit-Button">
                Submit
              </button>
              <div className="other-Nav">
                <span className="f-password">Forgot Password</span>
                <Link to="/register"><span className="toSignin">Register</span></Link>
              </div>
              {error.includes('Username') && <span>Username is Empty</span>}
              {error.includes('Password') && <span>Password is Empty</span>}
              {error.includes('Fetching') && <span>Some Problem while Fetching</span>}
            </form>
          </div>
        </div>
      </section>
      <Nav/>
      </motion.div>
    </>
  );
}
