import { useState } from "react"
import axios from "axios"
import "./index.css"

export default function CreateUsuario() {

    const [nome, setNome] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function cadastrar() {
        console.clear()

        if (nome !== '' && dataNascimento !== '' && cpf !== '' && email !== '' && senha !== '') {
            axios.post('http://localhost:3002/usuario/cadastrar', { nome, dataNascimento, cpf, email, senha })
            .then(() => {
                setNome('')
                setDataNascimento('')
                setCpf('')
                setEmail('')
                setSenha('')
                alert("Usuário Cadastrado com Sucesso!")
            })
            .catch((error) => {
                console.error(error)
                alert("Erro ao cadastrar usuário!")
            })
        } else {
            alert("Preencha todos os campos obrigatórios!")
        }
    }

    return (
        <>
        <div id="CreateUsuario">

            <hr />
        
            <div id="Title_Section">

                <h3>Cadastrar Novo Usuário</h3>

                <p>*Preencha os campos obrigatórios para finalizar o cadastro</p>

            </div>

            <div id="Inputs_Camp">

                <p>
                    Nome: 
                    <input type="text" value={nome} onChange={(event) => setNome(event.target.value)} placeholder="(*Obrigatório)" />
                </p>

                <p>
                    Data de Nascimento:
                    <input type="date" value={dataNascimento} onChange={(event) => setDataNascimento(event.target.value)} placeholder="(*Obrigatório)" />
                </p>

                <p>
                    CPF:
                    <input type="text" value={cpf} onChange={(event) => setCpf(event.target.value)} placeholder="(*Obrigatório)" />
                </p>

                <p>
                    E-mail:
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="(*Obrigatório)" />
                </p>

                <p>
                    Senha:
                    <input type="password" value={senha} onChange={(event) => setSenha(event.target.value)} placeholder="(*Obrigatório)" />
                </p>

            </div>
        
            <div id="Action">

                <button onClick={cadastrar}>
                    Cadastrar
                </button>

            </div>
        
        </div>
        </>
    )
}
