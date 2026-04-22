import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="home-container">
      <h1>SmartHire</h1>
      <p>Track your job applications</p>
      <div className="home-buttons">
      <Link to="/login" className="btn-primary">Login</Link>
      <Link to="/register" className="btn-secondary">Register</Link>
      </div>
    </div>
  )
}

export default Home