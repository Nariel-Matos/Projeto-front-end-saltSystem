import './style.css'
import { useNavigate,Link} from 'react-router-dom';
import { useState } from 'react';
import logo from "../../assets/robo.png"
import api from '../../services/api';


 export default function Login() {
   

    const [form,setForm] = useState({
      email:"",
      senha:""
    });
    const navigate = useNavigate()
  
    const heandlesSubmit = async (e) => {
        e.preventDefault()

        if(!form.email || !form.senha){
         alert("Todos os campos são obrigatórios")
       
          return 
        }
  
    
      
        try {
          const response = await api.post("/login",{
            ...form
          })
          console.log(response.data)
          localStorage.setItem("token",response.data.token)
          localStorage.setItem("nome",response.data.usuario.nome)
          navigate("/main")
  
        } catch (error) {
          if(error.response.data.mensagem){
            alert(error.response.data.mensagem)
          }
          console.log(error)
        }
  
  
    }
    
  
    return (
      
      
      <div className="div">
       <img src={logo} className="robo" alt="" />
         <form className="form-login" onSubmit={heandlesSubmit}>
          <p className='bem-vindo'>Bem vindo a RoboSystem!</p>
         <p className='login-p' >Faça seu Login</p>
        <label htmlFor="email">E-mail</label>

        <input
        className='input-login-email'
         type="text"
         name="email" 
         id="email" 
         onChange={ (e) => setForm({
          ...form,[e.target.name]:e.target.value
         })}
         value={form.email}
         />

        <label htmlFor="senha">Senha</label>

        <input 
        className='input-login-senha'
        type="password"
         name="senha" 
         id="senha" 
         value={form.senha}
         onChange={ (e) => setForm({
          ...form,[e.target.name]:e.target.value
         })}>

         </input>
         <button className='button-login'>Login</button>
         <Link to="/cadastro">
           <button className='button-cadastro'>Cadastre-se</button>
            </Link>
       
    </form>
  
  
      </div>
    )
  }
  
