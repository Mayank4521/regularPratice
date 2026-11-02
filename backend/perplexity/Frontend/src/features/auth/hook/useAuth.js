import {useDispatch } from 'react-redux'
import { register, login, getMe } from '../service/auth.api.js'
import {setUser, setLoading, setError} from '../auth.slice.js'


export function useAuth() {

    const dispatch = useDispatch()

    async function handleRegister(username,email, password) {
        try{
            dispatch(setLoading(true))
            const user = await register(username,email, password)
            dispatch(setUser(user))
        }catch(error){
            dispatch(setError(error.response?.data?.message || 'Registration failed'))
        }finally{
            dispatch(setLoading(false))
        }
    }
        

    async function handleLogin(email, password) {
        try{
            dispatch(setLoading(true))
            const user = await login(email, password)
            dispatch(setUser(user))
        }catch(error){
            dispatch(setError(error.response?.data?.message || 'Login failed'))
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe() {
        try{
            dispatch(setLoading(true))
            const user = await getMe()
            dispatch(setUser(user))
        }catch(error){
            dispatch(setError(error.response?.data?.message || 'Fetching user failed'))
        }finally{
            dispatch(setLoading(false))
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleGetMe
    }}