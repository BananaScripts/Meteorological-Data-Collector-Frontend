import { useEffect, useState } from "react"
import axios from "axios"
import { tipoParametro } from "../../../../types/tipoParametro"
import "../../main.css";


export default function DeleteParametro() {

    const[id, setId] = useState('')
    const [tiposParametros, setTiposParametros] = useState<Array<tipoParametro>>([])

    function deletar() {
        axios.delete(`http://localhost:30105/api/tipoParametro/deletar/${id}`)

        

        .then(() =>{
            setId('')
            alert("Parametro deletada com sucesso!")
            
            
        })
        .catch((error) =>{
            alert("Erro ao deletar Parametro!")
            
            console.error(error)
        })
    }

    useEffect(() => {
        axios.get('http://localhost:30105/api/tiposParametros')
        .then((response) => {
            setTiposParametros(response.data);
            
        })
        .catch((error) => {
            console.error(error)
        })
    }, [])

    return(
        <>
            <div id="DeleteParametro">

                <hr />

                <div id="Title_Section">

                    <h3>Deletar um Parametro</h3>

                </div>

                <div id="Inputs_Camp">

                    <p>
                        Selecione o Parametro a ser deletado:

                        <select onChange={(e) => setId(e.target.value)}>
                            <option value=''>Selecione</option>
                            {tiposParametros.map((parametro) => (
                                <option key={parametro.cod_tipoParametro} value={parametro.cod_tipoParametro}>{parametro.nome}</option>
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
