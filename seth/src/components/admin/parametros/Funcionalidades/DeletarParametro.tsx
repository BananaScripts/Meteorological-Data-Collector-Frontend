import { useState } from "react"
import axios from "axios"


export default function DeleteParametro() {

    const[id, setId] = useState('')

    function deletar() {
        axios.delete(`http://seth-backend-app-652283507250.southamerica-east1.run.app/api/tipoparametro/deletar/${id}`)

        

        .then(() =>{
            setId('')
            alert("Estação deletada com sucesso!")
            
            
        })
        .catch((error) =>{
            
            console.error(error)
        })
    }

    return(
        <>
            <div id="DeleteParametro">

                <hr />

                <div id="Title_Section">

                    <h3>Deletar um Parametro</h3>

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
