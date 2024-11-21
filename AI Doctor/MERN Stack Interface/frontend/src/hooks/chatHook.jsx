import { useState } from "react";

const usechatHook = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const chat = (message) => {
        setIsLoading(true);
        setTimeout(async ()=>{
          try {
            const response = await fetch('http://localhost:3000/chats', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch');
            }

            const responseData = await response.json();
            console.log(response)
            setData(responseData);
        } catch (error) {
            console.error("Error fetching data:", error.message);
            setData(null); // Reset data on error
        } finally {
            setIsLoading(false);
        }
        },1000)
        
    };

    return { chat, data, isLoading };
};

export default usechatHook;
