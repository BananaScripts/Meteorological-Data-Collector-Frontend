import { useState } from "react"
import axios from "axios"
import "../../main.css";

export default function CreateUsuario() {

    const [nome, setNome] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [role, setRole] = useState('')

    function cadastrar() {
        console.clear()

        if (nome !== '' && dataNascimento !== '' && cpf !== '' && email !== '' && senha !== '' && role !== '') {
            axios.post('http://localhost:30105/api/usuario/cadastrar', { nome, dataNascimento, cpf, email, senha, role })
            .then(() => {
                setNome('')
                setDataNascimento('')
                setCpf('')
                setEmail('')
                setSenha('')
                setRole('')
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
                    <input type="text" maxLength={12} value={cpf} onChange={(event) => setCpf(event.target.value)} placeholder="(*Obrigatório)" />
                </p>

                <p>
                    E-mail:
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="(*Obrigatório)" />
                </p>

                <p>
                    Senha:
                    <input type="password" value={senha} onChange={(event) => setSenha(event.target.value)} placeholder="(*Obrigatório)" />
                </p>

                <p>
                    Privilégio:
                    <select value={role} onChange={(event) => setRole(event.target.value)}>
                        <option value="admin">Administrador</option>
                        <option value="user">Usuário</option>
                    </select>
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
