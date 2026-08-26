import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({children})=>{
    const [posts,setPosts] = useState(null)
    const [feed,setFeed] = useState(null)
    const [postLoading,setPostLoading] = useState(false)

    return (
        <PostContext.Provider value ={{posts,setPosts,feed,setFeed,postLoading,setPostLoading}}>{children}</PostContext.Provider>
    )
}