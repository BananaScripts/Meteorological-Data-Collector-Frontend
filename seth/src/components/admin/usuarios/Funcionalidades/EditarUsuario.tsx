import { useState, useEffect } from "react"
import axios from "axios"
import "./index.css"

export default function EditUsuario() {

    const [id, setId] = useState('')
    const [usuario, setUsuario] = useState(null)
    const [nome, setNome] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const[encontrado, setEncontrado] = useState(true)

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:30105/api/usuario/${id}`)
                .then(response => {
                    const usuarioData = response.data[0]
                    if (usuarioData) {
                        setEncontrado(true)

                        const { nome, dataNascimento, cpf, email, senha } = usuarioData

                        const dataNascimentoFormatada = new Date(dataNascimento).toISOString().split('T')[0];

                        setUsuario(usuarioData)
                        setNome(nome)
                        setDataNascimento(dataNascimentoFormatada)
                        setCpf(cpf)
                        setEmail(email)
                        setSenha(senha)
                    }
                })
                .catch(error => {
                    setEncontrado(false)

                    console.error("Erro ao buscar o usuário:", error)
                    
                    resetForm()
                })
        } else {
            setEncontrado(true)
            resetForm()
        }
    }, [id])

    function resetForm() {
        setUsuario(null)
        setNome('')
        setDataNascimento('')
        setCpf('')
        setEmail('')
        setSenha('')
    }

    function editar() {
        if (nome !== '' && dataNascimento !== '' && cpf !== '' && email !== '' && senha !== '') {
            axios.put(`http://localhost:30105/api/usuario/atualizar/${id}`, {
                nome,
                dataNascimento,
                cpf,
                email,
                senha
            })
            .then(() => {
                alert("Usuário Editado com Sucesso!")
            })
            .catch(error => {
                console.error(error)
                alert("Erro ao editar usuário.")
            })
        } else {
            alert("Preencha todos os campos obrigatórios!")
        }
    }

    return (
        <>
        <div id="EditUsuario">
            <hr />

            <div id="Title_Section">
                <h3>Editar Usuário</h3>
                <p>*Informe o ID do usuário para editar</p>
            </div>

            <div id="Inputs_Camp">
                <p>
                    ID do Usuário:
                    <input type="text" value={id} onChange={(event) => setId(event.target.value)} placeholder="Digite o ID" />
                </p>

                
                {!encontrado && (
                    <p>*Usuário não encontrado</p>
                )}

                <hr />

                {usuario && (
                    <>
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
                    </>
                )}
            </div>

            <div id="Action">
                <button onClick={editar} disabled={!usuario}>
                    Editar
                </button>
            </div>
        </div>
        </>
    )
}
