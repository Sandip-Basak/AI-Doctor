import { useContext } from "react";
import {AuthContext} from '../context/authContext'

 export const authHook=()=>{
    const context=useContext(AuthContext)

    return context
}


