import { useEffect, useState } from "react"
import axios from "axios"

import "../main.css";
import Funcionalidades from "./Funcionalidades"
import { tipoParametro } from "../../../types/tipoParametro"

export default function INTERFACE_CONTROLE_PARAMETROS() {

    const[tiposParametros, setTiposParametros] = useState<Array<tipoParametro>>([])
    const [actionType, setActionType] = useState<number | null>(null);


    const atualizarParametros = () => {
      axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/tiposParametros')
          .then((response) => {
              setTiposParametros(response.data); 
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

            <h2> Controle dos Parâmetros </h2>

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
                  <th>Nome</th>
                  <th>Fator</th>
                  <th>Offset</th>
                  <th>Unidade de Medida</th>
                  <th>Sigla</th>
                </tr>

              </thead>
              
              <tbody>
                {tiposParametros.map((tipoParametro)=>(
                    <tr key={tipoParametro.cod_tipoParametro}>
                      <td>{tipoParametro.nome}</td>
                      <td>{tipoParametro.fator}</td>
                      <td>- {tipoParametro.offset}</td>
                      <td>{tipoParametro.unidadeMedida}</td>
                      <td>{tipoParametro.json}</td>

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