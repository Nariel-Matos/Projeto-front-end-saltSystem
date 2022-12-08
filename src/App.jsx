
import './App.css'
import api from '../src/services/api'
import { useState } from 'react'
import logo from './assets/robo.png'

function App() {
  const [message, setmessage] = useState([])
  const [input, setInput] = useState("");
  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`
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
      <img src={logo} className="robo-main" alt="" />
      <div className="form">

        <div className='box'>
          {message.map(element => {
              return (
                <p key={element.message}>{element.message}</p>
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
