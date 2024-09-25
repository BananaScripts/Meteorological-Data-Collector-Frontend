import { useEffect, useState } from "react"
import "./index.css"
import { Parametro } from "../../../types/parametro"
import axios from "axios"

export default function Interface_Controle_Parametros() {

    const[parametros, setParametros] = useState<Array<Parametro>>([])

    const[inAction, setInAction] = useState(false)

    useEffect(()=>{
      axios.get('http://localhost:3002/tipoParametro/listar')
      .then((response)=>{
          setParametros(response.data)
      })
      .catch((error)=>{
          console.error(error)
      })
    }, [])

    function OnAction(x: boolean) {
        setInAction(x)
      }

      

    return(
        <>
            <div id="Box_Parametros">

                <div id="Title_Box">
                    <h2> Controle de Parametros </h2>

                    {! inAction && (<button onClick={() => OnAction(true)}>Cadastar Parametro</button>)}
                    {  inAction && (<button onClick={() => OnAction(false)}>Cancelar</button>)}

                    
                </div>

            {! inAction && (
            <div id="Scroll_Table">

            

            <table>

              <thead>

                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Fator</th>
                  <th>Offset</th>
                  <th>Unidade de Medida</th>
                  <th>--------</th>
                  <th>--------</th>
                </tr>

              </thead>
              <tbody>
                    {parametros.map((parametro)=>(
                                <tr key={parametro.cod_tipoParametro}>
                                    <td>{parametro.cod_tipoParametro}</td>
                                    <td>{parametro.nome}</td>
                                    <td>{parametro.fator}</td>
                                    <td>{parametro.offset}</td>
                                    <td>{parametro.unidadeMedida}</td>
                                    <td>Editar</td>
                                    <td>Deletar</td>    
                                </tr>
                            ))}
                        </tbody>


            </table>

            </div>

            )}

            { inAction && (
              <>

                Cadastro de Parametros
              </>
            )}

            </div>
        </>
    )
}