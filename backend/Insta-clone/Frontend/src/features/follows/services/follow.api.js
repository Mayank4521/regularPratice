import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:3000/api/users",
    withCredentials: true,
});

export const fetchFollow=async ()=>{
    const response = await api.get("/follow/followers")

    return response.data
}


export const fetchFollowing= async ()=>{
    const response = await api.get("/follow/followings")
    return response.data
}

export const fetchSuggestedusers= async()=>{
    const response = await api.get("/suggestedusers")
    return response.data
}

export const acceptFollowRequest = async(userId)=>{
    const response = await api.patch("/follow/requests/accept/"+userId)
    return response.data
}

export const rejectFollowRequest = async(userId)=>{
    const response = await api.delete("/follow/requests/reject/"+userId)
    return response.data
}

export const pendingRequest = async()=>{
    const response = await api.get("/follow/allrequests")
    return response.data
}

export const followUser= async(username)=>{
    const response = await api.post("/follow/"+username)
    return response.data
}

export const unFollowUser = async(username)=>{
    const response = await api.delete('/unfollow/'+username)
    return response.data
}