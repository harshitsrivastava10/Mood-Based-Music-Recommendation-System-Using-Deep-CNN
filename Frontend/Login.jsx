import React, {useState} from 'react'
import "../style/login.scss"
import "../../shared/style/button.scss"
import { Link } from 'react-router-dom'
import FormGroup from '../components/FormGroup'

import { useAuth } from '../hooks/useAuth' // hook layer 
import { useNavigate } from 'react-router-dom'  // navigate to other page

const Login = () => {

  const {loading, handleLogin} = useAuth()
  const navigate = useNavigate()

  // use states 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // console.log(handleLogin);

  async function handleSubmit(e){
    e.preventDefault()
    console.log(email, password);
    try{
      await handleLogin({email, password})
      navigate("/")
    }
    catch(err) {
      console.log(err.response?.data)
    }
   
  }

 

  return (
      <main className="login-page">
        <div className="form-container">
          <h1>🎧 MoodTunes <span>Login</span></h1>
          
          <form onSubmit={handleSubmit}>

            {/* EMAIL */}

           <FormGroup
            // two-way binding 
            type = "email"
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
            label = "Email"
            placeholder = "Enter your email"/>


           {/* PASSWORD */}

           <FormGroup
            type = "password"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            label = "Password"
            placeholder = "Enter your password"/>

            <button type = "submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>
          <p>Don't have an account? <Link to = "/register">Register here</Link></p>
        </div>
      </main>

  )
}

export default Login
