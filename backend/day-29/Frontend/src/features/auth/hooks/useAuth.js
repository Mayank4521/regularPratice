import {useContext, useEffect} from "react";
import {AuthContext} from "../auth.context";
import {loginUser, registerUser} from "../services/auth.api" 

export function useAuth(){
    const {user, setUser, loading, setLoading} = useContext(AuthContext)

    const handleRegister = async(username,email,password)=>{
        try{
            setLoading(true)
            const data = await registerUser(username,email,password)
            setUser(data.user)
        }
        catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    const handleLogin =async (username,password)=>{
        try{
            setLoading(true)
            const data = await loginUser(username,password)
            setUser(data.user)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }


    return {user, loading, handleLogin, handleRegister}
}