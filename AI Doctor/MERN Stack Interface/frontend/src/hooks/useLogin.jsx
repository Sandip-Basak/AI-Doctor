import { useState } from "react";
import{ authHook }from "./authContextHook";

const useLogin = () => {
  const [err, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const context = authHook();

  const Login = (username, password) => {
    setisLoading(true)
    setTimeout(async ()=>{
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });
          if (!response.ok) {
            setError('Some problem while Fetching');
            setisLoading(false);
          } else {
            const data = await response.json();
            if (data.error) {
              const errorMessage =
                data.error.email || data.error.password || "Unknown Error Occurred";
              setError(errorMessage);
              setisLoading(false)
            } else {
              context.dispatch({ type: "LOGIN", payload: data });
              localStorage.setItem('user',JSON.stringify(data))
              setError("");
              setisLoading(false);
            }
          }

    },2000)
  };

  return { Login, err, isLoading };
};

export default useLogin;
