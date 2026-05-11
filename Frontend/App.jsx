import React from 'react'
// import FaceExpression from './features/Expression/components/FaceExpression'

import { RouterProvider } from 'react-router'
import { router } from "./app.routes"
import "./App.css"
import "./features/shared/style/global.scss"


const App = () => {
  return (
    <div>
      <RouterProvider router = {router} />
    </div>
  )
}
  
export default App
