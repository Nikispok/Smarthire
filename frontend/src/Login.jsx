import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const URL = "https://smarthire-production-0172.up.railway.app/auth/login"
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch(URL,{method: "POST",
               headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })})

        const data = await response.json();
        localStorage.setItem("token", data.replace(/"/g, ''))
        navigate("/dashboard")
        
    }

    return (
  <div className="auth-container">
    <div className="auth-box">
      <h1>SmartHire</h1>
      <p>Welcome back</p>
      <Link to={"/"}>← Home</Link>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <div className="auth-link">Don't have profile? <Link to="/register">Sign up</Link></div>
    </div>
  </div>
)
}

export default Login