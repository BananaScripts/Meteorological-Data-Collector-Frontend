import { useEffect, useState } from "react"
import axios from "axios"
import { Parametro } from "../../../../types/parametro"
import { tipoParametro } from "../../../../types/tipoParametro"
import "../../main.css";


export default function DeleteParametroRelacionado() {

    const[id, setId] = useState(0)
    const [parametros, setParametros] = useState<Array<Parametro>>([])
    const [tipoParametro, setTipoParametro] = useState<Array<tipoParametro>>([])
    const [parametrosFormatados, setParametrosFormatados] = useState<Array<Parametro & {parametroNome: string}>>([])

    function deletar() {

       axios.delete(`http://localhost:30105/api/parametro/${id}`)
       .then((response) => {
           console.log(response.data)
           alert("Parâmetro deletado com sucesso!")
       })
       .catch((error) => {
           console.error(error)
           alert("Erro ao deletar o parâmetro.")
       })
        


    }

    function formatar() {
        const parametrosFormatados = parametros.map((parametro) => {
            const tipo = tipoParametro.find((tipo) => tipo.cod_tipoParametro === parametro.cod_tipoParametro)
            const parametroNome = tipo ? tipo.nome : 'Desconhecido'
            return {...parametro, parametroNome}
        })
        setParametrosFormatados(parametrosFormatados)
    }


    useEffect(() => {

        axios.get(`http://localhost:30105/api/parametros`)
        .then((response) => {
            setParametros(response.data)
        })
        .catch((error) => {
            console.error(error)
        })

        axios.get(`http://localhost:30105/api/tiposParametros`)
        .then((response) => {
            setTipoParametro(response.data)
        })
        .catch((error) => {
            console.error(error)
        })

        formatar()

    }, [])

    return(
        <>
            <div id="DeleteEstacao">

                <hr />

                <div id="Title_Section">

                    <h3>Deletar um Parametro</h3>

                </div>

                <div id="Inputs_Camp">

                    <p>
                        <select name="" value={id} onChange={(event) => setId(parseInt(event.target.value))} id="Select_Estacao">

                            <option value="">Selecione uma Parametro</option>

                            {parametrosFormatados.map((parametro) => (
                                <option key={parametro.cod_parametro} value={parametro.cod_parametro}>{parametro.parametroNome}</option>
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
