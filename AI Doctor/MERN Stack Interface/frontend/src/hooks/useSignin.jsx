import { useState } from "react";
import {authHook} from "./authContextHook";

const useSignin = () => {
  const [err, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const context = authHook();

  const Signin = (username, password,email) => {
    setisLoading(true)
    setTimeout(async ()=>{
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password ,email }),
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

  return { Signin, err, isLoading };
};

export default useSignin;
