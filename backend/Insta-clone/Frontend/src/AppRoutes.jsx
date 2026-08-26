import {Routes, Route} from "react-router"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Feed from "./features/posts/pages/Feed"
import CreatePost from "./features/posts/pages/CreatePost"
import Follow from "./features/follows/pages/Follow"
import MyPost from "./features/posts/pages/MyPost"
import Profile from "./features/auth/pages/Profile"

const AppRoutes =()=>{
    return(
        <Routes>
            <Route path="/" element={<Feed/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/create-post" element={<CreatePost/>}/>
            <Route path="/follow" element={<Follow/>}/>
            <Route path="/my-post" element={<MyPost/>}/>
        </Routes>
    )
}

export default AppRoutes