import { useState } from "react"
import './contact.css'
import {motion} from 'framer-motion'

export default function Contact(){
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [message,setMessage]=useState("")
    function handleSubmit(e){
        e.preventDefault()
        console.log(e)
    }
    return(
        <>
        <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{ duration: 1 }}
      exit={{opacity:0}}
        >
        <section className="contact-page">
            <div className="contact-page-container">
                <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                        <div className="contact-form-info">Contact-Us</div>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="contact-name" placeholder="Name"/>
                        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="contact-email" placeholder="Email"/>
                        <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} className="contact-message" placeholder="Message"/>
                        <button className="contact-submit">Submit</button>
                    </form>
                </div>
            </div>
        </section>
        </motion.div>
        </>
    )
}