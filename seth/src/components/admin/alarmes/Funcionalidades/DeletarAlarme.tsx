import { useState } from "react"
import axios from "axios"

export default function DeleteAlarme() {
    const [id, setId] = useState('')

    function deletar() {
        axios.delete(`http://localhost:3002/api/alarme/deletar/${id}`)
            .then(() => {
                alert("Alarme deletado com sucesso!")
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <>
            <div id="DeleteAlarme">
                <hr />
                <div id="Title_Section">
                    <h3>Deletar um Alarme</h3>
                </div>

                <div id="Inputs_Camp">
                    <p>
                        ID (Somente Número(s)):
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
