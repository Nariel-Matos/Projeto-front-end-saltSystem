import { useState } from "react";
import "./style.css"
import api from "../../services/api"
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/robo.png"
export default function Cadastro() {

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: ""
  });
  const navigate = useNavigate()

  const heandlesSubmit = async (e) => {
    e.preventDefault()
    if (!form.nome || !form.email || !form.senha) {
      alert("Todos os campos são obrigatórios")

      return
    }

    try {
      await api.post("/usuario", {
        ...form
      })

      alert("Cadastro realizado com Sucesso!")
      setForm({
        nome: "",
        email: "",
        senha: ""
      })

      setTimeout(() => {
        navigate("/login")
      })


    } catch (error) {
      if (error.response.data.mensagem) {
        alert(error.response.data.mensagem)
      }
      console.log(error)
    }
  }

  return (
    <div className="div">

      <img src={logo} alt="" className="robo" />
      <form className="form-cadastro" onSubmit={heandlesSubmit}>
        <p className="cadastro-p">Cadastre-se</p>
        <label htmlFor="nome" className="nome" >Nome</label>

        <input
          type="text"
          className="input-nome"
          name="nome"
          placeholder="Nome"
          id="nome"
          onChange={(e) => setForm({
            ...form, [e.target.name]: e.target.value
          })}
          value={form.nome} />
        <label htmlFor="email">E-mail</label>

        <input
          type="text"
          name="email"
          id="email"
          placeholder="E-mail"
          onChange={(e) => setForm({
            ...form, [e.target.name]: e.target.value
          })}
          value={form.email}
          className="input-email"
        />

        <label htmlFor="senha">Senha</label>

        <input type="password"
          className="input-senha"
          name="senha"
          id="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={(e) => setForm({
            ...form, [e.target.name]: e.target.value
          })}>

        </input>
        <button className="button-cadastre">Cadastre-se</button>
        <span className="span">Já tem cadastro ? <Link to="/login">Clique aqui</Link></span>
      </form>
    </div>


  )
}
