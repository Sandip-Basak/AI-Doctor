import { useEffect, useRef, useState } from 'react'
import './chat.css'
import usechatHook from '../../hooks/chatHook';
import Message from '../../components/MessageCompo';
import {motion} from 'framer-motion'

export default function Chat(){
    const[message,setMessage]=useState("");
    const{chat,data,isLoading}=usechatHook();
    const [info,setInfo]=useState([])

    const chatBoxRef = useRef(null);

    async function handleSubmit(e){
        e.preventDefault();
        await chat(message)
    }
    useEffect(() => {
        const forceUpdate = () => {
            if (data) {
                console.log(data.data)
                let replyData = data.symptoms ? data.symptoms : data.data;
                setInfo([...info, { user: message, reply: replyData }]);
                setMessage("");
            }
        };
        forceUpdate();
    }, [data])  

  useEffect(() => {
    const activateChatBox = () => {
      if (chatBoxRef.current) {
        chatBoxRef.current.classList.add('loaded');
      }
    };
    const timeout = setTimeout(activateChatBox,200);

    return () => clearTimeout(timeout);
  },[]); 


    return (
    <>
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{ duration: 1 }}
      exit={{opacity:0}}
        >
    <section className='ai-doctor-chat'>
        <div className='chat-container'>
            <div className='chat-box' ref={chatBoxRef}>
                <div className='chat-header'>
                    <div className='chat-header-info'>
                        <div className='user-name'>
                            <span>AI-DOCTOR</span>
                        </div>
                    </div>
</div>
                <div className='message-box'>
                    <div className='user-messages'>
                        <Message message={info}/>
                    </div>
                </div>
                <div className='chat-input'>
                    <div className='chat-input-box'>
                        <form onSubmit={handleSubmit}>
                            <input type="text" className='input-box' value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='Write message'/>
                            <button className='submit-Btn' ><i class="fa-sharp fa-solid fa-paper-plane"></i></button>
                        </form>
                    </div>  
                </div>
            </div>
        </div>
    </section>
    </motion.div>
    </>)
}