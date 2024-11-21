import { useState } from "react";
import {authHook} from "./authContextHook";

const useLogOut = () => {
  const [isLoading, setisLoading] = useState(false);
  const context = authHook();

  const LogOut = () => {
    setisLoading(true)
    setTimeout(()=>{
              context.dispatch({ type: "LOGIN"});
              localStorage.removeItem('user')
              setisLoading(false);

    },1000)
  };

  return { LogOut ,isLoading };
};

export default useLogOut;
