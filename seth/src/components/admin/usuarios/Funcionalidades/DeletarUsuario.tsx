import { useState } from "react"
import axios from "axios"

export default function DeleteUsuario() {

    const [id, setId] = useState('')

    function deletar() {
        if (id !== '') {
            axios.delete(`http://localhost:3002/usuario/deletar/${id}`)
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

    return (
        <>
        <div id="DeleteUsuario">

            <hr />

            <div id="Title_Section">

                <h3>Deletar um Usuário</h3>

            </div>

            <div id="Inputs_Camp">

                <p>
                    ID (Somente Número(s) ): 
                    <input type="number" value={id} onChange={(event) => setId(event.target.value)} /> 
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
