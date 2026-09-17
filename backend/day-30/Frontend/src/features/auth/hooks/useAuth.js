import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import {registerUser,loginUser,logoutUser,getMe} from "../services/auth.api"

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, loading, setUser, setLoading } = context

    const handleRegister = async ({username,email,password})=>{
        try{
            setLoading(true)
            const data = await registerUser({username,email,password})
            setUser(data.user)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    const handleLogin = async ({username,email,password})=>{
        try{
            setLoading(true)
            const data = await loginUser({username,email,password})
            setUser(data.user)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    const handleGetMe = async ()=>{
        try{
            setLoading(true)
            const data = await getMe()
            setUser(data.user)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    const handleLogout = async ()=>{
        try{
            setLoading(true)
            const data = await logoutUser()
            setUser(null)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetMe()
    }, [])

    return { user, loading, setUser, setLoading, handleRegister, handleLogin, handleGetMe, handleLogout };
}
