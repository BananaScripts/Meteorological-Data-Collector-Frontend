import { useEffect, useState } from "react"
import "./index.css"
import axios from "axios"

import Funcionalidades from "./Funcionalidades"
import { Parametro } from "../../../types/parametro"

export default function INTERFACE_CONTROLE_PARAMETROS() {

    const[parametros, setParametros] = useState<Array<Parametro>>([])
    const [actionType, setActionType] = useState<number | null>(null);


    const atualizarParametros = () => {
      axios.get('http://localhost:30105/api/tiposParametros')
          .then((response) => {
              setParametros(response.data); 
          })
          .catch((error) => {
              console.error(error);
          });
  };

  useEffect(() => {
      atualizarParametros(); 
  }, []);

  
  const handleAction = (type: number | null) => {
    setActionType(type);

    atualizarParametros()
  };

      

    return(
      <>

        <div id="Box_Parametros">


          <div id="Title_Box">

            <h2> Controle de Parâmetros </h2>

              {actionType === null && (
                <button onClick={() => handleAction(2)}>Editar</button>
              )}                   

              {actionType === null && (    
                <button onClick={() => handleAction(3)}>Deletar</button>
              )}            

              {actionType === null && (
                <button onClick={() => handleAction(1)}>Cadastrar Parametro</button>
              )}

              {actionType !== null && (
                <button onClick={() => handleAction(null)}>Cancelar</button>
              )}


          </div>


          {actionType == null && (

            <div id="Scroll_Table">

            <hr />
            
            <table>

              <thead>

                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Fator</th>
                  <th>Offset</th>
                  <th>Unidade de Medida</th>
                </tr>

              </thead>
              
              <tbody>
                {parametros.map((parametro)=>(
                    <tr key={parametro.cod_tipoParametro}>
                      <td>{parametro.cod_tipoParametro}</td>
                      <td>{parametro.nome}</td>
                      <td>{parametro.fator}</td>
                      <td>- {parametro.offset}</td>
                      <td>{parametro.unidadeMedida}</td>

                    </tr>
                  ))}
                </tbody>


        </table>

        </div>

        )}

            {actionType === 1 && <Funcionalidades.CreateParametro/>}
            {actionType === 2 && <Funcionalidades.EditParametro/>}
            {actionType === 3 && <Funcionalidades.DeleteParametro />}


        </div>
    </>
    )
}