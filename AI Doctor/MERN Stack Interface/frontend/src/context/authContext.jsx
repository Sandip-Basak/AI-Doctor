import {  createContext, useEffect, useReducer } from "react";

const AuthContext=createContext()

export const reducer=(state,action)=>{
    if(action.type==="LOGIN"){
        return {user:action.payload}
    }
    if(action.type==="LOGOUT"){
        return {user:null}
    }
    else{
        return state
    }
}

const AuthContextProvider=({children})=>{
const [state,dispatch]=useReducer(reducer,{
    user:null
})
console.log(state)
useEffect(()=>{
    const data=JSON.parse(localStorage.getItem('user'))
    if(data){
        dispatch({type:'LOGIN',payload:data})
    }
},[])
    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext,AuthContextProvider}