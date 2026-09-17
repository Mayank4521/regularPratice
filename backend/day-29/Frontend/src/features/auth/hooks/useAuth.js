import {useContext, useEffect} from "react";
import {AuthContext} from "../auth.context";
import {loginUser, registerUser, getMe, logoutUser} from "../services/auth.api" 

export function useAuth(){
    const {user, setUser, loading, setLoading} = useContext(AuthContext)

    const handleRegister = async({username,email,password})=>{
        try{
            setLoading(true)
            const data = await registerUser({username,email,password})
            setUser(data.user)
        }
        catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    const handleLogin =async ({email,username,password})=>{
        try{
            setLoading(true)
            const data = await loginUser({email,username,password})
            setUser(data.user)
            console.log(data.user)
        }catch(err){
            console.log(err)
            throw err
        }finally{
            setLoading(false)
        }
    }

    const handleGetMe = async()=>{
        try{
            setLoading(true)
            const data =await getMe()
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

    useEffect(()=>{
        handleGetMe()
    },[])

    return {user, loading, handleLogin, handleRegister, handleGetMe, handleLogout}
}