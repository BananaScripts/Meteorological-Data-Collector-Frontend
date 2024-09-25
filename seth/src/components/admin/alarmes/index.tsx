import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css"

import { Alarme } from "../../../types/alarme";


export default function Interface_Controle_Alarmes() {
  
  const[alarmes, setAlarmes]= useState<Array<Alarme>>([])

  const[inAction, setInAction] = useState(false)
  
  useEffect(()=>{
    axios.get('http://localhost:3002/alarme/listar')
    .then((response)=>{
        setAlarmes(response.data)
    })
    .catch((error)=>{
        console.error(error)
    })
  }, [])

  function OnAction(x: boolean) {
    setInAction(x)
  }


  return (
    <>

        <div id="Box_Alarmes">

            <div id="Title_Box">
                <h2> Controle de Alarmes </h2>

                {! inAction && (<button onClick={() => OnAction(true)}>Cadastar Alarme</button>)}
                {  inAction && (<button onClick={() => OnAction(false)}>Cancelar</button>)}

            </div>

            

            {! inAction && (
            <div id="Scroll_Table">

            
            <table>

              <thead>

                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Valor</th>
                  <th>Condição</th>
                  <th>Tipo do Parametro</th>
                  <th>--------</th>
                  <th>--------</th>
                </tr>

              </thead>
              <tbody>
                    {alarmes.map((alarme)=>(
                                <tr key={alarme.cod_alarme}>
                                    <td>{alarme.cod_alarme}</td>
                                    <td>{alarme.nome}</td>
                                    <td>{alarme.valor}</td>
                                    <td>{alarme.condicao}</td>
                                    <td>{alarme.cod_tipoParametro}</td>
                                    <td>
                                        <button onClick={() => OnAction(true)} className="Button_Action">
                                          Editar
                                        </button> 
                                      </td>
                                    <td>

                                        <button onClick={() => OnAction(true)} className="Button_Action">
                                          Deletar
                                        </button> 
                                      </td>
                                </tr>
                            ))}
                        </tbody>


            </table>

            </div>

            )}

            { inAction && (
              <>

                Cadastro de Alarme

              </>
            )}

        </div>
    </>
  );
}
