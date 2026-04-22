import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

const Register = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const URL = "https://smarthire-production-0172.up.railway.app/auth/register";
    const navigate = useNavigate();

    async function HandleSubmit(e) {
        e.preventDefault();
        const response = await fetch(URL,{method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({email, password})
            
        })
        navigate("/login")  
    }


    return (
  <div className="auth-container">
    <div className="auth-box">
      <h1>SmartHire</h1>
      <p>Welcome back</p>
      <Link to={"/"}>← Home</Link>
      <form onSubmit={HandleSubmit}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Create</button>
      </form>
      <div className="auth-link">Already have profile? <Link to="/login">Log in</Link></div>
    </div>
  </div>
)
}

export default Register