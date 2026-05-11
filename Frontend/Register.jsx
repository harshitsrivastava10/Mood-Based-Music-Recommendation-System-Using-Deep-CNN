import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FormGroup from '../components/FormGroup'
import "../style/register.scss"
import { useAuth } from '../hooks/useAuth.js'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const {loading, handleRegister} = useAuth()
  const navigate = useNavigate()
  
    // use states 
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    // console.log(handleLogin);
  
    async function handleSubmit(e){
      e.preventDefault()
      // console.log(username, email, password);
      try{
        await handleRegister({username, email, password})
        navigate("/login")
      }
      catch(err) {
        console.log(err.response?.data)
      }
    }

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          {/* Username */}

          <FormGroup
            // two-way binding 
            type="name"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            label="Username"
            placeholder="Enter your username" />


          {/* EMAIL */}

          <FormGroup
            // two-way binding 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="Enter your email" />


          {/* PASSWORD */}

          <FormGroup
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter your password" />

          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </main>
  )
}

export default Register
