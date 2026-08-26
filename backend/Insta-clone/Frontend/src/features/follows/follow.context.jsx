import {createContext, useState} from "react";

export const FollowContext = createContext()

export function FollowProvider({children}){
    const [followers,setFollowers] = useState([])
    const [followings,setFollowings] = useState([])
    const [others,setOthers] = useState([])
    const [loading,setLoading] = useState(false)
    const [pendings,setPendings] = useState([])

    return(
        <FollowContext.Provider value={{followers,followings,loading,others,pendings,setPendings,setOthers,setLoading,setFollowers,setFollowings}}>{children}</FollowContext.Provider>
    )
}