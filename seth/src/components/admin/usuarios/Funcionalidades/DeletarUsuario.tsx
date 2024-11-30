import { useEffect, useState } from "react"
import axios from "axios"
import { Usuario } from "../../../../types/usuario"
import "../../main.css";

export default function DeleteUsuario() {

    const [id, setId] = useState('')
    const [usuarios, setUsuarios] = useState<Array<Usuario>>([])

    function deletar() {
        if (id !== '') {
            axios.delete(`http://localhost:30105/api/usuario/deletar/${id}`)
            .then(() => {
                alert("Usuário deletado com sucesso!")
                setId('') 
            })
            .catch((error) => {
                console.error(error)
                alert("Erro ao deletar usuário!")
            })
        } else {
            alert("Preencha o ID do usuário a ser deletado!")
        }
    }

    useEffect(() => {
        axios.get('http://localhost:30105/api/usuarios')
        .then((response) => {
            setUsuarios(response.data)
        })
        .catch((error) => {
            console.error(error)
        })
    }, [])

    return (
        <>
        <div id="DeleteUsuario">

            <hr />

            <div id="Title_Section">

                <h3>Deletar um Usuário</h3>

            </div>

            <div id="Inputs_Camp">

                <p>
                    Selecione o Usuário a ser deletado:

                    <select value={id} onChange={(event) => setId(event.target.value)}>
                        <option value="">Selecione um Usuário</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.cod_usuario} value={usuario.cod_usuario}>{usuario.nome}</option>
                        ))}    
                    </select>
                    
                </p>

            </div>

            <div id="Action">

                <button onClick={deletar}>
                    Deletar
                </button>

            </div>

        </div>
        </>
    )
}
