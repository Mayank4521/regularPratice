import React from 'react'
import { RouterProvider } from 'react-router'
import './features/shared/global.scss'
import {AuthProvider} from "./features/auth/auth.context"
import { router } from "./app.routes"

const App = () => {
  return (
    <AuthProvider>
    <RouterProvider router ={router}/>
    </AuthProvider>
  )
}

export default App