import { useState, useEffect } from "react"
import "./App.css"


const getToken = () => localStorage.getItem("token")  

function Dashboard() {
  const [jobs, setJobs] = useState([])  
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [status, setStatus] = useState("")
  const [editingId, setEditingId] = useState(null)
  const URL = "https://smarthire-kappa.vercel.app/jobs"

  useEffect(() => {
    fetch(URL, {
      headers: { "authorization": getToken() }  
    })
    .then(res => res.json())   
    .then(data => setJobs(data))  
  }, [])  

  const handleAdd = async (e) => {

    e.preventDefault();
    const jobResponse = await fetch(URL,{
      method: "POST", 
      headers: { "Content-Type": "application/json" ,
        authorization: getToken()
      },
      body: JSON.stringify({
        company,role,status
      })
    }
    )
    const newJob = await jobResponse.json();
    setJobs(prev => [...prev, newJob])
    setCompany("");
    setRole("");
    setStatus("");


  }

  const startEdit = (job) =>{
    setEditingId(job.id);
    setCompany(job.company);
    setRole(job.role);
    setStatus(job.status);
  }

  const handleEditing = async (e) => {
    e.preventDefault()

    const res = await fetch(`${URL}/${editingId}`,{
      method: "PUT",
      headers:{
         "Content-Type": "application/json",
          authorization: getToken()
      },
      body: JSON.stringify({
        company,
        role,
        status
      })
    })

    const updatedJob = await res.json();
    setJobs(prev => prev.map(job => job.id === editingId ? updatedJob:job));
    setEditingId(null);
    setCompany("");
    setRole("");
    setStatus("");

    
 
  } 

  const getAdvice = async (job) => {
    const res = await fetch("https://smarthire-kappa.vercel.app/ai-adv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        company: job.company,
        role: job.role
      })
    })

    const data = await res.json()
    alert(data.advice) 
  }

  

  
  const handleDelete = async (id) => {

    await fetch(`${URL}/${id}`,{
      method:"DELETE",
      headers:{authorization: getToken()}
    })

    setJobs(prev => prev.filter(jobs => jobs.id !== id))

  }
  const isEditing = editingId !== null

  
  return (
    <div className="container">

      <h1>Job Tracker</h1>

      {/* форма */}
      <div className="form">
        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select status</option>
          <option value="applied">Applied</option>
          <option value="rejected">Rejected</option>
          <option value="offered">Offered</option>
        </select>

        {editingId ? (
          <button onClick={handleEditing}>Update</button>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>

      {/* карточки */}
      {jobs.map(job => (
        <div className="job-card" key={job.id}>

          <div className="job-info">
            <h2>{job.role}</h2>
            <p>{job.company}</p>
            <p className="status">{job.status}</p>
          </div>

          <div className="actions">
            <button
              className="ai-btn"
              onClick={() => getAdvice(job)}
            >
              AI
            </button>

            <button
              className="edit-btn"
              onClick={() => startEdit(job)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => handleDelete(job.id)}
            >
              X
            </button>
          </div>

        </div>
      ))}

    </div>
  )
}
export default Dashboard