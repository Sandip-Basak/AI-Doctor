import { Link } from "react-router-dom";
import './Spinner'
import {authHook} from '../hooks/authContextHook'
import useLogOut from '../hooks/useLogout'

export default function Nav() {
const context=authHook()
const {LogOut,isLoading}=useLogOut()

async function handleLogout(){
    await LogOut()
}
  return (
    <>
      <nav className="navigation">
        <ul>
          <li>
            <Link>
              <i class="fa-solid fa-bars fa-lg"></i>
            </Link>
          </li>
          <li className="links">
            <Link to="/">
              <span>Home</span>
            </Link>
          </li>
          <li className="links">
            <Link to="chat">
              <span>Chat</span>
            </Link>
          </li>
          <li className="links">
            <Link to="/contact">
              <span>Contact</span>
            </Link>
          </li>
          <div className='auth'>
                {!context.user &&  <Link to="/login" className='auth-btn'><i class="fa fa-user" aria-hidden="true"></i></Link> }
                {context.user &&  <Link to="/"  onClick={handleLogout} className='logout'><i class="fa-solid fa-right-from-bracket" style={{color:"#0f0f10"}}></i></Link>}
        </div>
        </ul>

      </nav>
    </>
  );
}
