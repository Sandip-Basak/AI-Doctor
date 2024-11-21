import Home from "../pages/home";
import Login from "../pages/Login";
import Signin from "../pages/Signin";
import Contact from "../pages/contact/Contact.jsx";
import Chat from "../pages/chat/chat";
import { Navigate, useLocation } from "react-router-dom";
import {AnimatePresence} from 'framer-motion'
import {Routes, Route } from "react-router-dom";
import {authHook} from '../hooks/authContextHook'
import Header from "./Header";
import Footer from "./Footer";


export default function AnimatedRoutes(){
    const location=useLocation()
    const context=authHook()
    return(
        <>
        <AnimatePresence>
        <Header />
            <Routes location={location} key={location.pathname }>
                <Route path="/" element={<Home/>} />
                    <Route path="login" element={!context.user? <Login/>:<Navigate to="/"/>} />
                    <Route path="register" element={!context.user?<Signin/>:<Navigate to="/"/>} />
                    <Route path="contact" element={context.user?<Contact/>:<Login/>} />
                    <Route path="chat" element={context.user? <Chat/> : <Login/>} />
                </Routes>
            <Footer/>
        </AnimatePresence>
        </>
    )
}