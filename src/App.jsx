import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Table from './components/Table'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [age, setAge] = useState(0)
  const [id, setId] = useState(0)
  const [users, setUsers] = useState([])
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = { name, surname, age }
    if (age === 0) {
      toast.error("La edad no puede ser 0")
      return
    }
    if (!isEditing) {
      fetch('http://localhost:3000/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          toast.success("Usuario creado con éxito")
          fetch('http://localhost:3000/users/')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => toast.error("Error al actualizar el nuevo listado de usuarios"))
          })
        .catch(error => toast.error("Error al crear el usuario"))
    }
    else {
      fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          toast.success("Usuario actualizado con éxito")
          fetch('http://localhost:3000/users/')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => toast.error("Error al actualizar el nuevo listado de usuarios"))
          })
        .catch(error => toast.error("Error al actualizar el usuario"))
    }
  }

  const handleDelete = (user) => {
    fetch(`http://localhost:3000/users/${user.id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        toast.success("Usuario eliminado con éxito")
        setUsers(users.filter(u => u.id !== user.id))
      })
      .catch(error => toast.error("Error al eliminar el usuario"))
  }

  const handleEdit = (user) => {
    setId(user.id)
    setName(user.name)
    setSurname(user.surname)
    setAge(user.age)
    setIsEditing(true)
  }

  useEffect(() => {
    fetch('http://localhost:3000/users/')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => toast.error("Error al obtener los usuarios"))
  }, [])

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 style={{ textAlign: "center" }}>Vite + React</h1>
      <h2 style={{ textAlign: "center" }}>{isEditing ? `Editando a ${name} ${surname}` : "Crear usuario"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="card-form">
          <div className="form-input-container">
            <label htmlFor="name">Nombre:</label>
            <input type="text" className="form-input" id="name" value={name} onChange={(event) => setName(event.target.value)} required />
          </div>
          <div className="form-input-container">
            <label htmlFor="surname">Apellido:</label>
            <input type="text" className="form-input" id="surname" value={surname} onChange={(event) => setSurname(event.target.value)} required />
          </div>
          <div className="form-input-container">
            <label htmlFor="age">Edad:</label>
            <input type="number" className="form-input" id="age" value={age} onChange={(event) => setAge(event.target.value)} required />
          </div>
          <button type="submit">{isEditing ? "Editar" : "Crear"}</button>
          {isEditing && <button style={{ marginTop: "0.5em" }} type="button" onClick={() => {
            setName('')
            setSurname('')
            setAge(0)
            setIsEditing(false)
          }}>
            Cancelar
          </button>}
        </div>
      </form>
      <br />
      <Table data={users} onEdit={handleEdit} onDelete={handleDelete} />
      <p className="read-the-docs">
        Haz clic en los logos de Vite y React para obtener más información
      </p>
    </>
  )
}

export default App
