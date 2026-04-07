import {getFeed} from "../services/post.api.js"
import { useContext } from "react";
import { PostContext } from "../post.context.jsx";


export const usePost = ()=>{

    const context = useContext(PostContext)
    const {loading,post,setLoading,setPost,feed,setFeed} = context

    const handleGetFeed = async()=>{
        setLoading(true)
        const data = await getFeed()
        setFeed(data.post)
        setLoading(false)
    }

    return {loading,post,feed,handleGetFeed}
}