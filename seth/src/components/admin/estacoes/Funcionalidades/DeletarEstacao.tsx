import { useEffect, useState } from "react"
import axios from "axios"
import { Estacao } from "../../../../types/estacao"
import { Parametro } from "../../../../types/parametro"
import "../../main.css";


export default function DeleteEstacao() {

    const[id, setId] = useState(0)
    const [estacoes, setEstacoes] = useState<Array<Estacao>>([])
    const [parametros, setParametros] = useState<Array<Parametro>>([])

    function deletar() {

        if (estacoes.find((estacao) => estacao.cod_estacao === id) !== undefined) {

            const estacao = estacoes.find((estacao) => estacao.cod_estacao === id)

            const parametro = parametros.find((parametro) => parametro.cod_estacao === id)



            if (parametro?.cod_estacao === estacao?.cod_estacao) {

                alert("Não é possível deletar uma estação que possui um parâmetro cadastrado!")
                
            } else {

                axios.delete(`https://seth-backend-app-652283507250.southamerica-east1.run.app/api/estacao/deletar/${id}`)
                .then(() =>{
                    alert("Estação deletada com sucesso!")
                    
                    
                })
                .catch((error) =>{
                    console.error(error)
                })
            }
        }
        


    }


    useEffect(() => {
        axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/estacoes')
        .then((response) => {
            setEstacoes(response.data)
        })
        .catch((error) => {
            console.error(error)
        })

        axios.get(`https://seth-backend-app-652283507250.southamerica-east1.run.app/api/parametros`)
        .then((response) => {
            setParametros(response.data)
        })
        .catch((error) => {
            console.error(error)
        })
    }, [])

    return(
        <>
            <div id="DeleteEstacao">

                <hr />

                <div id="Title_Section">

                    <h3>Deletar uma Estação</h3>

                </div>

                <div id="Inputs_Camp">

                    <p>
                        <select name="" value={id} onChange={(event) => setId(parseInt(event.target.value))} id="Select_Estacao">

                            <option value="">Selecione uma Estação</option>

                            {estacoes.map((estacao) => {
                                return(
                                    <option key={estacao.cod_estacao} value={estacao.cod_estacao}>
                                        {estacao.nome}
                                    </option>
                                )
                            })}

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
