import { useState, useEffect } from "react"
import axios from "axios"
import "../../main.css";

import { Usuario } from "../../../../types/usuario"

export default function EditUsuario() {

    const [id, setId] = useState(0)
    const [editando, setEditando] = useState(false)

    const [usuario, setUsuario] = useState(null)
    const [usuarios, setUsuarios] = useState<Array<Usuario>>([])
    const [nome, setNome] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [role, setRole] = useState('')

    console.log(usuario)

    useEffect(() => {
        axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/usuarios')
        .then((response) => {
            setUsuarios(response.data)
        })
        .catch((error) => {
            console.error(error)
        })


        if (id !== 0) {
            const foundUser = usuarios.find(u => u.cod_usuario === id);
            
            if (foundUser) {
                setEditando(true)
                const dataformatada = new Date(foundUser.dataNascimento).toISOString().split('T')[0];
                setNome(foundUser.nome);
                setDataNascimento(dataformatada);
                setCpf(foundUser.cpf);
                setEmail(foundUser.email);
                setSenha(foundUser.senha);
                setRole(foundUser.role);

            } else {

                setEditando(false)
                resetForm();
            }
        }
    })

    function resetForm() {
        setUsuario(null)
        setNome('')
        setDataNascimento('')
        setCpf('')
        setEmail('')
        setSenha('')
        setRole('')
    }

    function editar() {
        if (nome !== '' && dataNascimento !== '' && cpf !== '' && email !== '' && senha !== '' && role !== '') {

            axios.put(`https://seth-backend-app-652283507250.southamerica-east1.run.app/api/usuario/atualizar/${id}`, {
                nome,
                dataNascimento,
                cpf,
                email,
                senha,
                role
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

                    <select value={id} onChange={(event) => setId(parseInt(event.target.value))}>
                        <option value="">Selecione um Usuário</option>
                            {usuarios.map((usuario) => (
                                <option key={usuario.cod_usuario} value={usuario.cod_usuario}>{usuario.nome}</option>
                            ))}    
                    </select>
                </p>

                <hr />

                {editando && (
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

                        <p>
                            Privilégio:
                            <select value={role} onChange={(event) => setRole(event.target.value)}>
                                <option value="admin">Administrador</option>
                                <option value="user">Usuário</option>
                            </select>

                        </p>
                    </>
                )}
            </div>

            <div id="Action">
                <button onClick={editar} disabled={!editando}>
                    Editar
                </button>
            </div>
        </div>
        </>
    )
}
