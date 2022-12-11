
import './App.css'
import api from '../src/services/api'
import { useEffect, useState } from 'react'
import lixeira from "./assets/lixeira.svg"
import { useNavigate } from 'react-router-dom';
import robo from "./assets/robo.png"


function App() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
  });
  const navigate = useNavigate()
  const [contatos,setcontatos] = useState([])
  const [message, setmessage] = useState([])
  const [input, setInput] = useState("");
  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

const desconectar =  () => {
  localStorage.removeItem("token")
  navigate("/login")

}

  const removerContato = async (id) => {
    try {
      const response = await api.delete(`/contato/${id}`,{headers})
      const localContatos = [...contatos]
      const novosContatos = localContatos.filter((contato) => {
          return contato.id !== id
      })
      setcontatos(novosContatos)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
 const getContatos = async () => {
try {
    const response = await api.get("/contato",{headers})
     console.log(response.data)
     
      setcontatos(response.data)
    
} catch (error) {
  console.log(error)
}
 }
 getContatos()
},[])

const heandlesSubmitContato = async () => {
  if (!form.nome) {
    alert("O nome é obrigatório")
    return
  }
  if (!form.email) {
    alert("E-mail obrigatório")
    return
  }
  try {
    const response = await api.post("/contato",{
      ...form
      
    },{
      headers
    })
    setcontatos([...contatos,response.data[0]])
    setForm({
      nome: "",
      email:""
    })
} catch (error) {
  if (error.response.data.mensagem) {
    alert(error.response.data.mensagem)
  }
  console.log(error)
}
}

  const heandlesSubmit = async (e) => {
    e.preventDefault()
    if (!input) {
      return
    }
    try {
      const response = await api.post("/message", {
        mensagem: input
      }, { headers })
      console.log(response.data)


      setmessage([...message, {
        message: input
      }, {
        message: response.data.mensagem
      }])
      setInput("")

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='div-main'>
    <div className='div-contatos'>
      <button className='desconectar' onClick={() => desconectar()}>Desconectar</button>

      <input type="text" className='input-contato' placeholder='Nome'
       name="nome"
       onChange={(e) => setForm({
         ...form, [e.target.name]: e.target.value
       })}
       value={form.nome}/>

      <input type="text" className='input-contato' placeholder='E-mail'
       name="email"
       onChange={(e) => setForm({
         ...form, [e.target.name]: e.target.value
       })}
       value={form.email}/>
      <button className='cadastre-button' onClick={() => heandlesSubmitContato()}>+ Adicionar Contato</button>
      
        
      <div className='div-map-contatos'>
        {contatos.map(contato => {
        
          return (
            
          <div className='card-contato'  key={contato.id}>{
            contato.contato_id == 1 ? <img src={robo} className='icon-contato '/>:
            <button className='icon-contato' >{contato.nome.slice(0,2).toUpperCase()}</button>
          }
             
              <h3>{contato.nome}:</h3>
              <p>{contato.email}</p>
             {contato.contato_id !== 1 &&  <img src={lixeira}  onClick={() => removerContato(contato.id)} className="lixeira" alt="" />
        }
          </div>
          )
        })}
      </div>
  </div>

     
      <div className="form">

        <div className='box'>
          {message.map(element => {
              return (
                <p  className='box-mensagem' key={element.message}>{element.message}</p>
              )
            })}
        </div>

        <form className='form-bot' onSubmit={heandlesSubmit}>
          <input type="text"
            name="message"
            id=""
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite Olá para começar."
            value={input}
            className='form-message' />
          <button type='submit' className='button-submit' >Enviar</button>
        </form>

      </div>
    </div>
  )
}

export default App
