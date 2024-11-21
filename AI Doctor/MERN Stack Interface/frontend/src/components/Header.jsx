import { Link } from 'react-router-dom'
import '../App.css'
import './Spinner'
import {authHook} from '../hooks/authContextHook'
import useLogOut from '../hooks/useLogout'
import Nav from './nav'

export default function Header(){
    return(
        <header>
           <Link to='/'>
            <div className="logo">
                <span className='letters'>A</span>
                <span className='letters'>I</span>
                <span className='letters'>&nbsp;</span>
                <span className='letters'>D</span>
                <span className='letters'>O</span>
                <span className='letters'>C</span>
                <span className='letters'>T</span>
                <span className='letters'>O</span>
                <span className='letters'>R</span>
            </div>
            </Link>
            <Nav/>
        </header>
    )
}