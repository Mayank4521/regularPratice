import React from 'react'
import AppRoutes from "./AppRoutes"
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './features/auth/auth.context'
import { PostContextProvider } from './features/posts/post.context'
import { FollowProvider } from './features/follows/follow.context'

const App = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
    <PostContextProvider>
    <FollowProvider>
    <AppRoutes/>
    </FollowProvider>
    </PostContextProvider>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App