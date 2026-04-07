import {router} from "./app.routes.jsx"
import { RouterProvider } from "react-router"
import "./features/shared/style.scss"
import { AuthProvider} from "./features/auth/auth.context.jsx"
import { PostContextProvider } from "./features/post/post.context.jsx"

function App() {
  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={router} />
      </PostContextProvider>
    </AuthProvider>
  )
}

export default App
