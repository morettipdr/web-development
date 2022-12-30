import React, { useState, useEffect } from "react"
import "./style.css"
import { Card } from "../../components/Card"

export function Home() {
  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleDateString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })
    }
    setStudent(prevState => [...prevState, newStudent])
  }
  const [studentName, setStudentName] = useState()
  const [students, setStudent] = useState([])
  const [user, setUser] = useState({name: "", avatar: ""})

  useEffect(() => {
     fetch("https://api.github.com/users/morettipdr").then(response => response.json()).then(data => setUser({name: data.name, avatar: data.avatar_url})).catch(e => console.error(e))
  }, [])

  return (
    <div className="container">
      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="" srcset="" />
        </div>
      </header>
      <input type="text" placeholder="Digite seu nome" onChange={e => setStudentName(e.target.value)}/>
      <button type="button" onClick={handleAddStudent}>Adicione</button>
      {
        students.map(student => <Card key={student.time} name={student.name} time={student.time}/>)
      }
    </div>
  )
}