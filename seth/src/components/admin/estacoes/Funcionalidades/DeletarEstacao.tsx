import { useState } from "react"
import { Estacao } from "../../../../types/estacao"
import axios from "axios"


export default function DeleteEstacao() {

    const[estacoes, setEstacoes] = useState<Array<Estacao>>([])
    const[id, setId] = useState('')

    function deletar() {
        axios.delete(`http://localhost:3002/estacao/deletar/${id}`)
        .then(() =>{
            alert("Estação deletada com sucesso!")
            
            
        })
        .catch((error) =>{
            console.error(error)
        })
    }

    return(
        <>
            <div id="DeleteEstacao">

                <hr />

                <div id="Title_Section">

                    <h3>Deletar uma Estação</h3>

                </div>

                <div id="Inputs_Camp">

                    <p>
                        ID (Somente Número(s) ): 
                        <input type="number" value={id} onChange={(event)=>setId(event.target.value)} /> 
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
